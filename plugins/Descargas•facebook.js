import { fbdown} from 'ruhend-scraper'; // Asegúrate que esta función exista

const handler = async (m, { text, conn, args, usedPrefix, command}) => {
  if (!args[0]) {
    return conn.reply(m.chat, '*🚩 Ingresa el enlace del video de Facebook.*\n> De preferencia que sea público o tipo Reel.', m)
}

  await m.react('🕒')
  let res

  try {
    res = await fbdown(args[0]) // Asegúrate que la función fbdown sea válida
} catch (error) {
    await m.react('❌')
    return conn.reply(m.chat, `🚩 *Error al obtener datos del enlace.*\n> Verifica que el link sea válido.\nDetalles: ${error.message}`, m)
}

  let result = res?.data
  if (!result || result.length === 0) {
    return conn.reply(m.chat, '*🚩 No se encontraron resultados para ese enlace.*', m)
}

  let data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)") || result[0]
  if (!data ||!data.url) {
    return conn.reply(m.chat, '*🚩 No se encontró una resolución compatible.*', m)
}

  await m.react('📡')
  let video = data.url

  try {
    await conn.sendMessage(m.chat, {
      video: { url: video},
      caption: '《★》 *Descargado con éxito desde Facebook ✓*',
      fileName: 'fb.mp4',
      mimetype: 'video/mp4'
}, { quoted: m})

    await m.react('✅')

} catch (error) {
    await m.react('❌')

    let espacio = error.message.includes('ENOSPC')
? '*❌ Error: El bot se quedó sin espacio de almacenamiento.*\n🧹 Libera memoria en el servidor o contenedor donde corre el bot.'
: `🚩 *Error al enviar el video.*\n> ${error.message}`

    return conn.reply(m.chat, espacio, m)
}
}

handler.help = ['facebook', 'fb']
handler.tags = ['descargas']
handler.command = /^(fb|facebook|fbdl)$/i
handler.cookies = 1
handler.register = true

export default handler
