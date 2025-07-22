import fetch from 'node-fetch'
import axios from 'axios' // Asegúrate de tener Axios en tu bot

let handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) return m.reply(`🌙 Ingresa un texto para buscar en TikTok\n> *Ejemplo:* ${usedPrefix + command} Tanjiro Edits`)

  try {
    const api = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent(text)}`
    const res = await fetch(api)
    const json = await res.json()

    if (!json.meta || json.meta.length === 0) {
      return m.reply('❌ No se encontraron resultados para tu búsqueda.')
}

    m.react('🔍')

    const resultados = json.meta.slice(0, 5)

    for (let i = 0; i < resultados.length; i++) {
      const meta = resultados[i]
      const caption = `🎬 *TikTok #${i + 1}*\n📝 *Título:* ${meta.title}\n❤️ *Likes:* ${meta.like}\n💬 *Comentarios:* ${meta.coment}\n🔄 *Compartidas:* ${meta.share}`

      // Descarga el archivo MP4
      const videoBuffer = await axios.get(meta.url, {
        responseType: 'arraybuffer',
})

      await conn.sendMessage(m.chat, {
        video: videoBuffer.data,
        caption,
        mimetype: 'video/mp4',
}, { quoted: m})
}

    m.react('✅')
} catch (e) {
    m.reply(`❎ Error: No se pudo enviar los videos.\nDetalles: ${e.message}`)
    m.react('⚠️')
}
}

handler.help = ['tiktoksearch']
handler.tags = ['buscador']
handler.command = ['tiktoksearch', 'ttsearch']

export default handler
