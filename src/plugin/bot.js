import config from '../../config.cjs';

const ping = async (m, sock) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "test") {
    const start = new Date().getTime();
    await m.React('⚠️');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const text = `┏✈︎Y͟E͟S͟S͟E͟R͟ M͟D͟✈︎
┃ 𝙷𝙴𝙻𝙻𝙾𝚆 𝚖𝚢 𝚗𝚊𝚖𝚎 𝚒𝚜 𝕐𝔼𝕊𝕊𝔼ℝ 𝕄𝔻
┃  𝚒𝚖 𝚜𝚒𝚖𝚙𝚕𝚎 𝚠𝚊𝚜𝚝𝚊𝚙𝚙 𝚋𝚘𝚝 𝚌𝚛𝚎𝚊𝚝𝚎𝚍 𝚘𝚗
┃  12/4/2024..  𝐢𝐦 𝐚𝐥𝐢𝐯𝐞 𝐚𝐥𝐥 𝐭𝐡𝐞 𝐭𝐢𝐦𝐞
┃  🤠𝐦𝐚𝐝𝐞 𝐛𝐲 𝚢𝚎𝚜𝚜𝚎𝚛𝚝𝚎𝚌𝚑⚠️
┗━━━━━━━━━━━━━━━۞`;
    sock.sendMessage(m.from, { text }, { quoted: m });
  }
}

export default ping;
