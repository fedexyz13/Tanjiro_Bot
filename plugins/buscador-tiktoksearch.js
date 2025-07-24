import fetch from 'node-fetch';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '会 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 🧣'
};

let handler = async (m, { text, conn, command}) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `
🌸 *Tanjiro_Bot_MD | Búsqueda espiritual en TikTok*

📎 Ingresa una palabra clave para buscar contenido.

🧭 Ejemplo:
${command} entrenamiento samurái
`, m);
}

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key}});

    const res = await fetch(`https://www.sankavolereii.my.id/search/tiktok?apikey=planaai&q=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status ||!json.result.length) {
      return conn.reply(m.chat, '❌ No se encontraron resultados espirituales en TikTok.', m);
}

    const selectedVideos = json.result.slice(0, 5); // 🧘 Solo los primeros 5

    for (const video of selectedVideos) {
      const {
        title,
        duration,
        play,
        digg_count,
        comment_count,
        share_count,
        author
} = video;

      const caption = `
╭─「🌸 TikTok - Espíritu Solar 🌸」
│
│ 🎬 *${title}*
│ 👤 *${author.nickname}* (@${author.unique_id})
│ ⏱️ *Duración:* ${duration}s
│ ❤️ *Me gusta:* ${digg_count.toLocaleString()}
│ 💬 *Comentarios:* ${comment_count.toLocaleString()}
│ 🔁 *Compartir:* ${share_count.toLocaleString()}
│
╰─🧣 *Tanjiro_Bot_MD | Dojo del Sol*
`;

      await conn.sendMessage(m.chat, {
        video: { url: play},
        caption,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            serverMessageId: 222,
            newsletterName: channelRD.name
},
          externalAdReply: {
            title: title,
            body: `Autor: ${author.nickname}`,
            thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
            mediaType: 1,
            sourceUrl: `https://www.tiktok.com/@${author.unique_id}`,
            renderLargerThumbnail: true
}
}
}, { quoted: m});

      await new Promise(resolve => setTimeout(resolve, 1200)); // ✨ Pausa entre envíos
}

    await m.react('✅');

} catch (e) {
    console.error(e);
    await m.react('❌');
    m.reply(`❌ *Error espiritual al invocar los videos*\n📄 ${e.message || e}`);
}
};

handler.help = ['ttsearch <palabra clave>'];
handler.tags = ['buscador'];
handler.command = ['ttsearch', 'tiktoksearch'];
export default handler;
