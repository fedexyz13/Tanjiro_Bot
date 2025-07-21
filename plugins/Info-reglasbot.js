let handler = async (m, { conn }) => {
  let Reglas = `
╭「 *⚠️ REGLAS DEL BOT ⚠️* 」
│
├❗ *NO LLAMAR AL BOT*
├❗ *NO HACER SPAM AL BOT*
├❗ *CONTACTAR AL OWNER SOLO SI ES IMPORTANTE*
├❗ *NO ESCRIBIRLE AL PRIVADO AL BOT*
├❗ *RESPETA LOS TÉRMINOS Y CONDICIONES*
├❗ *USA EL BOT DE MANERA APROPIADA*
├❗ *NO INSULTAR AL BOT*
│
╰─────────────────────

📔 *INFO:* Si se rompen las reglas, puedes ser baneado y bloqueado del bot.

📝 *NOTA:* Este bot oficial es *Asuna_Bot-Al (OFC)*. No nos responsabilizamos por otros bots falsos. Usa *.owner* para verificar el staff oficial.

🌟 Si te gusta el bot, puedes visitar el repositorio y dejar una estrella.
${global.md || 'https://github.com/fedelanYTCLUB/Super_Bot'}  
`.trim()

  const imagen = imagen2 || 'https://i.imgur.com/U4BTrvK.jpeg' // Imagen predeterminada si no hay imagen2 definida
  await conn.sendFile(m.chat, imagen, 'reglas.jpg', Reglas, m)
}

handler.help = ['reglas']
handler.tags = ['info']
handler.customPrefix = /^(reglas|reglasbot|uso|usobot|uso del bot|botreglas)$/i
handler.command = new RegExp // No necesario si usas customPrefix
handler.register = true
handler.exp = 70

export default handler
