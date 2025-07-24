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

    // 🧪 Simulación temporal (mock) de datos del grupo/canal
    const mockData = {
      name: 'Dojo Solar',
      size: 54,
      isCommunity: false,
      linkedParent: '1209876543210@g.us',
      restrict: true,
      announce: false,
      isCommunityAnnounce: false,
      joinApprovalMode: true,
      memberAddMode: true,
      participants: [
        { id: '1234567890@s.whatsapp.net', admin: 'admin'},
        { id: '9876543210@s.whatsapp.net', admin: 'superadmin'}
      ]
};

    const nameCommunity = mockData.name;
    const caption = (mockData.participants && mockData.participants.length> 0
? mockData.participants
.filter(u => u.admin === 'admin' || u.admin === 'superadmin')
.map((u, i) => `${i + 1}. @${u.id.split('@')[0]}${u.admin === 'superadmin'? ' (superadmin)': ' (admin)'}`)
.join('\n')
: 'No encontrado') +
    `\n\n🔰 *Usuarios en total:*\n${mockData.size || 'Cantidad no encontrada'}\n\n` +
    `✨ *Información avanzada* ✨\n\n` +
    `🔎 *Comunidad vinculada al grupo:*\n${mockData.isCommunity? 'Este grupo es un chat de avisos': `${mockData.linkedParent? '🆔 ' + mockData.linkedParent: 'Este grupo'} ${nameCommunity}`}\n\n` +
    `⚠️ *Restricciones:* ${mockData.restrict? '✅': '❌'}\n` +
    `📢 *Anuncios:* ${mockData.announce? '✅': '❌'}\n` +
    `🏘️ *¿Es comunidad?:* ${mockData.isCommunity? '✅': '❌'}\n` +
    `📯 *¿Es anuncio de comunidad?:* ${mockData.isCommunityAnnounce? '✅': '❌'}\n` +
    `🤝 *Tiene aprobación de miembros:* ${mockData.joinApprovalMode? '✅': '❌'}\n` +
    `🆕 *Puede agregar miembros futuros:* ${mockData.memberAddMode? '✅': '❌'}\n`;

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
          title: 'Tanjiro_Bot_MD | Inspección de Grupo',
          body: 'Lectura espiritual completada con éxito',
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
