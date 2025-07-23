export async function before(m, { conn}) {
  try {
    if (!m.text ||!global.prefix ||!global.prefix.test(m.text)) return;

    const Buffer = global.Buffer || ((...args) => new Uint8Array(...args));
    const metanombre = global.metanombre || 'Tanjiro_Bot_MD';

    if (!Array.prototype.getRandom) {
      Array.prototype.getRandom = function () {
        return this[Math.floor(Math.random() * this.length)];
};
}

    global.fkontak = {
      key: {
        participant: `0@s.whatsapp.net`,
...(m.chat? { remoteJid: `status@broadcast`}: {})
},
      message: {
        contactMessage: {
          displayName: metanombre,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${metanombre},;;;\nFN:${metanombre}\nEND:VCARD`,
          sendEphemeral: true
}
}
};

    global.fakeMetaMsg = {
      key: {
        remoteJid: '0@s.whatsapp.net',
        fromMe: false,
        id: 'FFAC1BC46FF49C35',
        participant: '0@s.whatsapp.net'
},
      message: {
        contactMessage: {
          displayName: metanombre,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Tanjiro_Bot_MD\nORG:Cuerpo de Cazadores\nEND:VCARD`,
          jpegThumbnail: Buffer.from([]),
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true
}
}
}
};

    const usedPrefix = global.prefix.exec(m.text)[0];
    const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();
    if (!command) return;

    const validCommand = (cmd, plugins) => {
      return Object.values(plugins).some(plugin =>
        plugin && plugin.command &&
        (Array.isArray(plugin.command)? plugin.command: [plugin.command]).includes(cmd)
);
};

    if (command === "bot") return;

    if (validCommand(command, global.plugins)) {
      const chat = global.db.data.chats[m.chat];
      const user = global.db.data.users[m.sender];

      if (chat?.isBanned) {
        const reply = {
          text: `⚔️ El bot *Tanjiro_Bot_MD* ha sido sellado en este grupo.\n\n📌 Un *cazador superior* puede restaurarlo usando:\n✏️ *${usedPrefix}bot on*`,
          contextInfo: {
            mentionedJid: [m.sender]
}
};

        try {
          await conn.sendMessage(m.chat, reply, { quoted: global.fakeMetaMsg});
} catch {
          await m.reply(`⚔️ El bot *Tanjiro_Bot_MD* está desactivado.\n📝 Usa *${usedPrefix}bot on* para liberarlo.`);
}
        return;
}

      if (user) user.commands = (user.commands || 0) + 1;

} else {
      const comando = m.text.trim().split(' ')[0];
      const reply = {
        text: `🗡️ El comando *${comando}* no existe en el pergamino del dojo.\n📜 Usa *${usedPrefix}menu* para consultar las técnicas disponibles.`,
        contextInfo: {
          mentionedJid: [m.sender]
}
};

      try {
        await conn.sendMessage(m.chat, reply, { quoted: global.fakeMetaMsg});
} catch {
        await m.reply(`🗡️ El comando *${comando}* no existe.\n📖 Consulta el panel con *${usedPrefix}menu* para encontrar tu técnica.`);
}
}

} catch (error) {
    console.error(`⚠️ Error en validCommand.js de Tanjiro_Bot_MD: ${error}`);
}
}
