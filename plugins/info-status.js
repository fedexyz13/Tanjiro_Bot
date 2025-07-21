let handler = async (m, { conn}) => {
  const uptime = process.uptime() * 1000;
  const tiempoActivo = clockString(uptime);

  let estado = `TanjiroBot ⏳ Time Active: ${tiempoActivo} – by Fedexyz`;

  await conn.updateProfileStatus(estado); // Este método actualiza la descripción del número del bot

  m.reply('✅ Estado del perfil del bot actualizado con éxito.');
};

handler.command = ['.onstatus', 'statuson'];
handler.owner = true;

export default handler;

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000);
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
