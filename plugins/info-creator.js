import fetch from 'node-fetch';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: 'Canal Oficial del Proyecto'
};

let handler = async (m, { conn}) => {
  const contacto = '+5491156178758';
  const nombre = 'Bot Oficial | Creador';

  const mensaje = `
📇 *Información de contacto*

Este es el número oficial del creador del bot.
Si deseas agregar el bot a tu grupo o realizar una consulta, puedes escribirle directamente.

👤 Creador: ${nombre}
📞 Número: ${contacto}
🔗 Enlace directo: https://wa.me/${contacto.replace('+', '')}

Por favor, solo escribe si el mensaje es importante.
`.trim();

  try {
    const res = await fetch("https://files.catbox.moe/wav09n.jpg");
    const buffer = await res.buffer();

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: mensaje,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        businessMessageForwardedFrom: nombre,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
}
}
}, { quoted: m});

} catch (e) {
    console.error('[❌] Error al enviar el contacto:', e);
    await m.reply('🚫 No se pudo enviar el contacto en este momento. Intenta más tarde.');
}
};

handler.command = ['creador', 'creator', 'contacto'];
handler.help = ['creador', 'owner'];
handler.tags = ['main'];
export default handler;
