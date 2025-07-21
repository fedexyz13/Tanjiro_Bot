const linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner}) => {
  if (!text) {
    return m.reply(`
🌙 Tanjiro_Bot - Unirme al grupo 🌙

Envía un *link válido* para que pueda entrar y protegerlo.
`.trim());
}

  let match = text.match(linkRegex);
  if (!match) return m.reply(`⚠️ Link no válido, asegúrate de copiarlo bien.`);

  let [, code] = match;

  if (isOwner) {
    try {
      let groupId = await conn.groupAcceptInvite(code);
      await m.reply(`✅ TanjiroBot ahora es parte del grupo.`);

      await conn.sendMessage(groupId, {
        text: `🌙 Tanjiro_Bot llegó 🌙\n\n🧣 Estoy aquí para cuidar, ayudar y respirar con ustedes.`,
        footer: 'Respira. Avanza. Protege.',
        buttons: [
          {
            buttonId: '#menu',
            buttonText: { displayText: '🌸 Ver comandos'},
            type: 1,
}
        ],
        headerType: 1
});

} catch (err) {
      console.error('[ERROR AL UNIRSE]', err);
      let msg = `❌ No pude entrar al grupo.\n`;

      if (err?.message?.includes('not-authorized')) {
        msg += `🔸 Me expulsaron antes.`;
} else if (err?.message?.includes('already joined')) {
        msg += `🔸 Ya estoy dentro.`;
} else if (err?.message?.includes('invalid')) {
        msg += `🔸 El enlace expiró o no sirve.`;
}

      m.reply(msg.trim());
}

} else {
    let mensaje = `
📨 Link recibido de grupo:
${text}

🧣 Enviado por: @${m.sender.split('@')[0]}
`;

    await conn.sendMessage(`${suittag}@s.whatsapp.net`, {
      text: mensaje,
      mentions: [m.sender]
}, { quoted: m});

    m.reply(`🌸 Gracias por la invitación, se ha enviado al cazador supremo.`);
}
};

handler.help = ['invite'];
handler.tags = ['owner', 'tools'];
handler.command = ['invite', 'join'];
handler.rowner = true;

export default handler;
