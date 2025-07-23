import moment from 'moment-timezone';

const handler = async (m, { text, command, conn}) => {
  const user = m.sender;
  const args = text.trim().split(/ +/);
  const nombre = args[0];
  const edad = args[1];
  const fecha = moment().tz('America/Guatemala').format('DD/MM/YYYY');

  if (!nombre ||!edad) {
    return conn.reply(m.chat, `
🌄 *Registro de Respiración - Tanjiro_Bot_MD* ⚔️

🧭 Para canalizar tu energía correctamente, necesitas presentarte ante el maestro.

📖 *Registro Rápido de Cazador:*
╭─「⚔️」
│ 🌀 Activación del sello espiritual
│ 💠 Acceso básico a técnicas del dojo
╰────────────

📝 Usa: *#reg nombre.edad*

📜 *El registro es un pacto temporal. No lo ignores.*
`, m);
}

  // Registrar usuario en base de datos
  const data = global.db.data.users[user] || {}
  data.registered = true
  data.name = nombre
  data.age = edad
  data.premium = true
  data.regTime = Date.now()

  // Enviar mensaje de confirmación tipo "ver canal"
  const mensaje = `✅ *REGISTRO EXITOSO, MAESTRO*\n\n👤 *Nombre:* ${nombre}\n🎂 *Edad:* ${edad} años\n📆 *Registrado el:* ${fecha}\n\n🎖️ *Ya puedes usar los comandos premium.*`

  return conn.reply(m.chat, mensaje, m, {
    contextInfo: {
      externalAdReply: {
        title: '✅ Registro Completado',
        body: 'Ahora puedes usar todos los comandos',
        mediaType: 1,
        thumbnailUrl: 'https://files.catbox.moe/mr8c64.jpg',
        renderLargerThumbnail: true,
        sourceUrl: 'https://whatsapp.com/channel/0029VbAfd7zDDmFXm5adcF31'
      }
    }
  })
}

handler.command = ['verificar', 'reg'];
handler.help = ['verificar', 'reg']
handler.tags = ['main']
handler.register = false
export default handler
