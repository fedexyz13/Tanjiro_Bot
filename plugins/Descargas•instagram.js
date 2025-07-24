import { igdl} from 'ruhend-scraper';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: 'Canal Oficial del Dojo del Sol 🌄'
};

let handler = async (m, { args, conn}) => {
  if (!args[0]) {
    return conn.reply(m.chat, `
⚠️ *Enlace faltante*

📎 Debes ingresar un link válido de Instagram para poder descargar.

📌 Ejemplo:
.instagram https://www.instagram.com/p/Cxyz123/
`, m);
}

  try {
    await m.react('🕒');

    conn.reply(m.chat, `🌕 *Respiración de enlace activada... procesando contenido*`, m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: args[0],
          mediaType: 1,
          title: 'Instagram Downloader - Tanjiro_Bot_MD',
          body: 'Descarga de contenido en progreso',
          thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
          sourceUrl: args[0],
          previewType: 0,
          showAdAttribution: true,
          renderLargerThumbnail: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            serverMessageId: 100,
            newsletterName: channelRD.name
}
}
}
});

    let res = await igdl(args[0]);
    if (!res ||!res.data || res.data.length === 0) {
      throw new Error('No se encontraron archivos para descargar.');
}

    for (let media of res.data) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await conn.sendFile(m.chat, media.url, 'instagram.mp4', '📥 *Descarga completada desde Instagram.*', m);
}

    await m.react('✅');

} catch (e) {
    await m.react('⚠️');
    conn.reply(m.chat, `🚩 *Error al procesar el enlace*\n🔍 ${e.message}`, m);
}
};

handler.command = ['instagram', 'ig'];
handler.tags = ['descargas'];
handler.help = ['instagram', 'ig'];
handler.cookies = 1;
handler.register = true;

export default handler;
