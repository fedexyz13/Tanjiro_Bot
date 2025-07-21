let handler = async (m, { conn }) => {
  const jid = m.chat;

  try {
    
    await conn.reply(jid, `🌙 *¡Hola, Soy Tanjiro Bot* 🌸\n\nActualmente soy un bot privado y no tengo subbots activos.\n\n¡Pero puedes tenerme en tu grupo o proyecto! 🤖✨\n\nRevisa mi catálogo oficial a continuación para más información sobre cómo alquilar mis servicios.`, m);

  }
};


handler.command = ['serbot', 'qr', 'code'];
handler.register = true;

export default handler;
