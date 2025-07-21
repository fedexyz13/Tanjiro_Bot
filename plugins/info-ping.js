import speed from 'performance-now';
import { exec} from 'child_process';

let handler = async (m, { conn}) => {
  let start = speed();
  let latency = speed() - start;

  exec(`neofetch --stdout`, (error, stdout, stderr) => {
    let system = stdout.toString("utf-8");
    let stats = system.replace(/Memory:/, "Ram:");

    let mensaje = `
╭───────────────⬣
│ 🔰 *Respiración Solar TanjiroBot*
╰───────────────⬣

🗡️ *Respiración medida con precisión:*
🔹 Latencia del alma: *${latency.toFixed(4)} ms*
🖥️ *Estado del sistema:*
\`\`\`${stats.trim()}\`\`\`

🌸 Que la estabilidad esté contigo, cazador.
`;

    conn.reply(m.chat, mensaje, m);
});
};

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = ['ping', 'p'];
handler.register = true;

export default handler;
