// 🗡️ Control espiritual del flujo Nichirin — Tanjiro Edition v2
// 🌸 Adaptado por Angel para una experiencia inmersiva

let handler = async (m, { conn, usedPrefix, command, args}) => {
  if (!(m.chat in global.db.data.chats)) {
    return conn.reply(m.chat, '❌ *⛩️ Este grupo no ha sido bendecido por la Respiración del Sol.*\n🌕 Tanjiro no puede combatir aquí.', m);
}

  let chat = global.db.data.chats[m.chat];

  if (command === 'pikachu') {
    const estado = chat.isBanned? '🔒 *Sellado*': '🔓 *Activo*';

    if (args.length === 0) {
      const texto = `
╭━┯━[ ⚔️ Control Espiritual • Nichirin ]━┯━╮
│ 🌀 *Tanjiro Kamado - Guardián del Sol*
│
│ 📜 *Comandos de canalización:*
│   🔥 *${usedPrefix}pikachu on* — Activar flujo vital
│   🌑 *${usedPrefix}pikachu off* — Sellar poder espiritual
│
│ 📡 *Estado actual del grupo:* ${estado}
│ 🧭 *Protección Hashira:* ${chat.isBanned? '❌ Desactivada': '✅ Vigente'}
╰━┷━━━━━━━━━━━━━━━━━━━━━━━━━━┷━╯`.trim();

      return conn.reply(m.chat, texto, m);
}

    if (args[0] === 'off') {
      if (chat.isBanned) {
        return conn.reply(m.chat, '🌑 *La energía espiritual ya ha sido sellada aquí.*\n🕯️ Tanjiro continúa su meditación.', m);
}

      chat.isBanned = true;
      return conn.reply(m.chat, '🔒 *Tanjiro ha sellado el poder espiritual de este grupo.*\n⛩️ La katana descansa por ahora.', m);
}

    if (args[0] === 'on') {
      if (!chat.isBanned) {
        return conn.reply(m.chat, '⚡ *El flujo espiritual ya está activo.*\n🍃 Tanjiro vigila desde la cima del monte Fujikasane.', m);
}

      chat.isBanned = false;
      return conn.reply(m.chat, '🔓 *La llama del espíritu ha sido reencendida.*\n🔥 El poder de Nichirin fluye nuevamente en este grupo.', m);
}
}
};

handler.help = ['tanjiro'];
handler.tags = ['grupo'];
handler.command = ['tanjiro'];
handler.admin = true;

export default handler;
