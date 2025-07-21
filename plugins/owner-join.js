const linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner}) => {
  if (!text) {
    return m.reply(`
〘🌸 TanjiroBot - Unión Grupal 🌸〙

📜 Envía un *link válido* para que pueda entrar y proteger el grupo.
`.trim());
}

  let match = text.match(linkRegex);
  if (!match) return m.reply(`⚠️ Link no válido, revisa que esté completo.`);

  let [, code] = match;

  if (isOwner) {
    try {
      let groupId = await conn.groupAcceptInvite(code);
      await m.reply(`✅ TanjiroBot se ha unido al grupo con éxito.`);

      await conn.sendMessage(groupId, {
        text: `
〘🌸 TanjiroBot llegó 🌸〙

🧣 Gracias por invitarme.
Usa *#Menú* para ver mis comandos disponibles.
`.trim()
});

} catch (err) {
      console.error('[ERROR AL UNIRSE]', err);
      let msg = `❌ No pude entrar al grupo.\n`;

      if (err?.message?.includes('not-authorized')) {
        msg += `🔸 Fui expulsado antes.`;
} else if (err?.message?.includes('already joined')) {
        msg += `🔸 Ya estoy dentro.`;
} else if (err?.message?.includes('invalid')) {
        msg += `🔸 El enlace está vencido o es inválido.`;
}

      m.reply(msg.trim());
}

} else {
    let mensaje = `
📨 Enlace de grupo recibido:
${text}

🧣 Enviado por: @${m.sender.split('@')[0]}
`;

    await conn.sendMessage(`${suittag}@s.whatsapp.net`, {
      text: mensaje,
      mentions: [m.sender]
}, { quoted: m});

    m.reply(`🌸 Gracias por tu invitación. El cazador supremo lo ha recibido.`);
}
};

handler.help = ['invite'];
handler.tags = ['owner', 'tools'];
handler.command = ['invite', 'join'];
handler.rowner = true;

export default handler;
