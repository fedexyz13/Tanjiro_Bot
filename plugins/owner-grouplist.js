const channelRD = {
  id: '120363402097425674@newsletter',
  name: '会 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 🧣'
};

const handler = async (m, { conn}) => {
  let txt = '';
  try {
    const groups = Object.entries(conn.chats).filter(
      ([jid, chat]) => jid.endsWith('@g.us') && chat.isChats
);
    const totalGroups = groups.length;

    for (let i = 0; i < totalGroups; i++) {
      const [jid] = groups[i];
      const metadata =
        ((conn.chats[jid] || {}).metadata ||
          (await conn.groupMetadata(jid).catch(() => null))) ||
        {};
      const participants = metadata.participants || [];
      const bot = participants.find(
        (u) => conn.decodeJid(u.id) === conn.user.jid
) || {};
      const isBotAdmin = bot?.admin || false;
      const isParticipant = participants.some(
        (u) => conn.decodeJid(u.id) === conn.user.jid
);
      const participantStatus = isParticipant? '🟢 Participante': '🔴 Ex-participante';
      const totalParticipants = participants.length;
      const groupName = metadata.subject || (await conn.getName(jid));
      const groupLink = isBotAdmin
? `🔗 https://chat.whatsapp.com/${await conn.groupInviteCode(jid).catch(() => '') || 'Error'}`
: '⚠️ (No disponible: sin permisos de admin)';

      txt += `
╭─『🌸 Grupo ${i + 1}』
│ 🏷️ *Nombre:* ${groupName}
│ 🆔 *ID:* ${jid}
│ 👤 *Admin:* ${isBotAdmin? 'Sí': 'No'}
│ 📍 *Estado:* ${participantStatus}
│ 👥 *Participantes:* ${totalParticipants}
│ 📎 *Link:* ${groupLink}
╰───────────────⬣\n`;
}

    await conn.sendMessage(
      m.chat,
      {
        text: `📜 *Tanjiro_Bot_MD | Panel Espiritual de Grupos*\n\n🌐 *Total:* ${totalGroups} grupos encontrados\n${txt}`,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            serverMessageId: 400,
            newsletterName: channelRD.name
}
}
},
      { quoted: m}
);
} catch (e) {
    console.error('[❌] Error al listar grupos:', e);
    let fallback = '';
    const groups = Object.entries(conn.chats).filter(
      ([jid, chat]) => jid.endsWith('@g.us') && chat.isChats
);
    const totalGroups = groups.length;

    for (let i = 0; i < totalGroups; i++) {
      const [jid] = groups[i];
      const metadata =
        ((conn.chats[jid] || {}).metadata ||
          (await conn.groupMetadata(jid).catch(() => null))) ||
        {};
      const participants = metadata.participants || [];
      const bot = participants.find(
        (u) => conn.decodeJid(u.id) === conn.user.jid
) || {};
      const isBotAdmin = bot?.admin || false;
      const isParticipant = participants.some(
        (u) => conn.decodeJid(u.id) === conn.user.jid
);
      const participantStatus = isParticipant? '🟢 Participante': '🔴 Ex-participante';
      const totalParticipants = participants.length;
      const groupName = metadata.subject || (await conn.getName(jid));

      fallback += `
╭─『🌸 Grupo ${i + 1}』
│ 🏷️ *Nombre:* ${groupName}
│ 🆔 *ID:* ${jid}
│ 👤 *Admin:* ${isBotAdmin? 'Sí': 'No'}
│ 📍 *Estado:* ${participantStatus}
│ 👥 *Participantes:* ${totalParticipants}
│ 📎 *Link:* ⚠️ No disponible
╰───────────────⬣\n`;
}

    await conn.sendMessage(
      m.chat,
      {
        text: `📜 *Tanjiro_Bot_MD | Panel Espiritual de Grupos*\n\n🌐 *Total:* ${totalGroups} grupos encontrados\n${fallback}`,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            serverMessageId: 401,
            newsletterName: channelRD.name
}
}
},
      { quoted: m}
);
}
};
handler.help = ['groups', 'grouplist'];
handler.tags = ['owner'];
handler.command = ['listgroup', 'gruposlista', 'grouplist', 'listagrupos'];
handler.rowner = true;

export default handler;
