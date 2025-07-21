import WAMessageStubType from '@whiskeysockets/baileys';

export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.messageStubType ||!m.isGroup) return;

  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Tanjiro"
},
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Tanjiro;Bot;;;\nFN:Respiración\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Katana\nEND:VCARD`
}
},
    participant: "0@s.whatsapp.net"
};

  const chat = global.db.data.chats[m.chat];
  const usuario = `@${m.sender.split`@`[0]}`;
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => null) || 'https://i.imgur.com/S8DZf7o.jpeg';

  const nombre = `
🌸 *¡Cambio de nombre detectado!*
🧑‍🦰 Cazador: *${usuario}*
🔖 Ha tallado un nuevo nombre en la piedra del grupo:

🌟 *「 ${m.messageStubParameters[0]} 」*
📖 Un nuevo capítulo comienza en el viaje demon slayer.
`;

  const foto = `
🖼️ *¡Nuevo emblema grupal!*
🧑‍🦰 Cazador: *${usuario}*
🗡️ Ha impregnado su espíritu en la imagen del grupo *${groupMetadata.subject}*.

💫 El aura ha cambiado... ¡como la respiración solar!
`;

  const edit = `
🔧 *¡Permisos modificados!*
⚙️ Cazador: *${usuario}*

📜 Nuevas reglas del Dojo:
${m.messageStubParameters[0] == 'on'
? '⛩️ Solo los *Pilares (Admins)* pueden alterar el destino del grupo.'
: '🌿 Todos los cazadores pueden intervenir y compartir su poder.'
}
`;

  const newlink = `
🌐 *¡Nuevo portal abierto!*
🧑‍🦰 Cazador: *${usuario}* ha usado *Respiración Corte de Viento* para restablecer el enlace.

🔗 ¡El camino hacia este grupo fue renovado!
🌸 Prepárate para cruzar al siguiente nivel.
`;

  const status = `
📣 *Estado del grupo cambiado*
🔁 Por el cazador: *${usuario}*

📍 Situación actual:
${m.messageStubParameters[0] == 'on'
? '🔒 El grupo está *cerrado* — solo los Pilares pueden hablar.'
: '🔓 El grupo está *abierto* — que todos compartan su respiración.'
}
🗣️ ¡Que la conversación fluya como agua!
`;

  const admingp = `
🎖️ *Ascenso confirmado*
🔥 *@${m.messageStubParameters[0].split`@`[0]}* ha despertado su poder como *Pilar (Admin)*

🤝 Otorgado por: *${usuario}*
🌅 Que su espada se mueva con justicia y honor.
`;

  const noadmingp = `
⚠️ *Descenso detectado*
😿 *@${m.messageStubParameters[0].split`@`[0]}* ha sido liberado de su cargo de *Pilar*

📉 Acción realizada por: *${usuario}*
🍃 El viaje continúa en otra forma.
`;

  // Envío de mensajes según el tipo de evento
  const stub = m.messageStubType;
  const param = m.messageStubParameters?.[0];

  if (!chat.detect) return;

  if (stub === 21) return conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender]}, { quoted: fkontak});
  if (stub === 22) return conn.sendMessage(m.chat, { image: { url: pp}, caption: foto, mentions: [m.sender]}, { quoted: fkontak});
  if (stub === 23) return conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender]}, { quoted: fkontak});
  if (stub === 25) return conn.sendMessage(m.chat, { text: edit, mentions: [m.sender]}, { quoted: fkontak});
  if (stub === 26) return conn.sendMessage(m.chat, { text: status, mentions: [m.sender]}, { quoted: fkontak});
  if (stub === 29) return conn.sendMessage(m.chat, { text: admingp, mentions: [m.sender, param]}, { quoted: fkontak});
  if (stub === 30) return conn.sendMessage(m.chat, { text: noadmingp, mentions: [m.sender, param]}, { quoted: fkontak});

  // Si deseas registrar los tipos, puedes habilitar este log
  // console.log({ messageStubType: stub, messageStubParameters: m.messageStubParameters})
}
