import got from "got";
import moment from "moment-timezone";

let handler = async (m, { conn}) => {
  m.react("🍃");

  const senderId = m.sender;
  const userNumber = senderId.split("@")[0];
  const userName = await conn.getName(senderId);
  const time = moment().tz("Asia/Tokyo");
  const formattedDate = time.format("dddd, D [de] MMMM YYYY");
  const formattedTime = time.format("hh:mm A");

  const saludo = ucapan();
  const hour = time.format("HH");
  const avatar = hour>= 18? "🌙": hour>= 12? "☀️": "🌅";

  if (!global.menutext) await global.menu();

  const separator = "═".repeat(26);
  const header = `
╭${separator}〔 🌞 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 - Menú Premium 〕${separator}⬣
┃ 👤 Usuario: ${avatar} ${userName}
┃ 📱 Número: +${userNumber}
┃ 📆 Fecha: ${formattedDate}
┃ 🕒 Hora: ${formattedTime}
┃ 🏮 Saludo: ${saludo}
╰${"═".repeat(64)}⬣\n`;

  const footer = `
╭────〔 🌸 Autor del Bot 〕─────⬣
┃ 🥷 Nombre: *𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍*
┃ 📞 WhatsApp: wa.me/5491156178758
┃ 🌐 Sitio: https://fedexyz.com
╰────────────────────────────⬣`;

  const txt = header + global.menutext + footer;
  const mention = [m.sender];

  try {
    const images = [
      "https://files.catbox.moe/yzl2d9.jpg",
      "https://files.catbox.moe/yzl2d9.jpg",
      "https://files.catbox.moe/yzl2d9.jpg"
    ];
    const imageURL = images[Math.floor(Math.random() * images.length)];
    const imgBuffer = await got(imageURL).buffer();

    await conn.sendMessage(
      m.chat,
      {
        document: imgBuffer,
        fileName: '🌸 Menú Tanjiro - Resp. Solar.pdf',
        mimetype: 'application/pdf',
        caption: txt,
        fileLength: 99999999,
        contextInfo: {
          mentionedJid: mention,
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: "⚔️ Panel de Comandos - TanjiroBot",
            body: "Respiración solar en cada función 🌊",
            thumbnail: imgBuffer,
            sourceUrl: "https://fedexyz.com",
            mediaType: 1,
            renderLargerThumbnail: true
}
}
},
      { quoted: m}
);
} catch (e) {
    console.error(e);
    conn.reply(m.chat, txt, m, { mentions: mention});
    conn.reply(m.chat, "⚠️ Hubo un error al enviar tu menú: " + e, m);
}
};

handler.command = /^menu|menú|tanjiro|premium$/i;
export default handler;

// 🎴 Saludo automático
function ucapan() {
  const hour = moment().tz("Asia/Tokyo").format("HH");
  if (hour>= 18) return "🌙 Buenas noches";
  if (hour>= 12) return "🌞 Buenas tardes";
  return "🌅 Buenos días";
}

// 🎋 Menú global decorado
global.menu = async function getMenu() {
  let text = "";

  const help = Object.values(global.plugins)
.filter(plugin =>!plugin.disabled)
.map(plugin => ({
      help: Array.isArray(plugin.help)? plugin.help.filter(Boolean): [],
      tags: Array.isArray(plugin.tags)? plugin.tags.filter(Boolean): [],
}));

  const tags = {};
  for (const plugin of help) {
    for (const tag of plugin.tags || []) {
      if (tag) tags[tag] = tag.toUpperCase();
}
}

  const icons = {
    tools: "🛠",
    fun: "🎲",
    game: "🎮",
    admin: "🛡",
    sticker: "🎨",
    group: "👥",
    internet: "🌐",
    download: "📥",
    anime: "🍙",
    roleplay: "🎭",
    default: "📂"
};

  for (const category of Object.keys(tags)) {
    const commands = help
.filter(menu => menu.tags?.includes(category))
.flatMap(menu => menu.help)
.filter(cmd => typeof cmd === "string" && cmd.trim());

    if (commands.length) {
      const icon = icons[category] || icons.default;
      text += `╭──〔 ${icon} ${tags[category]} 〕──────⬣\n`;
      text += commands.map(cmd => `┃ 🎴 ${cmd}`).join("\n");
      text += `╰────────────────────────⬣\n\n`;
      }
}

  global.menutext = text;
};
