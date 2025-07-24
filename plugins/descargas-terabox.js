import axios from 'axios';
import path from 'path';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: 'Canal Oficial del Dojo del Sol 🌄'
};

const handler = async (m, { conn, args, text, usedPrefix, command}) => {
  if (!text) {
    return conn.reply(m.chat, `
✳️ *Uso correcto del comando:*

${usedPrefix + command} <url de Terabox>

📎 Ejemplo:
${usedPrefix + command} https://www.terabox.com/s/1abcdEFGH
`, m);
}

  if (!text.includes("terabox.com")) {
    return conn.reply(m.chat, "❌ El enlace no parece ser de Terabox. Revisa que sea válido.");
}

  try {
    await m.react("⏳");
    const apiUrl = `https://zenzapis.xyz/downloader/terabox?url=${encodeURIComponent(text)}&apikey=tu_api`;
    const { data} = await axios.get(apiUrl);

    if (!data.status ||!data.result?.direct_url) {
      throw new Error("No se pudo obtener el archivo. La API no respondió correctamente.");
}

    const result = data.result;
    const { filename = 'archivo_terabox', size, thumb, direct_url: link} = result;
    const sizeInBytes = parseInt(size) || 0;
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
    const ext = path.extname(filename).toLowerCase();

    const caption = `
╭─「🌸 会 *Tanjiro_Bot_MD* 会 🌸」
│
│ 📂 *Archivo:* ${filename}
│ 📦 *Tamaño:* ${sizeInMB} MB
│ 🔗 *Fuente:* Terabox
│
╰─🧣 *Descarga espiritual completada*
`;

    if (thumb) {
      await conn.sendMessage(m.chat, {
        image: { url: thumb},
        caption,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            serverMessageId: 130,
            newsletterName: channelRD.name
},
          externalAdReply: {
            title: 'Tanjiro_Bot_MD | Descarga Terabox',
            body: filename,
            sourceUrl: text,
            thumbnailUrl: thumb,
            mediaType: 1,
            renderLargerThumbnail: true
}
}
}, { quoted: m});
} else {
      await conn.sendMessage(m.chat, {
        text: caption
}, { quoted: m});
}

    const isVideo = ['.mp4', '.mov', '.avi', '.mkv'].includes(ext);
    const isImage = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    const isHeavy = sizeInBytes> 100 * 1024 * 1024;

    let fileMsg;

    if (isImage) {
      fileMsg = {
        image: { url: link},
        fileName: filename
};
} else if (isVideo &&!isHeavy) {
      fileMsg = {
        video: { url: link},
        mimetype: 'video/mp4',
        fileName: filename
};
} else {
      fileMsg = {
        document: { url: link},
        mimetype: 'application/octet-stream',
        fileName: filename
};
}

    await conn.sendMessage(m.chat, fileMsg, { quoted: m});
    await m.react("✅");

} catch (err) {
    console.error(err);
    await m.react("❌");
    conn.reply(m.chat, `
❌ *Ocurrió un error al descargar o enviar el archivo.*

📎 Revisa que el enlace sea válido
📦 Verifica que el archivo aún esté disponible
🌐 Si el problema persiste, inténtalo más tarde.
`, m);
}
};

handler.help = ['terabox <url>'];
handler.tags = ['downloader'];
handler.command = ['terabox'];
handler.group = false;

export default handler;
