// 🌸 Tanjiro Link — Invocación breve y ceremonial

async function handler(m, { conn, participants, groupMetadata}) {
  const link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
  const texto = `
⛩️ *Santuario Nichirin: ${groupMetadata.subject}*
👥 *Hashira reunidos:* ${participants.length}
🔗 *Enlace espiritual:* ${link}

🍃 *Tanjiro dice:* Respira, comparte, protege.`.trim()

  conn.reply(m.chat, texto, m, { detectLink: true})
}

handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link', 'linktanjiro']
handler.group = true
handler.botAdmin = true

export default handler
