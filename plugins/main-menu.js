import { xpRange} from '../lib/levelling.js'
import fetch from 'node-fetch'

const textTanjiro = (text) => {
  const charset = {
    a:'ᴀ', b:'ʙ', c:'ᴄ', d:'ᴅ', e:'ᴇ', f:'ꜰ', g:'ɢ',
    h:'ʜ', i:'ɪ', j:'ᴊ', k:'ᴋ', l:'ʟ', m:'ᴍ', n:'ɴ',
    o:'ᴏ', p:'ᴘ', q:'ǫ', r:'ʀ', s:'ꜱ', t:'ᴛ', u:'ᴜ',
    v:'ᴠ', w:'ᴡ', x:'ˣ', y:'ʏ', z:'ᴢ'
}
  return text.toLowerCase().split('').map(c => charset[c] || c).join('')
}

let tags = {
  main: textTanjiro('panel solar'),
  group: textTanjiro('respiración grupal'),
  serbot: textTanjiro('clon espiritual')
}

const defaultMenu = {
  before: `
📸『 Espíritu protector — Tanjiro Kamado 』📸
🖼️ *Imagen espiritual:* https://files.catbox.moe/wav09n.jpg

🧣︵˚˖𓆩⌇𓆪˖˚︵🌸︵˚˖𓆩⌇𓆪˖˚︵🧣
⚔️ *Bienvenido, cazador \`%name\`*
🌅 *Menú solar del Tanjiro_Bot*
🗡️ *Creado por ꜰᴇᴅᴇ.xʏᴢ*

👤 Usuario: *%name*
🌟 EXP: %exp/%maxexp
📜 Modo: %mode
📋 Registro total: %totalreg
⏳ Activo: %muptime
%readmore`.trim(),

  header: '\n🌿 %category\n',
  body: '┃ ⤷ %cmd %iscorazones %isPremium',
  footer: '\n',
  after: `
🎥『 Nichirin Vision — Modo REC 』🎥
📼 *Video de cierre:* https://files.catbox.moe/u8rw5p.mp4
🧣 *Tanjiro dice:* “Respira… incluso si el miedo te envuelve.”
╰───────────────⬣`.trim()
}

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    const { exp = 0, level = 0} = global.db.data.users[m.sender]
    const { min, xp} = xpRange(level, global.multiplier)
    const name = await conn.getName(m.sender)
    const _uptime = process.uptime() * 1000
    const muptime = clockString(_uptime)
    const totalreg = Object.keys(global.db.data.users).length
    const mode = global.opts["self"]? "Privado 🔒": "Público 🌐"

    let help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
      help: Array.isArray(p.help)? p.help: [p.help],
      tags: Array.isArray(p.tags)? p.tags: [p.tags],
      prefix: 'customPrefix' in p,
      limit: p.limit,
      premium: p.premium,
      enabled:!p.disabled
}))

    for (const plugin of help) {
      if (plugin.tags) {
        for (const t of plugin.tags) {
          if (!(t in tags) && t) tags[t] = textTanjiro(t)
}
}
}

    const { before, header, body, footer, after} = defaultMenu

    let _text = [
      before,
...Object.keys(tags).map(tag => {
        const cmds = help
.filter(menu => menu.tags.includes(tag))
.map(menu =>
            menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix? cmd: _p + cmd)).join('\n')
).join('\n')
        return `${header.replace(/%category/g, tags[tag])}${cmds}${footer}`
}),
      after
    ].join('\n')

    let replace = {
      '%': '%',
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      totalreg,
      mode,
      muptime,
      readmore: String.fromCharCode(8206).repeat(4001)
}

    const text = _text.replace(/%(\w+)/g, (_, key) => replace[key] || '')

    // imagen decorativa superior
    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/wav09n.jpg'},
      caption: '📸 *Tanjiro protege tu camino con energía Nichirin.*'
}, { quoted: m})

    // video final con menú incluido
    await conn.sendMessage(m.chat, {
      video: { url: 'https://files.catbox.moe/u8rw5p.mp4'},
      caption: text,
      fileName: 'Tanjiro_Menu_Respiracion.mp4',
      mimetype: 'video/mp4',
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: "会 Tanjiro_Bot — Panel Solar",
          body: "Respira. Avanza. Protege.",
          thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
          sourceUrl: "https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N",
          mediaType: 1,
          renderLargerThumbnail: true
}
}
}, { quoted: m})

} catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ TanjiroBot tropezó en su respiración. Intenta nuevamente.', m)
}
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menucompleto']
handler.register = false

export default handler

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000)
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
