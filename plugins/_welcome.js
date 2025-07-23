export async function before(m, { conn}) {
  if (!m.isGroup ||!m.messageStubType ||!m.messageStubParameters) return;

  const groupMetadata = await conn.groupMetadata(m.chat);
  const participants = m.messageStubParameters || [];
  const date = new Date();
  const fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  for (const user of participants) {
    const name = await conn.getName(user);
    const pp = await conn.profilePictureUrl(user, 'image').catch(() =>
      'https://files.cloudkuimages.guru/images/Y7PT6XwM.jpg'
);
    const tag = '@' + user.split('@')[0];

    const bienvenida = `
╭─── 🎋 Bienvenida 🎋 ───╮
👤 Nombre: *${name}*
📱 ID: ${user}
📆 Fecha: ${fecha}
👥 Grupo: *${groupMetadata.subject}*
🙌 ${tag} ha sido invocado al dojo.
Por favor, lee las reglas y respira en armonía.
╰───────────────────────╯`.trim();

    const despedida = `
╭─── 🍂 Despedida 🍂 ───╮
👤 Nombre: *${name}*
📱 ID: ${user}
📆 Fecha: ${fecha}
👥 Grupo: *${groupMetadata.subject}*
📤 ${tag} ha abandonado el camino.
¡Buena suerte en tu nueva misión!
╰───────────────────────╯`.trim();

    // BIENVENIDA
    if (m.messageStubType === 27 || m.messageStubType === 31) {
      await conn.sendMessage(m.chat, {
        text: bienvenida,
        mentions: [user],
        contextInfo: {
          externalAdReply: {
            title: `Miembro salió del grupo`,
            body: `${name} se fue ❌`,
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
