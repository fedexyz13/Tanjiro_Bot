import gtts from 'node-gtts';
import { readFileSync, unlinkSync} from 'fs';
import { join} from 'path';

const defaultLang = 'es';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '会 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 🧣'
};

const handler = async (m, { conn, args, usedPrefix, command}) => {
  let lang = args[0];
  let text = args.slice(1).join(' ');

  if ((args[0] || '').length!== 2) {
    lang = defaultLang;
    text = args.join(' ');
}

  if (!text && m.quoted?.text) text = m.quoted.text;

  let res;
  try {
    res = await tts(text, lang);
} catch (e) {
    if (!text) {
      return conn.sendMessage(m.chat, {
        text: `
🚩 *Tanjiro_Bot_MD | Voz no invocada*

📌 Falta ingresar un texto para convertir en voz.

🗣️ Ejemplo:
${usedPrefix + command} Hola Tanjiro
`,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [m.sender],
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            serverMessageId: 333,
            newsletterName: channelRD.name
},
          externalAdReply: {
            title: 'Tanjiro_Bot_MD | TTS',
            body: 'Convierte palabras en espíritu sonoro',
            thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
            mediaType: 1,
            sourceUrl: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N',
            renderLargerThumbnail: true
}
}
}, { quoted: m});
}
    res = await tts(text, defaultLang);
}

  if (res) {
    await conn.sendFile(
      m.chat,
      res,
      'vozTanjiro.opus',
      `🔊 *Voz espiritual invocada por Tanjiro*\n\n🗣️ "${text}"`,
      m,
      true,
      {
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [m.sender],
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            serverMessageId: 334,
            newsletterName: channelRD.name
},
          externalAdReply: {
            title: 'Tanjiro_Bot_MD | Voz generada',
            body: 'Respira profundo. Tu voz ahora resuena.',
            thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
            mediaType: 1,
            sourceUrl: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N',
            renderLargerThumbnail: true
}
}
}
);
}
};

handler.help = ['tts <idioma> <texto>'];
handler.tags = ['tools'];
handler.command = ['tts', 'gtts'];
export default handler;

function tts(text, lang = 'es') {
  return new Promise((resolve, reject) => {
    try {
      const speaker = gtts(lang);
      const filePath = join(global.__dirname(import.meta.url), '../tmp', Date.now() + '.wav');
      speaker.save(filePath, text, () => {
        const buffer = readFileSync(filePath);
        unlinkSync(filePath);
        resolve(buffer);
});
} catch (e) {
      reject(e);
}
});
}
