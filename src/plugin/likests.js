import config from '../../config.cjs';

// Main command function
const anticallCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();
  
  const validCommands = ['autolike', 'autoslike', 'autostatuslike'];

 if (validCommands.includes(cmd)){
   if (!isCreator) return m.reply("*THIS IS AN OWNER COMMAND*");
    let responseMessage;

    if (text === 'on') {
      config.AUTOLIKE_STATUS = true;
      responseMessage = "AUTO LIKE STATUS has been enabled.";
    } else if (text === 'off') {
      config.AUTOLIKE_STATUS = false;
      responseMessage = "AUTO LIKE STATUS has been disabled.";
    } else {
      responseMessage = `Usage:\n- *${prefix + cmd} ON:* Enable AUTO LIKE STATUS\n- *${prefix + cmd} off:* Disable AUTO LIKE STATUS`;
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default anticallCommand;
