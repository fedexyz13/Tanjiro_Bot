import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) return m.reply(`🌙 Ingresa un texto para buscar en TikTok\n> *Ejemplo:* ${usedPrefix + command} Tanjiro Edits`)

  try {
    let api = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent(text)}`
    let response = await fetch(api)
    let json = await response.json()

    if (!json.meta || json.meta.length === 0) {
      return m.reply('❌ No se encontraron resultados para tu búsqueda.')
}

    m.react('🔍')

    // Limita a máximo 5 resultados
    let resultados = json.meta.slice(0, 5)

    for (let i = 0; i < resultados.length; i++) {
      let meta = resultados[i]

      let mensaje = `🎬 *Resultado #${i + 1}*\n\n` +
        `📌 *Título:* ${meta.title}\n` +
        `❤️ *Likes:* ${meta.like}\n` +
        `💬 *Comentarios:* ${meta.coment}\n` +
        `🔄 *Compartidas:* ${meta.share}\n` +
        `🌐 *Enlace:* ${meta.url}`

      // Envía texto con enlace primero
      await conn.sendMessage(m.chat, { text: mensaje}, { quoted: m})

      // Luego envía el video
      await conn.sendMessage(m.chat, {
        video: { url: meta.url},
        caption: `📥 *TikTok Video #${i + 1}*`,
}, { quoted: m})
}

    m.react('✅')
} catch (e) {
    m.reply(`❎ Error: ${e.message}`)
    m.react('✖️')
}
}

handler.help = ['tiktoksearch', 'tiktoks']
handler.tags = ['buscador']
handler.command = ['tiktoksearch', 'ttsearch']

export default handler
