import axios from 'axios';

const handler = async (m, { isOwner, isAdmin, conn, args, usedPrefix, participants}) => {
  if (usedPrefix.toLowerCase() === 'a') return;

  const emote = global.db?.data?.chats?.[m.chat]?.customEmoji || '🍃';
  await m.react(emote);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    return;
}

  const mensaje = args.join(' ');
  const grupoNombre = await conn.getName(m.chat);

  let texto = `
⛩️ *Invocación Tanjiro — Respiración del Sol* ⛩️
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌀 *Grupo:* ${grupoNombre}
👤 *Total de cazadores:* ${participants.length}
📜 *Tanjiro dice:* ${mensaje || '“Nuestro vínculo es más fuerte que cualquier oscuridad.”'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

  for (const miembro of participants) {
    const numero = miembro.id.split('@')[0];
    let bandera = '🌐';

    try {
      const res = await axios.get(`https://g-mini-ia.vercel.app/api/infonumero?numero=${numero}`);
      bandera = res.data.bandera || '🌐';
} catch (e) {
      console.log(`❌ Error obteniendo bandera para ${numero}:`, e.message);
}

    texto += `⚔️ ${bandera} @${numero}\n`;
}

  texto += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌸 *Tanjiro Kamado:* Gracias por responder al llamado.
🔥 *Respira. Pelea. Protége.*`;

  conn.sendMessage(m.chat, {
    text: texto.trim(),
    mentions: participants.map(p => p.id),
}, { quoted: m});
};

handler.help = ['todos <mensaje>'];
handler.tags = ['grupo'];
handler.command = ['tagall', 'todos'];
handler.register = true;
handler.admin = true;
handler.group = true;

export default handler;
