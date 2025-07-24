const channelRD = {
  id: '120363402097425674@newsletter',
  name: 'Canal Oficial del Dojo del Sol 🌄'
};

let handler = async (m, { conn, args, usedPrefix, command}) => {
  if (!args[0]) {
    return conn.reply(m.chat, `
📌 *Falta el enlace a inspeccionar*

Por favor, proporciona un link de grupo o canal de WhatsApp.

📎 Ejemplo:
${usedPrefix + command} https://chat.whatsapp.com/XYZabc123
${usedPrefix + command} https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
`, m);
}

  let link = args[0];
  await m.react('🧭');

  try {
    // Detecta si el enlace es de grupo o canal
    if (link.includes('chat.whatsapp.com')) {
      const chatID = link.split('/').pop().trim();
      const id = await conn.groupAcceptInvite(chatID); // Este método no une al grupo si se usa correctamente

      const metadata = await conn.groupMetadata(id);

      const admins = metadata.participants
.filter(u => u.admin === 'admin' || u.admin === 'superadmin')
.map((u, i) => `${i + 1}. @${u.id.split('@')[0]}${u.admin === 'superadmin'? ' (superadmin)': ' (admin)'}`)
.join('\n');

      const caption = `
🏘️ *Inspección del Grupo*

🆔 ID del grupo:
${id}

🏷️ Nombre: ${metadata.subject}
👤 Participantes: ${metadata.participants.length}

🔧 Administradores:
${admins || 'No se encontraron administradores'}

🌐 Configuraciones:
📢 Anuncios: ${metadata.announce? '✅ Activado': '❌ Desactivado'}
🔒 Restricciones: ${metadata.restrict? '✅': '❌'}
🤝 Aprobación de miembros: ${metadata.joinApprovalMode? '✅': '❌'}
📩 Invitación: https://chat.whatsapp.com/${chatID}
`;

      await conn.sendMessage(m.chat, {
        text: caption,
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
            title: 'Tanjiro_Bot_MD | Grupo inspeccionado',
            body: metadata.subject,
            thumbnailUrl: metadata.pictureUrl || 'https://files.catbox.moe/wav09n.jpg',
            sourceUrl: link,
            mediaType: 1,
            renderLargerThumbnail: true
}
}
}, { quoted: m});
}

    else if (link.includes('whatsapp.com/channel/')) {
      const channelID = link.split('/').pop().trim() + '@newsletter';

      const info = await conn.channelMetadata(channelID);

      const caption = `
📰 *Inspección de Canal*

🆔 ID del canal:
${channelID}

🏷️ Nombre: ${info.name}
📜 Descripción: ${info.desc || 'Sin descripción'}
👥 Suscriptores: ${info.size || 'Desconocido'}
🖼️ Imagen: ${info.pictureUrl || 'No definida'}

✅ Verificado: ${info.verified? 'Sí': 'No'}
🔗 Enlace directo: https://whatsapp.com/channel/${channelID.split('@')[0]}
`;

      await conn.sendMessage(m.chat, {
        text: caption,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            serverMessageId: 101,
            newsletterName: channelRD.name
},
          externalAdReply: {
            title: 'Tanjiro_Bot_MD | Canal inspeccionado',
            body: info.name,
            thumbnailUrl: info.pictureUrl || 'https://files.catbox.moe/wav09n.jpg',
            sourceUrl: link,
            mediaType: 1,
            renderLargerThumbnail: true
}
}
}, { quoted: m});
}

    else {
      throw new Error('Enlace desconocido. Debe ser de grupo o canal.');
}

    await m.react('✅');

} catch (e) {
    await m.react('❌');
    conn.reply(m.chat, `❎ Error al inspeccionar:\n${e.message}`, m);
}
};

handler.command = ['inspeccionar', 'scaninfo', 'infobot'];
handler.tags = ['info'];
handler.help = ['inspeccionar <link grupo/canal>'];
handler.register = true;

export default handler;
