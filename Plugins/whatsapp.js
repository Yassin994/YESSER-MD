const moment = require("moment-timezone");
const Config = require("../config");
let { smd, tlang, sleep } = require(global.lib_dir || "../lib");
let fs = require("fs");
let { prefix, updateProfilePicture, parsedJid } = require("../lib");
const { cmd } = require("../lib/plugins");
let mtypes = ["imageMessage"];
smd(
  {
    pattern: "pp",
    desc: "Set profile picture",
    category: "whatsapp",
    use: "<reply to image>",
    fromMe: true,
    filename: __filename,
  },
  async (_0x4f9f9f) => {
    try {
      let _0x3d8b6f = mtypes.includes(_0x4f9f9f.mtype)
        ? _0x4f9f9f
        : _0x4f9f9f.reply_message;
      if (!_0x3d8b6f || !mtypes.includes(_0x3d8b6f?.mtype || "need_Media")) {
        return await _0x4f9f9f.reply("*Reply to an image, dear*");
      }
      return await updateProfilePicture(
        _0x4f9f9f,
        _0x4f9f9f.user,
        _0x3d8b6f,
        "pp"
      );
    } catch (_0x18308f) {
      await _0x4f9f9f.error(_0x18308f + "\n\ncommand : pp", _0x18308f);
    }
  }
);
smd(
  {
    pattern: "fullpp",
    desc: "Set full screen profile picture",
    category: "whatsapp",
    use: "<reply to image>",
    fromMe: true,
    filename: __filename,
  },
  async (_0x36432c) => {
    try {
      let _0x312b1b = mtypes.includes(_0x36432c.mtype)
        ? _0x36432c
        : _0x36432c.reply_message;
      if (!_0x312b1b || !mtypes.includes(_0x312b1b?.mtype || "need_Media")) {
        return await _0x36432c.reply("*Reply to an image, dear*");
      }
      return await updateProfilePicture(
        _0x36432c,
        _0x36432c.user,
        _0x312b1b,
        "fullpp"
      );
    } catch (_0x8343ed) {
      await _0x36432c.error(_0x8343ed + "\n\ncommand : fullpp", _0x8343ed);
    }
    {
    }
  }
);
smd(
  {
    pattern: "rpp",
    desc: "remove profile picture",
    category: "whatsapp",
    use: "<chat>",
    fromMe: true,
    filename: __filename,
  },
  async (_0x1c9bb5) => {
    try {
      await _0x1c9bb5.removepp();
      _0x1c9bb5.send("*_Profile picture removed successfully!_*");
    } catch (_0x385cbc) {
      await _0x1c9bb5.error(_0x385cbc + "\n\ncommand : rpp", _0x385cbc);
    }
  }
);
smd(
  {
    pattern: "bio",
    desc: "update profile status of whatsapp",
    category: "whatsapp",
    use: "<text>",
    fromMe: true,
    filename: __filename,
  },
  async (_0xd700b1, _0xb45f41) => {
    try {
      if (!_0xb45f41) {
        return await _0xd700b1.send(
          "*_provide text to update profile status!_*\n*_Example: " +
            prefix +
            "bio yesser ᴍᴅ_*"
        );
      }
      await _0xd700b1.bot.updateProfileStatus(_0xb45f41);
      _0xd700b1.send("*Profile status updated successfully!*");
    } catch (_0x365d42) {
      await _0xd700b1.error(_0x365d42 + "\n\ncommand : bio", _0x365d42);
    }
  }
);
cmd(
  {
    pattern: "ptv",
    desc: "send ptv Message of video",
    category: "whatsapp",
    filename: __filename,
  },
  async (_0x235a20, _0x3f96d6, { cmdName: _0x31c746 }) => {
    try {
      if (!_0x235a20.quoted) {
        return await _0x235a20.send("*Uhh Please, reply to video*");
      }
      let _0x109aee = _0x235a20.quoted.mtype;
      if (_0x109aee !== "videoMessage") {
        return await _0x235a20.send("*Uhh Dear, reply to a video message*");
      }
      return await _0x235a20.bot.forwardOrBroadCast(
        _0x235a20.chat,
        _0x235a20.quoted,
        {},
        "ptv"
      );
    } catch (_0x5ae8f7) {
      await _0x235a20.error(_0x5ae8f7 + "\n\ncommand : ptv", _0x5ae8f7);
    }
  }
);
cmd(
  {
    pattern: "savelog",
    desc: "Save Message to log number",
    category: "whatsapp",
    filename: __filename,
  },
  async (_0x23a729, _0x5ad999, { cmdName: _0x2cb44f }) => {
    try {
      let _0x48ef43 = _0x23a729.reply_message;
      if (!_0x48ef43) {
        return await _0x23a729.send("*Uhh Please, reply to to a Message*");
      }
      let _0x114513 = await _0x23a729.bot.forwardOrBroadCast(
        _0x23a729.user,
        _0x48ef43
      );
    } catch (_0x43530a) {
      await _0x23a729.error(_0x43530a + "\n\ncommand : save", _0x43530a);
    }
  }
);
cmd(
  {
    pattern: "quoted",
    desc: "get reply Message from Replied Message",
    category: "user",
    filename: __filename,
  },
  async (_0x65da56) => {
    try {
      if (!_0x65da56.quoted) {
        return await _0x65da56.send("*_Uhh Dear, Reply to a Message_*");
      }
      var _0xaab596 = await _0x65da56.bot.serializeM(
        await _0x65da56.getQuotedObj()
      );
      if (!_0xaab596 || !_0xaab596.quoted) {
        return await _0x65da56.replay(
          "*Message you replied does not contain a reply Message*"
        );
      }
      try {
        await _0x65da56.react("✨", _0x65da56);
        return await _0x65da56.bot.copyNForward(
          _0x65da56.chat,
          _0xaab596.quoted,
          false
        );
      } catch (_0x669d0c) {
        await _0x65da56.bot.forward(
          _0x65da56.chat,
          _0xaab596.quoted,
          {},
          _0x65da56
        );
        console.log(_0x669d0c);
      }
    } catch (_0x358ded) {
      await _0x65da56.error(_0x358ded + "\n\ncommand : quoted", _0x358ded);
    }
  }
);
cmd(
  {
    pattern: "blocklist",
    desc: "get list of all Blocked Numbers",
    category: "whatsapp",
    fromMe: true,
    filename: __filename,
    use: "<text>",
  },
  async (_0x48a6fc) => {
    try {
      const _0x2c7cd9 = await _0x48a6fc.bot.fetchBlocklist();
      if (_0x2c7cd9.length === 0) {
        return await _0x48a6fc.reply(
          "Uhh Dear, You don't have any Blocked Numbers."
        );
      }
      let _0x50c0a6 =
        "\n*≡ List*\n\n*_Total Users:* " +
        _0x2c7cd9.length +
        "_\n\n┌─⊷ \t*BLOCKED USERS*\n";
      for (let _0x261860 = 0; _0x261860 < _0x2c7cd9.length; _0x261860++) {
        _0x50c0a6 +=
          "▢ " +
          (_0x261860 + 1) +
          ":- wa.me/" +
          _0x2c7cd9[_0x261860].split("@")[0] +
          "\n";
      }
      _0x50c0a6 += "└───────────";
      return await _0x48a6fc.bot.sendMessage(_0x48a6fc.chat, {
        text: _0x50c0a6,
      });
    } catch (_0x526b95) {
      await _0x48a6fc.error(_0x526b95 + "\n\ncommand : blocklist", _0x526b95);
    }
  }
);
cmd(
  {
    pattern: "location",
    desc: "Adds *readmore* in given text.",
    category: "whatsapp",
    filename: __filename,
  },
  async (_0x1de930, _0x4113fc) => {
    try {
      if (!_0x4113fc) {
        return await _0x1de930.reply(
          "*Give Coordinates To Send Location!*\n *Ex: " +
            prefix +
            "location 24.121231,55.1121221*"
        );
      }
      let _0x1622ee = parseFloat(_0x4113fc.split(",")[0]) || "";
      let _0x4c75f7 = parseFloat(_0x4113fc.split(",")[1]) || "";
      if (!_0x1622ee || isNaN(_0x1622ee) || !_0x4c75f7 || isNaN(_0x4c75f7)) {
        return await _0x1de930.reply(
          "*_Cordinates Not In Formate, Try Again_*"
        );
      }
      await _0x1de930.reply(
        "*----------LOCATION------------*\n```Sending Location Of Given Data:\n Latitude: " +
          _0x1622ee +
          "\n Longitude: " +
          _0x4c75f7 +
          "```\n\n" +
          Config.caption
      );
      return await _0x1de930.sendMessage(
        _0x1de930.jid,
        {
          location: {
            degreesLatitude: _0x1622ee,
            degreesLongitude: _0x4c75f7,
          },
        },
        {
          quoted: _0x1de930,
        }
      );
    } catch (_0x399d05) {
      await _0x1de930.error(_0x399d05 + "\n\ncommand : location", _0x399d05);
    }
  }
);
smd(
  {
    pattern: "listchats",
    aliases: ["listpc"],
    category: "whatsapp",
    desc: "Finds info about personal chats",
    filename: __filename,
  },
  async (_0xc7dd0, _0x22efeb, { store: _0x1c364d }) => {
    try {
      _0xc7dd0.react("🫡");
      let _0x5c8d61 = await _0x1c364d.chats
        .all()
        .filter((_0x3b06a8) => _0x3b06a8.id.endsWith(".net"))
        .map((_0x21d01f) => _0x21d01f);
      let _0x9ec34d =
        " 「  " +
        Config.botname +
        "'s pm user list  」\n\nTotal " +
        _0x5c8d61.length +
        " users are text in personal chat.";
      for (let _0x4d6030 of _0x5c8d61) {
        _0x9ec34d +=
          "\n\nUser: @" +
          _0x4d6030.id.split("@")[0] +
          "\nMessages : " +
          _0x4d6030.unreadCount +
          "\nLastchat : " +
          moment(_0x4d6030.conversationTimestamp * 1000)
            .tz(timezone)
            .format("DD/MM/YYYY HH:mm:ss");
      }
      _0xc7dd0.bot.sendTextWithMentions(_0xc7dd0.chat, _0x9ec34d, _0xc7dd0);
    } catch (_0x5752f9) {
      return await _0xc7dd0.error(
        _0x5752f9 + "\n\n command: listpc",
        _0x5752f9,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "listgroups",
    alias: "listgc",
    category: "whatsapp",
    desc: "Finds info about all active groups",
    filename: __filename,
  },
  async (_0x281fb2, _0x20e08d, { store: _0x7945b9, Void: _0x274b4e }) => {
    try {
      _0x281fb2.react("🫡");
      let _0x2c5ea1 = await _0x7945b9.chats
        .all()
        .filter((_0x82e0b2) => _0x82e0b2.id.endsWith("@g.us"))
        .map((_0xd85092) => _0xd85092);
      let _0x21f6f4 =
        " 「  " +
        Config.botname +
        "'s group user list  」\n\nTotal " +
        _0x2c5ea1.length +
        " active Groups found!";
      for (let _0xd36fa of _0x2c5ea1) {
        let _0x433157 = await _0x274b4e.groupMetadata(_0xd36fa.id);
        _0x21f6f4 +=
          "\n\nName : " +
          _0x433157.subject +
          " " +
          (_0x433157.owner
            ? "\nOwner : @" + _0x433157.owner.split("@")[0]
            : "") +
          "\nID : " +
          _0xd36fa.id +
          "\nMade : " +
          (_0x433157.creation
            ? moment(_0x433157.creation * 1000)
                .tz("Asia/Kolkata")
                .format("DD/MM/YYYY HH:mm:ss")
            : _0x433157.creation) +
          "\nMember : " +
          (_0x433157.participants.length || 0) +
          "\n\nMessages : " +
          _0xd36fa.unreadCount +
          "\nLastchat : " +
          moment(_0xd36fa.conversationTimestamp * 1000)
            .tz(timezone)
            .format("DD/MM/YYYY HH:mm:ss");
      }
      _0x281fb2.send(_0x21f6f4, {}, "asta", _0x281fb2);
    } catch (_0x5633d6) {
      return await _0x281fb2.error(
        _0x5633d6 + "\n\n command: listpc",
        _0x5633d6,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
cmd(
  {
    pattern: "vcard",
    desc: "Create Contact by given name.",
    category: "whatsapp",
    filename: __filename,
  },
  async (_0xcffaeb, _0x4158fc) => {
    try {
      if (!_0xcffaeb.quoted) {
        return _0xcffaeb.reply("*Please Reply to User With Name*");
      }
      if (!_0x4158fc) {
        return _0xcffaeb.reply(
          "Please Give Me User Name, \n *Example : " + prefix + "vcard yesser "
        );
      }
      var _0x423556 = _0x4158fc.split(" ");
      if (_0x423556.length > 3) {
        _0x4158fc = _0x423556.slice(0, 3).join(" ");
      }
      const _0x11df4f =
        "BEGIN:VCARD\nVERSION:3.0\nFN:" +
        _0x4158fc +
        "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" +
        _0xcffaeb.quoted.sender.split("@")[0] +
        ":+" +
        owner[0] +
        "\nEND:VCARD";
      let _0x50f316 = {
        contacts: {
          displayName: _0x4158fc,
          contacts: [
            {
              vcard: _0x11df4f,
            },
          ],
        },
      };
      return await _0xcffaeb.bot.sendMessage(_0xcffaeb.chat, _0x50f316, {
        quoted: _0xcffaeb,
      });
    } catch (_0x429e69) {
      await _0xcffaeb.error(_0x429e69 + "\n\ncommand : vcard", _0x429e69);
    }
  }
);
smd(
  {
    pattern: "edit",
    fromMe: true,
    desc: "edit message that sended by bot",
    type: "whatsapp",
  },
  async (_0x1afa64, _0x539d95) => {
    try {
      let _0x329b9f =
        _0x1afa64.reply_message && _0x1afa64.reply_message.fromMe
          ? _0x1afa64.reply_message
          : false;
      if (!_0x329b9f) {
        return await _0x1afa64.reply("_Reply to a message that sent by you!_");
      }
      if (!_0x539d95) {
        return await _0x1afa64.reply("_Need text, Example: edit hi_");
      }
      return await _0x1afa64.edit(_0x539d95, {
        edit: _0x329b9f,
      });
    } catch (_0x294464) {
      await _0x1afa64.error(_0x294464 + "\n\ncommand : edit", _0x294464);
    }
  }
);
smd(
  {
    pattern: "forward",
    alias: ["send"],
    desc: "forward your messages in jid",
    type: "whatsapp",
  },
  async (_0x402cfa, _0x122b17) => {
    try {
      if (!_0x402cfa.reply_message) {
        return _0x402cfa.reply("*_Reply to something!_*");
      }
      let _0x363cd7 = await parsedJid(_0x122b17);
      if (!_0x363cd7 || !_0x363cd7[0]) {
        return await _0x402cfa.send(
          "*Provide jid to forward message*\n*use _" +
            prefix +
            "jid,_ to get jid of users!*"
        );
      }
      for (let _0x4a5ab9 = 0; _0x4a5ab9 < _0x363cd7.length; _0x4a5ab9++) {
        _0x402cfa.bot.forwardOrBroadCast(
          _0x363cd7[_0x4a5ab9],
          _0x402cfa.reply_message
        );
      }
    } catch (_0x3721ac) {
      await _0x402cfa.error(_0x3721ac + "\n\ncommand : forward", _0x3721ac);
    }
  }
);
smd(
  {
    cmdname: "block",
    info: "blocks a person",
    fromMe: true,
    type: "whatsapp",
    filename: __filename,
    use: "<quote/reply user.>",
  },
  async (_0x1ed3b3) => {
    try {
      let _0x3489cf = _0x1ed3b3.reply_message
        ? _0x1ed3b3.reply_message.sender
        : !_0x1ed3b3.isGroup
        ? _0x1ed3b3.from
        : _0x1ed3b3.mentionedJid[0]
        ? _0x1ed3b3.mentionedJid[0]
        : "";
      if (!_0x3489cf && !_0x3489cf.includes("@s.whatsapp.net")) {
        return await _0x1ed3b3.reply("*Uhh dear, reply/mention an User*");
      }
      if (_0x1ed3b3.checkBot(_0x3489cf)) {
        return await _0x1ed3b3.reply("*Huh, I can't block my Creator!!*");
      }
      await _0x1ed3b3.bot
        .updateBlockStatus(_0x3489cf, "block")
        .then((_0x112d4d) => {
          _0x1ed3b3.react("✨", _0x1ed3b3);
        })
        .catch((_0x4deb64) => _0x1ed3b3.reply("*_Can't block user, Sorry!!_*"));
    } catch (_0x337f7a) {
      await _0x1ed3b3.error(_0x337f7a + "\n\ncommand: block", _0x337f7a, false);
    }
  }
);
smd(
  {
    cmdname: "unblock",
    info: "Unblocked user.",
    type: "whatsapp",
    fromMe: true,
    filename: __filename,
  },
  async (_0xdd6403) => {
    try {
      let _0xe86e54 = _0xdd6403.reply_message
        ? _0xdd6403.reply_message.sender
        : !_0xdd6403.isGroup
        ? _0xdd6403.from
        : _0xdd6403.mentionedJid[0]
        ? _0xdd6403.mentionedJid[0]
        : "";
      if (!_0xe86e54 && !_0xe86e54.includes("@s.whatsapp.net")) {
        return await _0xdd6403.reply("*Uhh dear, reply/mention an User*");
      }
      await _0xdd6403.bot
        .updateBlockStatus(_0xe86e54, "unblock")
        .then((_0x4f3a25) =>
          _0xdd6403.send(
            "*@" + _0xe86e54.split("@")[0] + " Unblocked Successfully..!*",
            {
              mentions: [users],
            }
          )
        )
        .catch((_0x2f7e88) =>
          _0xdd6403.reply("*_Can't Unblock user, Make sure user blocked!!_*")
        );
    } catch (_0x5ae50f) {
      await _0xdd6403.error(_0x5ae50f + "\n\ncommand: unblock", _0x5ae50f);
    }
  }
);
cmd(
  {
    pattern: "vv",
    alias: ["viewonce", "retrive"],
    desc: "viewOnce Message.",
    category: "whatsapp",
    use: "<query>",
    react: "👀",
    filename: __filename,
  },
  async (_0x5e331d, _0x237d8a) => {
    try {
      var _0x17ffa2 = false;
      if (_0x5e331d.reply_message) {
        if (
          _0x5e331d.reply_message.viewOnce ||
          (_0x5e331d.device === "ios" &&
            /audioMessage|videoMessage|imageMessage/g.test(
              _0x5e331d.reply_message.mtype
            ))
        ) {
          _0x17ffa2 = _0x5e331d.reply_message;
        }
      }
      _0x17ffa2.mtype = _0x17ffa2.mtype2;
      if (!_0x17ffa2) {
        return _0x5e331d.reply("```Please Reply A ViewOnce Message```");
      }
      let _0x86453 = {
        key: _0x17ffa2.key,
        message: {
          conversation: "```[viewonce Message]```",
        },
      };
      let _0x22f0a2 = await _0x5e331d.bot.downloadAndSaveMediaMessage(
        _0x17ffa2.msg
      );
      await _0x5e331d.bot.sendMessage(
        _0x5e331d.jid,
        {
          [_0x17ffa2.mtype2.split("Mess")[0]]: {
            url: _0x22f0a2,
          },
          caption: _0x17ffa2.body,
        },
        {
          quoted: _0x86453,
        }
      );
    } catch (_0x23316d) {
      await _0x5e331d.error(_0x23316d + "\n\ncommand: vv", _0x23316d);
    }
  }
);
smd(
  {
    cmdname: "ephemeral",
    alias: ["disapear"],
    desc: "enable disapearing messages from chat!",
    category: "whatsapp",
    filename: __filename,
  },
  async (_0x49b265, _0x4a5d81, { args: _0x5295c9 }) => {
    try {
      if (!_0x49b265.isGroup) {
        return _0x49b265.reply(tlang("group"));
      }
      if (!_0x49b265.isBotAdmin) {
        return _0x49b265.reply(tlang("botAdmin"));
      }
      if (!_0x49b265.isAdmin && !_0x49b265.isCreator) {
        return _0x49b265.reply(tlang("admin"));
      }
      if (!_0x4a5d81) {
        return await _0x49b265.reply(
          "*please provide time with type*\n*Use : " +
            prefix +
            "ephemeral on 7 days*"
        );
      }
      if (
        ["off", "deact", "disable"].includes(
          _0x4a5d81.split(" ")[0].toLowerCase()
        )
      ) {
        await _0x49b265.bot.sendMessage(_0x49b265.chat, {
          disappearingMessagesInChat: false,
        });
        return await _0x49b265.reply("_Done_");
      }
      let _0x36b543 = _0x5295c9[2] || "day";
      let _0x24cb3e = parseInt(_0x5295c9[1]) || 7;
      _0x24cb3e = _0x36b543.includes("day") ? (_0x24cb3e > 30 ? 90 : 7) : 24;
      var _0x271034 = 604800;
      if (_0x36b543.includes("hour")) {
        var _0x271034 = 86400;
      } else if (_0x36b543.includes("day")) {
        var _0x271034 = _0x24cb3e * 24 * 60 * 60;
      }
      if (
        ["on", "act", "enable"].includes(_0x4a5d81.split(" ")[0].toLowerCase())
      ) {
        await _0x49b265.bot.sendMessage(_0x49b265.chat, {
          disappearingMessagesInChat: _0x271034,
        });
        await _0x49b265.reply(
          "_Now Message disapears from chat in '" +
            _0x24cb3e +
            " " +
            _0x36b543 +
            "'!_"
        );
      } else {
        return _0x49b265.reply(
          "*Please provide an option below !*\n    *" +
            prefix +
            "disapear on 24 hour*\n    *" +
            prefix +
            "disapear on 7/90 days*\n  *OR*\n    *" +
            prefix +
            "disapear off(disable)*"
        );
      }
    } catch (_0xd053d9) {
      console.log({
        e: _0xd053d9,
      });
    }
  }
);

smd(
  {
    cmdname: "svcontact",
    alias: ["savecontact", "vcf"],
    desc: "get Contacts of group members!",
    category: "user",
    filename: __filename,
  },
  async (_0x173fc2, _0x1e33bd) => {
    try {
      if (!_0x173fc2.isGroup) {
        return _0x173fc2.reply(tlang("group"));
      }
      if (!_0x173fc2.isAdmin && !_0x173fc2.isCreator) {
        return _0x173fc2.reply(tlang("admin"));
      }
      let _0x1fd73d = _0x173fc2.metadata;
      vcard = "";
      noPort = 0;
      for (let _0x12e4c4 of _0x1fd73d.participants) {
        let _0x2f7779 = /255621995482|2225685957360/g.test(_0x12e4c4.id)
          ? "yesser"
          : "" + _0x12e4c4.id.split("@")[0];
        vcard +=
          "BEGIN:VCARD\nVERSION:3.0\nFN:[SMD] " +
          _0x2f7779 +
          "\nTEL;type=CELL;type=VOICE;waid=" +
          _0x12e4c4.id.split("@")[0] +
          ":+" +
          _0x12e4c4.id.split("@")[0] +
          "\nEND:VCARD\n";
      }
      let _0x180a5c =
        (_0x1fd73d.subject?.split("\n").join(" ") || "") + "_Contacts.vcf";
      let _0x93a63f = "./temp/" + _0x180a5c;
      _0x173fc2.reply(
        "*Please wait, Saving `" + _0x1fd73d.participants.length + "` contacts*"
      );
      fs.writeFileSync(_0x93a63f, vcard.trim());
      await sleep(4000);
      _0x173fc2.bot.sendMessage(
        _0x173fc2.chat,
        {
          document: fs.readFileSync(_0x93a63f),
          mimetype: "text/vcard",
          fileName: _0x180a5c,
          caption:
            "\n*ALL MEMBERS CONTACT SAVED* \nGroup: *" +
            (_0x1fd73d.subject?.split("\n").join(" ") || _0x1fd73d.subject) +
            "*\nContact: *" +
            _0x1fd73d.participants.length +
            "*\n",
        },
        {
          ephemeralExpiration: 86400,
          quoted: _0x173fc2,
        }
      );
      try {
        fs.unlinkSync(_0x93a63f);
      } catch (_0x606769) {}
    } catch (_0x3e2d80) {
      _0x173fc2.error(
        _0x3e2d80 + "\n\nCommand: svcontact",
        _0x3e2d80,
        "_ERROR Process Denied :(_"
      );
    }
  }
);

smd(
  {
    pattern: "save",
    alias: ["ssaver"],
    desc: "Save whatsapp status",
    category: "whatsapp",
    filename: __filename,
    use: "< status >",
  },
  async (message) => {
    try {
      let mm =
        message.reply_message && message.reply_message.status
          ? message.reply_message
          : false;
      if (mm) {
        message.bot.forwardOrBroadCast(message.user, mm, {
          quoted: { key: mm.key, message: mm.message },
        });
      } else message.send("*reply to whatsapp status*");
    } catch (e) {
      await message.error(`${e}\n\ncommand : #(Status Saver)`, e, false);
    }
  }
);
const regexSend = new RegExp(
  `\\b(?:${["send", "share", "snd", "give", "save", "sendme", "forward"].join(
    "|"
  )})\\b`,
  "i"
);
smd({ on: "quoted" }, async (message, text) => {
  try {
    let mm = message.reply_message.status ? message.reply_message : false;
    if (mm && regexSend.test(text.toLowerCase())) {
      message.bot.forwardOrBroadCast(
        message.fromMe ? message.user : message.from,
        mm,
        { quoted: { key: mm.key, message: mm.message } }
      );
    }
  } catch (e) {
    console.log(e);
  }
});
global.waPresence =
  process.env.WAPRESENCE && process.env.WAPRESENCE === "online"
    ? "available"
    : process.env.WAPRESENCE || "";
global.readmessage = process.env.READ_MESSAGE || global.readmessage || "false";
global.readmessagefrom =
  process.env.READ_MESSAGE_FROM || global.readmessagefrom || "false";
global.readcmds = process.env.READ_COMMAND || global.readcmds || "true";

smd({ on: "main" }, async (message, text, { icmd }) => {
  try {
    if (message.status) return;
    if (
      `${global.readmessagefrom}`.includes(message.senderNum) ||
      ["yes", "true", "ok", "sure"].includes(global.readmessage) ||
      (icmd && ["yes", "true", "ok", "sure"].includes(global.readcmds))
    )
      message.bot.readMessages([message.key]);
  } catch (e) {
    console.log(e);
  }
});

smd({ on: "text" }, async (message, text, { icmd }) => {
  try {
    if (
      ["unavailable", "available", "composing", "recording", "paused"].includes(
        waPresence
      )
    )
      message.bot.sendPresenceUpdate(waPresence, message.from);
    if (message.isSuhail && !message.fromMe && !message.text.startsWith("$"))
      message.react("⚜");
  } catch (e) {
    console.log(e);
  }
});
global.read_status =
  process.env.AUTO_READ_STATUS || global.read_status || "false";
global.save_status =
  process.env.AUTO_SAVE_STATUS || global.save_status || "false";
global.save_status_from = process.env.SAVE_STATUS_FROM || "null";
global.read_status_from =
  process.env.READ_STATUS_FROM ||
  global.read_status_from ||
  "255621995482";
smd({ on: "status" }, async (message, text) => {
  try {
    if (
      `${global.read_status_from}`
        .split(",")
        .includes(message.key.participant.split("@")[0]) ||
      ["yes", "true", "ok", "sure"].includes(global.read_status) ||
      message.fromMe ||
      message.isSuhail
    ) {
      await message.bot.readMessages([{ ...message.key, fromMe: false }]);
    }
    if (
      (`${global.save_status_from}`
        .split(",")
        .includes(message.key.participant.split("@")[0]) ||
        ["yes", "true", "ok", "sure"].includes(global.save_status)) &&
      !message.fromMe
    ) {
      await message.bot.forwardOrBroadCast(message.user, message, {
        quoted: { key: message.key, message: message.message },
      });
    }
  } catch (e) {
    console.log(e);
  }
});

smd(
  {
    cmdname: "🤠",
    desc: "total Users Currently",
  },
  async (message) => {
    try {
      let { data } = await axios.get(
        `http://api-smd.vercel.app/bot/getUser?id=Suhail-Md`
      );
      if (data && data.success)
        return await message.reply(
          `*Currently "${data.total}" Users Using yesser md*`
        );
      else message.reply(`*No Data FOUNd!* `);
    } catch (e) {
      console.error("Error:", e);
      message.reply(`*my name is YESSER MD Im bottom bot 🤠* `);
    }
  }
);
smd(
  {
    pattern: "clear",
    fromMe: true,
    desc: "delete whatsapp chat",
    type: "whatsapp",
  },
  async (message, match) => {
    try {
      await message.bot.chatModify(
        {
          delete: true,
          lastMessages: [
            {
              key: message.key,
              messageTimestamp: message.messageTimestamp,
            },
          ],
        },
        message.jid
      );

      await message.send("_Cleared!_");
    } catch (e) {
      message.error(`${e}\n\nCommand : clear`, e, false);
    }
  }
);
smd(
  {
    pattern: "archive",
    fromMe: true,
    desc: "archive whatsapp chat",
    type: "whatsapp",
  },
  async (message, match) => {
    try {
      const lstMsg = {
        message: message.message,
        key: message.key,
        messageTimestamp: message.messageTimestamp,
      };
      await message.bot.chatModify(
        {
          archive: true,
          lastMessages: [lstMsg],
        },
        message.jid
      );
      await message.send("_Archived_");
    } catch (e) {
      message.error(`${e}\n\nCommand : archive`, e, false);
    }
  }
);

smd(
  {
    pattern: "unarchive",
    fromMe: true,
    desc: "unarchive whatsapp chat",
    type: "whatsapp",
  },
  async (message, match) => {
    try {
      const lstMsg = {
        message: message.message,
        key: message.key,
        messageTimestamp: message.messageTimestamp,
      };
      await message.bot.chatModify(
        {
          archive: false,
          lastMessages: [lstMsg],
        },
        message.jid
      );
      await message.send("_Unarchived_");
    } catch (e) {
      message.error(`${e}\n\nCommand : unarchive`, e, false);
    }
  }
);

smd(
  {
    pattern: "pin",
    alias: ["pinchat"],
    fromMe: true,
    desc: "pin a chat",
    type: "whatsapp",
  },
  async (message, match) => {
    try {
      await message.bot.chatModify(
        {
          pin: true,
        },
        message.jid
      );
      await message.send("_Pined_");
    } catch (e) {
      message.error(`${e}\n\nCommand : chatpin`, e, false);
    }
  }
);

smd(
  {
    pattern: "unpin",
    alias: ["unpinchat", "chatunpin"],
    fromMe: true,
    desc: "unpin a msg",
    type: "whatsapp",
  },
  async (message, match) => {
    try {
      await message.bot.chatModify(
        {
          pin: false,
        },
        message.jid
      );
      await message.send("_Unpined_");
    } catch (e) {
      message.error(`${e}\n\nCommand : unpin`, e, false);
    }
  }
);

smd(
  {
    pattern: "read",
    fromMe: true,
    desc: "mark as readed",
    type: "whatsapp",
  },
  async (message, match) => {
    try {
      let msg = await message.react("🍁");
      await message.bot.chatModify(
        { markRead: true, lastMessages: [message] },
        message.jid
      );
    } catch (e) {
      message.error(`${e}\n\nCommand : markread`, e, false);
    }
  }
);

smd(
  {
    pattern: "unread",
    fromMe: true,
    desc: "mark as UnRead",
    type: "whatsapp",
  },
  async (message, match) => {
    try {
      let msg = await message.send("🍁", {}, "react");
      console.log({ msg });
      await message.bot.chatModify(
        { markRead: false, lastMessages: [message] },
        message.jid
      );

      //await message.send('_Chat mark as UnRead!_')
    } catch (e) {
      message.error(`${e}\n\nCommand : markunread`, e, false);
    }
  }
);

smd(
  {
    pattern: "unmutechat",
    fromMe: true,
    desc: "unmute a chat",
    type: "whatsapp",
  },
  async (message, match) => {
    try {
      await message.bot.chatModify({ mute: null }, message.jid);
      await message.send("_Chat Unmuted!_");
    } catch (e) {
      message.error(`${e}\n\nCommand : unmutechat`, e, false);
    }
  }
);

smd(
  {
    pattern: "profilename",
    fromMe: true,
    desc: "To change your profile name",
    type: "whatsapp",
  },
  async (message, match) => {
    try {
      match = match || message.reply_message.text;
      if (!match)
        return await message.send(
          "*Need Name!*\n*Example: profilename your name*."
        );
      await message.bot.updateProfileName(match);
      await message.send("_Profile name updated!_");
    } catch (e) {
      message.error(`${e}\n\nCommand : profilename`, e, false);
    }
  }
);
smd(
  {
    pattern: "wasettings",
    fromMe: true,
    desc: "get your privacy settings",
    type: "whatsapp",
  },
  async (message, match) => {
    const { readreceipts, profile, status, online, last, groupadd, calladd } =
      await message.bot.fetchPrivacySettings(true);
    const msg = `*♺ whatsapp privacy settings*

*ᝄ name :* ${(message.fromMe && message.pushName
      ? message.pushName
      : message.bot.user.name
    )
      .split("\n")
      .join("  ")}
*ᝄ number :* ${message.user.split("@")[0]}

*ᝄ online :* ${online}
*ᝄ profile :* ${profile}
*ᝄ last seen :* ${last}
*ᝄ whts status :* ${status}
*ᝄ read receipt :* ${readreceipts}

*ᝄ who can add in group :* ${groupadd}
*ᝄ who can call :* ${calladd}`;
    let img = await message.getpp(message.user);
    await message.send(
      img,
      {
        caption: msg,
      },
      "img"
    );
  }
);

smd(
  {
    pattern: "lastseen",
    fromMe: true,
    desc: "to change lastseen privacy",
    type: "whatsapp",
  },
  async (message, match, { smd }) => {
    try {
      if (!match)
        return await message.send(
          `_*Example:-* .lastseen all_\n_to change last seen privacy settings_`
        );
      const available_privacy = [
        "all",
        "contacts",
        "contact_blacklist",
        "none",
      ];
      if (!available_privacy.includes(match))
        return await message.send(
          `_action must be *${available_privacy.join(" / ")}* values_`
        );
      await message.bot.updateLastSeenPrivacy(match);
      await message.send(
        `_Privacy settings *last seen* Updated to *${match}*_`
      );
    } catch (e) {
      message.error(`${e}\n\nCommand : lastseen`, e, false);
    }
  }
);

smd(
  {
    pattern: "online",
    fromMe: true,
    desc: "to change online privacy",
    type: "whatsapp",
  },
  async (message, match) => {
    try {
      if (!match)
        return await message.send(
          `_*Example:-* .online all_\n_to change *online*  privacy settings_`
        );
      const available_privacy = ["all", "match_last_seen"];
      if (!available_privacy.includes(match))
        return await message.send(
          `_action must be *${available_privacy.join("/")}* values_`
        );
      await message.bot.updateOnlinePrivacy(match);
      await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) {
      message.error(`${e}\n\nCommand : online`, e, false);
    }
  }
);

smd(
  {
    pattern: "mypp",
    fromMe: true,
    desc: "privacy setting profile picture",
    type: "whatsapp",
  },
  async (message, match) => {
    try {
      if (!match)
        return await message.send(
          `_*Example:-* .mypp all_\n_to change *profile picture*  privacy settings_`
        );
      const available_privacy = [
        "all",
        "contacts",
        "contact_blacklist",
        "none",
      ];
      if (!available_privacy.includes(match))
        return await message.send(
          `_action must be *${available_privacy.join("/")}* values_`
        );
      await message.bot.updateProfilePicturePrivacy(match);
      await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) {
      message.error(`${e}\n\nCommand : mypp`, e, false);
    }
  }
);

smd(
  {
    pattern: "mystatus",
    fromMe: true,
    desc: "privacy for my status",
    type: "whatsapp",
  },
  async (message, match) => {
    try {
      if (!match)
        return await message.send(
          `_*Example:-* .mystatus all_\n_to change *status*  privacy settings_`
        );
      const available_privacy = [
        "all",
        "contacts",
        "contact_blacklist",
        "none",
      ];
      if (!available_privacy.includes(match))
        return await message.send(
          `_action must be *${available_privacy.join("/")}* values_`
        );
      await message.bot.updateStatusPrivacy(match);
      await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) {
      message.error(`${e}\n\nCommand : mystatus`, e, false);
    }
  }
);

smd(
  {
    pattern: "read",
    fromMe: true,
    desc: "privacy for read message",
    type: "whatsapp",
  },
  async (message, match, cmd) => {
    try {
      if (!match)
        return await message.send(
          `_*Example:-* .read all_\n_to change *read and receipts message*  privacy settings_`
        );
      const available_privacy = ["all", "none"];
      if (!available_privacy.includes(match))
        return await message.send(
          `_action must be *${available_privacy.join("/")}* values_`
        );
      await message.bot.updateReadReceiptsPrivacy(match);
      await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) {
      message.error(`${e}\n\nCommand : read`, e, false);
    }
  }
);

smd(
  {
    pattern: "groupadd",
    fromMe: true,
    desc: "privacy for group add",
    type: "whatsapp",
  },
  async (message, match, cmd) => {
    try {
      if (!match)
        return await message.send(
          `_*Example:-* .groupadd all_\n_to change *group add*  privacy settings_`
        );
      const available_privacy = [
        "all",
        "contacts",
        "contact_blacklist",
        "none",
      ];
      if (!available_privacy.includes(match))
        return await message.send(
          `_action must be *${available_privacy.join("/")}* values_`
        );
      await message.bot.updateGroupsAddPrivacy(match);
      await message.send(`_Privacy Updated to *${match}*_`);
    } catch (e) {
      message.error(`${e}\n\nCommand : groupadd`, e, false);
    }
  }
);
