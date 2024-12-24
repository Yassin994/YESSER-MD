import config from '../../config.cjs';

const ping = async (m, sock) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "repo") {
    const start = new Date().getTime();
    await m.React('🇹🇿');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const text = `┏━𒊹︎︎︎
┃➪𝕐𝔼𝕊𝕊𝕊𝔼ℝ 𝕄𝔻
┃⚠︎ 𝕄𝕆𝔻𝔼...𝕏𝕄𝔻 (2) 
┗━━𒊹︎︎︎━━━𒊹︎︎︎
┏━𒊹︎︎︎𝕣𝕖𝕡𝕠;
┃https://github.com/Yassin994YESSER-MD
┗━━━━𒊹︎︎︎━━━━━𒊹︎︎︎
┏━━━━━𒊹︎︎︎
┃𝕠𝕨𝕟𝕖𝕣 𝕚𝕟𝕗𝕠; https://wa.me/255621995482
┗━━━━━━━━━𒊹︎︎︎━━━━━━━𒊹︎︎︎`;
    sock.sendMessage(m.from, { text }, { quoted: m });
  }
}

export default ping;
