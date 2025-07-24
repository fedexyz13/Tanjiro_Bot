import axios from 'axios';
const { generateWAMessageContent} = (await import("@whiskeysockets/baileys")).default;

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
    return conn.reply(message.chat, `
${emoji} *Por favor, ingresa lo que deseas buscar en TikTok.*

📎 Ejemplo:
${usedPrefix + command} memes latinos
`, message);
}

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i> 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
}
};

  try {
    await message.react(rwait);
    await conn.reply(message.chat, `${emoji2} *Descargando videos...*\nRespira con calma mientras invoco los archivos.`, message);

    const { data: response} = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(text)}`);
    let searchResults = response.data;
    shuffleArray(searchResults);

    const selectedResults = searchResults.slice(0, 5); // 👈 Solo 5 videos

    for (let result of selectedResults) {
      await conn.sendMessage(message.chat, {
        video: { url: result.nowm},
        caption: `╭─「🌸 Tanjiro TikTok 🌸」
│ 🏷️ *Título:* ${result.title}
│ 🔗 *Enlace:* ${result.url}
╰─🧣 ${dev}`,
        contextInfo: {
          mentionedJid: [message.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            serverMessageId: 134,
            newsletterName: channelRD.name
},
          externalAdReply: {
            title: result.title,
            body: dev,
            mediaType: 1,
            sourceUrl: result.url,
            thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
            renderLargerThumbnail: true
}
}
}, { quoted: message});

      await new Promise(resolve => setTimeout(resolve, 1200)); // 🧘 Pausa entre envíos
}

    await message.react(done);

} catch (error) {
    console.error('[❌] Error en tiktoksearch:', error);
    await message.react('❌');
    await conn.reply(message.chat, `❌ *Ocurrió un error al buscar videos.*\n🔍 ${error.message}`, message);
}
};

handler.help = ['tiktoksearch <texto>'];
handler.tags = ['buscador'];
handler.command = ['tiktoksearch', 'ttss', 'tiktoks'];
handler.group = true;
handler.register = true;
handler.coin = 2;

export default handler;
