let handler = async (m, { conn}) => {
  const chat = global.db.data.chats[m.chat];
  if (chat.antiArabe) {
    return m.reply(`
〘🌸 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 - Protección activa 🌸〙

🧣 El modo *antiArabe* ya está encendido en este grupo.
`);
}
  chat.antiArabe = true;
  m.reply(`
〘🌸 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 - Protección activada 🌸〙

⚔️ Respiración solar iniciada.
🛡️ El sistema *antiArabe* está activo.
`);
};

handler.help = ['onarabe'];
handler.tags = ['protección'];
handler.command = ['onarabe'];
handler.group = true;
handler.admin = true;
handler.register = true;

export default handler;
