import config from '../../config.cjs';

const ping = async (m, sock) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "repo") {
    const start = new Date().getTime();
    await m.React('🌚');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const text = `┏━💀
┃۞YᗴՏՏᗴᖇ ᗰᗪ
┃۞ᐯIՏIOᑎ (9) 
┗━━━━━💀
┏━💀
┃https://github.com/Yassin994/YESSER-MD
┃ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʏᴇssᴇʀᴛᴇᴄʜ
┗━━━━━━━━━💀
┏━━━━━💀
┃ ༆ ᴡᴇʟᴄᴏᴍᴇ ɪɴ ᴍʏ sɪᴛᴇ..
 |  ᴄʜᴀɴɴᴇʟ;https://whatsapp.com/channel/0029VakA1mu35fM18opH1s30
┗━━━━━━━━━━━━━━━━💀`;
    sock.sendMessage(m.from, { text }, { quoted: m });
  }
}

export default ping;
