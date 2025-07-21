import yts from "yt-search";
import { ytv, yta} from "./_ytdl.js";
const limit = 100; // MB límite para enviar como documento

const handler = async (m, { conn, text, command}) => {
  if (!text) return m.reply("🌴 Ingresa el nombre de un video o la URL de YouTube.");
  await m.react("🌱");

  try {
    const res = await yts(text);
    if (!res ||!res.all || res.all.length === 0) {
      return m.reply("❌ No se encontraron resultados para tu búsqueda.");
}

    const video = res.all[0];
    const thumbBuffer = await fetch(video.thumbnail).then(res => res.buffer());

    const cap = `
\`\`\`乂会≡ 🌸 TANJIRO BOT ≡会乂\`\`\`

≡ Título: » ${video.title}
≡ Autor: » ${video.author.name}
≡ Duración: » ${video.duration.timestamp}
≡ Vistas: » ${video.views.toLocaleString()}
≡ URL: » ${video.url}

📥 Preparando descarga...

> 🧣 Dev: fedexyz
`.trim();

    await conn.sendFile(m.chat, thumbBuffer, "thumbnail.jpg", cap, m);

    if (command === "play") {
      const api = await yta(video.url);
      await conn.sendFile(
        m.chat,
        api.result.download,
        `${video.title}.mp3`,
        "",
        m,
        null,
        { mimetype: "audio/mpeg"}
);
      await m.react("✔️");
}

    else if (command === "play2" || command === "playvid") {
      const api = await ytv(video.url);
      const resVideo = await fetch(api.url);
      const size = parseInt(resVideo.headers.get("Content-Length"), 10);
      const sizemb = size / (1024 * 1024);
      const asDoc = sizemb>= limit;

      await conn.sendFile(
        m.chat,
        api.url,
        `${video.title}.mp4`,
        "",
        m,
        null,
        { asDocument: asDoc, mimetype: "video/mp4"}
);
      await m.react("✔️");
}

} catch (err) {
    console.error(err);
    await m.react("❌");
    m.reply(`❌ Ocurrió un error:\n${err.message}`);
}
};

handler.help = ["play", "play2", "playvid"];
handler.tags = ["download"];
handler.command = ["play", "play2", "playvid"];
export default handler;
