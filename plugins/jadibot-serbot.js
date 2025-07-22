let handler = async (m, { conn}) => {
  const jid = m.chat;

  try {
    await conn.reply(jid, `🤖 *¡Hola!* Este bot no está disponible en uso de .code o .Qr\n\n📌 Si deseas integrarlo en tu grupo puedes hablar con mi creador`, m);
} catch (error) {
    console.error('Error al enviar mensaje informativo:', error);
    conn.reply(jid, '⚠️ No se pudo enviar el mensaje. Intenta nuevamente más tarde o revisa el enlace.', m);
}
};

handler.command = ['serbot', 'qr', 'code'];
handler.register = true;

export default handler;
