let handler = async (m, { conn, args}) => {
  const isActive = global.db.data.chats[m.chat]?.antiArabe;

  if (isActive) {
    return m.reply(`
〘🌸 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 - Protección ya activa 🌸〙

🧣 El modo espiritual *antiArabe* ya está encendido.
`.trim());
}

  global.db.data.chats[m.chat].antiArabe = true;

  m.reply(`
〘🌸 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 - Activación completada 🌸〙

⚔️ Respiración solar activada.
🛡️ Modo *antiArabe* habilitado con éxito.
`.trim());
};

handler.help = ['onarabe'];
handler.tags = ['protección', 'admin'];
handler.command = ['onarabe'];
handler.group = true;
handler.admin = true;
handler.register = true;

export default handler;
