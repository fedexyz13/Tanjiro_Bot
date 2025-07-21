import yts from "yt-search";
import { ytv, yta} from "./_ytdl.js";
const limit = 100; // Límite en MB para enviar como documento

const handler = async (m, { conn, text, command}) => {
  if (!text) return m.reply("🌴 Ingresa el nombre de un video o una URL de YouTube.");

  await m.react("🌱");

  try {
    const res = await yts(text);
    if (!res ||!res.all || res.all.length === 0) {
      return m.reply("❌ No se encontraron resultados para tu búsqueda.");
}

    const video = res.all[0];
    const thumb = await fetch(video.thumbnail).then((res) => res.buffer());

    const cap = `
\`\`\`乂会≡ 🌸 TANJIRO BOT ≡会乂\`\`\`

≡ Título: » ${video.title}
≡ Autor: » ${video.author.name}
≡ Duración: » ${video.duration.timestamp}
≡ Vistas: » ${video.views.toLocaleString()}
≡ URL: » ${video.url}

📥 El contenido se enviará a continuación...
> 🧣 Dev: fedexyz
`.trim();

    await conn.sendFile(m.chat, thumb, "thumbnail.jpg", cap, m);

    // Play como audio
    if (command === "play") {
      const api = await yta(video.url);
      await conn.sendFile(m.chat, api.result.download, api.result.title + ".mp3", "", m, null, {
        mimetype: "audio/mpeg",
});
      await m.react("✔️");
}

    // Play como video
    else if (command === "play2" || command === "playvid") {
      const api = await ytv(video.url);
      const resVideo = await fetch(api.url);
      const size = parseInt(resVideo.headers.get("Content-Length"), 10);
      const sizemb = size / (1024 * 1024);
      const asDocument = sizemb>= limit;

      await conn.sendFile(m.chat, api.url, api.title + ".mp4", "", m, null, {
        asDocument,
        mimetype: "video/mp4",
});

      await m.react("✔️");
}
} catch (err) {
    console.error(err);
    await m.react("❌");
    return m.reply(`❌ Error inesperado: ${err.message}`);
}
};

handler.help = ["play", "play2"];
handler.tags = ["descargas"];
handler.command = ["play", "play2", "playvid"];
export default handler;
