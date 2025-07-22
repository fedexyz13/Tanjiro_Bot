let handler = async (m, { conn, usedPrefix, command, args}) => {
  if (!(m.chat in global.db.data.chats)) {
    return conn.reply(m.chat, '❌ *⛩️ Este grupo no está vinculado a la energía Nichirin.*\n🌸 Tanjiro no puede activar su poder aquí.', m);
}

  let chat = global.db.data.chats[m.chat];

  if (command === 'tanjiro') {
    const estadoActual = chat.isBanned? '🪫 *Tanjiro se encuentra en meditación espiritual.*': '⚡ *Tanjiro está despierto y listo para guiar.*';

    if (args.length === 0) {
      const texto = `
╭━[ ⚔️ *Centro de Control Hashira* ]━╮
│ 🌸 *Tanjiro Kamado: Guardián del Sol*
│
│ 🔮 *Canaliza el poder con:*
│   ✧ *${usedPrefix}tanjiro on* — Activar flujo espiritual
│   ✧ *${usedPrefix}tanjiro off* — Sellar energía
│
│ 📡 Estado del grupo: ${estadoActual}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`.trim();

      return conn.reply(m.chat, texto, m);
}

    if (args[0] === 'off') {
      if (chat.isBanned) {
        return conn.reply(m.chat, '🪷 *La energía de Tanjiro ya estaba sellada en este grupo.*\n🕯️ El viento sopla en calma.', m);
}

      chat.isBanned = true;
      return conn.reply(m.chat, '🔒 *El poder de Tanjiro ha sido sellado.*\n⛩️ Este grupo entra en reposo espiritual.', m);
}

    if (args[0] === 'on') {
      if (!chat.isBanned) {
        return conn.reply(m.chat, '⚡ *Tanjiro ya estaba presente con energía vital.*\n🍃 El flujo de la respiración ya circula en este grupo.', m);
}

      chat.isBanned = false;
      return conn.reply(m.chat, '🔥 *Tanjiro se ha reactivado.*\n⚔️ El poder espiritual fluye. ¡Protege a los tuyos!', m);
}
}
};

handler.help = ['tanjiro'];
handler.tags = ['grupo'];
handler.command = ['tanjiro'];
handler.admin = true;

export default handler;
