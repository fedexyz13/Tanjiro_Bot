import axios from 'axios';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
  if (typeof jid!== 'string') {
    throw new TypeError(`jid must be a string, received: ${jid} (${jid?.constructor?.name})`);
}

  if (!Array.isArray(medias) || medias.length < 2) {
    throw new RangeError('Minimum of 2 media items required');
}

  for (const media of medias) {
    const { type, data} = media;

    if (!['image', 'video'].includes(type)) {
      throw new TypeError(`Unsupported media.type: ${type}`);
}

    if (!data || (!data.url &&!Buffer.isBuffer(data))) {
      throw new TypeError(`Invalid media.data: ${JSON.stringify(data)}`);
}
}

  const {
    caption = '',
    quoted,
    delay = 500,
...restOptions
} = options;

  const album = baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: {
        expectedImageCount: medias.filter(m => m.type === 'image').length,
        expectedVideoCount: medias.filter(m => m.type === 'video').length,
...(quoted && {
          contextInfo: {
            remoteJid: quoted.key.remoteJid,
            fromMe: quoted.key.fromMe,
            stanzaId: quoted.key.id,
            participant: quoted.key.participant || quoted.key.remoteJid,
            quotedMessage: quoted.message,
},
}),
},
},
    {}
);

  await conn.relayMessage(jid, album.message, { messageId: album.key.id});

  for (let i = 0; i < medias.length; i++) {
    const { type, data} = medias[i];
    const message = await baileys.generateWAMessage(
      jid,
      { [type]: data,...(i === 0? { caption}: {})},
      { upload: conn.waUploadToServer}
);

    message.message.messageContextInfo = {
      messageAssociation: { associationType: 1, parentMessageKey: album.key},
};

    await conn.relayMessage(jid, message.message, { messageId: message.key.id});
    await baileys.delay(delay);
}

  return album;
}

async function fetchPins(query) {
  try {
    const { data} = await axios.get(`https://anime-xi-wheat.vercel.app/api/pinterest?q=${encodeURIComponent(query)}`);
    return Array.isArray(data.images)
? data.images.map(url => ({
          type: 'image',
          data: { url},
}))
: [];
} catch (err) {
    console.error('Pinterest fetch error:', err);
    return [];
}
}

const handler = async (m, { conn, text}) => {
  if (!text) {
    return conn.reply(m.chat, `${emojis} Ingresa un texto. Ejemplo:.pinterest ${botname}`, m, rcanal);
}

  try {
    m.react('🕒');
    const results = await fetchPins(text);

    if (!results.length) {
      return conn.reply(m.chat, `No se encontraron resultados para "${text}".`, m, rcanal);
}

    const selectedMedia = results.slice(0, 15);

    await sendAlbumMessage(m.chat, selectedMedia, {
      caption: `Resultados de: ${text}\nCantidad de Resultados: ${selectedMedia.length}\n🌸 Creador: ${dev}`,
      quoted: m,
});

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key}});

} catch (err) {
    conn.reply(m.chat, 'Error al obtener imágenes de Pinterest.', m, rcanal);
}
};

handler.help = ['pinterest', 'pin'];
handler.command = ['pinterest', 'pin'];
handler.tags = ['buscador'];

export default handler;
