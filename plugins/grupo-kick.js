var handler = async (m, { conn, participants, args}) => {
  const emblema = '〘🌸 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 - 𝖤𝗑𝗉𝗎𝗅𝗌𝗂𝗈́𝗇 𝖢𝖺𝗓𝖺𝖽𝗈𝗋𝖾𝗌 🌸〙';

  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = global.owner[0][0] + '@s.whatsapp.net';

  let usersToKick = m.mentionedJid || [];

  // Agregar citado si no está incluido
  if (m.quoted &&!usersToKick.includes(m.quoted.sender)) {
    usersToKick.push(m.quoted.sender);
}

  // Detectar por prefijo (+54, +52...)
  const prefix = args[0]?.startsWith('+')? args[0].replace(/\D/g, ''): null;
  if (prefix) {
    for (let user of participants) {
      const number = user.id.split('@')[0];
      if (number.startsWith(prefix) &&!usersToKick.includes(user.id)) {
        usersToKick.push(user.id);
}
}
}

  if (!usersToKick.length) {
    return conn.reply(
      m.chat,
      `${emblema}\n\n🧣 Menciona a alguien, responde un mensaje o usa un prefijo como *+54* para expulsar.`,
      m
);
}

  let kicked = [];
  let notAllowed = [];

  for (let user of usersToKick) {
    if (user === conn.user.jid) {
      notAllowed.push('🤖 No puedo cortarme a mí mismo.');
      continue;
}
    if (user === ownerGroup) {
      notAllowed.push('👑 No puedo expulsar al dueño del grupo.');
      continue;
}
    if (user === ownerBot) {
      notAllowed.push('🧑‍💻 El creador está bajo protección espiritual.');
      continue;
}

    try {
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
            kicked.push(user);
        } catch (e) {
            notAllowed.push(`⚠️ No se pudo expulsar a @${user.split('@')[0]}`);
        }
    }

    let text = `${pikachu} ¡Pika Pika! Expulsión completada.\n\n`;

    if (kicked.length) {
        text += `🧨 Expulsados:\n` + kicked.map(u => `@${u.split('@')[0]}`).join('\n') + '\n\n';
    }
    if (notAllowed.length) {
        text += `❌ No expulsados:\n` + notAllowed.join('\n');
    }

    conn.reply(m.chat, text, m, { mentions: usersToKick });
};

handler.help = ['kick'];
handler.tags = ['grupo'];
handler.command = ['kick','echar','hechar','sacar','ban'];
handler.admin = true;
handler.group = true;
handler.register = true;
handler.botAdmin = true;

export default handler;
