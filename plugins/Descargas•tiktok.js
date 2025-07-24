import fg from 'api-dylux';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '会 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 🧣'
};

const handler = async (m, { conn, text, args, usedPrefix, command}) => {
  try {
    if (!args[0]) {
      return conn.reply(m.chat, `
⚔️ *Descarga desde TikTok*

📎 Debes ingresar un enlace válido para continuar.

📌 Ejemplo:
${usedPrefix + command} https://vm.tiktok.com/ZMreHF2dC/
`, m);
}

    if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok\.com\/([^\s&]+)/gi.test(text)) {
      return conn.reply(m.chat, '❎ El enlace proporcionado no parece ser de TikTok.', m);
}

    await m.react('⌛');

    const data = await fg.tiktok(args[0]);
    const { title, play, duration} = data.result;
    const { nickname} = data.result.author;

    const caption = `
📥 *TikTok descargado exitosamente* 🧣

👤 Autor: ${nickname}
🎬 Título: ${title}
⏱️ Duración: ${duration}
`;

    await conn.sendFile(m.chat, play, 'tiktok.mp4', caption, m, {
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
},
        externalAdReply: {
          title: 'Tanjiro_Bot_MD | Descarga de TikTok',
          body: 'Respira con calma. Tu archivo ha sido invocado.',
          thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
          sourceUrl: args[0],
          mediaType: 1,
          renderLargerThumbnail: true
}
}
});

    await m.react('✅');

} catch (e) {
    await m.react('❌');
    conn.reply(m.chat, `⚠️ *Error al procesar el enlace*\n🔍 ${e.message}`, m);
}
};

handler.help = ['tiktok'];
handler.tags = ['dl'];
handler.command = ['tt', 'tiktok', 'ttdl'];
export default handler;
