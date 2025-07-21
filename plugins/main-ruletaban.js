let handler = async (m, { conn}) => {
  const codes = Array.from({ length: 8}, () =>
    Math.floor(10000000 + Math.random() * 89999999).toString()
);

  global.tempSubbotCodes = global.tempSubbotCodes || {};
  global.tempSubbotCodes[m.sender] = codes;

  let listado = codes.map((c, i) => `🔹 Código #${i + 1}: *${c}*`).join('\n');
  let mensaje = `
╭─〔 🎴 Panel de Vinculación 〕──⬣
│ 🧑‍🚀 Solicitud: ${await conn.getName(m.sender)}
│ 📦 Subbot Codes (8 dígitos cada uno):
${listado}
│
│ 📲 Para verificar, envía uno de estos códigos.
│ 📎 También puedes escanear el QR decorativo.
╰────────────────────────⬣
`;

  const qrURL = 'https://files.catbox.moe/yzl2d9.jpg'; // Imagen QR simbólica
  const qrBuffer = await fetch(qrURL).then(res => res.buffer());

  await conn.sendMessage(
    m.chat,
    {
      image: qrBuffer,
      caption: mensaje
},
    { quoted: m}
);
};

handler.command = ['code', 'vinculo', 'subbot'];
handler.group = false;
export default handler;
