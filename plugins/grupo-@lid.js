let handler = async (m, { conn, groupMetadata}) => {
  if (!m.isGroup) return m.reply('❌ *Este comando solo puede ejecutarse en un Dojo grupal.*');

  const participantes = groupMetadata?.participants || [];

  const tarjetas = participantes.map((p, index) => {
    const rawJid = p.id || 'N/A';
    const user = rawJid.split('@')[0];
    const domain = rawJid.split('@')[1];
    const lid = domain === 'lid'? `${user}@lid`: `${user}@s.whatsapp.net`;

    const estado = p.admin === 'superadmin'? '👑 Pilar Supremo':
                   p.admin === 'admin'? '🛡️ Pilar': '👤 Cazador';

    return [
      '🔅───────────────────⬣',
      `🧾 *Miembro #${index + 1}*`,
      `👤 *Identidad:* @${user}`,
      `🆔 *LID espiritual:* ${lid}`,
      `📍 *Rango:* ${estado}`,
      '🔅───────────────────⬣'
    ].join('\n');
});

  const contenido = tarjetas.join('\n');
  const encabezado = `╭─〔🌸 TanjiroBot – Panel de Participantes〕─⬣\n`;
  const cierre = `\n╰─〔🧣 Total: ${participantes.length} cazadores activos〕─⬣`;

  const mencionados = participantes.map(p => p.id).filter(Boolean);

  const salida = [encabezado, contenido, cierre].join('\n');

  return conn.reply(m.chat, salida, m, { mentions: mencionados});
};

handler.command = ['lid', 'userlid'];
handler.help = ['lid'];
handler.tags = ['group'];
handler.group = true;

export default handler;
