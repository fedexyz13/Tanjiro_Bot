import fetch from 'node-fetch';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '会 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 🧣'
};

let handler = async (m, { conn, args, usedPrefix, command, isOwner}) => {
  if (!args[0]) throw `⚔️ *Comando de descarga de aplicación*\n\n📦 Ingresa el nombre de la app que deseas obtener.\n📝 Ejemplo:\n${usedPrefix + command} Clash Royale`;

  let res = await fetch(`https://api.dorratz.com/v2/apk-dl?text=${args[0]}`);
  let result = await res.json();

  if (!result ||!result.dllink) throw '❎ No se encontró la aplicación solicitada. Intenta con otro nombre.';

  let { name, size, lastUpdate, icon} = result;
  let URL = result.dllink;

  let texto = `
📥 *Descargando aplicación...*

🧣 Nombre: ${name}
🧩 Tamaño: ${size}
📆 Última actualización: ${lastUpdate}
📦 Fuente oficial verificada

🧘 Respira mientras el paquete se prepara…
`;

  await conn.sendFile(m.chat, icon, name + '.jpg', texto, m);

  await conn.sendMessage(m.chat, {
    document: { url: URL},
    mimetype: 'application/vnd.android.package-archive',
    fileName: name + '.apk',
    caption: `🗂️ *${name} descargado con éxito.*\n📎 El archivo está listo para instalar.`,
    contextInfo: {
      mentionedJid: [m.sender],
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: 100,
        newsletterName: channelRD.name
},
      externalAdReply: {
        title: 'Tanjiro_Bot_MD | Descarga APK',
        body: 'Respira con calma. El archivo está listo.',
        thumbnailUrl: icon,
        sourceUrl: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N',
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m});
};

handler.command = ['apk', 'dapk'];
handler.group = false;
handler.help = ['apk'];
handler.tags = ['descargas'];
export default handler;
