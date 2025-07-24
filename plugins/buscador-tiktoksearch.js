import axios from 'axios';
const { proto, generateWAMessageFromContent, generateWAMessageContent} = (await import("@whiskeysockets/baileys")).default;

const channelRD = {
  id: '120363402097425674@newsletter',
  name: 'Canal Oficial del Dojo del Sol 🌄'
};

let handler = async (message, { conn, text, usedPrefix, command}) => {
  const emoji = '🎯';
  const emoji2 = '📥';
  const rwait = '⌛';
  const done = '✅';
  const dev = 'Tanjiro_Bot_MD | 🌄 Dojo del Sol';

  if (!text) {
    return conn.reply(message.chat, `${emoji} Por favor, ingresa lo que deseas buscar en TikTok.\n\n📌 Ejemplo:\n${usedPrefix + command} música relajante`, message);
}

  const createVideoMessage = async (url) => {
    const { videoMessage} = await generateWAMessageContent({ video: { url}}, { upload: conn.waUploadToServer});
    return videoMessage;
};

  const shuffleArray = async (array) => {
    for (let i = array.length - 1; i> 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
}
};

  try {
    await message.react(rwait);
    await conn.reply(message.chat, `${emoji2} Descargando videos... Respira con calma mientras invoco los archivos.`, message);

    const { data: response} = await axios.get('https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=' + encodeURIComponent(text));
    let searchResults = response.data;
    await shuffleArray(searchResults);

    let selectedResults = searchResults.splice(0, 7);
    let results = [];

    for (let result of selectedResults) {
      results.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null}),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: dev}),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: result.title || 'Sin título',
          hasMediaAttachment: true,
          videoMessage: await createVideoMessage(result.nowm)
}),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: []})
});
}

    const responseMessage = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
            forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              serverMessageId: 134,
              newsletterName: channelRD.name
}
},
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: `${emoji} Resultados de: ${text}`}),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: '★ Tanjiro - Tiktoks 🌅'}),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false}),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: results})
})
}
}
}, { quoted: message});

    await message.react(done);
    await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id});

} catch (error) {
    console.error('[❌] Error en tiktoksearch:', error);
    await message.react('❌');
    await conn.reply(message.chat, `❌ Ocurrió un error al buscar videos.\n🔍 Detalle: ${error.message}`, message);
}
};

handler.help = ['tiktoksearch <texto>'];
handler.tags = ['buscador'];
handler.command = ['tiktoksearch', 'ttss', 'tiktoks'];
handler.group = true;
handler.register = true;
handler.coin = 2;

export default handler;
