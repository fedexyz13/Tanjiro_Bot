let handler = async (m, { conn}) => {
  const uptime = process.uptime() * 1000;
  const tiempoActivo = estiloLetras(clockString(uptime));
  const nombreBot = '𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍';

  let estado = `${nombreBot} ⏳ 𝗧𝗶𝗲𝗺𝗽𝗼 𝗔𝗰𝘁𝗶𝘃𝗼: ${tiempoActivo} – ≡ 𝖻𝗒 𝖥𝖾𝖽𝖾𝗑𝗒𝗓`;

  await conn.updateProfileStatus(estado);

  m.reply('✅ 🌅 *Estado del perfil actualizado con respiración solar*');
};

handler.command = ['on status', 'status'];
handler.owner = true;

export default handler;

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000);
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

function estiloLetras(texto) {
  const letras = {
    '0': '𝟢', '1': '𝟣', '2': '𝟤', '3': '𝟥', '4': '𝟦', '5': '𝟧',
    '6': '𝟨', '7': '𝟩', '8': '𝟪', '9': '𝟫',
    ':': ':', '.': '.', '-': '-', ' ': ' '
};
  return texto.split('').map(c => letras[c] || c).join('');
}
