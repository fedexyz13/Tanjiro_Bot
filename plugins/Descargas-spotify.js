import axios from "axios";
import cheerio from "cheerio";

const channelRD = {
  id: '120363402097425674@newsletter',
  name: 'Canal Oficial del Dojo del Sol 🌄'
};

const client_id = "acc6302297e040aeb6e4ac1fbdfd62c3";
const client_secret = "0e8439a1280a43aba9a5bc0a16f3f009";
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const getToken = async () => {
  const res = await axios.post(
    TOKEN_ENDPOINT,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: "Basic " + basic,
        "Content-Type": "application/x-www-form-urlencoded",
},
}
);
  return res.data.access_token;
};

const searchTrack = async (query, token) => {
  const res = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
    {
      headers: { Authorization: `Bearer ${token}`},
}
);
  if (res.data.tracks.items.length === 0) throw new Error("🎶 Canción no encontrada.");
  return res.data.tracks.items[0];
};

let handler = async (m, { conn, text}) => {
  if (!text) return m.reply("🌴 Ingresa el nombre de una canción o un enlace de Spotify.");
  await m.react("🍁");

  try {
    const isUrl = /https?:\/\/(open\.)?spotify\.com\/track\/[a-zA-Z0-9]+/.test(text);
    let track;

    const token = await getToken();

    if (isUrl) {
      const id = text.split("/track/")[1].split("?")[0];
      const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: { Authorization: `Bearer ${token}`},
});
      track = await res.json();
} else {
      track = await searchTrack(text, token);
}

    const cap = `
\`\`\`会== 🌸 TANJIRO_BOT ==会

≡ Título: » ${track.name}
≡ Artista: » ${track.artists.map((a) => a.name).join(", ")}
≡ Álbum: » ${track.album.name}
≡ Fecha: » ${track.album.release_date}
≡ Popularidad: » ${track.popularity}/100
≡ Duración: » ${(track.duration_ms / 60000).toFixed(2)} min
≡ ISRC: » ${track.external_ids?.isrc || "No disponible"}
≡ URL: » ${track.external_urls.spotify}

> 🧣 Dev: fedexyz
\`\`\`
`;
    await m.reply(cap);

    const data = new SpotMate();
    const info = await data.convert(track.external_urls.spotify);

    await conn.sendMessage(m.chat, {
      audio: { url: info.url},
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 120,
          newsletterName: channelRD.name,
},
        externalAdReply: {
          title: track.name,
          body: `Artista: ${track.artists.map((a) => a.name).join(", ")}`,
          thumbnailUrl: track.album.images[0]?.url,
          mediaType: 1,
          sourceUrl: track.external_urls.spotify,
          renderLargerThumbnail: true,
},
},
}, { quoted: m});

    await m.react("🌸");

} catch (err) {
    console.error(err);
    await m.react("❌");
    m.reply("🎶 No se pudo obtener la canción. Intenta nuevamente más tarde:\n> " + err.message);
}
};

handler.help = ["spotify"];
handler.tags = ["download"];
handler.command = ["spotify"];
export default handler;

// 🌀 Clase para convertir a audio
class SpotMate {
  constructor() {
    this._cookie = null;
    this._token = null;
}

  async _visit() {
    try {
      const response = await axios.get('https://spotmate.online/en', {
        headers: {
          'user-agent': 'Mozilla/5.0 (Linux; Android 10)',
},
});

      const setCookieHeader = response.headers['set-cookie'];
      if (setCookieHeader) {
        this._cookie = setCookieHeader.map(c => c.split(';')[0]).join('; ');
}

      const $ = cheerio.load(response.data);
      this._token = $('meta[name="csrf-token"]').attr('content');
      if (!this._token) throw new Error('Token CSRF no encontrado.');
} catch (error) {
      throw new Error(`🌐 Error al visitar SpotMate: ${error.message}`);
}
}

  async convert(spotifyUrl) {
    if (!this._cookie ||!this._token) await this._visit();
    try {
      const response = await axios.post(
        'https://spotmate.online/convert',
        { urls: spotifyUrl},
        { headers: this._getHeaders()}
);
      return response.data;
} catch (error) {
      throw new Error(`🔄 Error al convertir la canción: ${error.message}`);
}
}

  _getHeaders() {
    return {
      'cookie': this._cookie,
      'x-csrf-token': this._token,
      'origin': 'https://spotmate.online',
      'referer': 'https://spotmate.online/en',
      'user-agent': 'Mozilla/5.0 (Linux; Android 10)',
      'content-type': 'application/json',
};
}

  clear() {
    this._cookie = null;
    this._token = null;
    console.log('🧹 Cookie y token borrados.');
}
}
