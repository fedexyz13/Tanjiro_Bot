import { generateWAMessageFromContent} from '@whiskeysockets/baileys';
import * as fs from 'fs';

const handler = async (m, { conn, text, participants}) => {
  const users = participants.map(u => conn.decodeJid(u.id));
  const userId = m.mentionedJid?.[0] || m.sender;
  const tagText = text || (m.quoted?.text || '〘🌸 𝖲𝖺𝗅𝗎𝖽𝗈𝗌 𝖼𝖺𝗓𝖺𝖽𝗈𝗋𝖾𝗌 🌸〙');

  const mensajeDecorado = `
〘🌸 TanjiroBot - Notificación espiritual 🌸〙

${tagText}
> 🧣 Mensaje enviado por: @${userId.split('@')[0]}
`.trim();

  try {
    const q = m.quoted? m.quoted: m;
    const c = m.quoted? await m.getQuotedObj(): m.msg || m.text || m.sender;

    const tipo = m.quoted? q.mtype: 'extendedTextMessage';
    const msg = conn.cMod(
      m.chat,
      generateWAMessageFromContent(
        m.chat,
        { [tipo]: m.quoted? c.message[q.mtype]: { text: '' || c}},
        { quoted: null, userJid: conn.user.id}
),
      mensajeDecorado,
      conn.user.jid,
      { mentions: users}
);

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id});

} catch {
    const quoted = m.quoted || m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const invisiblePadding = String.fromCharCode(8206).repeat(850);

    const mensajeFinal = `${tagText}\n\n> 🧣 De: @${userId.split('@')[0]}`;

    let media = quoted.download?.()? await quoted.download(): null;

    if (isMedia && quoted.mtype === 'imageMessage') {
      await conn.sendMessage(m.chat, { image: media, mentions: users, caption: mensajeFinal}, { quoted: null});

} else if (isMedia && quoted.mtype === 'videoMessage') {
      await conn.sendMessage(m.chat, { video: media, mentions: users, mimetype: 'video/mp4', caption: mensajeFinal}, { quoted: null});

} else if (isMedia && quoted.mtype === 'audioMessage') {
      await conn.sendMessage(m.chat, { audio: media, mentions: users, mimetype: 'audio/mp4', fileName: `𝖧𝗂𝖽𝖾𝖳𝖺𝗀_𝖳𝖺𝗇𝗃𝗂𝗋𝗈.mp3`}, { quoted: null});

} else if (isMedia && quoted.mtype === 'stickerMessage') {
      await conn.sendMessage(m.chat, { sticker: media, mentions: users}, { quoted: null});

} else {
      await conn.relayMessage(m.chat, {
        extendedTextMessage: {
          text: `${invisiblePadding}\n${mensajeFinal}\n`,
          contextInfo: {
            mentionedJid: users,
            externalAdReply: {
              thumbnail: icons,
              sourceUrl: redes,
              mentionedJid: [m.sender],
              title: '〘🌸 TanjiroBot Tag oculto 🌸〙',
              body: 'Respiración espiritual activada',
              mediaType: 1,
              renderLargerThumbnail: false
}
}
}
}, {});
}
}
};

handler.help = ['hidetag'];
handler.tags = ['grupo'];
handler.command = ['hidetag', 'notificar', 'notify', 'tag', 'n'];
handler.group = true;
handler.register = true;
handler.admin = true;

export default handler;
