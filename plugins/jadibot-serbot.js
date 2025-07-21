let handler = async (m, { conn}) => {
  const jid = m.chat;

  try {
    await conn.reply(jid, `🤖 *¡Hola!* Este bot está disponible para uso privado en grupos o proyectos.\n\n📌 Si estás interesado en saber cómo integrarlo en tu propio espacio o deseas contactarte con el administrador, puedes visitar:\n🌐 https://fedexyz.com`, m);
} catch (error) {
    console.error('Error al enviar mensaje informativo:', error);
    conn.reply(jid, '⚠️ No se pudo enviar el mensaje. Intenta nuevamente más tarde o revisa el enlace.', m);
}
};

handler.command = ['serbot', 'qr', 'code'];
handler.register = true;

export default handler;
