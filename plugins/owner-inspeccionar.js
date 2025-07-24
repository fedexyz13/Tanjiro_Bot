import fetch from 'node-fetch';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: 'Canal Oficial del Dojo del Sol 🌄'
};

let handler = async (m, { conn, args, usedPrefix, command}) => {
  if (!args[0]) {
    return conn.reply(m.chat, `
⚠️ *Enlace faltante*

📎 Por favor, proporciona la URL del grupo o canal que deseas inspeccionar.

📌 Ejemplo:
${usedPrefix + command} https://chat.whatsapp.com/XYZ123abcDEF
`, m);
}

  const url = args[0];
  try {
    await m.react('🕵️');

    const res = await fetch(`https://api-inspeccion.dominio.com/scan?url=${encodeURIComponent(url)}`);
    const info = await res.json();
    const nameCommunity = info.name || '';
    const caption = (info.participants && info.participants.length> 0
? info.participants
.filter(u => u.admin === 'admin' || u.admin === 'superadmin')
.map((u, i) => `${i + 1}. @${u.id?.split('@')[0]}${u.admin === 'superadmin'? ' (superadmin)': ' (admin)'}`)
.join('\n')
: 'No encontrado') +
    `\n\n🔰 *Usuarios en total:*\n${info.size || 'Cantidad no encontrada'}\n\n` +
    `✨ *Información avanzada* ✨\n\n` +
    `🔎 *Comunidad vinculada al grupo:*\n${info.isCommunity? 'Este grupo es un chat de avisos': `${info.linkedParent? '🆔 ' + info.linkedParent: 'Este grupo'} ${nameCommunity}`}\n\n` +
    `⚠️ *Restricciones:* ${info.restrict? '✅': '❌'}\n` +
    `📢 *Anuncios:* ${info.announce? '✅': '❌'}\n` +
    `🏘️ *¿Es comunidad?:* ${info.isCommunity? '✅': '❌'}\n` +
    `📯 *¿Es anuncio de comunidad?:* ${info.isCommunityAnnounce? '✅': '❌'}\n` +
    `🤝 *Tiene aprobación de miembros:* ${info.joinApprovalMode? '✅': '❌'}\n` +
    `🆕 *Puede agregar miembros futuros:* ${info.memberAddMode? '✅': '❌'}\n`;

    const decorado = caption.trim()
.replace(/Id/g, '🆔 Identificador')
.replace(/State/g, '📌 Estado')
.replace(/Creation Time/g, '📅 Fecha de creación')
.replace(/Name Time/g, '✏️ Fecha de modificación del nombre')
.replace(/Name/g, '🏷️ Nombre')
.replace(/Description Time/g, '📝 Fecha de modificación de la descripción')
.replace(/Description/g, '📜 Descripción')
.replace(/Invite/g, '📩 Invitación')
.replace(/Handle/g, '👤 Alias')
.replace(/Picture/g, '🖼️ Imagen')
.replace(/Preview/g, '👀 Vista previa')
.replace(/Reaction Codes/g, '😃 Reacciones')
.replace(/Subscribers/g, '👥 Suscriptores')
.replace(/Verification/g, '✅ Verificación')
.replace(/Viewer Metadata/g, '🔍 Datos avanzados');

    await conn.sendMessage(m.chat, {
      text: decorado,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
},
        externalAdReply: {
          title: 'Tanjiro_Bot_MD | Inspección Avanzada',
          body: 'Análisis completo de grupo o canal realizado',
          thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
          sourceUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
}
}
}, { quoted: m});

    await m.react('✅');

} catch (e) {
    await m.react('❌');
    conn.reply(m.chat, `❎ Ocurrió un error al inspeccionar:\n${e.message}`, m);
}
};

handler.command = ['inspeccionar', 'scan', 'grupoinfo', 'canalinfo'];
handler.tags = ['info'];
handler.help = ['inspeccionar <url del grupo o canal>'];
handler.register = true;

export default handler;
