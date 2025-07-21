import got from "got";
import moment from "moment-timezone";

let handler = async (m, { conn}) => {
  m.react("🌊");

  const senderId = m.sender;
  const userNumber = senderId.split("@")[0];
  const userName = await conn.getName(senderId);
  const time = moment().tz("Asia/Tokyo");
  const formattedDate = time.format("dddd, D [de] MMMM YYYY");
  const formattedTime = time.format("hh:mm A");
  const hour = time.format("HH");

  const saludo = ucapan();
  const avatar = hour>= 18? "🌙": hour>= 12? "☀️": "🌅";

  if (!global.menutext) await global.menu();

  const separator = "═".repeat(28);
  const header = `
╭${separator}〔 ⚔️ 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 - Respiración Solar 〕${separator}⬣
┃ 🧑‍🦰 Cazador: ${avatar} ${userName}
┃ 📱 Katana ID: +${userNumber}
┃ 📆 Calendario de batalla: ${formattedDate}
┃ ⏰ Hora sagrada: ${formattedTime}
┃ 🏮 Saludo: ${saludo}
╰${"═".repeat(66)}⬣\n`;

  const txt = header + global.menutext;
  const mention = [m.sender];

  try {
    const imageURL = "https://files.catbox.moe/wav09n.jpg";
    const imgBuffer = await got(imageURL).buffer();

    await conn.sendMessage(
      m.chat,
      {
        document: imgBuffer,
        fileName: '📜 Panel Demon Slayer - 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅.pdf',
        mimetype: 'application/pdf',
        caption: txt,
        fileLength: 99999999,
        contextInfo: {
          mentionedJid: mention,
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: "🌸 Panel Solar - TanjiroBot",
            body: "Invoca tus técnicas desde el libro de respiración",
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
    conn.reply(m.chat, "⚠️ Error al invocar el pergamino sagrado: " + e, m);
}
};

handler.command = /^menu|menú|principal$/i;
export default handler;

// 🎐 Saludo basado en hora japonesa
function ucapan() {
  const hour = moment().tz("Asia/Tokyo").format("HH");
  if (hour>= 18) return "🌙 Buenas noches, que la luna guíe tu katana";
  if (hour>= 12) return "🌞 Buenas tardes, respira con fuerza";
  return "🌅 Buenos días, el sol renace con tu espíritu";
}

// 📜 Construcción temática del menú
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
    tools: "⚒️",
    fun: "🎊",
    game: "🎮",
    admin: "🧢",
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
      text += `╭─〔 ${icon} ${tags[category]} 〕──⬣\n`;
      text += commands.map(cmd => `┃ 🔹 ${cmd}`).join("\n");
      text += `╰────────────────────────⬣\n\n`;
}
}

  global.menutext = text;
};
