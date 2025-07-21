let handler = async (m, { conn, participants}) => {
  if (!m.isGroup) throw '🌪️ Esta técnica solo puede usarse en un grupo.';
  if (!global.owner.includes(m.sender) &&!m.isAdmin) throw '⚠️ Solo un Pilar (admin) puede ejecutar la Ruleta Ban.';

  // Filtra miembros válidos (no el bot ni el creador)
  let miembros = participants
.filter(p =>!p.admin &&!p.id.includes(conn.user.jid))
.map(p => p.id);

  if (miembros.length < 1) throw '🌀 No hay miembros disponibles para sacrificar...';

  let elegido = miembros[Math.floor(Math.random() * miembros.length)];

  await conn.sendMessage(m.chat, {
    text: `🎯 *Ruleta Ban invocada!* Tanjiro giró su katana y eligió a 👉 @${elegido.split('@')[0]}\n\n📤 Será eliminado sin misericordia.`,
    mentions: [elegido]
}, { quoted: m});

  await conn.groupParticipantsUpdate(m.chat, [elegido], 'remove');
};

handler.command = ['ruletaban'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
