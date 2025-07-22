import { fbdown} from 'ruhend-scraper' // Asegúrate que fbdown esté exportado

const handler = async (m, { args, conn}) => {
  if (!args[0]) {
    return conn.reply(m.chat, '🚩 Ingresa un link de Facebook.', m)
}

  try {
    await m.react(rwait)
    conn.reply(m.chat, `🕒 *Procesando video de Facebook...*`, m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: args[0],
          mediaType: 1,
          showAdAttribution: true,
          title: packname || 'Facebook Downloader',
          body: dev || '',
          previewType: 0,
          thumbnail: icons || null,
}
}
})

    const res = await fbdown(args[0])
    const result = res.data

    if (!result || result.length === 0) {
      throw new Error('No se encontraron resultados.')
}

    const data = result.find(i => i.resolution === "720p (HD)") || result[0]
    if (!data ||!data.url) {
      throw new Error('No se encontró una resolución adecuada.')
}

    await conn.sendMessage(m.chat, {
      video: { url: data.url},
      caption: '📥 *Video de Facebook Descargado*',
      fileName: 'fb.mp4',
      mimetype: 'video/mp4'
}, { quoted: m})

    await m.react('✅')

} catch (e) {
    await m.react('⚠️')
    conn.reply(m.chat, `🚩 Error al obtener video:\n${e.message}`, m)
}
}

handler.help = ['facebook', 'fb']
handler.tags = ['descargas']
handler.command = ['facebook', 'fb']
handler.cookies = 1
handler.register = true

export default handler
