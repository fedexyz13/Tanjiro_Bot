import fs from 'fs';
import path from 'path';

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '会 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 🧣'
};

const emojis = '📜';
const fake = {
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: channelRD.id,
    serverMessageId: 444,
    newsletterName: channelRD.name
},
  externalAdReply: {
    title: 'Tanjiro_Bot_MD | Revisión de Plugins',
    body: 'Analizando el flujo espiritual del código',
    thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
    sourceUrl: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N',
    mediaType: 1,
    renderLargerThumbnail: true
}
};

const handler = async (m, { usedPrefix, command, conn}) => {
  try {
    await m.react('🔎');
    conn.sendPresenceUpdate('composing', m.chat);

    const dirs = ['./plugins'];
    let response = `${emojis} *Tanjiro_Bot_MD | Revisión de Syntax Errors:*\n\n`;
    let hasErrors = false;

    for (const pluginsDir of dirs) {
      const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'));

      for (const file of files) {
        try {
          await import(path.resolve(pluginsDir, file));
} catch (error) {
          hasErrors = true;
          response += `❌ *Error en:* ${file} (${pluginsDir})\n`;
          if (error.loc) {
            response += `📌 *Línea:* ${error.loc.line}, *Columna:* ${error.loc.column}\n`;
}
          response += `📄 *Mensaje:* ${error.message}\n\n`;
}
}
}

    if (!hasErrors) {
      response += `✅ ¡Todo está en orden!\n🧘‍♂️ No se detectaron errores de sintaxis en los plugins.`;
}

    await conn.reply(m.chat, response.trim(), m, fake);
    await m.react('🔥');

} catch (err) {
    console.error('[❌] Error en revisión:', err);
    await m.react('✖️');
    await conn.reply(m.chat, '🚩 *Ocurrió un fallo al verificar los plugins.*', m, fake);
}
};

handler.command = ['revisar'];
handler.help = ['revisar'];
handler.tags = ['tools'];
handler.register = true;

export default handler;
