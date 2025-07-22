let handler = async (m, { conn}) => {
  const jid = m.chat;

  try {
    await conn.reply(jid, `🤖 *¡Hola!* Este bot no está disponible en uso de .code o .Qr\n\n📌 Si deseas integrarlo en tu propio espacio, puedes comunicarte con el creador para más información:\n\n📞 *WhatsApp:* [+54 9 11 5617 8758](https://wa.me/5491156178758)\n📧 *Correo electrónico:* fedelanyt20@gmail.com\n🌐 *Instagram:* https://www.instagram.com/fedexyz13`, m);
} catch (error) {
    console.error('Error al enviar mensaje informativo:', error);
    conn.reply(jid, '⚠️ No se pudo enviar el mensaje. Intenta nuevamente más tarde o revisa el enlace.', m);
}
};

handler.command = ['serbot', 'qr', 'code'];
handler.register = true;

export default handler;
