let handler = async (m, { conn, participants, isGroup}) => {
  if (!isGroup) return; // Solo funciona en grupos

  let texto = m.text.trim();
  if (!texto.startsWith('@')) return; // Solo responde si empieza con "@"

  let mensaje = texto.slice(1).trim(); // Extrae el texto después del "@"

  // Filtra solo los números válidos del grupo
  const mention = participants
.filter(p => p.id.endsWith('@s.whatsapp.net'))
.map(p => p.id);

  conn.sendMessage(m.chat, {
    text: mensaje,
    mentions: mention
}, { quoted: m});
};

handler.command = /^@.+/i; // Coincide con cualquier texto que empiece con "@"
handler.group = true;
handler.register = true;

export default handler;
