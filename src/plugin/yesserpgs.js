import config from '../../config.cjs';

const ping = async (m, sock) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "uptime") {
    const start = new Date().getTime();
    await m.React('⚡');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const text = `╭━━━━━━━━━━━━━╮
┃𝙱𝙾𝚃 𝙸𝚂 𝙰𝙻𝙸𝚅𝙴................24𝚑𝚛𝚜
┃✩𝚞𝚙𝚝𝚒𝚖𝚎.; *99723^𝚐𝚑*
┃༆𝚛𝚞𝚗𝚗𝚒𝚗𝚐 𝚝𝚒𝚖𝚎.; 5627^𝚑𝚛𝚜
┃༄ 𝚟𝚒𝚜𝚒𝚘𝚗: 1𝚔 𝚝𝚎𝚒𝚜
┃✫𝚍𝚊𝚢𝚜; 25
┃᯾ 𝐇𝐀𝐏𝐏𝐘 𝐍𝐄𝐖 𝐘𝐄𝐀𝐑
╰━━━━━━━━━━━━━
`;
    sock.sendMessage(m.from, { text }, { quoted: m });
  }
}

export default ping;
