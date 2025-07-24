import fetch from 'node-fetch';

let handler = async (m, { conn}) => {
  let contacto = '+5491156178758'; // Número del maestro creador
  let nombreDojo = 'Tanjiro_Bot_MD | Creador Oficial';

  let mensaje = `
🌄 *Contacto del Creador de Tanjiro_Bot_MD* ⚔️

📜 Bienvenido, joven cazador.
Si deseas integrar Tanjiro_Bot_MD a tu grupo, hablar con el maestro o colaborar con el Dojo del Sol, este es el contacto oficial.

👤 *Nombre del dojo:* ${nombreDojo}
📞 *Número directo:* ${contacto}
🔗 Enlace: https://wa.me/${contacto.replace('+', '')}

📝 Manda mensaje solo si es digno de atención.
`.trim();

  try {
    const res = await fetch("https://files.catbox.moe/wav09n.jpg"); // Imagen estilo Tanjiro
    const buffer = await res.buffer();

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: mensaje,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        businessMessageForwardedFrom: 'TanjiroBot_MD Creador Oficial'
}
}, { quoted: m});

} catch (e) {
    console.error('[❌] Error al enviar contacto del dojo:', e);
    m.reply('🚫 El maestro está meditando. Intenta más tarde.');
}
};

handler.command = ['creador', 'creator', 'contacto'];
handler.help = ['creador'];
handler.tags = ['main'];
export default handler;
