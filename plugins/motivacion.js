let handler = async (m, { conn}) => {
  let tanjiroCode =
`⛩️🌸 *Respiración del Sol - Código de Sub-Bot (Tanjiro)* 🌸⛩️

🔐 *Código Nichirin Listo*

🔥 *Canalizando energía respiratoria...* Vínculo activado por código espiritual...

🌊 Utilizá este *Código Demon Slayer* para convertirte en ✧ *Sub-Bot Temporal* con la nobleza del clan Kamado.

📜 *Ritual Manual:*

\`1\` » Pulsa los ⋮ puntos en la parte superior de WhatsApp
\`2\` » Selecciona *Dispositivos Vinculados* — Portal del Cuervo Mensajero
\`3\` » Tocá *Vincular con número de teléfono* — Técnica de conexión Nichirin
\`4\` » Escribí el *Código Hashira* entregado por el cuervo maestro

⚠️ *Tanjiro te recomienda usar una cuenta secundaria para esta misión*

🌕 𝙎𝙄𝙎𝙏𝙀𝙈𝘼 ➤ [ CÓDIGO DISPONIBLE ] — *Respira profundo. Conectá. Protegé.* ⚔️`

  await conn.sendMessage(m.chat, { text: tanjiroCode}, { quoted: m})
}
handler.help = ['code']
handler.tags = ['serbot']
handler.command = ['code']
export default handler
