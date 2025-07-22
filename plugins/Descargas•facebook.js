import { fbdown} from 'ruhend-scraper'; // Asegúrate que esté disponible

const handler = async (m, { conn, args}) => {
  if (!args[0]) {
    return conn.reply(m.chat, '*🚩 Ingresa el enlace de un video de Facebook.*\n> Asegúrate que sea público o un Reel.', m)
}

  await m.react('🕒')
  let res

  try {
    res = await fbdown(args[0]) // Usar función válida para Facebook
} catch (error) {
    await m.react('❌')
    return conn.reply(m.chat, `🚩 *Error al obtener datos del enlace.*\n> Verifica que el link sea válido.\nDetalles: ${error.message}`, m)
}

  let result = res?.data
  if (!result || result.length === 0) {
    return conn.reply(m.chat, '*🚩 No se encontraron resultados para ese enlace.*', m)
}

  // Selecciona la mejor resolución disponible
  let data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)") || result[0]
  if (!data ||!data.url) {
    return conn.reply(m.chat, '*🚩 No se encontró una resolución compatible.*', m)
}

  const videoUrl = data.url

  try {
    await m.react('📡')

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl}, // ENVÍA desde la URL directamente
      caption: '《★》 *Descargado con éxito desde Facebook ✓*',
      mimetype: 'video/mp4'
}, { quoted: m})

    await m.react('✅')

} catch (error) {
    await m.react('❌')

    const espacioInsuficiente = error.message.includes('ENOSPC')
    const mensaje = espacioInsuficiente
? '*❌ Error: No hay espacio suficiente en el sistema donde se ejecuta el bot.*\n🧹 Libera almacenamiento en el servidor para seguir enviando contenido.'
: `🚩 *Error al enviar el video.*\n> ${error.message}`

    return conn.reply(m.chat, mensaje, m)
}
}

handler.help = ['facebook', 'fb']
handler.tags = ['descargas']
handler.command = /^(fb|facebook|fbdl)$/i
handler.cookies = 1
handler.register = true

export default handler
