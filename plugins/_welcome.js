import fetch from 'node-fetch';
const WAMessageStubType = (await import('@whiskeysockets/baileys')).default;

const channelRD = {
  id: '120363402097425674@newsletter',
  name: '会 Tanjiro_Bot 🧣'
};

const welcomeAudio = 'https://files.catbox.moe/2csqwe.mp4';
const goodbyeAudio = 'https://files.catbox.moe/wi4u63.mp4';
const icons = 'https://files.catbox.moe/yzl2d9.jpg';
const redes = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';

export async function before(m, { conn}) {
  if (!m.messageStubType ||!m.isGroup) return;

  const chat = global.db.data.chats[m.chat];
  const mentionedJids = m.messageStubParameters.map(p => `${p}@s.whatsapp.net`);
  const who = m.messageStubParameters[0] + '@s.whatsapp.net';
  const user = global.db.data.users[who];
  const userName = user?.name || await conn.getName(who);

  const sendVoice = async (audioURL, titleText, bodyText) => {
    await conn.sendMessage(m.chat, {
      audio: { url: audioURL},
      ptt: true,
      mimetype: 'audio/mpeg',
      fileName: 'tanjiro_welcome.opus',
      seconds: 10,
      contextInfo: {
        mentionedJid: mentionedJids,
        forwardingScore: 999999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: '',
          newsletterName: channelRD.name
},
        externalAdReply: {
          title: titleText,
          body: bodyText,
          mediaType: 1,
          thumbnailUrl: icons,
          sourceUrl: redes,
          previewType: 'PHOTO',
          showAdAttribution: true
}
}
}, { quoted: m});
};

  // 🎉 Bienvenida
  if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    await sendVoice(
      welcomeAudio,
      '🌸 BIENVENIDO AL DOJO',
      `🧣 ${userName} se une a la respiración grupal`
);
}

  // 🧘 Despedida
  if (chat.welcome && [WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_LEAVE].includes(m.messageStubType)) {
    await sendVoice(
      goodbyeAudio,
      '⚔️ Tanjiro despide con respeto',
      `🧣 ${userName} abandona el dojo solar`
);
}
}
