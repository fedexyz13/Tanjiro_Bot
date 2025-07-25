import fetch from 'node-fetch';

export async function before(m, { conn}) {
  if (!m.isGroup ||!m.messageStubType ||!m.messageStubParameters) return;

  const groupMetadata = await conn.groupMetadata(m.chat);
  const participants = m.messageStubParameters || [];
  const fecha = new Date().toLocaleDateString('es-ES');
  const imagenDefecto = 'https://files.catbox.moe/wav09n.jpg';

  for (const user of participants) {
    const name = await conn.getName(user);
    const pp = await conn.profilePictureUrl(user, 'image').catch(() => imagenDefecto);
    const tag = '@' + user.split('@')[0];

    const bienvenida = `
╭─── 🌸 Bienvenida al Dojo Solar ───╮
│
│ 🧣 *${name}* ha sido invocado con aliento solar.
│ 📅 *Fecha:* ${fecha}
│ 🆔 *ID:* ${user}
│ 🏡 *Grupo:* *${groupMetadata.subject}*
│
│ Que tu energía fluya con respeto.
│ Respira en armonía y honra la paz del grupo.
│
╰────────────────────────────────╯`.trim();

    const despedida = `
╭─── 🍂 Despedida del Dojo ───╮
│
│ 🧣 *${name}* ha dejado el dojo con dignidad.
│ 📅 *Fecha:* ${fecha}
│ 🆔 *ID:* ${user}
│ 🏡 *Grupo:* *${groupMetadata.subject}*
│
│ Que el sol te guíe hacia nuevos senderos 🌄
│ Respira libre y lleva contigo el Ki de la calma.
│
╰──────────────────────────────╯`.trim();

    if (m.messageStubType === 27 || m.messageStubType === 31) {
      await conn.sendMessage(m.chat, {
        image: { url: pp},
        caption: bienvenida,
        mentions: [user],
        contextInfo: {
          externalAdReply: {
            title: `🧣 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 🧣`,
            body: `${name} 🧣`,
            thumbnailUrl: pp,
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: pp
          }
        }
      });
    }
  }
            }
