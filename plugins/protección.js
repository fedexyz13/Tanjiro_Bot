export async function before(m, { conn}) {
  if (!m.isGroup &&!m.chat.endsWith('@s.whatsapp.net')) return;

  // Prefijos asociados a países árabes
  const prefijosArabes = [
    '+20', '+212', '+213', '+216', '+218',
    '+971', '+966', '+973', '+974', '+968',
    '+965', '+961', '+962', '+964', '+963',
    '+970', '+972'
  ];

  const senderNumber = m.sender?.split('@')[0] || '';
  const prefijo = '+' + senderNumber.slice(0, senderNumber.length - 7); // Ajuste por cantidad de dígitos

  if (prefijosArabes.some(p => senderNumber.startsWith(p))) {
    // Bloqueo inmediato, sin permitir ejecución de comandos
    if (m.isGroup) {
      await conn.reply(m.chat, `
〘🚫 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 - Protección absoluta 🚫〙

⚠️ El número *${senderNumber}* está bloqueado por prefijo restringido.
🧣 Acceso al bot denegado automáticamente.
`, m);

      // Expulsar si es grupo y el bot tiene permisos
      try {
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
} catch (e) {
        // Bot no admin o expulsión fallida
}
} else {
      await conn.reply(m.chat, `
〘🚫 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 - Bloqueo espiritual 🚫〙

⚠️ Este número está restringido y no puede usar el bot.
🧣 Energía cortada por protección automática.
`, m);
}

    // Impide ejecución de cualquier comando
    throw false;
}
}
