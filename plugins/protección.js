let handler = async (m, { conn}) => {
  const chat = global.db.data.chats[m.chat];
  if (chat.antiArabe) {
    return m.reply(`
〘🌸 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 - Protección activa 🌸〙

🧣 El modo *antiArabe* ya está encendido en este grupo.
`);
}
  chat.antiArabe = true;
  m.reply(`
〘🌸 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 - Protección activada 🌸〙

⚔️ Respiración solar iniciada.
🛡️ El sistema *antiArabe* está activo.
`);
};

handler.help = ['onarabe'];
handler.tags = ['protección'];
handler.command = ['onarabe'];
handler.group = true;
handler.admin = true;
handler.register = true;

export default handler;
```

---

*🛡️ Detector – Bloqueo de acceso según prefijo árabe*

```js
export async function before(m, { conn}) {
  if (!m.isGroup) return;

  const chat = global.db.data.chats[m.chat];
  if (!chat.antiArabe) return;

  const prefijosArabes = [
    '+20', '+212', '+213', '+216', '+218',
    '+971', '+966', '+973', '+974', '+968',
    '+965', '+961', '+962', '+964', '+963',
    '+970', '+972'
  ];

  const number = m.sender.split('@')[0];
  const inicio = '+' + number.slice(0, number.length - 7); // aproximación al prefijo

  if (prefijosArabes.some(p => number.startsWith(p))) {
    await conn.reply(m.chat, `
〘🚫 TanjiroBot - Bloqueo espiritual 🚫〙

⚠️ El número *${number}* tiene un prefijo restringido.
🧣 Activación automática por *antiArabe*.
`, m);
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
}
}
