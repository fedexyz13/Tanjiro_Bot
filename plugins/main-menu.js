import { xpRange} from '../lib/levelling.js'
import fetch from 'node-fetch'

const textTanjiro = (text) => {
  const charset = {
    a:'ᴀ', b:'ʙ', c:'ᴄ', d:'ᴅ', e:'ᴇ', f:'ꜰ', g:'ɢ',
    h:'ʜ', i:'ɪ', j:'ᴊ', k:'ᴋ', l:'ʟ', m:'ᴍ', n:'ɴ',
    o:'ᴏ', p:'ᴘ', q:'ǫ', r:'ʀ', s:'ꜱ', t:'ᴛ', u:'ᴜ',
    v:'ᴠ', w:'ᴡ', x:'ˣ', y:'ʏ', z:'ᴢ'
};
  return text.toLowerCase().split('').map(c => charset[c] || c).join('');
};

let tags = {
  main: textTanjiro('panel solar'),
  group: textTanjiro('respiración grupal'),
  serbot: textTanjiro('clon espiritual')
};

const defaultMenu = {
  before: `🧣︵˚˖𓆩⌇𓆪˖˚︵🌸︵˚˖𓆩⌇𓆪˖˚︵🧣
ᯓ *𝖧𝗈𝗅𝖺 \`%name\` - Espíritu cazador* ⚔️
ᯓ *𝗆𝖾𝗇𝗎 𝖽𝖾 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍* 🌅
ᯓ *𝖢𝗋𝖾𝖺𝖽𝗈 𝗉𝗈𝗋 ꜰᴇᴅᴇ.xʏᴢ* 🗡️

👤 Usuario: *%name*
🌟 Exp: %exp/%maxexp
🌐 Modo: %mode
👥 Registro total: %totalreg
⏳ Tiempo activo: %muptime
%readmore`.trimStart(),

  header: '\n🌸 %category\n',
  body: '┃ ⤷ %cmd %iscorazones %isPremium',
  footer: '\n',
  after: '\n╰───────────────⬣'
};

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    const { exp = 0, level = 0} = global.db.data.users[m.sender];
    const { min, xp} = xpRange(level, global.multiplier);
    const name = await conn.getName(m.sender);
    const _uptime = process.uptime() * 1000;
    const muptime = clockString(_uptime);
    const totalreg = Object.keys(global.db.data.users).length;
    const mode = global.opts["self"]? "Privado 🔒": "Público 🌐";

    const help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
      help: Array.isArray(p.help)? p.help: [p.help],
      tags: Array.isArray(p.tags)? p.tags: [p.tags],
      prefix: 'customPrefix' in p,
      limit: p.limit,
      premium: p.premium,
      enabled:!p.disabled
}));

    for (const plugin of help) {
      for (const tag of plugin.tags) {
        if (!(tag in tags) && tag) tags[tag] = textTanjiro(tag);
}
}

    const { before, header, body, footer, after} = defaultMenu;

    let _text = [
      before,
...Object.keys(tags).map(tag => {
        const cmds = help
.filter(menu => menu.tags.includes(tag))
.map(menu =>
            menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix? cmd: _p + cmd)).join('\n')
).join('\n');
        return `${header.replace(/%category/g, tags[tag])}${cmds}${footer}`;
}),
      after
    ].join('\n');

    const replace = {
      '%': '%',
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      totalreg,
      mode,
      muptime,
      readmore: String.fromCharCode(8206).repeat(4001)
};

    const text = _text.replace(/%(\w+)/g, (_, key) => replace[key] || '');

    const imageURL = 'https://files.catbox.moe/wav09n.jpg';
    const imgBuffer = await fetch(imageURL).then(res => res.buffer());

    const buttons = [
      {
        buttonId: `${_p}owner`,
        buttonText: { displayText: '会 𝖢𝖱𝖤𝖠𝖣𝖮𝖱'},
        type: 1
},
      {
        buttonId: `${_p}reg tanjiro.13`,
        buttonText: { displayText: '≡ 𝖠𝖴𝖳𝖮 𝖱𝖤𝖦𝖨𝖲𝖳𝖱𝖮'},
        type: 1
}
    ];

    await conn.sendMessage(
      m.chat,
      {
        document: imgBuffer,
        fileName: '会 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍.pdf',
        mimetype: 'application/pdf',
        caption: text,
        buttons,
        fileLength: 99999999,
        contextInfo: {
          mentionedJid: [m.sender],
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: "会 𝖯𝖺𝗇𝖾𝗅 𝗌𝗈𝗅𝖺𝗋 - 𝖳𝖺𝗇𝗃𝗂𝗋𝗈 𝖡𝗈𝗍",
            body: "Invoca tus técnicas desde el libro de respiración",
            thumbnail: imgBuffer,
            sourceUrl: "https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N",
            mediaType: 1,
            renderLargerThumbnail: true
}
}
},
      { quoted: m}
);
} catch (e) {
    console.error(e);
    conn.reply(m.chat, '❎ TanjiroBot tropezó durante su respiración. Intenta de nuevo.', m);
}
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menucompleto'];
handler.register = false;

export default handler;

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000);
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
