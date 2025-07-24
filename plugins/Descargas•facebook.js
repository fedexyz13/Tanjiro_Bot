import axios from 'axios';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '会 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 🧣'
};

const handler = async (m, { text, conn, args}) => {
  if (!args[0]) {
    return conn.reply(m.chat, `
📎 *Solicitud de enlace*

🧣 Por favor, ingresa un enlace válido de Facebook para comenzar la descarga.

📌 Ejemplo:
${usedPrefix}facebook https://fb.watch/abc12345/
`, m);
}

  const fbUrl = args[0];
  let res;

  try {
    await m.react('🍁');
    res = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/facebook?url=${fbUrl}`);
} catch (e) {
    return conn.reply(m.chat, '⚠️ Error al obtener los datos. Verifica el enlace proporcionado.', m);
}

  const result = res.data;
  if (!result || result.length === 0) {
    return conn.reply(m.chat, '❎ No se encontraron archivos disponibles para ese enlace.', m);
}

  const videoDataHD = result.find(video => video.quality === "720p (HD)");
  const videoDataSD = result.find(video => video.quality === "360p (SD)");

  const videoUrl = videoDataHD?.link_hd || videoDataSD?.link_sd;

  if (!videoUrl) {
    return conn.reply(m.chat, '⚠️ No se encontró una resolución compatible para este video.', m);
}

  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await conn.sendMessage(m.chat, {
        video: { url: videoUrl},
        caption: '📥 *Video descargado exitosamente desde Facebook.*',
        fileName: 'fb.mp4',
        mimetype: 'video/mp4',
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
            title: 'Tanjiro_Bot_MD | Descarga Facebook',
            body: 'Tu técnica ha invocado un archivo del mundo exterior',
            thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
            mediaType: 1,
            sourceUrl: fbUrl,
            renderLargerThumbnail: true
}
}
}, { quoted: m});
      await m.react('✅');
      break;
} catch (e) {
      if (attempt === maxRetries) {
        await m.react('❌');
        return conn.reply(m.chat, '🚩 No se pudo enviar el video después de varios intentos.', m);
}
      await new Promise(resolve => setTimeout(resolve, 1000));
}
}
};

handler.help = ['facebook', 'fb'];
handler.tags = ['descargas'];
handler.command = ['facebook', 'fb'];
handler.register = true;

export default handler;
