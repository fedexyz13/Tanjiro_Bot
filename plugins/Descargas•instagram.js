import { igdl} from 'ruhend-scraper'

let handler = async (m, { args, conn}) => {
  if (!args[0]) {
    return conn.reply(m.chat, '🚩 Ingresa un link de Instagram.', m)
}

  try {
    await m.react('🕒')

    conn.reply(m.chat, `🕒 *Procesando el enlace de Instagram...*`, m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: args[0],
          mediaType: 1,
          showAdAttribution: true,
          title: packname || 'Instagram Downloader',
          body: dev || '',
          previewType: 0,
          thumbnail: icons || null,
          sourceUrl: channel || ''
}
}
})

    let res = await igdl(args[0])
    if (!res ||!res.data || res.data.length === 0) {
      throw new Error('No se encontraron archivos para descargar.')
}

    for (let media of res.data) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      await conn.sendFile(m.chat, media.url, 'instagram.mp4', '📥 *Contenido descargado desde Instagram.*', m)
}

    await m.react('✅')

} catch (e) {
    await m.react('⚠️')
    conn.reply(m.chat, `🚩 Error al procesar el enlace:\n${e.message}`, m)
}
}

handler.command = ['instagram', 'ig']
handler.tags = ['descargas']
handler.help = ['instagram', 'ig']
handler.cookies = 1
handler.register = true

export default handler
