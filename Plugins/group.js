global.warncount = process.env.WARN_COUNT || global.warncount || "3";
global.MsgsInLog = process.env.MSGS_IN_LOG || global.MsgsInLog || "false";
const { updateProfilePicture, parsedJid } = require("../lib");
const {
  sck,
  smd,
  send,
  tlang,
  sleep,
  getAdmin,
  prefix,
  groupdb,
  userdb,
  bot_,
  sendWelcome,
} = require("../lib");
const Config = require("../config")
const axios = require("axios");
const astro_patch = require("../lib/plugins");
const { cmd } = astro_patch;
const grouppattern = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}/g;
smd(
  {
    cmdname: "join",
    info: "joins group by link",
    type: "whatsapp",
    fromMe: true,
    filename: __filename,
    use: "<group link.>",
  },
  async (_0x466dd8, _0x5b1338) => {
    try {
      if (_0x466dd8.reply_message && _0x466dd8.reply_message.groupInvite) {
        var _0x29e5fc = await _0x466dd8.bot.groupAcceptInviteV4(
          _0x466dd8.chat,
          _0x466dd8.reply_message.msg
        );
        if (_0x29e5fc && _0x29e5fc.includes("joined to:")) {
          return await send(_0x466dd8, "*_Joined_*", {}, "", _0x466dd8);
        }
      }
      let _0x208739 = _0x5b1338 ? _0x5b1338 : _0x466dd8.reply_text;
      const _0x47ed60 = _0x208739.match(grouppattern);
      if (!_0x47ed60) {
        return await _0x466dd8.reply("*_Uhh Please, provide group link_*");
      }
      let _0x4263be = _0x47ed60[0]
        .split("https://chat.whatsapp.com/")[1]
        .trim();
      await _0x466dd8.bot
        .groupAcceptInvite(_0x4263be)
        .then((_0x7f3222) => send(_0x466dd8, "*_Joined_*", {}, "", _0x466dd8))
        .catch((_0x1d6aea) =>
          _0x466dd8.send("*_Can't Join, Group Id not found!!_*")
        );
    } catch (_0x5d3484) {
      await _0x466dd8.error(
        _0x5d3484 + "\n\ncommand: join",
        _0x5d3484,
        "*_Can't Join, Group Id not found, Sorry!!_*"
      );
    }
  }
);
smd({
  cmdname: "newgc",
  info: "Create New Group",
  type: "whatsapp",
  filename: __filename,
  use: "<group link>",
 }, async (message, args, { smd, cmdName }) => {
  try {
    if (!message.isCreator) {
      return message.reply(tlang().owner);
    }
 
    if (!args) {
      return await message.reply(
        `*_provide Name to Create new Group!!!_*\n*_Ex: ${prefix}${smd} My Name Group @user1,2,3.._*`
      );
    }
 
    let groupName = args;
 
    if (groupName.toLowerCase() === "info") {
      return await message.send(
        `\n *Its a command to create new Gc*\n \`\`\`Ex: ${prefix}${cmdName} My new Group\`\`\`\n \n*You also add peoples in newGc*\n \`\`\`just reply or mention Users\`\`\`\n`
      ).trim();
    }
 
    let participants = [message.sender];
 
    if (message.quoted) {
      participants.push(message.quoted.sender);
    }
 
    if (message.mentionedJid && message.mentionedJid[0]) {
      participants.push(...message.mentionedJid);
      try {
        message.mentionedJid.forEach((jid) => {
          const userId = jid.split("@")[0].trim();
          groupName = groupName.replace(new RegExp(`@${userId}`, "g"), "");
        });
      } catch {}
    }
 
    const groupNameTrimmed = groupName.substring(0, 60);
    const createdGroup = await Suhail.bot.groupCreate(groupNameTrimmed, [...participants]);
 
    if (createdGroup) {
      let welcomeMessage = await message.bot.sendMessage(createdGroup.id, {
        text: `*_Hey Buddy, Welcome to new Group_*\n${Config.caption}`,
      });
 
      try {
        var groupInviteCode = await Suhail.bot.groupInviteCode(createdGroup.id);
      } catch {
        var groupInviteCode = false;
      }
 
      const baseUrl = "https://chat.whatsapp.com/";
      const groupInviteLink = `${baseUrl}${groupInviteCode}`;
      const contextInfo = {
        externalAdReply: {
          title: "*ZAX*-MD",
        },
      };
 
      return await send(
        message,
        `*_Hurray, New group created!!!_*\n${groupInviteCode ? `*_${groupInviteLink}_*` : ""}`.trim(),
        { contextInfo },
        "",
        welcomeMessage
      );
    } else {
      await message.send("*_Can't create new group, Sorry!!_*");
    }
  } catch (error) {
    await message.error(`${error}\n\ncommand: ${cmdName}`, error, "*_Can't create new group, Sorry!!_*");
  }
 });

smd(
  {
    pattern: "ginfo",
    desc: "get group info by link",
    type: "group",
    filename: __filename,
    use: "<group link.>",
  },
  async (_0x4f7c88, _0x1490e0) => {
    try {
      let _0x3eb855 = _0x1490e0 ? _0x1490e0 : _0x4f7c88.reply_text;
      const _0x3e5033 = _0x3eb855.match(grouppattern) || false;
      if (!_0x3e5033) {
        return await _0x4f7c88.reply("*_Uhh Please, provide group link_*");
      }
      let _0x5ced5d = _0x3e5033[0]
        .split("https://chat.whatsapp.com/")[1]
        .trim();
      const _0x5f4890 = await _0x4f7c88.bot.groupGetInviteInfo(_0x5ced5d);
      if (_0x5f4890) {
        const _0x40ced5 = new Date(_0x5f4890.creation * 1000);
        var _0x10288a = _0x40ced5.getFullYear();
        var _0x436585 = _0x40ced5.getMonth() + 1;
        var _0x511884 = _0x40ced5.getDate();
        var _0x236a49 =
          _0x10288a +
          "-" +
          _0x436585.toString().padStart(2, "0") +
          "-" +
          _0x511884.toString().padStart(2, "0");
        var _0x56eaaf = {
          externalAdReply: {
            title: "*ZAX*-MD",
            body: _0x5f4890.subject,
            renderLargerThumbnail: true,
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: _0x3e5033[0],
            sourceUrl: _0x3e5033[0],
          },
        };
        return await send(
          _0x4f7c88,
          (
            _0x5f4890.subject +
            "\n  \n  Creator: wa.me/" +
            _0x5f4890.owner.split("@")[0] +
            " \n  GJid; ```" +
            _0x5f4890.id +
            "  ```\n  *Muted:* " +
            (_0x5f4890.announce ? " yes" : " no") +
            "\n  *Locked:* " +
            (_0x5f4890.restrict ? " yes" : " no") +
            "\n  *createdAt:* " +
            _0x236a49 +
            "\n  *participents:* " +
            (_0x5f4890.size > 3 ? _0x5f4890.size + "th" : _0x5f4890.size) +
            "\n  " +
            (_0x5f4890.desc ? "*description:* " + _0x5f4890.desc + "\n" : "") +
            "\n  " +
            Config.caption +
            "\n  "
          ).trim(),
          {
            mentions: [_0x5f4890.owner],
            contextInfo: _0x56eaaf,
          },
          "",
          _0x4f7c88
        );
      } else {
        await _0x4f7c88.send("*_Group Id not found, Sorry!!_*");
      }
    } catch (_0x36c345) {
      await _0x4f7c88.error(
        _0x36c345 + "\n\ncommand: ginfo",
        _0x36c345,
        "*_Group Id not found, Sorry!!_*"
      );
    }
  }
);
smd(
  {
    cmdname: "rejectall",
    alias: ["rejectjoin"],
    info: "reject all request to join!",
    type: "group",
    filename: __filename,
  },
  async (_0xb81e45, _0x3dda5f) => {
    try {
      if (!_0xb81e45.isGroup) {
        return _0xb81e45.reply(tlang().group);
      }
      if (!_0xb81e45.isBotAdmin || !_0xb81e45.isAdmin) {
        return await _0xb81e45.reply(
          !_0xb81e45.isBotAdmin
            ? "*_I'm Not Admin In This Group" +
                (!_0xb81e45.isCreator ? ", Idiot" : "") +
                "_*"
            : tlang().admin
        );
      }
      const _0x4ea369 = await _0xb81e45.bot.groupRequestParticipantsList(
        _0xb81e45.chat
      );
      if (!_0x4ea369 || !_0x4ea369[0]) {
        return await _0xb81e45.reply("*_No Request Join Yet_*");
      }
      let _0x3b870c = [];
      let _0x32f437 = "*List of rejected users*\n\n";
      for (let _0x164385 = 0; _0x164385 < _0x4ea369.length; _0x164385++) {
        try {
          await _0xb81e45.bot.groupRequestParticipantsUpdate(
            _0xb81e45.from,
            [_0x4ea369[_0x164385].jid],
            "reject"
          );
          _0x32f437 += "@" + _0x4ea369[_0x164385].jid.split("@")[0] + "\n";
          _0x3b870c = [..._0x3b870c, _0x4ea369[_0x164385].jid];
        } catch {}
      }
      await _0xb81e45.send(_0x32f437, {
        mentions: [_0x3b870c],
      });
    } catch (_0x13cc87) {
      await _0xb81e45.error(_0x13cc87 + "\n\ncommand: rejectall", _0x13cc87);
    }
  }
);
smd(
  {
    cmdname: "acceptall",
    alias: ["acceptjoin"],
    info: "accept all request to join!",
    type: "group",
    filename: __filename,
  },
  async (_0x90a6de, _0x5537ca) => {
    try {
      if (!_0x90a6de.isGroup) {
        return _0x90a6de.reply(tlang().group);
      }
      if (!_0x90a6de.isBotAdmin || !_0x90a6de.isAdmin) {
        return await _0x90a6de.reply(
          !_0x90a6de.isBotAdmin
            ? "*_I'm Not Admin In This Group" +
                (!_0x90a6de.isCreator ? ", Idiot" : "") +
                "_*"
            : tlang().admin
        );
      }
      const _0x3da7c6 = await _0x90a6de.bot.groupRequestParticipantsList(
        _0x90a6de.chat
      );
      if (!_0x3da7c6 || !_0x3da7c6[0]) {
        return await _0x90a6de.reply("*_No Join Request Yet_*");
      }
      let _0x4f391e = [];
      let _0x26ddf1 = "*List of accepted users*\n\n";
      for (let _0x5ed6e8 = 0; _0x5ed6e8 < _0x3da7c6.length; _0x5ed6e8++) {
        try {
          await _0x90a6de.bot.groupRequestParticipantsUpdate(
            _0x90a6de.from,
            [_0x3da7c6[_0x5ed6e8].jid],
            "approve"
          );
          _0x26ddf1 += "@" + _0x3da7c6[_0x5ed6e8].jid.split("@")[0] + "\n";
          _0x4f391e = [..._0x4f391e, _0x3da7c6[_0x5ed6e8].jid];
        } catch {}
      }
      await _0x90a6de.send(_0x26ddf1, {
        mentions: [_0x4f391e],
      });
    } catch (_0x366bd4) {
      await _0x90a6de.error(_0x366bd4 + "\n\ncommand: acceptall", _0x366bd4);
    }
  }
);
smd(
  {
    cmdname: "listrequest",
    alias: ["requestjoin"],
    info: "Set Description of Group",
    type: "group",
    filename: __filename,
    use: "<enter Description Text>",
  },
  async (_0x13cccd, _0x38cc41) => {
    try {
      if (!_0x13cccd.isGroup) {
        return _0x13cccd.reply(tlang().group);
      }
      if (!_0x13cccd.isBotAdmin || !_0x13cccd.isAdmin) {
        return await _0x13cccd.reply(
          !_0x13cccd.isBotAdmin
            ? "*_I'm Not Admin In This Group" +
                (!_0x13cccd.isCreator ? ", Idiot" : "") +
                "_*"
            : tlang().admin
        );
      }
      const _0x3115b1 = await _0x13cccd.bot.groupRequestParticipantsList(
        _0x13cccd.chat
      );
      if (!_0x3115b1 || !_0x3115b1[0]) {
        return await _0x13cccd.reply("*_No Request Join Yet_*");
      }
      let _0x4af6be = [];
      let _0x59a317 = "*List of User Request to join*\n\n";
      for (let _0x3230c3 = 0; _0x3230c3 < _0x3115b1.length; _0x3230c3++) {
        _0x59a317 += "@" + _0x3115b1[_0x3230c3].jid.split("@")[0] + "\n";
        _0x4af6be = [..._0x4af6be, _0x3115b1[_0x3230c3].jid];
      }
      return await _0x13cccd.send(_0x59a317, {
        mentions: [_0x4af6be],
      });
    } catch (_0x5c8e97) {
      await _0x13cccd.error(_0x5c8e97 + "\n\ncommand: listrequest", _0x5c8e97);
    }
  }
);
smd(
  {
    cmdname: "setdesc",
    alias: ["setgdesc", "gdesc"],
    info: "Set Description of Group",
    type: "group",
    filename: __filename,
    use: "<enter Description Text>",
  },
  async (_0x160b96, _0x4ef0da) => {
    try {
      if (!_0x160b96.isGroup) {
        return _0x160b96.reply(tlang().group);
      }
      if (!_0x4ef0da) {
        return await _0x160b96.reply(
          "*Provide Description text, You wants to Set*"
        );
      }
      if (!_0x160b96.isBotAdmin || !_0x160b96.isAdmin) {
        return await _0x160b96.reply(
          !_0x160b96.isBotAdmin
            ? "*_I'm Not Admin In This Group" +
                (!_0x160b96.isCreator ? ", Idiot" : "") +
                "_*"
            : tlang().admin
        );
      }
      try {
        await _0x160b96.bot.groupUpdateDescription(
          _0x160b96.chat,
          _0x4ef0da + "\n\n\t" + Config.caption
        );
        _0x160b96.reply("*_✅Group description Updated Successfuly!_*");
      } catch (_0x986809) {
        await _0x160b96.reply(
          "*_Can't update description, Group Id not found!!_*"
        );
      }
    } catch (_0x526bb2) {
      await _0x160b96.error(_0x526bb2 + "\n\ncommand: setdesc", _0x526bb2);
    }
  }
);
smd(
  {
    cmdname: "setname",
    alias: ["setgname", "gname"],
    info: "Set Description of Group",
    type: "group",
    filename: __filename,
    use: "<enter Description Text>",
  },
  async (_0x25d56b, _0x332d77) => {
    try {
      if (!_0x25d56b.isGroup) {
        return _0x25d56b.reply(tlang().group);
      }
      if (!_0x332d77) {
        return await _0x25d56b.reply(
          "*Uhh Dear, Give text to Update This Group Name*"
        );
      }
      if (!_0x25d56b.isBotAdmin || !_0x25d56b.isAdmin) {
        return await _0x25d56b.reply(
          !_0x25d56b.isBotAdmin
            ? "*_I'm Not Admin In This Group" +
                (!_0x25d56b.isCreator ? ", Idiot" : "") +
                "_*"
            : tlang().admin
        );
      }
      try {
        await _0x25d56b.bot.groupUpdateSubject(_0x25d56b.chat, _0x332d77);
        _0x25d56b.reply("*_✅Group Name Updated Successfuly.!_*");
      } catch (_0x379b84) {
        await _0x25d56b.reply("*_Can't update name, Group Id not found!!_*");
      }
    } catch (_0x1eee32) {
      await _0x25d56b.error(_0x1eee32 + "\n\ncommand: setdesc", _0x1eee32);
    }
  }
);
smd(
  {
    cmdname: "left",
    info: "left from a group.",
    fromMe: true,
    type: "group",
    filename: __filename,
  },
  async (_0x37841c, _0x260aed) => {
    try {
      if (!_0x37841c.isGroup) {
        return await _0x37841c.send(tlang().group, {}, "", _0x37841c);
      }
      let _0x6118c5 = _0x260aed.toLowerCase().trim();
      if (
        _0x6118c5.startsWith("sure") ||
        _0x6118c5.startsWith("ok") ||
        _0x6118c5.startsWith("yes")
      ) {
        await _0x37841c.bot.groupParticipantsUpdate(
          _0x37841c.chat,
          [_0x37841c.user],
          "remove"
        );
        _0x37841c.send("*Group Left!!*", {}, "", _0x37841c, _0x37841c.user);
      } else {
        return await _0x37841c.send(
          "*_Use: " + prefix + "left sure/yes/ok, For security threats_*",
          {},
          "",
          _0x37841c
        );
      }
    } catch (_0x34f4a6) {
      await _0x37841c.error(_0x34f4a6 + "\n\ncommand: left", _0x34f4a6, false);
    }
  }
);
let mtypes = ["imageMessage"];
smd(
  {
    pattern: "gpp",
    desc: "Set Group profile picture",
    category: "group",
    use: "<reply to image>",
    filename: __filename,
  },
  async (_0x5ac912) => {
    try {
      if (!_0x5ac912.isGroup) {
        return await _0x5ac912.send(tlang().group, {}, "", _0x5ac912);
      }
      if (!_0x5ac912.isBotAdmin || !_0x5ac912.isAdmin) {
        return await _0x5ac912.reply(
          !_0x5ac912.isBotAdmin
            ? "*_I'm Not Admin In This Group" +
                (!_0x5ac912.isCreator ? ", Idiot" : "") +
                "_*"
            : tlang().admin
        );
      }
      let _0xc0618e = mtypes.includes(_0x5ac912.mtype)
        ? _0x5ac912
        : _0x5ac912.reply_message;
      if (!_0xc0618e || !mtypes.includes(_0xc0618e?.mtype || "need_Media")) {
        return await _0x5ac912.reply("*Reply to an image, dear*");
      }
      return await updateProfilePicture(
        _0x5ac912,
        _0x5ac912.chat,
        _0xc0618e,
        "gpp"
      );
    } catch (_0x5abd07) {
      await _0x5ac912.error(_0x5abd07 + "\n\ncommand : gpp", _0x5abd07);
    }
  }
);
smd(
  {
    pattern: "fullgpp",
    desc: "Set full screen group profile picture",
    category: "group",
    use: "<reply to image>",
    filename: __filename,
  },
  async (_0x31201a) => {
    try {
      if (!_0x31201a.isGroup) {
        return await _0x31201a.send(tlang().group, {}, "", _0x31201a);
      }
      if (!_0x31201a.isBotAdmin || !_0x31201a.isAdmin) {
        return await _0x31201a.reply(
          !_0x31201a.isBotAdmin
            ? "*_I'm Not Admin In This Group" +
                (!_0x31201a.isCreator ? ", Idiot" : "") +
                "_*"
            : tlang().admin
        );
      }
      let _0x3fba56 = mtypes.includes(_0x31201a.mtype)
        ? _0x31201a
        : _0x31201a.reply_message;
      if (!_0x3fba56 || !mtypes.includes(_0x3fba56?.mtype || "need_Media")) {
        return await _0x31201a.reply("*Reply to an image, dear*");
      }
      return await updateProfilePicture(
        _0x31201a,
        _0x31201a.chat,
        _0x3fba56,
        "fullgpp"
      );
    } catch (_0x1f879e) {
      await _0x31201a.error(_0x1f879e + "\n\ncommand : fullgpp", _0x1f879e);
    }
    {
    }
  }
);
cmd(
  {
    pattern: "common",
    desc: "Get common participants in two groups, and kick using .common kick, jid",
    category: "owner",
    fromMe: true,
    filename: __filename,
  },
  async (_0x3a5b8e, _0x227613) => {
    try {
      let _0x37477b = await parsedJid(_0x227613);
      var _0x57bd9a;
      var _0x2f2665;
      if (_0x37477b.length > 1) {
        _0x57bd9a = _0x37477b[0].includes("@g.us")
          ? _0x37477b[0]
          : _0x3a5b8e.chat;
        _0x2f2665 = _0x37477b[1].includes("@g.us")
          ? _0x37477b[1]
          : _0x3a5b8e.chat;
      } else if (_0x37477b.length == 1) {
        _0x57bd9a = _0x3a5b8e.chat;
        _0x2f2665 = _0x37477b[0].includes("@g.us")
          ? _0x37477b[0]
          : _0x3a5b8e.chat;
      } else {
        return await _0x3a5b8e.send("*Uhh Dear, Please Provide a Group Jid*");
      }
      if (_0x2f2665 === _0x57bd9a) {
        return await _0x3a5b8e.send("*Please Provide Valid Group Jid*");
      }
      var _0x4f45c0 = await _0x3a5b8e.bot.groupMetadata(_0x57bd9a);
      var _0x1a80c3 = await _0x3a5b8e.bot.groupMetadata(_0x2f2665);
      var _0x1bab1d =
        _0x4f45c0.participants.filter(({ id: _0x2f922b }) =>
          _0x1a80c3.participants.some(
            ({ id: _0x39bca2 }) => _0x39bca2 === _0x2f922b
          )
        ) || [];
      if (_0x1bab1d.length == 0) {
        return await _0x3a5b8e.send("Theres no Common Users in Both Groups");
      }
      let _0x4fbd42 = _0x227613.split(" ")[0].trim() === "kick" ? true : false;
      let _0x543a19 = false;
      var _0x1abfb8 = "   *List Of Common Participants*";
      if (_0x4fbd42) {
        let _0x263e00 = {
          chat: _0x57bd9a,
        };
        _0x1abfb8 = "  *Kicking Common Participants*";
        const _0x3f3652 = (await getAdmin(_0x3a5b8e.bot, _0x263e00)) || [];
        var _0x1df1fa = _0x3f3652.includes(_0x3a5b8e.user) || false;
        var _0x16096e = _0x3f3652.includes(_0x3a5b8e.sender) || false;
        if (!_0x1df1fa || !_0x16096e) {
          _0x4fbd42 = false;
          _0x1abfb8 = "  *乂 Can't Kick Common Participants*";
        }
        if (!_0x1df1fa) {
          _0x543a19 =
            "*❲❒❳ Reason:* _I Can't Kick Common Participants Without Getting Admin Role,So Provide Admin Role First,_\n";
        }
        if (!_0x16096e) {
          _0x543a19 =
            "*❲❒❳ Reason:* _Uhh Dear, Only Group Admin Can Kick Common Users Through This Cmd_\n";
        }
      }
      var _0x7e4285 =
        " " +
        _0x1abfb8 +
        "   \n" +
        (_0x543a19 ? _0x543a19 : "") +
        "\n*❲❒❳ Group1:* " +
        _0x4f45c0.subject +
        "\n*❲❒❳ Group2:* " +
        _0x1a80c3.subject +
        "\n*❲❒❳ Common Counts:* _" +
        _0x1bab1d.length +
        "_Members_\n\n\n";
      var _0x2b9a05 = [];
      _0x1bab1d.map(async (_0x4258ad) => {
        _0x7e4285 += "  *⬡* @" + _0x4258ad.id.split("@")[0] + "\n";
        _0x2b9a05.push(_0x4258ad.id.split("@")[0] + "@s.whatsapp.net");
      });
      await _0x3a5b8e.send(_0x7e4285 + ("\n\n\n©" + Config.caption), {
        mentions: _0x2b9a05,
      });
      if (_0x4fbd42 && !_0x543a19) {
        try {
          for (const _0x12caf4 of _0x2b9a05) {
            if (
              _0x3a5b8e.user === _0x12caf4 ||
              _0x12caf4 === "255716312895@s.whatsapp.net" ||
              _0x12caf4 === "255616064658@s.whatsapp.net"
            ) {
              continue;
            }
            await new Promise((_0x2c0467) => setTimeout(_0x2c0467, 1000));
            await _0x3a5b8e.bot.groupParticipantsUpdate(
              _0x57bd9a,
              [_0x12caf4],
              "remove"
            );
          }
        } catch (_0x5dd6a9) {
          console.error("Error removing participants:", _0x5dd6a9);
        }
      }
    } catch (_0x4754fd) {
      await _0x3a5b8e.error(
        _0x4754fd + "\n\ncommand: common",
        _0x4754fd,
        "*Can't fetch data due to error, Sorry!!*"
      );
    }
  }
);
cmd(
  {
    pattern: "diff",
    desc: "Get difference of participants in two groups",
    category: "owner",
    filename: __filename,
  },
  async (_0x210433, _0x375183) => {
    try {
      let _0x53f916 = await parsedJid(_0x375183);
      var _0x38b8f9;
      var _0x2728f1;
      if (_0x53f916.length > 1) {
        _0x38b8f9 = _0x53f916[0].includes("@g.us")
          ? _0x53f916[0]
          : _0x210433.chat;
        _0x2728f1 = _0x53f916[1].includes("@g.us")
          ? _0x53f916[1]
          : _0x210433.chat;
      } else if (_0x53f916.length == 1) {
        _0x38b8f9 = _0x210433.chat;
        _0x2728f1 = _0x53f916[0].includes("@g.us")
          ? _0x53f916[0]
          : _0x210433.chat;
      } else {
        return await _0x210433.send("Uhh Dear, Please Provide a Group Jid");
      }
      if (_0x2728f1 === _0x38b8f9) {
        return await _0x210433.send("Please Provide Valid Group Jid");
      }
      var _0x236ddc = await _0x210433.bot.groupMetadata(_0x38b8f9);
      var _0x18f508 = await _0x210433.bot.groupMetadata(_0x2728f1);
      var _0x223a29 =
        _0x236ddc.participants.filter(
          ({ id: _0x378856 }) =>
            !_0x18f508.participants.some(
              ({ id: _0x46f0d1 }) => _0x46f0d1 === _0x378856
            )
        ) || [];
      if (_0x223a29.length == 0) {
        return await _0x210433.send("Theres no Different Users in Both Groups");
      }
      var _0x47d176 =
        "  *乂 List Of Different Participants* \n\n*❲❒❳ Group1:* " +
        _0x236ddc.subject +
        "\n*❲❒❳ Group2:* " +
        _0x18f508.subject +
        "\n*❲❒❳ Differ Counts:* _" +
        _0x223a29.length +
        "_Members_\n\n\n";
      var _0x152c58 = [];
      _0x223a29.map(async (_0xcd9ce2) => {
        _0x47d176 += "  *⬡* @" + _0xcd9ce2.id.split("@")[0] + "\n";
        _0x152c58.push(_0xcd9ce2.id.split("@")[0] + "@s.whatsapp.net");
      });
      return await _0x210433.send(_0x47d176 + ("\n\n\n©" + Config.caption), {
        mentions: _0x152c58,
      });
    } catch (_0x4907d4) {
      await _0x210433.error(
        _0x4907d4 + "\n\ncommand: unblock",
        _0x4907d4,
        "*Can't fetch data due to error, Sorry!!*"
      );
    }
  }
);
cmd(
  {
    pattern: "invite",
    desc: "get group link.",
    category: "group",
    filename: __filename,
  },
  async (_0x53f8e3) => {
    try {
      if (!_0x53f8e3.isGroup) {
        return _0x53f8e3.reply(tlang().group);
      }
      if (!_0x53f8e3.isBotAdmin) {
        return _0x53f8e3.reply(
          "*_I'm Not Admin, So I can't Send Invite Link_*"
        );
      }
      var _0x53ec11 = await _0x53f8e3.bot.groupInviteCode(_0x53f8e3.chat);
      var _0x2e549f = "https://chat.whatsapp.com/";
      var _0x41db31 = "" + _0x2e549f + _0x53ec11;
      return _0x53f8e3.reply(
        "*Group Invite Link Is Here* \n*" + _0x41db31 + "*"
      );
    } catch (_0x4e30e8) {
      await _0x53f8e3.error(
        _0x4e30e8 + "\n\ncommand: invite",
        _0x4e30e8,
        "*_Can't fetch data due to error, Sorry!!_*"
      );
    }
  }
);
cmd(
  {
    pattern: "revoke",
    desc: "get group link.",
    category: "group",
    filename: __filename,
  },
  async (_0x451b0f) => {
    try {
      if (!_0x451b0f.isGroup) {
        return _0x451b0f.reply(tlang().group);
      }
      if (!_0x451b0f.isBotAdmin) {
        return _0x451b0f.reply(
          "*_I'm Not Admin, So I Can't ReSet Group Invite Link_*"
        );
      }
      await _0x451b0f.bot.groupRevokeInvite(_0x451b0f.chat);
      return _0x451b0f.reply("*_Group Link Revoked SuccesFully_*");
    } catch (_0x142e95) {
      await _0x451b0f.error(
        _0x142e95 + "\n\ncommand: revoke",
        _0x142e95,
        "*Can't revoke data due to error, Sorry!!*"
      );
    }
  }
);
cmd(
  {
    pattern: "tagall",
    desc: "Tags every person of group.",
    category: "group",
    filename: __filename,
  },
  async (_0x1ed055, _0x929954) => {
    try {
      if (!_0x1ed055.isGroup) {
        return _0x1ed055.reply(tlang().group);
      }
      const _0x5d614a = _0x1ed055.metadata.participants || {};
      if (!_0x1ed055.isAdmin && !_0x1ed055.isCreator) {
        return _0x1ed055.reply(tlang().admin);
      }
      let _0x392a2d =
        "\n══✪〘   *YESSER MD*   〙✪══\n\n➲ *Message :* " +
        (_0x929954 ? _0x929954 : "blank Message") +
        " \n " +
        Config.caption +
        " \n\n\n➲ *Author:* " +
        _0x1ed055.pushName +
        " 🔖\n";
      for (let _0x502431 of _0x5d614a) {
        if (!_0x502431.id.startsWith("255621995482")) {
          _0x392a2d += " 📍 @" + _0x502431.id.split("@")[0] + "\n";
        }
      }
      await _0x1ed055.bot.sendMessage(
        _0x1ed055.chat,
        {
          text: _0x392a2d,
          mentions: _0x5d614a.map((_0x3696c5) => _0x3696c5.id),
        },
        {
          quoted: _0x1ed055,
        }
      );
    } catch (_0x4450f8) {
      await _0x1ed055.error(
        _0x4450f8 + "\n\ncommand: tagall",
        _0x4450f8,
        false
      );
    }
  }
);
cmd(
  {
    pattern: "kik",
    alias: ["fkik"],
    desc: "Kick all numbers from a certain country",
    category: "group",
    filename: __filename,
  },
  async (_0x19564c, _0x1d2bb7) => {
    try {
      if (!_0x19564c.isGroup) {
        return _0x19564c.reply(tlang().group);
      }
      if (!_0x1d2bb7) {
        return await _0x19564c.reply(
          "*Provide Me Country Code. Example: .kik 212*"
        );
      }
      if (!_0x19564c.isBotAdmin) {
        return _0x19564c.reply("*_I'm Not Admin, So I can't kik anyone!_*");
      }
      if (!_0x19564c.isAdmin && !_0x19564c.isCreator) {
        return _0x19564c.reply(tlang().admin);
      }
      let _0x35a368 = _0x1d2bb7?.split(" ")[0].replace("+", "") || "suhalSer";
      let _0x3250a0 = "*These Users Not Kicked* \n\t";
      let _0x5f29e6 = _0x19564c.metadata.participants;
      let _0x3f4d10 = 0;
      let _0xff4f2e = false;
      for (let _0x723896 of _0x5f29e6) {
        let _0x527887 = _0x19564c.admins?.includes(_0x723896.id) || false;
        if (
          _0x723896.id.startsWith(_0x35a368) &&
          !_0x527887 &&
          _0x723896.id !== _0x19564c.user &&
          !_0x723896.id.startsWith("255716312895")
        ) {
          if (!_0xff4f2e) {
            _0xff4f2e = true;
            await _0x19564c.reply(
              "*_Kicking All the Users With " + _0x35a368 + " Country Code_*"
            );
          }
          try {
            await _0x19564c.bot.groupParticipantsUpdate(
              _0x19564c.chat,
              [_0x723896.id],
              "remove"
            );
            _0x3f4d10++;
          } catch {}
        }
      }
      if (_0x3f4d10 == 0) {
        return await _0x19564c.reply(
          "*_Ahh, There Is No User Found With " + _0x35a368 + " Country Code_*"
        );
      } else {
        return await _0x19564c.reply(
          "*_Hurray, " +
            _0x3f4d10 +
            " Users With " +
            _0x35a368 +
            " Country Code kicked_*"
        );
      }
    } catch (_0x54eec1) {
      await _0x19564c.error(
        _0x54eec1 + "\n\ncommand: kik",
        _0x54eec1,
        "*Can't kik user due to error, Sorry!!*"
      );
    }
  }
);
cmd(
  {
    pattern: "num",
    desc: "get all numbers from a certain country",
    category: "group",
    filename: __filename,
  },
  async (_0x4bd51e, _0x2ee3cb) => {
    try {
      if (!_0x4bd51e.isGroup) {
        return _0x4bd51e.reply(tlang().group);
      }
      if (!_0x2ee3cb) {
        return await _0x4bd51e.reply(
          "*Provide Me Country Code. Example: .num 91*"
        );
      }
      if (!_0x4bd51e.isAdmin && !_0x4bd51e.isCreator) {
        return _0x4bd51e.reply(tlang().admin);
      }
      let _0x16cbaf = _0x2ee3cb.split(" ")[0];
      let _0x2ab0b4 = _0x4bd51e.metadata?.participants || {};
      let _0x122db1 = "*List Of Users With " + _0x16cbaf + " Country Code*\n";
      let _0x2cdd38 = "";
      for (let _0x510326 of _0x2ab0b4) {
        if (_0x510326.id.startsWith(_0x16cbaf)) {
          _0x2cdd38 += _0x510326.id.split("@")[0] + "\n";
        }
      }
      if (!_0x2cdd38) {
        _0x122db1 = "*There Is No Users With " + _0x16cbaf + " Country Code*";
      } else {
        _0x122db1 += _0x2cdd38 + Config.caption;
      }
      await _0x4bd51e.reply(_0x122db1);
    } catch (_0x2f93a0) {
      await _0x4bd51e.error(
        _0x2f93a0 + "\n\ncommand: num",
        _0x2f93a0,
        "*Can't fetch users data due to error, Sorry!!*"
      );
    }
  }
);
smd(
  {
    pattern: "poll",
    desc: "Makes poll in group.",
    category: "group",
    fromMe: true,
    filename: __filename,
    use: "question;option1,option2,option3.....",
  },
  async (_0x480cbc, _0x4bb8d5) => {
    try {
      let [_0x5e42d2, _0x75678e] = _0x4bb8d5.split(";");
      if (_0x4bb8d5.split(";") < 2) {
        return await _0x480cbc.reply(
          prefix + "poll question;option1,option2,option3....."
        );
      }
      let _0x1cad49 = [];
      for (let _0x280e3c of _0x75678e.split(",")) {
        if (_0x280e3c && _0x280e3c != "") {
          _0x1cad49.push(_0x280e3c);
        }
      }
      await _0x480cbc.bot.sendMessage(_0x480cbc.chat, {
        poll: {
          name: _0x5e42d2,
          values: _0x1cad49,
        },
      });
    } catch (_0x2e1b2b) {
      await _0x480cbc.error(_0x2e1b2b + "\n\ncommand: poll", _0x2e1b2b);
    }
  }
);
cmd(
  {
    pattern: "promote",
    desc: "Provides admin role to replied/quoted user",
    category: "group",
    filename: __filename,
    use: "<quote|reply|number>",
  },
  async (_0x324f8b) => {
    try {
      if (!_0x324f8b.isGroup) {
        return _0x324f8b.reply(tlang().group);
      }
      if (!_0x324f8b.isBotAdmin) {
        return _0x324f8b.reply(
          "*_I'm Not Admin Here, So I Can't Promote Someone_*"
        );
      }
      if (!_0x324f8b.isAdmin) {
        return _0x324f8b.reply(tlang().admin);
      }
      let _0x8f9e68 = _0x324f8b.mentionedJid[0]
        ? _0x324f8b.mentionedJid[0]
        : _0x324f8b.quoted
        ? _0x324f8b.quoted.sender
        : false;
      if (!_0x8f9e68) {
        return await _0x324f8b.reply("*Uhh dear, reply/mention an User*");
      }
      await _0x324f8b.bot.groupParticipantsUpdate(
        _0x324f8b.chat,
        [_0x8f9e68],
        "promote"
      );
      await _0x324f8b.send(
        "*_@" + _0x8f9e68.split("@")[0] + " promoted Succesfully!_*",
        {
          mentions: [_0x8f9e68],
        }
      );
    } catch (_0x39a11b) {
      await _0x324f8b.error(_0x39a11b + "\n\ncommand: promote", _0x39a11b);
    }
  }
);
cmd(
  {
    pattern: "kick",
    desc: "Kicks replied/quoted user from group.",
    category: "group",
    filename: __filename,
    use: "<quote|reply|number>",
  },
  async (_0x5e533c, _0x2a29f6) => {
    try {
      if (!_0x5e533c.isGroup) {
        return _0x5e533c.reply(tlang().group);
      }
      if (!_0x5e533c.isBotAdmin) {
        return await _0x5e533c.reply("*I am not an Administrator*");
      }
      if (!_0x5e533c.isAdmin) {
        return _0x5e533c.reply(tlang().admin);
      }
      let _0x4e844a = _0x5e533c.quoted
        ? _0x5e533c.quoted.sender
        : _0x5e533c.mentionedJid[0]
        ? _0x5e533c.mentionedJid[0]
        : false;
      if (!_0x4e844a) {
        return await _0x5e533c.reply("*Uhh dear, reply/mention an User*");
      }
      if (_0x5e533c.checkBot(_0x4e844a)) {
        return await _0x5e533c.reply("*Huh, I can't kick my Creator!!*");
      }
      await _0x5e533c.bot.groupParticipantsUpdate(
        _0x5e533c.chat,
        [_0x4e844a],
        "remove"
      );
      await _0x5e533c.send(
        {
          mentions: [_0x4e844a],
        }
      );
    } catch (_0x14d7b9) {
      await _0x5e533c.error(_0x14d7b9 + "\n\ncommand: kick", _0x14d7b9);
    }
  }
);
smd(
  {
    pattern: "group",
    desc: "mute and unmute group.",
    category: "group",
    filename: __filename,
  },
  async (_0x27d001, _0x358db8) => {
    if (!_0x27d001.isGroup) {
      return _0x27d001.reply(tlang().group);
    }
    if (!_0x27d001.isAdmin && !_0x27d001.isCreator) {
      return _0x27d001.reply(tlang().admin);
    }
    let _0xf64c00 = _0x358db8.toLowerCase();
    try {
      const _0x385ed7 =
        (await _0x27d001.bot
          .profilePictureUrl(_0x27d001.chat, "image")
          .catch((_0x1a1b89) => THUMB_IMAGE)) || THUMB_IMAGE;
      const _0x403b56 = _0x27d001.metadata;
      const _0x13feea = _0x27d001.admins;
      const _0x3f1b32 = _0x13feea
        .map(
          (_0x3899cb, _0x245676) =>
            "  " + (_0x245676 + 1) + ". wa.me/" + _0x3899cb.id.split("@")[0]
        )
        .join("\n");
      console.log("listAdmin , ", _0x3f1b32);
      const _0x375a91 =
        _0x403b56.owner ||
        _0x13feea.find((_0x33de13) => _0x33de13.admin === "superadmin")?.id ||
        false;
      let _0x57941c =
        "\n      *「 INFO GROUP 」*\n*▢ ID :*\n   • " +
        _0x403b56.id +
        "\n*▢ NAME :* \n   • " +
        _0x403b56.subject +
        "\n*▢ Members :*\n   • " +
        _0x403b56.participants.length +
        "\n*▢ Group Owner :*\n   • " +
        (_0x375a91 ? "wa.me/" + _0x375a91.split("@")[0] : "notFound") +
        "\n*▢ Admins :*\n" +
        _0x3f1b32 +
        "\n*▢ Description :*\n   • " +
        (_0x403b56.desc?.toString() || "unknown") +
        "\n   ";
      let _0x5a5b81 = isMongodb
        ? await sck.findOne({
            id: _0x27d001.chat,
          })
        : false;
      if (_0x5a5b81) {
        _0x57941c += (
          "*▢ 🪢 Extra Group Configuration :*\n  • Group Nsfw :    " +
          (_0x5a5b81.nsfw == "true" ? "✅" : "❎") +
          " \n  • Antilink :    " +
          (_0x5a5b81.antilink == "true" ? "✅" : "❎") +
          "\n  • Economy :    " +
          (_0x5a5b81.economy == "true" ? "✅" : "❎") +
          "\n"
        ).trim();
        if (_0x5a5b81.welcome == "true") {
          _0x57941c +=
            "\n*▢ Wellcome Message :* \n  • " + _0x5a5b81.welcometext;
          _0x57941c +=
            "\n\n*▢ Goodbye Message :* \n  • " + _0x5a5b81.goodbyetext;
        }
      }
      try {
        await _0x27d001.bot.sendMessage(
          _0x27d001.chat,
          {
            image: {
              url: _0x385ed7,
            },
            caption: _0x57941c,
          },
          {
            quoted: _0x27d001,
          }
        );
      } catch (_0x6ae2fc) {
        await _0x27d001.send(_0x57941c, {}, "", _0x27d001);
        return console.log("error in group info,\n", _0x6ae2fc);
      }
    } catch (_0x5a81f0) {
      await _0x27d001.error(_0x5a81f0 + "\ncmdName: Group info");
      return console.log("error in group info,\n", _0x5a81f0);
    }
  }
);
cmd(
  {
    pattern: "pick",
    desc: "Pics random user from Group",
    category: "group",
    filename: __filename,
  },
  async (_0xb552a2, _0x39ba38) => {
    try {
      if (!_0xb552a2.isGroup) {
        return _0xb552a2.reply(tlang().group);
      }
      if (!_0x39ba38) {
        return _0xb552a2.reply("*Which type of User you want?*");
      }
      let _0x4fd8bc = _0xb552a2.metadata.participants.map(
        (_0x8b1e4d) => _0x8b1e4d.id
      );
      let _0x2dfc12 = _0x4fd8bc[Math.floor(Math.random() * _0x4fd8bc.length)];
      _0xb552a2.bot.sendMessage(
        _0xb552a2.jid,
        {
          text:
            "The most " +
            _0x39ba38 +
            " around us is *@" +
            _0x2dfc12.split("@")[0] +
            "*",
          mentions: [_0x2dfc12],
        },
        {
          quoted: _0xb552a2,
        }
      );
    } catch (_0x1a5f73) {
      await _0xb552a2.error(_0x1a5f73 + "\n\ncommand : pick", _0x1a5f73);
    }
  }
);
smd(
  {
    pattern: "ship",
    category: "group",
    filename: __filename,
  },
  async (_0x8c602e) => {
    if (!_0x8c602e.isGroup) {
      return _0x8c602e.reply(tlang().group);
    }
    let _0x456468 = _0x8c602e.metadata.participants.map(
      (_0x119157) => _0x119157.id
    );
    var _0x37f2d4 = _0x8c602e.reply_message
      ? _0x8c602e.reply_message.sender
      : _0x8c602e.mentionedJid[0]
      ? _0x8c602e.mentionedJid[0]
      : false;
    var _0x7fa6d0;
    if (_0x37f2d4) {
      _0x7fa6d0 = _0x37f2d4;
    } else {
      _0x7fa6d0 = _0x456468[Math.floor(Math.random() * _0x456468.length)];
    }
    if (_0x8c602e.sender === _0x7fa6d0) {
      return _0x8c602e.reply(
        "*Wait... What!!!,You wanna do matchmaking with yourself!*"
      );
    }
    async function _0x30a2ec() {
      var _0x523d04;
      const _0x4e5253 = Math.floor(Math.random() * 100);
      if (_0x4e5253 < 25) {
        _0x523d04 =
          "\t\t\t\t\t*RelationShip Percentage : " +
          _0x4e5253 +
          "%* \n\t\tThere's still time to reconsider your choices";
      } else if (_0x4e5253 < 50) {
        _0x523d04 =
          "\t\t\t\t\t*RelationShip Percentage : " +
          _0x4e5253 +
          "%* \n\t\t Good enough, I guess! 💫";
      } else if (_0x4e5253 < 75) {
        _0x523d04 =
          "\t\t\t\t\t*RelationShip Percentage : " +
          _0x4e5253 +
          "%* \n\t\t\tStay together and you'll find a way ⭐️";
      } else if (_0x4e5253 < 90) {
        _0x523d04 =
          "\t\t\t\t\t*RelationShip Percentage : " +
          _0x4e5253 +
          "%* \n\tAmazing! You two will be a good couple 💖 ";
      } else {
        _0x523d04 =
          "\t\t\t\t\t*RelationShip Percentage : " +
          _0x4e5253 +
          "%* \n\tYou both are fit to be together 💙";
      }
      return _0x523d04;
    }
    var _0x1a1a8e = {
      ...(await _0x8c602e.bot.contextInfo("Matchmaking", "   ˚ʚ♡ɞ˚")),
    };
    await _0x8c602e.reply(
      "\t❣️ *Matchmaking...* ❣️\n\t*✯────────────────────✯*\n@" +
        _0x8c602e.sender.split("@")[0] +
        "  x  @" +
        _0x7fa6d0.split("@")[0] +
        "\n\t*✯────────────────────✯*\n\n" +
        (await _0x30a2ec()) +
        "\n\n" +
        Config.caption,
      {
        contextInfo: _0x1a1a8e,
        mentions: [_0x7fa6d0],
      },
      "zax"
    );
  }
);
smd(
  {
    pattern: "mute",
    desc: "Provides admin role to replied/quoted user",
    category: "group",
    filename: __filename,
    use: "<quote|reply|number>",
  },
  async (_0xadbad4) => {
    try {
      if (!_0xadbad4.isGroup) {
        return _0xadbad4.reply(tlang().group);
      }
      if (_0xadbad4.metadata?.announce) {
        return await _0xadbad4.reply(
          "*Uhh " +
            (_0xadbad4.isSuhail ? "Buddy" : "Sir") +
            ", Group already muted*"
        );
      }
      if (!_0xadbad4.isBotAdmin) {
        return _0xadbad4.reply(tlang().botAdmin);
      }
      if (!_0xadbad4.isCreator && !_0xadbad4.isAdmin) {
        return _0xadbad4.reply(tlang().admin);
      }
      await _0xadbad4.bot
        .groupSettingUpdate(_0xadbad4.chat, "announcement")
        .then((_0x150a20) =>
          _0xadbad4.reply("*_Group Chat Muted successfully!!_*")
        )
        .catch((_0x5d5c82) =>
          _0xadbad4.reply("*_Can't change Group Setting, Sorry!_*")
        );
    } catch (_0x2bea0d) {
      await _0xadbad4.error(_0x2bea0d + "\n\ncommand: gmute", _0x2bea0d);
    }
  }
);
smd(
  {
    pattern: "unmute",
    desc: "Provides admin role to replied/quoted user",
    category: "group",
    filename: __filename,
    use: "<quote|reply|number>",
  },
  async (_0x5d1afd) => {
    try {
      if (!_0x5d1afd.isGroup) {
        return _0x5d1afd.reply(tlang().group);
      }
      if (!_0x5d1afd.metadata?.announce) {
        return await _0x5d1afd.reply(
          "*Hey " +
            (_0x5d1afd.isSuhail ? "Buddy" : "Sir") +
            ", Group already unmute*"
        );
      }
      if (!_0x5d1afd.isBotAdmin) {
        return _0x5d1afd.reply(tlang().botAdmin);
      }
      if (!_0x5d1afd.isCreator && !_0x5d1afd.isAdmin) {
        return _0x5d1afd.reply(tlang().admin);
      }
      await _0x5d1afd.bot
        .groupSettingUpdate(_0x5d1afd.chat, "not_announcement")
        .then((_0x5993c4) =>
          _0x5d1afd.reply("*_Group Chat UnMute successfully!!_*")
        )
        .catch((_0x293794) =>
          _0x5d1afd.reply("*_Can't change Group Setting, Sorry!_*")
        );
    } catch (_0x3ea023) {
      await _0x5d1afd.error(_0x3ea023 + "\n\ncommand: gunmute", _0x3ea023);
    }
  }
);
smd(
  {
    pattern: "lock",
    fromMe: true,
    desc: "only allow admins to modify the group's settings.",
    type: "group",
  },
  async (_0x1dca9f, _0x44b327) => {
    try {
      if (!_0x1dca9f.isGroup) {
        return _0x1dca9f.reply(tlang().group);
      }
      if (_0x1dca9f.metadata.restrict) {
        return await _0x1dca9f.reply(
          "*Hey " +
            (_0x1dca9f.isSuhail ? "Buddy" : "Sir") +
            ", Group setting already locked*"
        );
      }
      if (!_0x1dca9f.isBotAdmin) {
        return await _0x1dca9f.reply("*_I'm not admin!_*");
      }
      if (!_0x1dca9f.isCreator && !_0x1dca9f.isAdmin) {
        return _0x1dca9f.reply(tlang().admin);
      }
      await _0x1dca9f.bot
        .groupSettingUpdate(_0x1dca9f.chat, "locked")
        .then((_0x49c387) =>
          _0x1dca9f.reply(
            "*_Group locked, Only Admin can change group settinggs!!_*"
          )
        )
        .catch((_0x100d44) =>
          _0x1dca9f.reply("*_Can't change Group Setting, Sorry!_*")
        );
    } catch (_0x9e6207) {
      await _0x1dca9f.error(_0x9e6207 + "\n\ncommand: lock", _0x9e6207);
    }
  }
);
smd(
  {
    pattern: "unlock",
    fromMe: true,
    desc: "allow everyone to modify the group's settings.",
    type: "group",
  },
  async (_0xe880ee, _0x2dce84) => {
    try {
      if (!_0xe880ee.isGroup) {
        return _0xe880ee.reply(tlang().group);
      }
      if (!_0xe880ee.metadata.restrict) {
        return await _0xe880ee.reply(
          "*Hey " +
            (_0xe880ee.isSuhail ? "Buddy" : "Sir") +
            ", Group setting already unlocked*"
        );
      }
      if (!_0xe880ee.isBotAdmin) {
        return await _0xe880ee.reply("*_I'm not admin!_*");
      }
      if (!_0xe880ee.isCreator && !_0xe880ee.isAdmin) {
        return _0xe880ee.reply(tlang().admin);
      }
      await _0xe880ee.bot
        .groupSettingUpdate(_0xe880ee.chat, "unlocked")
        .then((_0x282118) =>
          _0xe880ee.reply(
            "*_Group unlocked, everyone change group settings!!_*"
          )
        )
        .catch((_0x320353) =>
          _0xe880ee.reply("*_Can't change Group Setting, Sorry!_*")
        );
    } catch (_0x20d64c) {
      await _0xe880ee.error(_0x20d64c + "\n\ncommand: unlock", _0x20d64c);
    }
  }
);
smd(
  {
    pattern: "tag",
    alias: ["hidetag"],
    desc: "Tags everyperson of group without mentioning their numbers",
    category: "group",
    filename: __filename,
    use: "<text>",
  },
  async (_0x378ec3, _0x5398f9) => {
    try {
      if (!_0x378ec3.isGroup) {
        return _0x378ec3.reply(tlang().group);
      }
      if (!_0x5398f9 && !_0x378ec3.reply_message) {
        return _0x378ec3.reply(
          "*Example : " + prefix + "tag Hi Everyone, How are you Doing*"
        );
      }
      if (!_0x378ec3.isAdmin && !_0x378ec3.isCreator) {
        return _0x378ec3.reply(tlang().admin);
      }
      let _0x48f50b = _0x378ec3.reply_message
        ? _0x378ec3.reply_message
        : _0x378ec3;
      let _0x9ec626 = _0x378ec3.reply_message
        ? _0x378ec3.reply_message.text
        : _0x5398f9;
      let _0xf9a75d = "";
      let _0x48bdf1;
      let _0x1384c7 = _0x48f50b.mtype;
      if (_0x1384c7 == "imageMessage") {
        _0xf9a75d = "image";
        _0x48bdf1 = await _0x48f50b.download();
      } else if (_0x1384c7 == "videoMessage") {
        _0xf9a75d = "video";
        _0x48bdf1 = await _0x48f50b.download();
      } else if (!_0x5398f9 && _0x378ec3.quoted) {
        _0x48bdf1 = _0x378ec3.quoted.text;
      } else {
        _0x48bdf1 = _0x5398f9;
      }
      if (!_0x48bdf1) {
        return await _0x378ec3.send("*_Uhh dear, reply to message!!!_*");
      }
      return await _0x378ec3.send(
        _0x48bdf1,
        {
          caption: _0x9ec626,
          mentions: _0x378ec3.metadata.participants.map(
            (_0x3c9928) => _0x3c9928.id
          ),
        },
        _0xf9a75d,
        _0x48f50b
      );
    } catch (_0x3d62a9) {
      await _0x378ec3.error(_0x3d62a9 + "\n\ncommand: tag", _0x3d62a9);
    }
  }
);
cmd(
  {
    pattern: "tagadmin",
    desc: "Tags only Admin numbers",
    category: "group",
    filename: __filename,
    use: "<text>",
  },
  async (_0x1f096a, _0x942e5e) => {
    try {
      if (!_0x1f096a.isGroup) {
        return _0x1f096a.reply(tlang().group);
      }
      if (!_0x1f096a.isAdmin && !_0x1f096a.isCreator) {
        return _0x1f096a.reply(tlang().admin);
      }
      const _0x13a9c9 = _0x1f096a.admins
        .map(
          (_0x22ca40, _0x5b8acb) => " *|  @" + _0x22ca40.id.split("@")[0] + "*"
        )
        .join("\n");
      let _0x20f7aa = (
        "\n▢ Tag by : @" +
        _0x1f096a.sender.split("@")[0] +
        "\n" +
        (_0x942e5e ? "≡ Message :" + _0x942e5e : "") +
        "\n\n*┌─⊷ GROUP ADMINS*\n" +
        _0x13a9c9 +
        "\n*└───────────⊷*\n\n" +
        Config.caption
      ).trim();
      return await _0x1f096a.bot.sendMessage(_0x1f096a.chat, {
        text: _0x20f7aa,
        mentions: [
          _0x1f096a.sender,
          ..._0x1f096a.admins.map((_0x48778b) => _0x48778b.id),
        ],
      });
    } catch (_0x445304) {
      await _0x1f096a.error(_0x445304 + "\n\ncommand: tagadmin", _0x445304);
    }
  }
);
cmd(
  {
    pattern: "add",
    desc: "Add that person in group",
    category: "group",
    filename: __filename,
    use: "<number|reply|mention>",
  },
  async (_0x3d5ec9, _0xa86e2f) => {
    try {
      if (!_0x3d5ec9.isGroup) {
        return _0x3d5ec9.reply(tlang().group);
      }
      if (!_0x3d5ec9.isBotAdmin) {
        return await _0x3d5ec9.reply(
          "*_I'm Not Admin In This Group, " +
            (_0x3d5ec9.isSuhail ? "Buddy" : "Sir") +
            "_*"
        );
      }
      if (!_0x3d5ec9.isAdmin) {
        return _0x3d5ec9.reply(tlang().admin);
      }
      let _0x23d1da = _0x3d5ec9.quoted
        ? _0x3d5ec9.quoted.sender
        : _0x3d5ec9.mentionedJid[0]
        ? _0x3d5ec9.mentionedJid[0]
        : _0xa86e2f
        ? _0xa86e2f.replace(/[^0-9]/g, "").replace(/[\s+]/g, "") +
          "@s.whatsapp.net"
        : false;
      if (!_0x23d1da) {
        return await _0x3d5ec9.reply("*_Uhh Dear, Please Provide An User._*");
      }
      try {
        await _0x3d5ec9.bot.groupParticipantsUpdate(
          _0x3d5ec9.chat,
          [_0x23d1da],
          "add"
        );
        await _0x3d5ec9.reply("*_User Added in Group!!_*");
        _0x3d5ec9.react("✨");
      } catch (_0x381769) {
        await _0x3d5ec9.react("❌");
        await _0x3d5ec9.bot.sendMessage(
          _0x23d1da,
          {
            text:
              "*_Here's The Group Invite Link!!_*\n\n @" +
              _0x3d5ec9.sender.split("@")[0] +
              " Wants to add you in below group\n\n*_https://chat.whatsapp.com/" +
              (await _0x3d5ec9.bot.groupInviteCode(_0x3d5ec9.chat)) +
              "_*\n ---------------------------------  \n*_Join If YOu Feel Free?_*",
            mentions: [_0x3d5ec9.sender],
          },
          {
            quoted: _0x3d5ec9,
          }
        );
        await _0x3d5ec9.reply("*_Can't add user, Invite sent in pm_*");
      }
    } catch (_0x247325) {
      await _0x3d5ec9.error(_0x247325 + "\n\ncommand: add", _0x247325);
    }
  }
);
cmd(
  {
    pattern: "getjids",
    alias: ["gjid", "gjids", "allgc", "gclist"],
    desc: "Sends chat id of every groups.",
    category: "group",
    filename: __filename,
  },
  async (_0x124deb, _0x4744d0, { cmdName: _0x374ed3 }) => {
    try {
      if (!_0x124deb.isCreator) {
        return _0x124deb.reply(tlang().owner);
      }
      n = await _0x124deb.bot.groupFetchAllParticipating();
      const _0x32bb60 = Object.entries(n)
        .slice(0)
        .map((_0x9d4955) => _0x9d4955[1]);
      let _0x1494d8 = "";
      let _0x30a9fa = false;
      let _0x4fb9fb = false;
      if (_0x4744d0.includes("jid")) {
        _0x30a9fa = true;
      } else if (_0x4744d0.includes("name")) {
        _0x4fb9fb = true;
      }
      await _0x124deb.reply(
        "Fetching " +
          (_0x30a9fa
            ? "Only jids"
            : _0x4fb9fb
            ? "Only Names"
            : "Names and Jids") +
          " from " +
          _0x32bb60.length +
          " Groups"
      );
      await sleep(2000);
      for (var _0x4d64ac of _0x32bb60.map((_0x19e435) => _0x19e435.id)) {
        _0x1494d8 += _0x30a9fa
          ? ""
          : "\n*Group:* " + n[_0x4d64ac].subject + " ";
        _0x1494d8 += _0x4fb9fb ? "" : "\n*JID:* " + _0x4d64ac + "\n";
      }
      return await _0x124deb.send(_0x1494d8);
    } catch (_0x1bb5e0) {
      await _0x124deb.error(_0x1bb5e0 + "\n\ncommand: " + _0x374ed3, _0x1bb5e0);
    }
  }
);
cmd(
  {
    pattern: "demote",
    desc: "Demotes replied/quoted user from group",
    category: "group",
    filename: __filename,
    use: "<quote|reply|number>",
  },
  async (_0x118677) => {
    try {
      if (!_0x118677.isGroup) {
        return _0x118677.reply(tlang().group);
      }
      if (!_0x118677.isBotAdmin) {
        return await _0x118677.reply("*I am not Administrator Sir!*");
      }
      if (!_0x118677.isAdmin) {
        return _0x118677.reply(tlang().admin);
      }
      let _0x3ce3f1 = _0x118677.mentionedJid[0]
        ? _0x118677.mentionedJid[0]
        : _0x118677.reply_message
        ? _0x118677.reply_message.sender
        : false;
      if (!_0x3ce3f1) {
        return await _0x118677.reply("*Uhh dear, reply/mention an User*");
      }
      if (_0x118677.checkBot(_0x3ce3f1)) {
        return await _0x118677.reply("*_Huh, I can't demote my creator!!_*");
      }
      try {
        await _0x118677.bot.groupParticipantsUpdate(
          _0x118677.chat,
          [_0x3ce3f1],
          "demote"
        );
        await _0x118677.reply("*_User demote sucessfully!!_*");
      } catch (_0x5e7b02) {
        await _0x118677.reply(
          "*_Can,t demote user, try it manually, Sorry!!_*"
        );
      }
    } catch (_0x307b66) {
      await _0x118677.error(_0x307b66 + "\n\ncommand: demote", _0x307b66);
    }
  }
);
smd(
  {
    pattern: "del",
    alias: ["delete", "dlt"],
    desc: "Deletes message of any user",
    category: "group",
    filename: __filename,
    use: "<quote/reply message.>",
  },
  async (_0x320d81) => {
    try {
      if (!_0x320d81.reply_message) {
        return _0x320d81.reply("*_Please reply to a message!!!_*");
      }
      let _0x3776d3 = _0x320d81.reply_message;
      if (_0x3776d3 && _0x3776d3.fromMe && _0x320d81.isCreator) {
        return _0x3776d3.delete();
      } else if (_0x3776d3 && _0x320d81.isGroup) {
        if (!_0x320d81.isBotAdmin) {
          return _0x320d81.reply(
            "*I can't delete messages without getting Admin Role.*"
          );
        }
        if (!_0x320d81.isAdmin) {
          return _0x320d81.reply(tlang().admin);
        }
        await _0x3776d3.delete();
      } else {
        return await _0x320d81.reply(tlang().owner);
      }
    } catch (_0x4ac639) {
      await _0x320d81.error(_0x4ac639 + "\n\ncommand: del", _0x4ac639);
    }
  }
);
cmd(
  {
    pattern: "broadcast",
    desc: "Bot makes a broadcast in all groups",
    fromMe: true,
    category: "group",
    filename: __filename,
    use: "<text for broadcast.>",
  },
  async (_0x553d05, _0x5d14a3) => {
    try {
      if (!_0x5d14a3) {
        return await _0x553d05.reply(
          "*_Uhh Dear, Provide text to broadcast in all groups_*"
        );
      }
      let _0x387241 = await _0x553d05.bot.groupFetchAllParticipating();
      let _0x32f9c9 = Object.entries(_0x387241)
        .slice(0)
        .map((_0x3ccabe) => _0x3ccabe[1]);
      let _0x4ef191 = _0x32f9c9.map((_0x5ea155) => _0x5ea155.id);
      await _0x553d05.send(
        "*_Sending Broadcast To " +
          _0x4ef191.length +
          " Group Chat, Finish Time " +
          _0x4ef191.length * 1.5 +
          " second_*"
      );
      let _0x552932 =
        "*--❗" +
        tlang().title +
        " Broadcast❗--*\n\n *🍀Message:* " +
        _0x5d14a3;
      let _0x305de9 = {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "Suhail-Md Broadcast",
          body: _0x553d05.senderName,
          renderLargerThumbnail: true,
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: "",
          sourceUrl: gurl,
          showAdAttribution: true,
        },
      };
      for (let _0x4c9688 of _0x4ef191) {
        try {
          await sleep(1500);
          await send(
            _0x553d05,
            _0x552932,
            {
              contextInfo: _0x305de9,
            },
            "",
            "",
            _0x4c9688
          );
        } catch {}
      }
      return await _0x553d05.reply(
        "*Successful Sending Broadcast To " + _0x4ef191.length + " Group*"
      );
    } catch (_0x2a8ad8) {
      await _0x553d05.error(_0x2a8ad8 + "\n\ncommand: broadcast", _0x2a8ad8);
    }
  }
);
smd(
  {
    pattern: "lydea",
    alias: ["chatbot"],
    desc: "activates and deactivates chatbot.\nuse buttons to toggle.",
    fromMe: true,
    category: "misc",
    filename: __filename,
  },
  async (_0x1a5020, _0x1f22c3, { cmdName: _0x431455 }) => {
    try {
      let _0x974aae = _0x1f22c3.split(" ")[0].toLowerCase().trim();
      let _0x44755b =
        (await groupdb.findOne({
          id: _0x1a5020.chat,
        })) ||
        (await groupdb.new({
          id: _0x1a5020.chat,
        }));
      let _0x4924e5 = (await bot_.findOne({
        id: "bot_" + _0x1a5020.user,
      })) ||
        (await groupdb.new({
          id: "bot_" + _0x1a5020.user,
        })) || {
          chatbot: "false",
        };
      if (_0x974aae == "all" || _0x974aae === "global") {
        if (_0x4924e5.chatbot == "true") {
          return await _0x1a5020.send(
            "*" + _0x431455 + " was already enabled to all chat!.*"
          );
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x1a5020.user,
          },
          {
            chatbot: "true",
          }
        );
        return await _0x1a5020.send(
          "*" + _0x431455 + " successfully enabled to all chats!.*"
        );
      } else if (
        _0x974aae.startsWith("on") ||
        _0x974aae.startsWith("act") ||
        _0x974aae.startsWith("enable")
      ) {
        if (_0x44755b.chatbot == "true" || _0x4924e5.chatbot == "true") {
          return await _0x1a5020.send(
            "*" + _0x431455 + " was already enabled.*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x1a5020.chat,
          },
          {
            chatbot: "true",
          }
        );
        return await _0x1a5020.send(
          "*" + _0x431455 + " activated successfully.*"
        );
      } else if (
        _0x974aae.startsWith("off") ||
        _0x974aae.startsWith("deact") ||
        _0x974aae.startsWith("disable")
      ) {
        if (_0x44755b.chatbot == "false" && _0x4924e5.chatbot == "false") {
          return await _0x1a5020.send(
            "*" + _0x431455 + " was already disabled.*"
          );
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x1a5020.user,
          },
          {
            chatbot: "false",
          }
        );
        await groupdb.updateOne(
          {
            id: _0x1a5020.chat,
          },
          {
            chatbot: "false",
          }
        );
        return await _0x1a5020.send(
          "*" + _0x431455 + " deactivated successfully.*"
        );
      } else {
        return await _0x1a5020.reply(
          "*_" +
            _0x431455 +
            " Currently *" +
            (_0x4924e5.chatbot == "true"
              ? "Enabled in 'all' Chats"
              : _0x44755b.chatbot == "true"
              ? "Enabled in Chat"
              : "Disabled in Chat") +
            "!_*\n*_Use On/Off/all to enable/disable " +
            _0x431455 +
            "_*"
        );
      }
    } catch (_0x1a9758) {
      _0x1a5020.error(_0x1a9758 + "\n\ncommand: lydea(chatbot)", _0x1a9758);
    }
  }
);
let warn = {};
warn.addwarn = async (_0x535f84, _0x1e53d3, _0x445500 = {}) => {
  try {
    let _0x285cd0 =
      (await userdb.findOne({
        id: _0x535f84,
      })) ||
      (await userdb.new({
        id: _0x535f84,
      }));
    let _0x84b1f8 = _0x285cd0.warn || {};
    if (!_0x84b1f8[_0x1e53d3]) {
      _0x84b1f8[_0x1e53d3] = [];
    }
    var _0x1a434e = {
      chat: "PRIVATE",
      reason: "Inapropriate Behaviour",
      date: new Date(),
      warnedby: tlang().title,
      ..._0x445500,
    };
    _0x84b1f8[_0x1e53d3].push(_0x1a434e);
    _0x285cd0 = await userdb.updateOne(
      {
        id: _0x535f84,
      },
      {
        warn: _0x84b1f8,
      }
    );
    return {
      status: true,
      warning: _0x84b1f8[_0x1e53d3].length,
      user: _0x285cd0,
    };
  } catch (_0x5aeabd) {
    return {
      status: false,
      warning: 0,
      user: {},
      error: _0x5aeabd,
    };
  }
};
smd(
  {
    pattern: "checkwarn",
    alias: ["listwarn", "chatwarn", "allwarn"],
    desc: "create paste of text.",
    category: "user",
    filename: __filename,
  },
  async (_0x598674, _0x1c4990) => {
    try {
      let _0x4604cb = "";
      let _0x581b05 = _0x598674.sender;
      if (_0x598674.isCreator) {
        _0x581b05 = _0x598674.reply_message
          ? _0x598674.reply_message.sender
          : _0x598674.mentionedJid[0]
          ? _0x598674.mentionedJid[0]
          : _0x581b05;
      }
      let _0x31a5b0 =
        (await userdb.findOne({
          id: _0x581b05,
        })) ||
        (await userdb.new({
          id: _0x581b05,
        }));
      let _0x40e695 = _0x31a5b0.warn || false;
      let _0x49f508 = {};
      if (_0x40e695 && _0x1c4990 === "all") {
        _0x40e695 = _0x31a5b0.warn;
      } else if (_0x40e695 && _0x40e695[_0x598674.chat]) {
        _0x49f508[_0x598674.chat] = [..._0x40e695[_0x598674.chat]];
        _0x40e695 = _0x49f508;
      } else {
        _0x40e695 = false;
      }
      let _0xfcc9b7 = _0x1c4990 === "all" ? true : !_0x40e695[_0x598674.chat];
      if (!_0x31a5b0 || !_0x40e695 || !_0xfcc9b7) {
        return await _0x598674.send("*_User didn't have any warning yet!!_*");
      }
      console.log("allwarn : ", _0x40e695);
      for (const _0x15bd99 in _0x40e695) {
        let _0x52d2b3 = _0x40e695[_0x15bd99];
        _0x4604cb +=
          "\n╭─────────────◆\n│ *[ID] : " +
          (_0x15bd99.includes("@")
            ? (await _0x598674.bot.getName(_0x15bd99)) || _0x15bd99
            : _0x15bd99) +
          "*\n│ *[TOTAL WARNING] : " +
          _0x40e695[_0x15bd99].length +
          "*\n┝─────────────◆\n";
        for (let _0x36bd30 = 0; _0x36bd30 < _0x52d2b3.length; _0x36bd30++) {
          _0x4604cb +=
            "┝── *WARNING " +
            (_0x36bd30 + 1) +
            "* ──\n│  *DATE:* " +
            _0x52d2b3[_0x36bd30].date +
            " " +
            (_0x52d2b3[_0x36bd30].reason
              ? "  \n│  *REASON:* " + _0x52d2b3[_0x36bd30].reason
              : "") +
            "\n│  *WARNED BY:* " +
            _0x52d2b3[_0x36bd30].warnedby +
            "\n│  *CHAT:* " +
            _0x52d2b3[_0x36bd30].chat +
            "\n";
        }
        _0x4604cb += "╰─────────────◆\n";
      }
      return await _0x598674.reply(
        _0x4604cb ? _0x4604cb : "*_User didn't have any warning yet!!_*"
      );
    } catch (_0x44b38e) {
      await _0x598674.error(_0x44b38e + "\n\nCommand: chatwarn", _0x44b38e);
    }
  }
);
smd(
  {
    pattern: "warn",
    fromMe: true,
    desc: "warn a user!",
    category: "user",
    filename: __filename,
    use: " < USER >",
  },
  async (_0xb9222e, _0x4cb71f) => {
    try {
      let _0x5746a6 = _0xb9222e.reply_message
        ? _0xb9222e.reply_message.sender
        : _0xb9222e.mentionedJid[0]
        ? _0xb9222e.mentionedJid[0]
        : false;
      if (!_0x5746a6) {
        return await _0xb9222e.send("*_Uhh please, reply to a user!!_*");
      }
      let _0x314399 =
        (await userdb.findOne({
          id: _0x5746a6,
        })) ||
        (await userdb.new({
          id: _0x5746a6,
        }));
      let _0x5980c1 = _0x314399.warn || {};
      if (!_0x5980c1[_0xb9222e.chat]) {
        _0x5980c1[_0xb9222e.chat] = [];
      }
      var _0x389244 = {
        chat: _0xb9222e.isGroup
          ? _0xb9222e.metadata?.subject || "GROUP"
          : "PRIVATE CHAT",
        reason: _0x4cb71f,
        date: _0xb9222e.date,
        warnedby: _0xb9222e.senderName,
      };
      _0x5980c1[_0xb9222e.chat].push(_0x389244);
      await userdb.updateOne(
        {
          id: _0x5746a6,
        },
        {
          warn: _0x5980c1,
        }
      );
      let _0x46237b = parseInt(global.warncount) || 3;
      if (
        _0x5980c1[_0xb9222e.chat].length > _0x46237b &&
        !_0xb9222e.checkBot(_0x5746a6)
      ) {
        if (_0xb9222e.isGroup) {
          if (_0xb9222e.isBotAdmin) {
            await _0xb9222e.send(
              "*_Hey @" +
                _0x5746a6.split("@")[0] +
                ", Kicking you from group!_*\n*_Because Your warn limit exceed!_*",
              {
                mentions: [_0x5746a6],
              }
            );
            await _0xb9222e.bot.groupParticipantsUpdate(
              _0xb9222e.chat,
              [_0x5746a6],
              "remove"
            );
          } else {
            return await _0xb9222e.send(
              "*_Hey @" +
                _0x5746a6.split("@")[0] +
                " Dont Spam, Your warn limit exceed!_*"
            );
          }
        } else {
          await _0xb9222e.send(
            "*_Hey @" +
              _0x5746a6.split("@")[0] +
              ", Blocking you!_*\n*_Because Your warn limit exceed!_*",
            {
              mentions: [_0x5746a6],
            }
          );
          await _0xb9222e.bot.updateBlockStatus(_0x5746a6, "block");
        }
      } else {
        return await _0xb9222e.send(
          "*_Hey @" + _0x5746a6.split("@")[0] + " warning added, Don't spam!_*",
          {
            mentions: [_0x5746a6],
          }
        );
      }
    } catch (_0x229851) {
      await _0xb9222e.error(_0x229851 + "\n\nCommand: warn ", _0x229851, false);
    }
  }
);
smd(
  {
    pattern: "resetwarn",
    desc: "create paste of text.",
    category: "user",
    filename: __filename,
    use: " user ",
  },
  async (_0x204e61, _0xad20a9) => {
    try {
      if (!_0x204e61.isCreator && !_0x204e61.isAdmin) {
        return await _0x204e61.reply(tlang().admin);
      }
      let _0x16177d = _0x204e61.reply_message
        ? _0x204e61.reply_message.sender
        : _0x204e61.mentionedJid[0]
        ? _0x204e61.mentionedJid[0]
        : false;
      if (!_0x16177d) {
        return await _0x204e61.send("*_Uhh please, reply to a user!!_*");
      }
      let _0x3397c7 =
        (await userdb.findOne({
          id: _0x16177d,
        })) ||
        (await userdb.new({
          id: _0x16177d,
        })) ||
        {};
      let _0x1aa30d = _0x3397c7.warn || {};
      if (
        _0x204e61.isCreator &&
        _0xad20a9.toLowerCase() === "all" &&
        _0x1aa30d
      ) {
        _0x1aa30d = {};
      } else {
        if (!_0x3397c7 || !_0x1aa30d || !_0x1aa30d[_0x204e61.chat]) {
          return await _0x204e61.send("*_User didn't have any warning yet!!_*");
        }
        delete _0x1aa30d[_0x204e61.chat];
      }
      await userdb.updateOne(
        {
          id: _0x16177d,
        },
        {
          warn: _0x1aa30d,
        }
      );
      await _0x204e61.reply(
        "*User is free as a bird now!*\n*All warns has been deleted!*"
      );
    } catch (_0x2b8f6c) {
      await _0x204e61.error(_0x2b8f6c + "\n\nCommand: resetwarn", _0x2b8f6c);
    }
  }
);
smd(
  {
    pattern: "act",
    alias: ["activate", "active"],
    desc: "Switches for varios works.",
    category: "group",
    filename: __filename,
  },
  async (_0x1c1427, _0x2c32fb) => {
    try {
      if (!_0x1c1427.isGroup) {
        return _0x1c1427.reply(tlang().group);
      }
      const _0x2e197f = _0x1c1427.botNumber;
      const _0x571a11 = _0x1c1427.isAdmin;
      let _0x14856e = _0x2c32fb?.split(" ")[0].toLowerCase()?.trim() || false;
      if (!_0x571a11 && !_0x1c1427.isCreator) {
        return _0x1c1427.reply(tlang().admin);
      }
      let _0x599658 =
        (await groupdb.findOne({
          id: _0x1c1427.chat,
        })) ||
        (await groupdb.new({
          id: _0x1c1427.chat,
        })) ||
        false;
      if (!_0x599658) {
        return await _0x1c1427.reply(
          "*_Uhh dear, Group not found in Databse!_*"
        );
      }
      switch (_0x14856e) {
        case "antilink":
          {
            if (_0x599658.antilink !== "false") {
              return await _0x1c1427.reply(
                "*_Antilink was alredy enabled here!_*"
              );
            }
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                antilink: "warn",
              }
            );
            await _0x1c1427.reply("*_Enabled antilink in current chat.!_*");
          }
          break;
        case "economy":
          {
            if (_0x599658.economy == "true") {
              return await _0x1c1427.reply("*_Economy was alredy enabled.!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                economy: "true",
              }
            );
            await _0x1c1427.reply("*_Economy enabled in current chat.!_*");
          }
          break;
        case "events":
        case "event":
          {
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                welcome: "true",
                goodbye: "true",
              }
            );
            return await _0x1c1427.reply("*Successfully Enabled Events!*");
          }
          break;
        case "nsfw":
          {
            if (_0x599658.nsfw == "true") {
              return await _0x1c1427.reply("*_NSFW is already enabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                nsfw: "true",
              }
            );
            await _0x1c1427.reply("*_Successfully Enabled NSFW_*");
          }
          break;
        case "bot":
          {
            if (_0x599658.botenable == "true") {
              return await _0x1c1427.reply("*_bot is already enabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                botenable: "true",
              }
            );
            await _0x1c1427.reply("*_Successfully Enabled bot_*");
          }
          break;
        default: {
          _0x1c1427.reply(
            "Please provide me term like.\n1-events\n2-antilink\n3-economy\n4-bot"
          );
        }
      }
    } catch (_0x54acfc) {
      await _0x1c1427.error(_0x54acfc + "\n\ncommand: act", _0x54acfc);
    }
  }
);
smd(
  {
    pattern: "deact",
    alias: ["deactive", "deactivate"],
    desc: "Switches for varios works.",
    category: "group",
    filename: __filename,
  },
  async (_0x3dfe85, _0x4d9655) => {
    try {
      if (!_0x3dfe85.isGroup) {
        return _0x3dfe85.reply(tlang().group);
      }
      const _0x6df183 = _0x3dfe85.botNumber;
      const _0x66f7b9 = _0x3dfe85.isAdmin;
      let _0x22f3c7 = _0x4d9655?.split(" ")[0].toLowerCase()?.trim() || false;
      if (!_0x22f3c7) {
        return _0x3dfe85.reply(
          "❌ Please provide me term like like\n1-events\n2-antilink\n3-nsfw\n4-bot\n5-economy"
        );
      }
      if (!_0x66f7b9 && !_0x3dfe85.isCreator) {
        return _0x3dfe85.reply(tlang().admin);
      }
      let _0x39a7fb =
        (await groupdb.findOne({
          id: _0x3dfe85.chat,
        })) ||
        (await groupdb.new({
          id: _0x3dfe85.chat,
        })) ||
        false;
      if (!_0x39a7fb) {
        return await _0x3dfe85.reply(
          "*_Uhh dear, request not be proceed due to error!_*"
        );
      }
      switch (_0x22f3c7) {
        case "antilink":
          {
            if (_0x39a7fb.antilink == "false") {
              return _0x3dfe85.reply("*_Antilink was alredy disabled_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                antilink: "false",
              }
            );
            _0x3dfe85.reply("*_disabled antilink in current chat!_*");
          }
          break;
        case "economy":
          {
            if (_0x39a7fb.economy == "false") {
              return _0x3dfe85.reply("*_Economy was alredy disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                economy: "false",
              }
            );
            _0x3dfe85.reply("*disabled Economy in current chat.*");
          }
          break;
        case "events":
        case "event":
          {
            if (_0x39a7fb.events == "false") {
              return _0x3dfe85.reply("*_Events are already disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                welcome: "false",
                goodbye: "false",
              }
            );
            return _0x3dfe85.reply("*Successfully disabled Events!*");
          }
          break;
        case "nsfw":
          {
            if (_0x39a7fb.nsfw == "false") {
              return _0x3dfe85.reply("*_NSFW is already disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                nsfw: "false",
              }
            );
            _0x3dfe85.reply("*Successfully disabled NSFW*");
          }
          break;
        case "bot":
          {
            if (_0x39a7fb.botenable == "false") {
              return await _0x3dfe85.reply("*_bot is already disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                botenable: "true",
              }
            );
            await _0x3dfe85.reply("*_Successfully disabled bot_*");
          }
          break;
        default: {
          _0x3dfe85.reply(
            "Please provide me term like.\n1-events\n2-antilink\n3-bot\n4-economy"
          );
        }
      }
    } catch (_0x27fa6e) {
      await _0x3dfe85.error(_0x27fa6e + "\n\ncommand: deact", _0x27fa6e);
    }
  }
);
smd(
  {
    pattern: "bot",
    desc: "activates and deactivates bot.\nuse buttons to toggle.",
    fromMe: true,
    category: "misc",
    filename: __filename,
  },
  async (_0x129972, _0x3811e7) => {
    try {
      let _0x1b1ab2 = _0x3811e7 ? _0x3811e7.toLowerCase().trim() : false;
      let _0x15047e = _0x1b1ab2 ? _0x1b1ab2.split(" ")[0] : false;
      let _0x13ab5f =
        (await groupdb.findOne({
          id: _0x129972.chat,
        })) ||
        (await groupdb.new({
          id: _0x129972.chat,
        }));
      if (!_0x15047e) {
        await _0x129972.send(
          "*_Bot *" +
            (_0x13ab5f.botenable === "false" ? "Disabled" : "Enabled") +
            " in this Chat!_*"
        );
      } else if (
        _0x15047e.startsWith("off") ||
        _0x15047e.startsWith("deact") ||
        _0x15047e.startsWith("disable")
      ) {
        if (_0x13ab5f.botenable === "false") {
          await _0x129972.send("*_Bot already disabled in current Chat!!_*");
        } else {
          await groupdb.updateOne(
            {
              id: _0x129972.chat,
            },
            {
              botenable: "false",
            }
          );
          await _0x129972.send("*_Bot Disabled Succesfully!_*");
        }
      } else if (
        _0x15047e.startsWith("on") ||
        _0x15047e.startsWith("act") ||
        _0x15047e.startsWith("enable")
      ) {
        if (_0x13ab5f.botenable === "true") {
          await _0x129972.send("*_Bot already enabled in current Chat!!_*");
        } else {
          await groupdb.updateOne(
            {
              id: _0x129972.chat,
            },
            {
              botenable: "true",
            }
          );
          await _0x129972.send("*_Bot Succesfully Enabled!_*");
        }
      } else {
        await _0x129972.send(
          "*_Provide Valid Instruction_*\n*Ex: _" + prefix + "bot on/off_*"
        );
      }
    } catch (_0x9db1e2) {
      _0x129972.error(_0x9db1e2 + "\n\ncommand: bot", _0x9db1e2);
    }
  }
);
smd(
  {
    pattern: "antitag",
    desc: "detect tagall in group chat, then kick them",
    fromMe: true,
    category: "misc",
    filename: __filename,
  },
  async (_0x27399d, _0x182372) => {
    try {
      let _0x206317 = _0x182372 ? _0x182372.toLowerCase().trim() : false;
      let _0x4a3f1c = _0x206317 ? _0x206317.split(" ")[0] : false;
      let _0x3dc11c =
        (await groupdb.findOne({
          id: _0x27399d.chat,
        })) ||
        (await groupdb.new({
          id: _0x27399d.chat,
        }));
      if (!_0x4a3f1c) {
        await _0x27399d.send(
          "*_Anti_tag *" +
            (_0x3dc11c.antitag === "false" ? "Disabled" : "Enabled") +
            " in this Chat!_*"
        );
      } else if (
        _0x4a3f1c.startsWith("off") ||
        _0x4a3f1c.startsWith("deact") ||
        _0x4a3f1c.startsWith("disable")
      ) {
        if (_0x3dc11c.antitag === "false") {
          await _0x27399d.send(
            "*_Anti_tag already disabled in current Chat!!_*"
          );
        } else {
          await groupdb.updateOne(
            {
              id: _0x27399d.chat,
            },
            {
              antitag: "false",
            }
          );
          await _0x27399d.send("*_Anti_tag Disabled Succesfully!_*");
        }
      } else if (
        _0x4a3f1c.startsWith("on") ||
        _0x4a3f1c.startsWith("act") ||
        _0x4a3f1c.startsWith("enable")
      ) {
        if (_0x3dc11c.antitag === "true") {
          await _0x27399d.send(
            "*_Anti_tag already enabled in current Chat!!_*"
          );
        } else {
          await groupdb.updateOne(
            {
              id: _0x27399d.chat,
            },
            {
              antitag: "true",
            }
          );
          await _0x27399d.send(
            "*_Anti_tag succesfully enabled in chat!_*\n*_Now bot kick user who tag all members!_*"
          );
        }
      } else {
        await _0x27399d.send(
          "*_Provide Valid Instruction_*\n*Ex: _" + prefix + "antitag on/off_*"
        );
      }
    } catch (_0x3141b6) {
      _0x27399d.error(_0x3141b6 + "\n\ncommand: antitag", _0x3141b6);
    }
  }
);
smd(
  {
    pattern: "antilink",
    desc: "activates and deactivates antilink.\nuse buttons to toggle.",
    category: "group",
    filename: __filename,
  },
  async (_0x25c82f, _0x4ae2c7, { smd: _0x23c42c }) => {
    try {
      if (!_0x25c82f.isGroup) {
        return _0x25c82f.reply(tlang().group);
      }
      if (!_0x25c82f.isAdmin && !_0x25c82f.isCreator) {
        return _0x25c82f.reply(tlang().admin);
      }
      let _0x495b9f = _0x4ae2c7 ? _0x4ae2c7.toLowerCase().trim() : false;
      let _0x520158 = _0x495b9f ? _0x495b9f.split(" ")[0] : false;
      let _0x7e1f39 =
        (await groupdb.findOne({
          id: _0x25c82f.chat,
        })) ||
        (await groupdb.new({
          id: _0x25c82f.chat,
        }));
      if (!_0x520158) {
        return await _0x25c82f.send(
          "*_Antilink " +
            (_0x7e1f39.antilink === "false" ? "Disabled" : "Enabled") +
            " in this Group!_* \n" +
            (_0x7e1f39.antilink === "false"
              ? ""
              : "*Current Mode:* _" + _0x7e1f39.antilink + "_") +
            "\n\n*Antilink Modes:* ```\n" +
            (prefix + _0x23c42c) +
            " kick (Delete Links & Kick Senders)\n" +
            (prefix + _0x23c42c) +
            " delete (Delete Links Only)\n" +
            (prefix + _0x23c42c) +
            " warn (warn & delete links)\n" +
            (prefix + _0x23c42c) +
            " off (Disable Antilink in chat) ```\n\n\n" +
            Config.caption
        );
      } else if (
        _0x520158.startsWith("off") ||
        _0x520158.startsWith("deact") ||
        _0x520158.startsWith("disable")
      ) {
        if (_0x7e1f39.antilink === "false") {
          return await _0x25c82f.send(
            "*_Anti_Link already disabled in current Chat!!_*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x25c82f.chat,
          },
          {
            antilink: "false",
          }
        );
        return await _0x25c82f.send("*_Anti_Link Disabled Succesfully!_*");
      } else if (_0x520158.startsWith("kick")) {
        if (_0x7e1f39.antilink === "kick") {
          return await _0x25c82f.send(
            "*_Anti_Link already set to kick link senders!!_*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x25c82f.chat,
          },
          {
            antilink: "kick",
          }
        );
        return await _0x25c82f.send(
          "*_Anti_Link Succesfully set to kick link senders!_*"
        );
      } else if (_0x520158.startsWith("delete")) {
        if (_0x7e1f39.antilink === "delete") {
          return await _0x25c82f.send(
            "*_Anti_Link already set to delete links!!_*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x25c82f.chat,
          },
          {
            antilink: "delete",
          }
        );
        return await _0x25c82f.send(
          "*_Anti_Link Succesfully set to delete links from chat!_*"
        );
      } else if (_0x520158.startsWith("warn")) {
        if (_0x7e1f39.antilink === "warn") {
          return await _0x25c82f.send(
            "*_Anti_Link already set to warn link senders!!_*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x25c82f.chat,
          },
          {
            antilink: "warn",
          }
        );
        return await _0x25c82f.send(
          "*_Anti_Link set to warn and delete links!_*"
        );
      } else {
        return await _0x25c82f.send(
          "*_Uhh Please, Provide Valid Instruction_*\n*Eg: _" +
            prefix +
            "antilink kick/delete/warn/off_*"
        );
      }
    } catch (_0x90fda9) {
      _0x25c82f.error(_0x90fda9 + "\n\ncommand: antilink", _0x90fda9);
    }
  }
);
smd(
  {
    pattern: "welcome",
    alias: ["setwelcome"],
    desc: "sets welcome message in specific group.",
    category: "group",
    filename: __filename,
  },
  async (_0x1e1e67, _0x1036fe) => {
    try {
      if (!_0x1e1e67.isGroup) {
        return _0x1e1e67.reply(tlang().group);
      }
      if (!_0x1e1e67.isAdmin && !_0x1e1e67.isCreator) {
        return _0x1e1e67.reply(tlang().admin);
      }
      let _0x2154d6 = _0x1036fe.toLowerCase().trim();
      let _0x558208 =
        (await groupdb.findOne({
          id: _0x1e1e67.chat,
        })) ||
        (await groupdb.new({
          id: _0x1e1e67.chat,
        }));
      if (_0x2154d6 === "on" || _0x2154d6 === "act" || _0x2154d6 === "enable") {
        if (_0x558208.welcome === "true") {
          return await _0x1e1e67.send(
            "*_Welcome already enabled in current group!!_*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x1e1e67.chat,
          },
          {
            welcome: "true",
          }
        );
        return await _0x1e1e67.send("*Welcome successfully enabled!!*");
      }
      if (_0x558208.welcome !== "true") {
        return await _0x1e1e67.send(
          "*_Welcome *Disabled in this Group!_* \n*_Use on/off to enable/disable welcome_*"
        );
      }
      if (!_0x1036fe || _0x2154d6 === "get") {
        return await _0x1e1e67.reply("*Welcome :* " + _0x558208.welcometext);
      }
      if (
        _0x2154d6 === "off" ||
        _0x2154d6 === "deact" ||
        _0x2154d6 === "disable"
      ) {
        if (_0x558208.welcome === "false") {
          return await _0x1e1e67.send(
            "*_Welcome already disabled in current group!!_*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x1e1e67.chat,
          },
          {
            welcome: "false",
          }
        );
        return await _0x1e1e67.send("*Welcome message disabled!!*");
      }
      await groupdb.updateOne(
        {
          id: _0x1e1e67.chat,
        },
        {
          welcometext: _0x1036fe,
          welcome: "true",
        }
      );
      await sendWelcome(_0x1e1e67, _0x1036fe);
    } catch (_0x582cfc) {
      _0x1e1e67.error(_0x582cfc + "\n\ncommand: setwelcome", _0x582cfc);
    }
  }
);
smd(
  {
    pattern: "goodbye",
    alias: ["setgoodbye", "setbye"],
    desc: "sets goodbye message in specific group.",
    category: "group",
    filename: __filename,
  },
  async (_0x2c1a56, _0x5dedfc) => {
    try {
      if (!_0x2c1a56.isGroup) {
        return _0x2c1a56.reply(tlang().group);
      }
      if (!_0x2c1a56.isAdmin && !_0x2c1a56.isCreator) {
        return _0x2c1a56.reply(tlang().admin);
      }
      let _0x604587 = _0x5dedfc.toLowerCase().trim();
      let _0xbcf3ee =
        (await groupdb.findOne({
          id: _0x2c1a56.chat,
        })) ||
        (await groupdb.new({
          id: _0x2c1a56.chat,
        }));
      if (_0x604587 === "on" || _0x604587 === "act" || _0x604587 === "enable") {
        if (_0xbcf3ee.goodbye === "true") {
          return await _0x2c1a56.send(
            "*_Goodbye already enabled in current group!!_*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x2c1a56.chat,
          },
          {
            goodbye: "true",
          }
        );
        return await _0x2c1a56.send("*Goodbye successfully enabled!!*");
      }
      if (_0xbcf3ee.goodbye !== "true") {
        return await _0x2c1a56.send(
          "*_Goodbye *Disabled in this Group!_* \n*_Use on/off to enable/disable goodbye_*"
        );
      }
      if (!_0x5dedfc || _0x604587 === "get") {
        return await _0x2c1a56.reply(
          "*Goodbye Message :* " + _0xbcf3ee.goodbyetext
        );
      }
      if (
        _0x604587 === "off" ||
        _0x604587 === "deact" ||
        _0x604587 === "disable"
      ) {
        if (_0xbcf3ee.goodbye === "false") {
          return await _0x2c1a56.send(
            "*_Goodbye already disabled in current group!!_*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x2c1a56.chat,
          },
          {
            goodbye: "false",
          }
        );
        return await _0x2c1a56.send("*Goodbye message disabled!!*");
      }
      await groupdb.updateOne(
        {
          id: _0x2c1a56.chat,
        },
        {
          goodbyetext: _0x5dedfc,
          goodbye: "true",
        }
      );
      await sendWelcome(_0x2c1a56, _0x5dedfc);
    } catch (_0x5dd573) {
      _0x2c1a56.error(_0x5dd573 + "\n\ncommand: setgoodbye", _0x5dd573);
    }
  }
);
smd(
  {
    pattern: "onlyadmin",
    alias: ["antimessge"],
    desc: "activates and deactivates onlyadmin.",
    category: "group",
    filename: __filename,
  },
  async (_0x18fcc8, _0x2d4a64, { cmdName: _0x3e69a5 }) => {
    try {
      if (!_0x18fcc8.isGroup) {
        return _0x18fcc8.reply(tlang().group);
      }
      if (!_0x18fcc8.isAdmin && !_0x18fcc8.isCreator) {
        return _0x18fcc8.reply(tlang().admin);
      }
      let _0x38fef2 =
        (await groupdb.findOne({
          id: _0x18fcc8.chat,
        })) ||
        (await groupdb.new({
          id: _0x18fcc8.chat,
        }));
      let _0x5b0eb3 = _0x2d4a64 ? _0x2d4a64.toLowerCase().trim() : false;
      let _0x119122 = _0x5b0eb3 ? _0x5b0eb3.split(" ")[0] : false;
      if (!_0x119122) {
        return await _0x18fcc8.send(
          "*_" +
            _0x3e69a5 +
            " *" +
            (_0x38fef2.onlyadmin === "false" ? "Disabled" : "Enabled") +
            " in this Group!_*\n *_Use on/off to enable/disable_*"
        );
      } else if (
        _0x119122.startsWith("off") ||
        _0x119122.startsWith("deact") ||
        _0x119122.startsWith("disable")
      ) {
        if (_0x38fef2.onlyadmin === "false") {
          return await _0x18fcc8.reply(
            "*_Onlyadmin Already Disabled in Current Chat_*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x18fcc8.chat,
          },
          {
            onlyadmin: "false",
          }
        );
        await _0x18fcc8.bot.groupSettingUpdate(
          _0x18fcc8.chat,
          "not_announcement"
        );
        return await _0x18fcc8.send(
          "*" +
            _0x3e69a5 +
            " succesfully disable in group!_*\n*_Now everyone send message in group_*"
        );
      } else if (
        _0x119122.startsWith("on") ||
        _0x119122.startsWith("act") ||
        _0x119122.startsWith("enable")
      ) {
        if (_0x38fef2.onlyadmin === "true") {
          return await _0x18fcc8.reply(
            "*_Onlyadmin Already Enabled in Current Chat_*"
          );
        }
        if (_0x18fcc8.isBotAdmin) {
          await groupdb.updateOne(
            {
              id: _0x18fcc8.chat,
            },
            {
              onlyadmin: "true",
            }
          );
          await _0x18fcc8.bot.groupSettingUpdate(
            _0x18fcc8.chat,
            "announcement"
          );
          return await _0x18fcc8.send(
            "*" +
              _0x3e69a5 +
              " succesfully set to kick msg senders!_*\n*_Now only admins allow to send msg in group_*"
          );
        } else {
          return await _0x18fcc8.reply(
            "*_UHH Please, Provide Admin Role First_*"
          );
        }
      } else {
        return await _0x18fcc8.reply(
          "*_Please Provide Valid Instruction_*\n*_Use on/off to enable/disable_*"
        );
      }
    } catch (_0x53ffd3) {
      _0x18fcc8.error(_0x53ffd3 + "\n\ncommand: onlyadmin", _0x53ffd3);
    }
  }
);
smd(
  {
    pattern: "antibot",
    desc: "kick Bot Users from Group.!",
    category: "group",
    filename: __filename,
  },
  async (_0x3b3e26, _0x12cbbf, { cmdName: _0x12486d }) => {
    try {
      if (!_0x3b3e26.isGroup) {
        return _0x3b3e26.reply(tlang().group);
      }
      if (!_0x3b3e26.isAdmin && !_0x3b3e26.isCreator) {
        return _0x3b3e26.reply(tlang().admin);
      }
      let _0x397293 =
        (await groupdb.findOne({
          id: _0x3b3e26.chat,
        })) ||
        (await groupdb.new({
          id: _0x3b3e26.chat,
        }));
      let _0x22e1dc = _0x12cbbf ? _0x12cbbf.toLowerCase().trim() : "";
      let _0x11994b =
        _0x22e1dc.startsWith("on") ||
        _0x22e1dc.startsWith("act") ||
        _0x22e1dc.startsWith("enable") ||
        _0x22e1dc.startsWith("del") ||
        _0x22e1dc.startsWith("warn")
          ? "warn"
          : _0x22e1dc.startsWith("kic")
          ? "kick"
          : _0x22e1dc.startsWith("off") ||
            _0x22e1dc.startsWith("reset") ||
            _0x22e1dc.startsWith("deact") ||
            _0x22e1dc.startsWith("disable")
          ? "false"
          : "";
      if (!_0x11994b) {
        return await _0x3b3e26.send(
          "*_Antibot Currently *" +
            (_0x397293.antibot === "false" ? "Disabled" : "Enabled") +
            " in this Group!_*\n*_Use warn/kick/off to enable/disable Antibot_*"
        );
      } else if (_0x11994b === "false") {
        if (_0x397293.antibot === "false") {
          return await _0x3b3e26.reply(
            "*_Antibot Already Disabled in Current Chat_*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x3b3e26.chat,
          },
          {
            antibot: "false",
          }
        );
        return await _0x3b3e26.send(
          "*_Antibot Succesfully Disable in group!_*"
        );
      } else if (_0x11994b === "warn" || _0x11994b === "kick") {
        if (_0x397293.antibot === _0x11994b) {
          return await _0x3b3e26.reply(
            "*_Antibot Already set to " + _0x11994b + " bots!_*"
          );
        }
        if (!_0x3b3e26.isBotAdmin) {
          return await _0x3b3e26.reply(
            "*_Uhh Please, Provide Admin Role First_*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x3b3e26.chat,
          },
          {
            antibot: _0x11994b,
          }
        );
        return await _0x3b3e26.send(
          "*_Antibot Succesfully set to " + _0x11994b + " Bot Users!_*"
        );
      } else {
        return await _0x3b3e26.reply(
          "*_Please provide valid instructions!_*\n*_Use warn/kick/off to enable/disable Antibot!_*"
        );
      }
    } catch (_0x304d4d) {
      _0x3b3e26.error(_0x304d4d + "\n\ncommand: antibot", _0x304d4d);
    }
  }
);
smd(
  {
    pattern: "disable",
    desc: "disable cmds in Group.!",
    category: "group",
    filename: __filename,
  },
  async (_0x204bdc, _0x1c3634) => {
    try {
      if (!_0x204bdc.isGroup) {
        return _0x204bdc.reply(tlang().group);
      }
      if (!_0x204bdc.isAdmin && !_0x204bdc.isCreator) {
        return _0x204bdc.reply(tlang().admin);
      }
      let _0x2cad27 =
        (await groupdb.findOne({
          id: _0x204bdc.chat,
        })) ||
        (await groupdb.new({
          id: _0x204bdc.chat,
        }));
      let _0x161561 = _0x1c3634 ? _0x1c3634.toLowerCase().trim() : false;
      let _0x3dd6b4 = _0x161561 ? _0x161561.split(" ")[0] : "";
      if (!_0x3dd6b4) {
        return await _0x204bdc.send(
          "*Provide cmd name to disable in group*\n*Ex " +
            prefix +
            "disable tag(to disabled 'tag' cmd)/info*"
        );
      } else if (
        _0x3dd6b4.startsWith("info") ||
        _0x3dd6b4.startsWith("list") ||
        _0x3dd6b4.startsWith("cmds")
      ) {
        return await _0x204bdc.send(
          _0x2cad27.disablecmds === "false"
            ? "*_Uhh Dear, Theres no cmd disabled in current group_*"
            : "*_Disable cmds :_* ```" +
                _0x2cad27.disablecmds.replace("false,", "") +
                "```"
        );
      } else if (
        _0x3dd6b4.startsWith("enable") ||
        _0x3dd6b4.startsWith("disable") ||
        _0x3dd6b4.startsWith("bot")
      ) {
        return await _0x204bdc.reply("*_Uhh Dear, I can't disable that cmd_*");
      } else if (_0x3dd6b4) {
        const _0x965649 =
          astro_patch.commands.find(
            (_0x1b0024) => _0x1b0024.pattern === _0x3dd6b4
          ) ||
          astro_patch.commands.find(
            (_0x2fd6f8) =>
              _0x2fd6f8.alias && _0x2fd6f8.alias.includes(_0x3dd6b4)
          );
        if (_0x965649) {
          let _0xac463 = _0x965649.pattern.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          );
          let _0x27d7ad = new RegExp("\\b" + _0xac463 + "\\b");
          if (_0x27d7ad.test(_0x2cad27.disablecmds)) {
            return await _0x204bdc.send(
              "*Uhh Dear, Provided cmd already in disable cmds*"
            );
          }
          var _0x41da99 = _0x2cad27.disablecmds + "," + _0x965649.pattern;
          await groupdb.updateOne(
            {
              id: _0x204bdc.chat,
            },
            {
              disablecmds: _0x41da99,
            }
          );
          let _0x23b4d5 = _0x41da99.replace("false,", "");
          return await _0x204bdc.send(
            '*_"' +
              _0x3dd6b4 +
              '" Succesfully added in disable cmds_*' +
              (_0x23b4d5 === ""
                ? ""
                : "\n*_Disable cmds :_* ```" + _0x23b4d5 + "```")
          );
        } else {
          return await _0x204bdc.reply(
            "*_'" +
              _0x3dd6b4 +
              "' is not a bot command, Provide valid command_*"
          );
        }
      }
    } catch (_0x590dfb) {
      _0x204bdc.error(_0x590dfb + "\n\ncommand: enable", _0x590dfb);
    }
  }
);
smd(
  {
    pattern: "enable",
    desc: "enable a cmd in Group.!",
    category: "group",
    filename: __filename,
  },
  async (_0x212b0e, _0x412234) => {
    try {
      if (!_0x212b0e.isGroup) {
        return _0x212b0e.reply(tlang().group);
      }
      if (!_0x212b0e.isAdmin && !_0x212b0e.isCreator) {
        return _0x212b0e.reply(tlang().admin);
      }
      let _0x2c9cd0 =
        (await groupdb.findOne({
          id: _0x212b0e.chat,
        })) ||
        (await groupdb.new({
          id: _0x212b0e.chat,
        }));
      let _0xa3fc1d = _0x412234 ? _0x412234.toLowerCase().trim() : false;
      let _0x439688 = _0xa3fc1d ? _0xa3fc1d.split(" ")[0] : "";
      let _0x40bb35 = _0x439688.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      let _0x5c60c4 = new RegExp("\\b" + _0x40bb35 + "\\b");
      if (!_0x439688 || _0x439688 === "") {
        return await _0x212b0e.send(
          "*Please provide disabled cmd name to enable it*\n*Ex " +
            prefix +
            "enable tag(if 'tag' cmd disabled)/all(reset disables)*"
        );
      } else if (_0xa3fc1d.startsWith("all")) {
        await groupdb.updateOne(
          {
            id: _0x212b0e.chat,
          },
          {
            disablecmds: "false",
          }
        );
        return await _0x212b0e.send("*_All disable cmds succesfully enabled_*");
      } else if (
        _0x5c60c4.test(_0x2c9cd0.disablecmds) &&
        _0x2c9cd0.disablecmds.includes(_0x439688)
      ) {
        let _0x51b1cd = _0x2c9cd0.disablecmds.replace(_0x5c60c4, "");
        await groupdb.updateOne(
          {
            id: _0x212b0e.chat,
          },
          {
            disablecmds: _0x51b1cd,
          }
        );
        return await _0x212b0e.send(
          '*_"' +
            _0x439688.replace(",", "") +
            '" Succesfully removed from disable cmds_*'
        );
      } else {
        return await _0x212b0e.send(
          "_There's no cmd disabled with *" +
            _0x439688.replace(",", "") +
            "* name"
        );
      }
    } catch (_0x25ceaf) {
      _0x212b0e.error(_0x25ceaf + "\n\ncommand: disable", _0x25ceaf);
    }
  }
);
smd(
  {
    pattern: "antifake",
    desc: "𝗗𝗲𝘁𝗲𝗰𝘁𝘀 𝗽𝗿𝗼𝗺𝗼𝘁𝗲/𝗱𝗲𝗺𝗼𝘁𝗲 𝗮𝗻𝗱 𝘀𝗲𝗻𝗱𝘀 𝗮𝗹𝗲𝗿𝘁. ",
    category: "group",
    filename: __filename,
  },
  async (_0x5a1eb8, _0x463e76) => {
    try {
      if (!_0x5a1eb8.isGroup) {
        return _0x5a1eb8.reply(tlang().group);
      }
      if (!_0x5a1eb8.isAdmin && !_0x5a1eb8.isCreator) {
        return _0x5a1eb8.reply(tlang().admin);
      }
      let _0x49ac75 =
        (await groupdb.findOne({
          id: _0x5a1eb8.chat,
        })) ||
        (await groupdb.new({
          id: _0x5a1eb8.chat,
        }));
      let _0x1c6236 = _0x463e76 ? _0x463e76.toLowerCase().trim() : "";
      if (
        _0x1c6236.startsWith("off") ||
        _0x1c6236.startsWith("deact") ||
        _0x1c6236.startsWith("disable")
      ) {
        if (_0x49ac75.antifake == "false") {
          return await _0x5a1eb8.send(
            "*Anti_Fake Already Disabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x5a1eb8.chat,
          },
          {
            antifake: "false",
          }
        );
        return await _0x5a1eb8.send("*Anti_Fake Disable Succesfully!*");
      } else if (!_0x463e76) {
        return await _0x5a1eb8.send(
          "*_Antifake " +
            (_0x49ac75.antifake === "false"
              ? "Not set to any"
              : 'set to "' + _0x49ac75.antifake + '"') +
            " Country Code!_*\n *Provide Country code to Update Antifake Status*\n*Eg: _.antifake 92_*"
        );
      }
      let _0x2f3d1b = _0x463e76
        ? _0x463e76
            .split(",")
            .map((_0x40173c) => parseInt(_0x40173c))
            .filter((_0x44d61c) => !isNaN(_0x44d61c))
            .join(",")
        : false;
      if (!_0x463e76 || !_0x2f3d1b) {
        return await _0x5a1eb8.send(
          "*_Please provide a country code First_*\n *_Only numbers to join this group._*\n*_eg: " +
            prefix +
            "antifake 92_*"
        );
      } else if (_0x2f3d1b) {
        await groupdb.updateOne(
          {
            id: _0x5a1eb8.chat,
          },
          {
            antifake: "" + _0x2f3d1b,
          }
        );
        return await _0x5a1eb8.send(
          '*Anti_Fake Succesfully set to "' +
            _0x2f3d1b +
            "\"!*\n*_Now People Joined Group Who's Number Start With " +
            _0x2f3d1b +
            "_*"
        );
      } else {
        return await _0x5a1eb8.send(
          "*_Please provide a Valid country code First_*\n *_Only numbers to join this group._*\n*_eg: " +
            prefix +
            "antifake 92_*"
        );
      }
    } catch (_0x53288b) {
      _0x5a1eb8.error(_0x53288b + "\n\ncommand: antifake", _0x53288b);
    }
  }
);
smd(
  {
    pattern: "antidemote",
    desc: "Detects Promote and Automaticaly demote promoted person.",
    category: "group",
    filename: __filename,
  },
  async (_0x3d214e, _0x55496f) => {
    try {
      if (!_0x3d214e.isGroup) {
        return _0x3d214e.reply(tlang().group);
      }
      if (!_0x3d214e.isAdmin && !_0x3d214e.isCreator) {
        return _0x3d214e.reply(tlang().admin);
      }
      let _0x30a721 =
        (await groupdb.findOne({
          id: _0x3d214e.chat,
        })) ||
        (await groupdb.new({
          id: _0x3d214e.chat,
        }));
      let _0x210ede = _0x55496f ? _0x55496f.toLowerCase().trim() : "";
      if (
        _0x210ede.startsWith("on") ||
        _0x210ede.startsWith("act") ||
        _0x210ede.startsWith("enable")
      ) {
        if (_0x30a721.antidemote == "true") {
          return await _0x3d214e.send(
            "*Anti_Demote Already Enabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x3d214e.chat,
          },
          {
            antidemote: "true",
          }
        );
        return await _0x3d214e.send(
          "*Anti_Demote Enable Succesfully! _No One Demote Here Now_.*"
        );
      } else if (
        _0x210ede.startsWith("off") ||
        _0x210ede.startsWith("deact") ||
        _0x210ede.startsWith("disable")
      ) {
        if (_0x30a721.antidemote == "false") {
          return await _0x3d214e.send(
            "*Anti_Demote Already Disabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x3d214e.chat,
          },
          {
            antidemote: "false",
          }
        );
        return await _0x3d214e.send("*Anti_Demote Disable Succesfully!*");
      } else {
        return await _0x3d214e.reply(
          '*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To Enable & Disable Stop Demoting Peoples!_*'
        );
      }
    } catch (_0x3863b4) {
      _0x3d214e.error(_0x3863b4 + "\n\ncommand: antidemote", _0x3863b4);
    }
  }
);
smd(
  {
    pattern: "antipromote",
    desc: "Detects Promote and Automaticaly demote promoted person.",
    category: "group",
    filename: __filename,
  },
  async (_0x3d1898, _0x4bf866) => {
    try {
      if (!_0x3d1898.isGroup) {
        return _0x3d1898.reply(tlang().group);
      }
      if (!_0x3d1898.isAdmin && !_0x3d1898.isCreator) {
        return _0x3d1898.reply(tlang().admin);
      }
      let _0x599352 =
        (await groupdb.findOne({
          id: _0x3d1898.chat,
        })) ||
        (await groupdb.new({
          id: _0x3d1898.chat,
        }));
      let _0x41626b = _0x4bf866 ? _0x4bf866.toLowerCase().trim() : "";
      if (
        _0x41626b.startsWith("on") ||
        _0x41626b.startsWith("act") ||
        _0x41626b.startsWith("enable")
      ) {
        if (_0x599352.antipromote == "true") {
          return await _0x3d1898.send(
            "*Anti_Promote Already Enabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x3d1898.chat,
          },
          {
            antipromote: "true",
          }
        );
        return await _0x3d1898.send(
          "*Anti_Promote Enable Succesfully! _No One Promote Here Now_.*"
        );
      } else if (
        _0x41626b.startsWith("off") ||
        _0x41626b.startsWith("deact") ||
        _0x41626b.startsWith("disable")
      ) {
        if (_0x599352.antipromote == "false") {
          return await _0x3d1898.send(
            "*Anti_Promote Already Disabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x3d1898.chat,
          },
          {
            antipromote: "false",
          }
        );
        return await _0x3d1898.send("*Anti_Promote Disable Succesfully!*");
      } else {
        return await _0x3d1898.reply(
          '*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To Stop Promoting Peoples in Chat_*'
        );
      }
    } catch (_0x424dfe) {
      _0x3d1898.error(_0x424dfe + "\n\ncommand: antipromote", _0x424dfe);
    }
  }
);
smd(
  {
    pattern: "pdm",
    desc: "Detect Promote/Demote Users And Send Alerts in Chat ",
    category: "group",
    filename: __filename,
  },
  async (_0x47f7e9, _0x4bf96c) => {
    try {
      if (!_0x47f7e9.isGroup) {
        return _0x47f7e9.reply(tlang().group);
      }
      if (!_0x47f7e9.isAdmin && !_0x47f7e9.isCreator) {
        return _0x47f7e9.reply(tlang().admin);
      }
      let _0x9e3626 =
        (await groupdb.findOne({
          id: _0x47f7e9.chat,
        })) ||
        (await groupdb.new({
          id: _0x47f7e9.chat,
        }));
      let _0x19e598 = _0x4bf96c ? _0x4bf96c.toLowerCase().trim() : "";
      if (
        _0x19e598.startsWith("on") ||
        _0x19e598.startsWith("act") ||
        _0x19e598.startsWith("enable")
      ) {
        if (_0x9e3626.pdm == "true") {
          return await _0x47f7e9.send(
            "*Promote/Demote Alerts Already Enabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x47f7e9.chat,
          },
          {
            pdm: "true",
          }
        );
        return await _0x47f7e9.send(
          "*Promote/Demote Alerts Enable Succesfully!*"
        );
      } else if (
        _0x19e598.startsWith("off") ||
        _0x19e598.startsWith("deact") ||
        _0x19e598.startsWith("disable")
      ) {
        if (_0x9e3626.pdm == "false") {
          return await _0x47f7e9.send(
            "*Promote/Demote Alerts Already Disabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x47f7e9.chat,
          },
          {
            pdm: "false",
          }
        );
        return await _0x47f7e9.send(
          "*Promote/Demote Alerts Disable Succesfully!*"
        );
      } else {
        return await _0x47f7e9.reply(
          '*Uhh Dear, Please use between "On" And "Off".* \n*_To get And Stop Promote/Demote Alerts_*'
        );
      }
    } catch (_0x2f089d) {
      _0x47f7e9.error(_0x2f089d + "\n\ncommand: pdm", _0x2f089d);
    }
  }
);
smd(
  {
    pattern: "amute",
    desc: "sets auto mute time in group.",
    category: "group",
  },
  async (_0x23aaae, _0xc0fcc0) => {
    try {
      if (!_0x23aaae.isGroup) {
        return _0x23aaae.reply(tlang().group);
      }
      if (!_0x23aaae.isAdmin && !_0x23aaae.isCreator) {
        return _0x23aaae.reply(tlang().admin);
      }
      let _0x4e4f77 =
        (await groupdb.findOne({
          id: _0x23aaae.chat,
        })) ||
        (await groupdb.new({
          id: _0x23aaae.chat,
        }));
      if (!_0xc0fcc0) {
        return await _0x23aaae.reply(
          "*Auto_Mute *" +
            (_0x4e4f77.mute === "false" ? "disable" : "enabled") +
            " for current group*" +
            (_0x4e4f77.mute !== "false"
              ? "\n *Auto mute status set at : " + _0x4e4f77.mute + "* "
              : "")
        );
      }
      let [_0x579533, _0x1c48cc] = _0xc0fcc0.split(":").map(Number);
      if (
        isNaN(_0x579533) ||
        isNaN(_0x1c48cc) ||
        _0x579533 < 0 ||
        _0x579533 >= 24 ||
        _0x1c48cc < 0 ||
        _0x1c48cc >= 60
      ) {
        return _0x23aaae.reply(
          "Please provide correct form.\nEg: " + prefix + "amute 22:00"
        );
      }
      let _0x37c60f =
        _0x579533.toString().padStart(2, "0") +
        ":" +
        _0x1c48cc.toString().padStart(2, "0");
      await groupdb.updateOne(
        {
          id: _0x23aaae.chat,
        },
        {
          mute: _0x37c60f,
        }
      );
      return _0x23aaae.reply(
        "*_Successfully done, Group auto mute at " + _0x37c60f + "_*"
      );
    } catch (_0x47f0cd) {
      _0x23aaae.error(_0x47f0cd + "\n\ncommand: amute", _0x47f0cd);
    }
  }
);
smd(
  {
    pattern: "aunmute",
    desc: "sets unmute time in group.",
    category: "group",
  },
  async (_0x93dfcd, _0x13088a) => {
    try {
      if (!_0x93dfcd.isGroup) {
        return _0x93dfcd.reply(tlang().group);
      }
      if (!_0x93dfcd.isAdmin && !_0x93dfcd.isCreator) {
        return _0x93dfcd.reply(tlang().admin);
      }
      let _0x233212 =
        (await groupdb.findOne({
          id: _0x93dfcd.chat,
        })) ||
        (await groupdb.new({
          id: _0x93dfcd.chat,
        }));
      if (!_0x13088a) {
        return await _0x93dfcd.reply(
          "*Auto_Unmute *" +
            (_0x233212.unmute === "false" ? "disable" : "enabled") +
            " for current group*" +
            (_0x233212.unmute !== "false"
              ? "\n *Auto unmute status set at : " + _0x233212.unmute + "* "
              : "")
        );
      }
      let [_0x4566be, _0x302718] = _0x13088a.split(":").map(Number);
      if (
        isNaN(_0x4566be) ||
        isNaN(_0x302718) ||
        _0x4566be < 0 ||
        _0x4566be >= 24 ||
        _0x302718 < 0 ||
        _0x302718 >= 60
      ) {
        return _0x93dfcd.reply(
          "Please provide correct form.\nEg: " + prefix + "aunmute 22:00"
        );
      }
      let _0x47f5d3 =
        _0x4566be.toString().padStart(2, "0") +
        ":" +
        _0x302718.toString().padStart(2, "0");
      await groupdb.updateOne(
        {
          id: _0x93dfcd.chat,
        },
        {
          unmute: _0x47f5d3,
        }
      );
      return _0x93dfcd.reply(
        "*_Successfully done, Group auto unmute at " + _0x47f5d3 + "_*"
      );
    } catch (_0x30bf1c) {
      _0x93dfcd.error(_0x30bf1c + "\n\ncommand: aunmute", _0x30bf1c);
    }
  }
);
smd(
  {
    pattern: "dunmute",
    desc: "Delete unmute from group.",
    category: "group",
  },
  async (_0xe007b5) => {
    try {
      if (!_0xe007b5.isGroup) {
        return _0xe007b5.reply(tlang().group);
      }
      if (!_0xe007b5.isAdmin && !_0xe007b5.isCreator) {
        return _0xe007b5.reply(tlang().admin);
      }
      let _0xb4b312 = await groupdb.findOne({
        id: _0xe007b5.chat,
      });
      if (!_0xb4b312 || !_0xb4b312.unmute || _0xb4b312.unmute == "false") {
        return await _0xe007b5.reply("*There's no auto unmute set in group.*");
      }
      await groupdb.updateOne(
        {
          id: _0xe007b5.chat,
        },
        {
          unmute: "false",
        }
      );
      return await _0xe007b5.reply("*Auto unmute deleted successfully.*");
    } catch (_0x243aed) {
      _0xe007b5.error(_0x243aed + "\n\ncommand: dunmute", _0x243aed);
    }
  }
);
smd(
  {
    pattern: "dmute",
    desc: "Delete mute from group.",
    category: "group",
  },
  async (_0x10542a, _0x2cc451) => {
    try {
      if (!_0x10542a.isGroup) {
        return _0x10542a.reply(tlang().group);
      }
      if (!_0x10542a.isAdmin && !_0x10542a.isCreator) {
        return _0x10542a.reply(tlang().admin);
      }
      let _0x529593 = await groupdb.findOne({
        id: _0x10542a.chat,
      });
      if (!_0x529593 || !_0x529593.mute || _0x529593.mute == "false") {
        return await _0x10542a.reply("*There's no auto mute set in group.*");
      }
      await groupdb.updateOne(
        {
          id: _0x10542a.chat,
        },
        {
          mute: "false",
        }
      );
      return await _0x10542a.reply("*Auto mute deleted successfully.*");
    } catch (_0x137fa6) {
      _0x10542a.error(_0x137fa6 + "\n\ncommand: dmute", _0x137fa6);
    }
  }
);
async function haveEqualMembers(_0x31ae7e, _0x107896) {
  if (_0x31ae7e.length === 0 || _0x107896.length === 0) {
    return false;
  }
  const _0x5aee47 = _0x31ae7e.filter((_0x44f6e4) =>
    _0x107896.includes(_0x44f6e4)
  );
  const _0x3a93d0 = (_0x5aee47.length / _0x31ae7e.length) * 100;
  return _0x3a93d0 >= 76;
}
smd(
  {
    pattern: "antiword",
    desc: "Detects words from chat,and delete/warn senders.",
    category: "group",
    filename: __filename,
    use: "< action | words >",
  },
  async (_0x4626e9, _0x244587, { cmdName: _0xc43bcd }) => {
    try {
      if (!_0x4626e9.isGroup) {
        return _0x4626e9.reply(tlang().group);
      }
      if (!_0x4626e9.isAdmin && !_0x4626e9.isCreator) {
        return _0x4626e9.reply(tlang().admin);
      }
      let _0x55ea26 =
        (await groupdb.findOne({
          id: _0x4626e9.chat,
        })) ||
        (await groupdb.new({
          id: _0x4626e9.chat,
          antiword: {
            status: "false",
            words: "",
          },
        }));
      let _0x14e9b0 = _0x244587 ? _0x244587.toLowerCase().trim() : false;
      let _0xe2e8cc = _0x55ea26.antiword;
      let _0x28cfe1 =
        "*Antiword Currently *" +
        (_0xe2e8cc.status !== "false" ? "enabled" : "disabled") +
        "!!!* ```\n  STATUS: " +
        (_0xe2e8cc.status ? _0xe2e8cc.status : "--Empty Yet--") +
        " \n  WORDS: " +
        (_0xe2e8cc.words
          ? _0xe2e8cc.words.replace(/,/gi, " -- ")
          : "--Empty Yet--") +
        "```\n\n*Available Cmds:* ```\n  " +
        (prefix + _0xc43bcd) +
        " off \n  " +
        (prefix + _0xc43bcd) +
        " reset\n  " +
        (prefix + _0xc43bcd) +
        " warn | bad,words\n  " +
        (prefix + _0xc43bcd) +
        " delete | hot,badas,etc\n``` \n\n\n " +
        Config.caption;
      if (!_0x14e9b0 || !_0x244587) {
        return await _0x4626e9.send(_0x28cfe1);
      }
      let _0x48cd39 = _0x14e9b0.split("|")[1] || "";
      let _0x431ae2 =
        _0x14e9b0.startsWith("on") ||
        _0x14e9b0.startsWith("act") ||
        _0x14e9b0.startsWith("enable") ||
        _0x14e9b0.startsWith("del")
          ? "delete"
          : _0x14e9b0.startsWith("warn")
          ? "warn"
          : _0x14e9b0.startsWith("off") ||
            _0x14e9b0.startsWith("deact") ||
            _0x14e9b0.startsWith("disable")
          ? "false"
          : _0x14e9b0.startsWith("reset")
          ? "reset"
          : "";
      _0x431ae2 =
        !_0x431ae2 && _0x48cd39 && _0xe2e8cc.status !== "false"
          ? _0xe2e8cc.status
          : _0x431ae2;
      if (_0x431ae2 === "reset") {
        await groupdb.updateOne(
          {
            id: _0x4626e9.chat,
          },
          {
            antiword: {},
          }
        );
        return await _0x4626e9.send("*_Anti_Word status cleard!_*");
      } else if (_0x431ae2 === "delete" || _0x431ae2 === "warn") {
        if (_0xe2e8cc.status == _0x431ae2 && !_0x48cd39) {
          return await _0x4626e9.send(
            "*Please provide badWords, like " +
              (prefix + _0xc43bcd) +
              " " +
              _0x431ae2 +
              " | bad,words"
          );
        }
        _0x48cd39 = _0x48cd39 ? _0x48cd39 : _0xe2e8cc.words;
        await groupdb.updateOne(
          {
            id: _0x4626e9.chat,
          },
          {
            antiword: {
              status: _0x431ae2,
              words: _0x48cd39,
            },
          }
        );
        return await _0x4626e9.send(
          "*_Anti_Word succesfully set to '" +
            _0x431ae2 +
            "' badward!_*\n*Antiwords are:```" +
            (_0x48cd39 ? _0x48cd39.replace(/,/gi, " | ") : "--Empty Yet--") +
            "``` *"
        );
      } else if (_0x431ae2 === "false") {
        if (_0xe2e8cc.status === _0x431ae2) {
          return await _0x4626e9.send(
            "*Anti_Word Already Disabled In Current Chat!*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x4626e9.chat,
          },
          {
            antiword: {
              status: "false",
              words: _0xe2e8cc.words,
            },
          }
        );
        return await _0x4626e9.send("*Anti_Word Disable Succesfully!*");
      } else {
        return await _0x4626e9.reply(
          "*Uhh dear, Please follow instructions!!*\n\n" + _0x28cfe1
        );
      }
    } catch (_0x5738c4) {
      _0x4626e9.error(_0x5738c4 + "\n\ncommand: antiword", _0x5738c4);
    }
  }
);
let bott = false;
let chatbotCount = 0;
smd(
  {
    on: "main",
  },
  async (
    _0x39f91d,
    _0x4baec9,
    {
      botNumber: _0x4ac038,
      isCreator: _0x184989,
      budy: _0x47409a,
      body: _0x66fc82,
      icmd: _0x250d65,
    }
  ) => {
    try {
      if (global.MsgsInLog === "true") {
        console.log(
          "" +
            (_0x39f91d.isGroup
              ? "[MESSAGE IN GROUP] From => " +
                _0x39f91d.metadata.subject +
                "\n[USER]:"
              : "[MESSAGE IN PRIVATE] From =>") +
            (" " +
              _0x39f91d.senderName +
              " " +
              _0x39f91d.senderNum +
              "\n[" +
              _0x39f91d.mtype.toUpperCase() +
              "]: " +
              _0x39f91d.body +
              "\n============== [SMD] =================")
        );
      }
      let _0x273393 =
        (await groupdb.findOne({
          id: _0x39f91d.chat,
        })) || false;
      let _0xea5278 = false;
      try {
        if (!global.SmdOfficial && global.SmdOfficial !== "yes") {
          return;
        }
        if (
          _0x273393 &&
          _0x273393.antitag == "true" &&
          !_0x39f91d.checkBot() &&
          _0x39f91d.mtype !== "reactionMessage" &&
          _0x273393.botenable == "true"
        ) {
          const _0x50265a = await haveEqualMembers(
            _0x39f91d.metadata.participants.map((_0x406321) => _0x406321.id),
            _0x39f91d.mentionedJid
          );
          if (_0x50265a && _0x39f91d.isBotAdmin) {
            let _0x40ef27 = {
              reason: "tagging all members!",
              chat: _0x39f91d.metadata?.subject || "GROUP",
              warnedby: tlang().title,
              date: _0x39f91d.date,
            };
            _0xea5278 = await warn.addwarn(
              _0x39f91d.sender,
              _0x39f91d.chat,
              _0x40ef27
            );
            await _0x39f91d.reply(
              " Hey @" +
                _0x39f91d.senderNum +
                " warning!!_*\n*_Tagging all members is not allowed!_*",
              {
                mentions: [_0x39f91d.sender],
              }
            );
            await _0x39f91d.delete();
          } else if (_0x50265a && !_0x39f91d.isBotAdmin) {
            await _0x39f91d.reply(
              "*_Can't do anything, without getting admin role!_*",
              {
                mentions: [_0x39f91d.sender],
              }
            );
          }
        }
        if (
          _0x273393 &&
          _0x39f91d.isGroup &&
          !_0x39f91d.isAdmin &&
          !_0x184989 &&
          _0x39f91d.mtype !== "reactionMessage" &&
          _0x273393.botenable == "true"
        ) {
          if (
            _0x273393.antibot &&
            _0x273393.antibot !== "false" &&
            _0x39f91d.isBot &&
            !_0x39f91d.checkBot(_0x39f91d.sender)
          ) {
            if (_0x39f91d.isBotAdmin) {
              var _0x3c86e4 =
                "*_Bot user not allowed, please make it private!_*";
              if (_0x273393.antibot === "warn") {
                let _0x50d0d8 = {
                  reason: "Bots not allowed!",
                  chat: _0x39f91d.metadata?.subject || "GROUP",
                  date: _0x39f91d.date,
                };
                _0xea5278 = _0xea5278
                  ? _0xea5278
                  : await warn.addwarn(
                      _0x39f91d.sender,
                      _0x39f91d.chat,
                      _0x50d0d8
                    );
                if (_0xea5278.status) {
                  _0x3c86e4 =
                    "*_Hey @" +
                    _0x39f91d.senderNum +
                    " warning, Due To Antibot!_*";
                }
              } else if (_0x273393.antibot === "kick") {
                try {
                  sleep(1000);
                  await _0x39f91d.bot.groupParticipantsUpdate(
                    _0x39f91d.chat,
                    [_0x39f91d.sender],
                    "remove"
                  );
                  _0x3c86e4 =
                    "*_User @" +
                    _0x39f91d.senderNum +
                    " kick Due To Antibot!_*";
                } catch {}
              }
              await _0x39f91d.delete();
              await _0x39f91d.send(_0x3c86e4, {
                mentions: [_0x39f91d.sender],
              });
            } else if (!_0x39f91d.isBotAdmin && _0x39f91d.isBot) {
              await _0x39f91d.reply(
                "*_Uhh Please, Provide Admin Role To Kick Other Bot_*\n*_Or Disable Antibot (On/Off) In Current Group_*"
              );
            }
          }
          if (
            _0x273393.onlyadmin &&
            _0x273393.onlyadmin === "true" &&
            SmdOfficial == "yes"
          ) {
            var _0x3c86e4 = "";
            if (_0x39f91d.isBotAdmin) {
              let _0x5c4aae = {
                reason: "Only Admin can Chat!",
                chat: _0x39f91d.metadata?.subject || "PRIVATE",
                warnedby: tlang().title,
                date: _0x39f91d.date,
              };
              _0xea5278 = _0xea5278
                ? _0xea5278
                : await warn.addwarn(
                    _0x39f91d.sender,
                    _0x39f91d.chat,
                    _0x5c4aae
                  );
              if (_0xea5278.status) {
                _0x3c86e4 = "*Warns you for chat here!*\n";
              }
              await _0x39f91d.delete();
              sleep(1500);
              await _0x39f91d.send(
                "*Hey @" +
                  _0x39f91d.senderNum +
                  "* " +
                  _0x3c86e4 +
                  "*Deleteing message,while onlyadmin activated!!* ",
                {
                  mentions: [_0x39f91d.sender],
                }
              );
            } else {
              await _0x39f91d.send(
                "*_Provide admin role to kick Message Senders_*\n*Or _Disable onlyadmin(on/off) in currentchat_*"
              );
            }
          }
          if (
            _0x273393.antilink &&
            _0x273393.antilink !== "false" &&
            SmdOfficial === "yes"
          ) {
            const _0x37bc15 =
              Config.antilink_values && Config.antilink_values !== "all"
                ? Config.antilink_values
                    .split(",")
                    .filter((_0x3da281) => _0x3da281.trim() !== "")
                : ["https://", "chat.whatsapp.com", "fb.com"];
            let _0x5cbc1d = _0x66fc82.toLowerCase();
            if (_0x37bc15.some((_0x81b040) => _0x5cbc1d.includes(_0x81b040))) {
              if (!_0x39f91d.isBotAdmin) {
                let _0x26aa7f =
                  " *\nUser @" +
                  _0x39f91d.sender.split("@")[0] +
                  " detected sending a link.\nPromote " +
                  Config.botname +
                  " as admin to " +
                  (_0x273393.antilink === "kick"
                    ? "kick \nlink senders."
                    : "delete \nlinks from this Chat") +
                  " \n";
                await _0x39f91d.send(_0x26aa7f, {
                  mentions: [_0x39f91d.sender],
                });
              } else if (_0x273393.antilink === "delete") {
                await _0x39f91d.delete();
              } else if (
                _0x273393.antilink === "warn" ||
                _0x273393.antilink === "true"
              ) {
                let _0x75abf8 = {
                  reason: "links not allowed!",
                  chat: _0x39f91d.metadata?.subject || "PRIVATE",
                  warnedby: tlang().title,
                  date: _0x39f91d.date,
                };
                _0xea5278 = _0xea5278
                  ? _0xea5278
                  : await warn.addwarn(
                      _0x39f91d.sender,
                      _0x39f91d.chat,
                      _0x75abf8
                    );
                var _0x3c86e4 = _0xea5278.status
                  ? "*_ Hey @" +
                    _0x39f91d.senderNum +
                    " warning!!_*\n*_links not allowed in current group!_*"
                  : "*_[]_*";
                await _0x39f91d.reply(_0x3c86e4, {
                  mentions: [_0x39f91d.sender],
                });
                await _0x39f91d.delete();
              } else if (_0x273393.antilink === "kick") {
                try {
                  await _0x39f91d.delete();
                  sleep(1500);
                  await _0x39f91d.bot.groupParticipantsUpdate(
                    _0x39f91d.chat,
                    [_0x39f91d.sender],
                    "remove"
                  );
                } catch {
                  await _0x39f91d.send("**\n" + tlang().botAdmin);
                }
              }
            }
          }
        }
      } catch (_0x1a7fb0) {
        console.log("Error From Antilinks : ", _0x1a7fb0);
      }
      var _0x219875 = _0x273393?.antiword || {
        status: "false",
      };
      if (
        _0x4baec9.length > 1 &&
        !_0x39f91d.isBot &&
        _0x219875 &&
        _0x219875.status !== "false" &&
        _0x219875.words
      ) {
        var _0x4e66ac = _0x219875.words.split(",") || [];
        let _0x2298c9 = false;
        _0x4e66ac.map(async (_0x5e94de) => {
          if (
            _0x39f91d.isAdmin ||
            !global.SmdOfficial ||
            global.SmdOfficial != "yes"
          ) {
            return;
          }
          let _0x520e96 = new RegExp("\\b" + _0x5e94de?.trim() + "\\b", "ig");
          let _0x1ae0c5 = _0x47409a.toLowerCase();
          if (!_0x2298c9 && _0x5e94de && _0x520e96.test(_0x1ae0c5)) {
            _0x2298c9 = true;
            await sleep(500);
            try {
              var _0x3dc4df = "";
              if (_0x219875.status === "warn") {
                let _0x5f3cee = {
                  reason: "For using Bad Word",
                  chat: _0x39f91d.metadata?.subject || "PRIVATE",
                  warnedby: tlang().title,
                  date: _0x39f91d.date,
                };
                _0xea5278 = _0xea5278
                  ? _0xea5278
                  : await warn.addwarn(
                      _0x39f91d.sender,
                      _0x39f91d.chat,
                      _0x5f3cee
                    );
                if (_0xea5278.status) {
                  _0x3dc4df = "\n*Warns you for using badWord!!*\n";
                }
              }
              if (_0x39f91d.isBotAdmin) {
                await _0x39f91d.send(
                  "*[] Hey @" +
                    _0x39f91d.senderNum +
                    "* " +
                    _0x3dc4df +
                    " *Deleting your message from chat!*\n",
                  {
                    mentions: [_0x39f91d.sender],
                  },
                  "asta",
                  _0x39f91d
                );
                await _0x39f91d.delete();
              } else {
                await _0x39f91d.reply(
                  "*_[] provide admin to take action!_*",
                  {
                    mentions: [_0x39f91d.sender],
                  }
                );
              }
            } catch (_0x44e136) {
              console.log("Error From Bad Words : ", _0x44e136);
            }
          }
        });
      }
      if (_0xea5278) {
        let _0x4cb16b = parseInt(global.warncount) || 3;
        if (_0xea5278.warning >= _0x4cb16b) {
          if (_0x39f91d.isGroup) {
            if (_0x39f91d.isBotAdmin) {
              await _0x39f91d.send(
                "*_Hey @" +
                  _0x39f91d.senderNum +
                  " Kicking you from group!_*\n*_Because Your warn limit exceed!_*",
                {
                  mentions: [_0x39f91d.sender],
                }
              );
              await _0x39f91d.bot.groupParticipantsUpdate(
                _0x39f91d.chat,
                [_0x39f91d.sender],
                "remove"
              );
            }
          } else {
            await _0x39f91d.send(
              "*_Hey @" +
                _0x39f91d.senderNum +
                " Blocking you!_*\n*_Because Your warn limit exceed!_*",
              {
                mentions: [_0x39f91d.sender],
              }
            );
            await _0x39f91d.bot.updateBlockStatus(_0x39f91d.sender, "block");
          }
        }
      }
      try {
        if (!global.SmdOfficial || _0x39f91d.mtype === "reactionMessage") {
          return;
        }
        let _0x294e10 = (await groupdb.findOne({
          id: _0x39f91d.chat,
        })) || {
          chatbot: "false",
        };
        if (!bott || chatbotCount >= 10) {
          bott = (await bot_.findOne({
            id: "bot_" + _0x39f91d.user,
          })) || {
            chatbot: "false",
          };
        } else {
          chatbotCount++;
        }
        let _0x3f3751 =
          bott && bott.chatbot && bott.chatbot == "true"
            ? "true"
            : _0x294e10.chatbot || "false";
        if (
          _0x3f3751 === "true" &&
          !_0x250d65 &&
          !_0x39f91d.isBot &&
          _0x39f91d.text
        ) {
          let _0x4c0917 = !_0x39f91d.isGroup
            ? _0x39f91d.user
            : _0x39f91d.quoted
            ? _0x39f91d.quoted.sender
            : _0x39f91d.mentionedJid[0] || false;
          if (
            _0x39f91d.isGroup &&
            _0x4c0917 &&
            !_0x39f91d.checkBot(_0x4c0917)
          ) {
            return;
          }
          let { data: _0x1a5d20 } = await axios.get(
            "http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[" +
              _0x39f91d.senderNum +
              "]&msg=[" +
              _0x47409a +
              "]"
          );
          if (_0x1a5d20 && _0x1a5d20.cnt) {
            _0x39f91d.send(_0x1a5d20.cnt, {}, "asta", _0x39f91d);
          } else {
            ("");
          }
        }
      } catch (_0x418db7) {
        console.log("Error From ChatBot : ", _0x418db7);
      }
    } catch (_0x4eac84) {
      console.log("Group Settings error in command.main() \n", _0x4eac84);
    }
  }
);
let users = {};
let user_warns = {};
smd(
  {
    group: "add",
  },
  async (_0x28d76c, { Void: _0x4dedb6 }) => {
    try {
      let _0x3a7fc2 = await groupdb.findOne({
        id: _0x28d76c.chat,
      });
      if (
        !_0x3a7fc2 ||
        !_0x28d76c.isGroup ||
        _0x3a7fc2.botenable !== "true" ||
        _0x28d76c.blockJid ||
        _0x28d76c.fromMe
      ) {
        return;
      }
      let _0x21c5eb =
        _0x3a7fc2 && _0x3a7fc2.welcome ? _0x3a7fc2.welcome : "false";
      let _0x3fc86e =
        _0x3a7fc2 && _0x3a7fc2.antifake
          ? _0x3a7fc2.antifake.toLowerCase()
          : "false";
      let _0x5dd590 = _0x3fc86e.split(",");
      const _0xdb6223 = _0x5dd590.some((_0x25ffc0) =>
        _0x28d76c.user.startsWith(_0x25ffc0)
      );
      if (_0x3fc86e !== "false" && !_0xdb6223 && !_0x28d76c.isCreator) {
        if (_0x28d76c.isBotAdmin) {
          try {
            await _0x28d76c.kick();
            return await sendWelcome(
              _0x28d76c,
              "*[ANTIFAKE START] @User kicked automaticaly!* @pp"
            );
          } catch (_0x52d6df) {
            await _0x28d76c.error(
              " Can't kick user in antifake\n❲❒❳ GROUP: " +
                _0x28d76c.metadata.subject +
                "\n❲❒❳ ERROR: " +
                _0x52d6df +
                "\n",
              _0x52d6df,
              false
            );
          }
        } else {
          await _0x28d76c.send(
            "*[ANTI_FAKE ERROR] Need admin role to kick fake users!!*"
          );
        }
      } else if (_0x21c5eb === "true") {
        await sendWelcome(_0x28d76c, _0x3a7fc2.welcometext);
      }
    } catch (_0x476537) {
      console.log("Error From Welcome : ", _0x476537);
    }
  }
);
smd(
  {
    group: "remove",
  },
  async (_0x1b9988, { Void: _0xcb3386 }) => {
    try {
      let _0xa3ec6 =
        (await groupdb.findOne({
          id: _0x1b9988.chat,
        })) || false;
      if (
        !_0x1b9988 ||
        !_0xa3ec6 ||
        !_0x1b9988.isGroup ||
        _0xa3ec6.botenable !== "true" ||
        _0x1b9988.blockJid ||
        _0x1b9988.fromMe
      ) {
        return;
      }
      let _0x9f4c7b = _0xa3ec6 && _0xa3ec6.goodbye ? _0xa3ec6.goodbye : "false";
      if (_0x9f4c7b === "true") {
        await sendWelcome(_0x1b9988, _0xa3ec6.goodbyetext);
      }
    } catch (_0x442765) {
      console.log("Error From Goodbye : ", _0x442765);
    }
  }
);
smd(
  {
    group: "promote",
  },
  async (_0x482975, { Void: _0x3481d2 }) => {
    try {
      let _0x390d91 =
        (await groupdb.findOne({
          id: _0x482975.chat,
        })) || false;
      if (
        !_0x390d91 ||
        !_0x482975.isGroup ||
        _0x390d91.botenable !== "true" ||
        _0x482975.blockJid
      ) {
        return;
      }
      if (!user_warns[_0x482975.sender]) {
        user_warns[_0x482975.sender] = {
          [_0x482975.action]: 1,
        };
      } else {
        user_warns[_0x482975.sender][_0x482975.action]++;
      }
      let _0x4124fa;
      if (_0x390d91.antipromote == "true" && !_0x482975.isCreator) {
        _0x4124fa = _0x482975.isBotAdmin ? false : true;
        if (
          users[_0x482975.sender] &&
          users[_0x482975.sender].previous_Action === "antidemote"
        ) {
          delete users[_0x482975.sender];
          return;
        }
        if (_0x482975.isBotAdmin) {
          try {
            await _0x482975.demote();
            users[_0x482975.sender] = {
              previous_Action: "antipromote",
            };
            if (user_warns[_0x482975.sender][_0x482975.action] > 2) {
              return;
            }
            return await sendWelcome(
              _0x482975,
              "*[ANTIPROMOTE START] @User Demoted Automatically!* @pp "
            );
          } catch (_0x5ae38b) {
            await _0x482975.error(
              " Can't demote user in antipromote\n❲❒❳ GROUP: " +
                _0x482975.metadata.subject +
                "\n❲❒❳ ERROR: " +
                _0x5ae38b +
                "\n",
              _0x5ae38b,
              false
            );
          }
        }
      }
      if (_0x390d91.pdm == "true" || _0x4124fa) {
        if (user_warns[_0x482975.sender][_0x482975.action] > 2) {
          return;
        }
        var _0x218901 =
          " *[SOMEONE PROMOTE HERE]*\n" +
          (_0x4124fa
            ? "*Note : _I'm Not Admin Here, So I Can't Demote Someone while Anti_Promote Activated_*"
            : "") +
          "\n           \n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Member -> Admin_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n\n\n" +
          Config.caption;
        return await sendWelcome(_0x482975, _0x218901);
      }
    } catch (_0x3a436e) {
      console.log("Error From Promote : ", _0x3a436e);
    }
  }
);
smd(
  {
    group: "demote",
  },
  async (_0x2b38a5, { Void: _0x4676d7 }) => {
    try {
      let _0x1273fa =
        (await groupdb.findOne({
          id: _0x2b38a5.chat,
        })) || false;
      if (
        !_0x1273fa ||
        !_0x2b38a5.isGroup ||
        _0x1273fa.botenable !== "true" ||
        _0x2b38a5.blockJid
      ) {
        return;
      }
      if (!user_warns[_0x2b38a5.sender]) {
        user_warns[_0x2b38a5.sender] = {
          [_0x2b38a5.action]: 1,
        };
      } else {
        user_warns[_0x2b38a5.sender][_0x2b38a5.action]++;
      }
      let _0x5878b4;
      if (_0x1273fa.antidemote == "true" && !_0x2b38a5.isCreator) {
        _0x5878b4 = _0x2b38a5.isBotAdmin ? false : true;
        if (
          users[_0x2b38a5.sender] &&
          users[_0x2b38a5.sender].previous_Action === "antipromote"
        ) {
          delete users[_0x2b38a5.sender];
          return;
        }
        if (_0x2b38a5.isBotAdmin) {
          try {
            await _0x2b38a5.promote();
            users[_0x2b38a5.sender] = {
              previous_Action: "antidemote",
            };
            if (user_warns[_0x2b38a5.sender][_0x2b38a5.action] > 2) {
              return;
            }
            return await sendWelcome(
              _0x2b38a5,
              "*[ANTIPROMOTE START] User promote automatically!* @pp "
            );
          } catch (_0x275310) {
            await _0x2b38a5.error(
              " Can't promote user in antidemote\n❲❒❳ GROUP: " +
                _0x2b38a5.metadata.subject +
                "\n❲❒❳ ERROR: " +
                _0x275310 +
                "\n",
              _0x275310,
              false
            );
          }
        }
      }
      if (_0x1273fa.pdm == "true" || _0x5878b4) {
        if (user_warns[_0x2b38a5.sender][_0x2b38a5.action] > 2) {
          return;
        }
        var _0x168c92 =
          " *[SOMEONE DEMOTE HERE]*\n  " +
          (_0x5878b4
            ? "*Note : _I'm Not Admin Here, So I Can't promote Someone while Anti_Demote Activated_*"
            : "") +
          "\n\n  ❲❒❳ *User:* _@user_\n❲❒❳ *Position:* _Admin -> Member_ @pp\n  ❲❒❳ *Total Members:* _@count_Members_\n❲❒❳ *Group Name:* @gname\n  \n\n" +
          Config.caption;
        return await sendWelcome(_0x2b38a5, _0x168c92);
      }
    } catch (_0x3ef55d) {
      console.log("Error From Demote : ", _0x3ef55d);
    }
  }
);
smd(
  {
    cmdname: "messages",
    alias: ["countmessage", "msgcount"],
    desc: "Check how many users continuesly active in chat!",
    category: "group",
    filename: __filename,
  },
  async (_0x1cec94, _0x2535b1, { store: _0x264360 }) => {
    try {
      let _0x5af784 = {};
      _0x264360.messages[_0x1cec94.jid].array.forEach((_0x2ec32f) => {
        const _0xd05e4b =
          _0x2ec32f.pushName ||
          (_0x1cec94.isGroup
            ? _0x2ec32f.key.participant
            : _0x2ec32f.key.remoteJid || "unknown"
          ).split("@")[0];
        _0x5af784[_0xd05e4b] = (_0x5af784[_0xd05e4b] || 0) + 1;
      });
      let _0x599777 = Object.entries(_0x5af784);
      if (!_0x599777 || !_0x599777[0]) {
        return await _0x1cec94.reply("_No messages found!_");
      }
      const _0x338160 = Object.entries(_0x5af784)
        .map(
          ([_0x4630e3, _0x3a7f93]) =>
            "\t*" +
            (_0x4630e3?.split("\n").join(" ") || "unknown") +
            "*  ➪  _" +
            _0x3a7f93 +
            "_"
        )
        .join("\n");
      var _0x370694 = (
        "*LIST OF ACTIVE USERS IN CURRENT CHAT*\n_Note: Sometimes Data will be reset when bot restart!_\n\n*Total Users: _" +
        _0x599777.length +
        "_*\n\n*USERNAME ➪ MESSAGE COUNT(s)*\n" +
        _0x338160 +
        "\n\n" +
        Config.caption
      ).trim();
      await _0x1cec94.send(
        _0x370694,
        {
          contextInfo: {
            ...(await _0x1cec94.bot.contextInfo(
              "ACTIVE USERS",
              _0x1cec94.senderName
            )),
          },
        },
        "asta",
        _0x1cec94
      );
    } catch (_0x225db9) {
      console.log({
        e: _0x225db9,
      });
    }
  }
);
let commandHistory = [];
smd(
  {
    on: "main",
  },
  async (_0x297aaa, _0x35b575, { icmd: _0x5e5446 }) => {
    try {
      if (_0x5e5446 && _0x297aaa.cmd) {
        commandHistory.push({
          user: _0x297aaa.sender,
          command: _0x297aaa.cmd,
          timestamp: new Date(),
        });
      }
    } catch (_0x4bf40a) {
      await _0x297aaa.error(
        _0x4bf40a + "\n\ncommand : listmessage",
        _0x4bf40a,
        "*ERROR!*"
      );
    }
  }
);
smd(
  {
    cmdname: "closetime",
    alias: ["setclose", "setmute"],
    desc: "set temporary timer to close a group chat!",
    category: "group",
    filename: __filename,
  },
  async (_0x1067b4, _0x4d1cdb, { args: _0x58f103 }) => {
    try {
      if (!_0x1067b4.isGroup) {
        return _0x1067b4.reply(tlang("group"));
      }
      if (!_0x1067b4.isBotAdmin) {
        return _0x1067b4.reply(tlang("botAdmin"));
      }
      if (!_0x1067b4.isAdmin && !_0x1067b4.isCreator) {
        return _0x1067b4.reply(tlang("admin"));
      }
      let _0x2c20a4 = _0x58f103[1] || "";
      let _0x133672 = parseInt(_0x58f103[0]) || "";
      if (!_0x133672 || isNaN(_0x133672)) {
        return await _0x1067b4.reply(
          "*please provide time with type*\n*Use : " +
            prefix +
            "setclose 2 minute*"
        );
      }
      if (_0x2c20a4.includes("sec")) {
        var _0x8a6cf1 = _0x58f103[0] * "1000";
      } else if (_0x2c20a4.includes("min")) {
        var _0x8a6cf1 = _0x58f103[0] * "60000";
      } else if (_0x2c20a4.includes("hour")) {
        var _0x8a6cf1 = _0x58f103[0] * "3600000";
      } else {
        return _0x1067b4.reply(
          "*Please provide an option below !*\n      *" +
            prefix +
            "setclose 30 second*\n      *" +
            prefix +
            "setclose 10 minute*\n      *" +
            prefix +
            "setclose 1 hour*"
        );
      }
      _0x1067b4.reply(
        "*Group close in next '" + _0x58f103[0] + " " + _0x58f103[1] + "'!*"
      );
      setTimeout(() => {
        const _0x54c8b1 = "*Group closed!*";
        _0x1067b4.bot.groupSettingUpdate(_0x1067b4.from, "announcement");
        _0x1067b4.reply(_0x54c8b1);
      }, _0x8a6cf1);
    } catch (_0x491a92) {
      console.log({
        e: _0x491a92,
      });
    }
  }
);
smd(
  {
    cmdname: "opentime",
    alias: ["setopen", "setunmute"],
    desc: "set temporary timer to open a group chat!",
    category: "group",
    filename: __filename,
  },
  async (_0x4f388a, _0x57db16, { args: _0x26380a }) => {
    try {
      if (!_0x4f388a.isGroup) {
        return _0x4f388a.reply(tlang("group"));
      }
      if (!_0x4f388a.isBotAdmin) {
        return _0x4f388a.reply(tlang("botAdmin"));
      }
      if (!_0x4f388a.isAdmin && !_0x4f388a.isCreator) {
        return _0x4f388a.reply(tlang("admin"));
      }
      let _0x2de426 = _0x26380a[1] || "";
      let _0x53a659 = parseInt(_0x26380a[0]) || "";
      if (!_0x53a659 || isNaN(_0x53a659)) {
        return await _0x4f388a.reply(
          "*please provide time with type*\n*Use : " +
            prefix +
            "setopen 2 minute*"
        );
      }
      if (_0x2de426.includes("sec")) {
        var _0x3fc29d = _0x26380a[0] * "1000";
      } else if (_0x2de426.includes("min")) {
        var _0x3fc29d = _0x26380a[0] * "60000";
      } else if (_0x2de426.includes("hour")) {
        var _0x3fc29d = _0x26380a[0] * "3600000";
      } else {
        return _0x4f388a.reply(
          "*Please provide an option below !*\n      *" +
            prefix +
            "setopen 40 second*\n      *" +
            prefix +
            "setopen 10 minute*\n      *" +
            prefix +
            "setopen 1 hour*"
        );
      }
      _0x4f388a.reply(
        "*Group open in next '" + _0x26380a[0] + " " + _0x26380a[1] + "'!*"
      );
      setTimeout(() => {
        const _0x9e99d4 =
          "**\n *Now Members Can Send Messages*";
        _0x4f388a.bot.groupSettingUpdate(_0x4f388a.from, "not_announcement");
        _0x4f388a.reply(_0x9e99d4);
      }, _0x3fc29d);
    } catch (_0x12a19a) {
      console.log({
        e: _0x12a19a,
      });
    }
  }
);
