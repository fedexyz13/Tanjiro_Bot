import fetch from 'node-fetch';

// 🧣 Canal oficial del Dojo
const channelRD = {
  id: '120363402097425674@newsletter',
  name: '会 Tanjiro_Bot 🧣'
};

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin}) => {
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const type = command.toLowerCase();
  let isAll = false;
  let isEnable = chat[type] || false;

  const toggle = args[0];
  if (toggle === 'on' || toggle === 'enable') {
    isEnable = true;
} else if (toggle === 'off' || toggle === 'disable') {
    isEnable = false;
} else {
    const estado = isEnable? '🟢 ACTIVADO': '🔴 DESACTIVADO';
    return conn.sendMessage(m.chat, {
      text: `
╭──── ⚙️ *TanjiroBot - Técnica Espiritual* ────╮
│ 🌕 *Técnica:* ${type}
│ 📜 *Estado actual:* ${estado}
│ 🧩 Usa:
│ ┣ ${usedPrefix}${command} on
│ ┗ ${usedPrefix}${command} off
╰────────────────────────────────────────────╯`.trim(),
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 712,
          newsletterName: channelRD.name
}
}
}, { quoted: m});
}

  const requireAdmin =!m.isGroup || isOwner || isAdmin;

  const updateSetting = (scope, key) => {
    if (!requireAdmin) throw '⚠️ Solo un pilar puede modificar esta técnica.';
    scope[key] = isEnable;
};

  switch (type) {
    case 'welcome':
    case 'bv':
    case 'bienvenida':
      updateSetting(chat, 'welcome');
      break;
    case 'antisubbots':
    case 'antisub':
    case 'antisubot':
    case 'antibot2':
      updateSetting(chat, 'antiBot2');
      break;
    case 'modoadmin':
    case 'soloadmin':
      updateSetting(chat, 'modoadmin');
      break;
    case 'reaction':
    case 'reaccion':
    case 'emojis':
      updateSetting(chat, 'reaction');
      break;
    case 'nsfw':
    case 'nsfwhot':
    case 'nsfwhorny':
      updateSetting(chat, 'nsfw');
      break;
    case 'jadibotmd':
    case 'modejadibot':
      isAll = true;
      if (!isOwner) throw '⚠️ Solo el maestro del dojo puede usar esta técnica.';
      bot.jadibotmd = isEnable;
      break;
    case 'detect':
    case 'avisos':
      updateSetting(chat, 'detect');
      break;
    case 'detect2':
    case 'eventos':
      updateSetting(chat, 'detect2');
      break;
    case 'antilink':
      updateSetting(chat, 'antiLink');
      break;
    case 'antilink2':
      updateSetting(chat, 'antiLink2');
      break;
    default:
      return conn.reply(m.chat, '🥋 Técnica desconocida. Revisa el pergamino del dojo.', m);
}

  chat[type] = isEnable;

  const mensaje = `
🧣 *Técnica Aplicada: ${type}*
━━━━━━━━━━━━━━━━━━━━━━
🎛 Estado: ${isEnable? 'ACTIVADO': 'DESACTIVADO'}
${isAll? '🌐 Aplicación global al alma del bot.': '👥 Técnica usada solo en este grupo.'}
━━━━━━━━━━━━━━━━━━━━━━
🌅 Que el aliento solar te acompañe.
`.trim();

  conn.sendMessage(m.chat, {
    text: mensaje,
    contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: 713,
        newsletterName: channelRD.name
}
}
}, { quoted: m});
};

handler.help = [
  'welcome','bv','bienvenida','antisubbots','antisub','antisubot','antibot2',
  'modoadmin','soloadmin','reaction','reaccion','emojis','nsfw','nsfwhot',
  'nsfwhorny','jadibotmd','modejadibot','detect','avisos','detect2','eventos',
  'antilink','antilink2'
];
handler.tags = ['group', 'settings'];
handler.command = handler.help;
handler.register = true;

export default handler;
