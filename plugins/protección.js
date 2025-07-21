
export async function before(m, { conn}) {
  if (!m.sender ||!m.message) return;

  // ⚙️ Activando seguridad
  console.log('⚙️ Activando Cyber seguridad de comandos…');

  // Lista de prefijos telefónicos árabes comúnmente usados
  const prefijosArabes = [
    '+20', '+212', '+213', '+216', '+218',
    '+971', '+966', '+973', '+974', '+968',
    '+965', '+961', '+962', '+964', '+963',
    '+970', '+972'
  ];

  const number = m.sender.split('@')[0];

  if (prefijosArabes.some(prefijo => number.startsWith(prefijo))) {
    await conn.reply(m.chat, `
〘🚫 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 - Cyber seguridad activada 🚫〙

⚠️ Lo siento *${number}*, no puedes usar *ningún comando* de TanjiroBot por motivos de seguridad.

🧣 Activando Cyber seguridad de comandos…
✂️ Tu acceso ha sido restringido automáticamente por protección espiritual Hashira.
`, m);

    throw false; // 🛡️ Bloquea todos los comandos
}
}
