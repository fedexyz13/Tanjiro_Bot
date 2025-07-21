const linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner}) => {
  if (!text) {
    return m.reply(`
〘🌸 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 - 𝖴𝗇𝗂𝗈́𝗇 𝖦𝗋𝗎𝗉𝖺𝗅 🌸〙

📜 𝖤𝗇𝗏𝗂́𝖺 𝗎𝗇 𝖾𝗇𝗅𝖺𝖼𝖾 𝗏𝖺́𝗅𝗂𝖽𝗈 𝗉𝖺𝗋𝖺 𝗊𝗎𝖾 𝗉𝗎𝖾𝖽𝖺 𝖾𝗇𝗍𝗋𝖺𝗋 𝗒 𝗉𝗋𝗈𝗍𝖾𝗀𝖾𝗋 𝖾𝗅 𝗀𝗋𝗎𝗉𝗈.
`.trim());
}

  let match = text.match(linkRegex);
  if (!match) return m.reply(`⚠️ 𝖤𝗇𝗅𝖺𝖼𝖾 𝗇𝗈 𝗏𝖺́𝗅𝗂𝖽𝗈, 𝗋𝖾𝗏𝗂𝗌𝖺 𝗊𝗎𝖾 𝖾𝗌𝗍𝖾́ 𝖼𝗈𝗆𝗉𝗅𝖾𝗍𝗈.`);

  let [, code] = match;

  if (isOwner) {
    try {
      let groupId = await conn.groupAcceptInvite(code);
      await m.reply(`✅ 𝖳𝖺𝗇𝗃𝗂𝗋𝗈𝖡𝗈𝗍 𝗌𝖾 𝗁𝖺 𝗎𝗇𝗂𝖽𝗈 𝖾𝖷𝗂𝗍𝗈𝗌𝖺𝗆𝖾𝗇𝗍𝖾.`);

      await conn.sendMessage(groupId, {
        text: `
〘🌸 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 𝗁𝖺 𝗅𝗅𝖾𝗀𝖺𝖽𝗈 🌸〙

🧣 𝖴𝗌𝖺 *#𝖬𝖾𝗇𝗎* 𝗉𝖺𝗋𝖺 𝗏𝖾𝗋 𝗆𝗂𝗌 𝖼𝗈𝗆𝖺𝗇𝖽𝗈𝗌 𝗆𝗂𝗌𝗍𝗂𝖼𝗈𝗌.
`.trim()
});

} catch (err) {
      console.error('[ERROR AL UNIRSE]', err);

      let msg = `❌ 𝖭𝗈 𝗉𝗎𝖽𝖾 𝖾𝗇𝗍𝗋𝖺𝗋 𝖺𝗅 𝗀𝗋𝗎𝗉𝗈.\n`;

      if (err?.message?.includes('not-authorized')) {
        msg += `🔸 𝖥𝗎𝗂 𝖾𝗑𝗉𝗎𝗅𝗌𝖺𝖽𝗈 𝖺𝗇𝗍𝖾𝗋𝗂𝗈𝗋𝗆𝖾𝗇𝗍𝖾.`;
} else if (err?.message?.includes('already joined')) {
        msg += `🔸 𝖸𝖺 𝖾𝗌𝗍𝗈𝗒 𝖽𝖾𝗇𝗍𝗋𝗈.`;
} else if (err?.message?.includes('invalid')) {
        msg += `🔸 𝖤𝗅 𝖾𝗇𝗅𝖺𝖼𝖾 𝖾𝗌𝘁𝖺́ 𝗏𝖾𝗇𝖼𝗂𝖽𝗈 𝗈 𝗂𝗇𝗏𝖺𝗅𝗂𝖽𝗈.`;
}

      m.reply(msg.trim());
}

} else {
    let mensaje = `
📨 𝖤𝗇𝗅𝖺𝖼𝖾 𝗋𝖾𝖼𝗂𝖻𝗂𝖽𝗈:

${text}

🧣 𝖤𝗇𝗏𝗂𝖺𝖽𝗈 𝗉𝗈𝗋: @${m.sender.split('@')[0]}
`;

    await conn.sendMessage(`${suittag}@s.whatsapp.net`, {
      text: mensaje,
      mentions: [m.sender]
}, { quoted: m});

    m.reply(`🌸 𝖦𝗋𝖺𝖼𝗂𝖺𝗌 𝗉𝗈𝗋 𝗍𝗎 𝗂𝗇𝗏𝗂𝗍𝖺𝖼𝗂𝗈́𝗇. 𝖤𝗅 𝖢𝖺𝗓𝖺𝖽𝗈𝗋 𝗌𝗎𝗉𝗋𝖾𝗆𝗈 𝗅𝗈 𝗁𝖺 𝗋𝖾𝖼𝗂𝖻𝗂𝖽𝗈.`);
}
};

handler.help = ['invite'];
handler.tags = ['owner', 'tools'];
handler.command = ['invite', 'join'];
handler.rowner = true;

export default handler;
