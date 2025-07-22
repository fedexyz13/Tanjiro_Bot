let handler = async (m, { conn}) => {
  try {
    const who = m.quoted?.sender || m.mentionedJid?.[0] || m.sender
    const name = await conn.getName(who)
    const pp = await conn.profilePictureUrl(who, 'image').catch(() => catalogo)

    const userNumber = who.split('@')[0]
    const isBot = who.includes(':') || who.endsWith('g.us') || who.startsWith('status@')? '🤖 Bot': '👤 Humano'
    const tag = `@${userNumber}`

    const info = `
╭─━━━ ∘◦ ✧ ◦∘ ━━━─╮
│ 👤 *Perfil de Usuario*
│
│ 📛 *Nombre:* ${name}
│ 🏷️ *Tag:* ${tag}
│ 🧬 *Tipo:* ${isBot}
│ 📸 *Foto de perfil adjunta*
╰─━━━ ∘◦ ✧ ◦∘ ━━━─╯
`.trim()

    await conn.sendFile(m.chat, pp, 'profile.jpg', info, m, false, { mentions: [who]})

} catch (error) {
    console.error(error)
    await conn.reply(m.chat, '❌ No se pudo obtener el perfil del usuario.\nAsegúrate de mencionar correctamente o responder a un mensaje.', m)
}
}

handler.help = ['perfil', 'pfp @usuario']
handler.tags = ['tools', 'info']
handler.command = ['pfp', 'getpic', 'fotoperfil', 'perfil', 'verperfil']
handler.register = true

export default handler
