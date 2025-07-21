let handler = async (m, { conn, args, usedPrefix, command}) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => 'https://files.catbox.moe/yzl2d9.jpg');

  let mode = {
    open: 'not_announcement',
    close: 'announcement',
    abierto: 'not_announcement',
    cerrado: 'announcement',
    on: 'not_announcement',
    off: 'announcement'
}[(args[0] || '').toLowerCase()];

  if (mode === undefined)
    return conn.reply(m.chat, `
╭──〔 🔰 Tanjiro - Bot 〕──⬣
│ 🗡️ *Comando de disciplina grupal ausente.*
│
│ 📜 Usa ejemplos como:
│ • *${usedPrefix}${command} open* – abre el grupo
│ • *${usedPrefix}${command} close* – cierra el grupo
│ • *${usedPrefix}${command} on / off*
╰────────────────────────────⬣`, m);

  await conn.groupSettingUpdate(m.chat, mode);

  if (mode === 'not_announcement') {
    return conn.reply(m.chat, `
🟢 *Respiración del Sol activada*
🧑‍🦰 *TanjiroBot ha abierto el camino.*
💬 Todos los cazadores pueden hablar libremente en este grupo.
`, m);
}

  if (mode === 'announcement') {
    return conn.reply(m.chat, `
🔒 *Respiración Lunar ejecutada*
⚔️ Solo los *Pilares (Admins)* pueden expresar su voz ahora.
🌙 El grupo ha sido cerrado para proteger la armonía del Dojo.
`, m);
}
};

handler.help = ['group open / close', 'grupo on / off'];
handler.tags = ['grupo'];
handler.command = ['group', 'grupo'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
