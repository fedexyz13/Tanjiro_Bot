import { createHash} from 'crypto';

function generarID(sender) {
  return createHash('md5').update(sender).digest('hex');
}

let handler = async (m, { conn, text, usedPrefix, command}) => {
  let user = global.db.data.users[m.sender];

  if (user.registered) {
    return m.reply(`⚔️ Ya estás inscrito en el Dojo del Sol, cazador.\n📌 Si deseas reiniciar tu formación, usa: *${usedPrefix}unreg*`);
}

  let match = /\|?(.*)([.|] *?)([0-9]*)$/i;
  let [_, name, __, age] = text.match(match) || [];

  if (!name ||!age) {
    return m.reply(`🌄 Formato incorrecto.\n📖 Usa: *${usedPrefix + command} tuNombre.edad*\n📌 Ejemplo: *${usedPrefix + command} Tanjiro.16*`);
}

  age = parseInt(age);
  if (isNaN(age) || age < 5 || age> 100) {
    return m.reply(`⛩️ Ingresa una edad válida entre *5 y 100 años*.`);
}

  // 🗂 Registro oficial del Cuerpo de Cazadores
  user.name = name.trim();
  user.age = age;
  user.regTime = Date.now();
  user.registered = true;
  user.exp += 300;

  const sn = generarID(m.sender);

  const mensaje = `
🎋 *Registro exitoso en el Dojo de TanjiroBot_MD* 🎋

👤 Nombre del cazador: ${user.name}
🎂 Edad declarada: ${user.age} años
🧣 ID espiritual: ${sn}

📜 Tu aliento ha sido reconocido.
🗂️ Usa *#perfil* para ver tu progreso dentro del Dojo.
`.trim();

  await m.react('🌸');

  await conn.sendMessage(m.chat, {
    text: mensaje,
    contextInfo: {
      externalAdReply: {
        title: '🌸 TanjiroBot | Cazador registrado',
        body: 'Tu viaje espiritual ha comenzado',
        thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m});
};

handler.help = ['reg'];
handler.tags = ['rg'];
handler.command = ['register', 'reg', 'registrar'];
export default handler;
