
import { areJidsSameUser} from '@whiskeysockets/baileys';

export async function before(m, { participants, conn}) {
  if (!m.isGroup) return;

  const chat = global.db.data.chats[m.chat];
  if (!chat.antiBot2) return;

  const principalJid = global.conn.user.jid;
  if (principalJid === conn.user.jid) return;

  const alreadyInGroup = participants.some(p => areJidsSameUser(principalJid, p.id));
  if (alreadyInGroup) {
    setTimeout(async () => {
      const mensajeSalida = `
〘🌸 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 - Detección espiritual 🌸〙

⚠️ Ya estoy presente en este grupo como *𝖻𝗈𝗍 principal*.

🧣 Para mantener la armonía y evitar confusión, me retiro con respeto.

Respiración solar… corte limpio.
`.trim();

      await conn.reply(m.chat, mensajeSalida, m);
      await this.groupLeave(m.chat);
}, 5000);
}
}
