import fetch from 'node-fetch';

export async function before(m, { conn}) {
  if (!m.isGroup ||!m.messageStubType ||!m.messageStubParameters) return;

  const groupMetadata = await conn.groupMetadata(m.chat);
  const participants = m.messageStubParameters || [];
  const fecha = new Date().toLocaleDateString('es-ES');
  const audioBienvenida = 'https://files.catbox.moe/wi4u63.mp4';
  const imagenDefecto = 'https://files.catbox.moe/wav09n.jpg';

  for (const user of participants) {
    const name = await conn.getName(user);
    const pp = await conn.profilePictureUrl(user, 'image').catch(() => imagenDefecto);
    const tag = '@' + user.split('@')[0];

    const bienvenida = `
╭─── 🌅 Bienvenida al Dojo Solar ───╮
│
│ 🧣 *${name}* se ha unido al dojo Tanjiro.
│ 📅 *Fecha:* ${fecha}
│ 🏷️ *ID:* ${user}
│ 💬 *Grupo:* *${groupMetadata.subject}*
│
│ Respira profundo, honra el grupo
│ y canaliza el Ki hacia la armonía.
│ Que tu estancia sea legendaria 🗡️
│
╰──────────────────────────────╯`.trim();

    const despedida = `
╭─── 🍂 Despedida del Dojo ───╮
│
│ 🧣 *${name}* ha abandonado el dojo solar.
│ 📅 *Fecha:* ${fecha}
│ 🏷️ *ID:* ${user}
│ 💬 *Grupo:* *${groupMetadata.subject}*
│
│ Que el viento te lleve suave
│ y el sol ilumine tu próximo destino 🐾
│
╰──────────────────────────────╯`.trim();

    // BIENVENIDA
    if (m.messageStubType === 27) {
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
