const { Config, smd, tlang } = require("../lib");
const cmd = smd;
let antiCallMessage =
  process.env.ANTICALL_MESSAGE ||
  "```Hello We cannot get calls at the moment```";
const _0x48b34b = _0x1c87;
(function (_0x59e32, _0x301416) {
  const _0x2aa6b3 = _0x1c87;
  const _0xa7b2f3 = _0x59e32();
  while (true) {
    try {
      const _0x30b6e8 =
        (-parseInt(_0x2aa6b3(449)) / 1) * (parseInt(_0x2aa6b3(446)) / 2) +
        -parseInt(_0x2aa6b3(443)) / 3 +
        parseInt(_0x2aa6b3(439)) / 4 +
        -parseInt(_0x2aa6b3(438)) / 5 +
        (-parseInt(_0x2aa6b3(444)) / 6) * (parseInt(_0x2aa6b3(474)) / 7) +
        parseInt(_0x2aa6b3(470)) / 8 +
        parseInt(_0x2aa6b3(483)) / 9;
      if (_0x30b6e8 === _0x301416) {
        break;
      } else {
        _0xa7b2f3.push(_0xa7b2f3.shift());
      }
    } catch (_0x33c54e) {
      _0xa7b2f3.push(_0xa7b2f3.shift());
    }
  }
})(_0x1336, 138919);
let antiCallCountries = [];
let antiCallusers = {};
let bots = false;
function _0x1c87(_0x2004d4, _0xd8eeb1) {
  const _0x383ce0 = _0x1336();
  _0x1c87 = function (_0x36048a, _0x53c2c3) {
    _0x36048a = _0x36048a - 437;
    let _0x235642 = _0x383ce0[_0x36048a];
    return _0x235642;
  };
  return _0x1c87(_0x2004d4, _0xd8eeb1);
}
const { prefix, bot_ } = require("../lib");
function _0x1336() {
  const _0x511723 = [
    "new",
    "480rkGVOl",
    "anticall all | 92_*",
    "false",
    "690rVQptf",
    "split",
    "includes",
    "updateOne",
    "Not set to any",
    "findOne",
    "send",
    '*anticall Succesfully set to "',
    "fromMe",
    "some",
    "offer",
    "deact",
    "suhail",
    '"!*',
    "join",
    " Call rejected From User @",
    "bot_",
    "off",
    "Detects calls and decline them. ",
    "map",
    "toString",
    "1219920dDRpDd",
    "*_anticall ",
    "isBot",
    "*_Please provide a Valid country code_*\n*example: ",
    "1176091zoPIve",
    "startsWith",
    "..!!_*",
    "*_Please provide country code to block calls_*\n*_eg: ",
    "trim",
    "from",
    " Country Code!_*\n *Provide Country code to Update Status*\n*Eg: _.anticall all | 212, 91_*",
    "filter",
    "anticall",
    "2807325oUmGcA",
    "all",
    "96005QyDHDY",
    "488436OhrRIL",
    "user",
    "owner",
    "warn",
    "284373txAeSM",
    "6cDJuwM",
  ];
  _0x1336 = function () {
    return _0x511723;
  };
  return _0x1336();
}
smd(
  {
    pattern: _0x48b34b(482),
    desc: _0x48b34b(467),
    category: _0x48b34b(441),
    use: "<on | off>",
    filename: __filename,
  },
  async (_0x3079c3, _0x16cfc8) => {
    const _0x4fb4e6 = _0x48b34b;
    let _0x20f464 =
      (await bot_[_0x4fb4e6(454)]({
        id: _0x4fb4e6(465) + _0x3079c3[_0x4fb4e6(440)],
      })) ||
      (await bot_[_0x4fb4e6(445)]({
        id: _0x4fb4e6(465) + _0x3079c3[_0x4fb4e6(440)],
      }));
    let _0xfa720 = _0x16cfc8 ? _0x16cfc8.toLowerCase()[_0x4fb4e6(478)]() : "";
    if (
      _0xfa720[_0x4fb4e6(475)](_0x4fb4e6(466)) ||
      _0xfa720[_0x4fb4e6(475)](_0x4fb4e6(460)) ||
      _0xfa720.startsWith("disable")
    ) {
      if (_0x20f464[_0x4fb4e6(482)] === _0x4fb4e6(448)) {
        return await _0x3079c3[_0x4fb4e6(455)](
          "*anticall Already Disabled In Current Chat!*"
        );
      }
      await bot_[_0x4fb4e6(452)](
        {
          id: _0x4fb4e6(465) + _0x3079c3.user,
        },
        {
          anticall: "false",
        }
      );
      return await _0x3079c3[_0x4fb4e6(455)]("*anticall Disable Succesfully!*");
    } else if (!_0x16cfc8) {
      return await _0x3079c3.send(
        _0x4fb4e6(471) +
          (_0x20f464[_0x4fb4e6(482)] === "false"
            ? _0x4fb4e6(453)
            : 'set to "' + _0x20f464[_0x4fb4e6(482)] + '"') +
          _0x4fb4e6(480)
      );
    }
    let _0x550952 = _0xfa720.includes(_0x4fb4e6(437))
      ? _0x4fb4e6(437)
      : _0x16cfc8
      ? _0x16cfc8[_0x4fb4e6(450)](",")
          [_0x4fb4e6(468)]((_0x5dedec) => parseInt(_0x5dedec))
          [_0x4fb4e6(481)]((_0x388aec) => !isNaN(_0x388aec))
          [_0x4fb4e6(463)](",")
      : false;
    if (!_0x16cfc8 || !_0x550952) {
      return await _0x3079c3[_0x4fb4e6(455)](
        _0x4fb4e6(477) + prefix + _0x4fb4e6(447)
      );
    } else if (_0x550952) {
      await bot_[_0x4fb4e6(452)](
        {
          id: _0x4fb4e6(465) + _0x3079c3[_0x4fb4e6(440)],
        },
        {
          anticall: "" + _0x550952,
        }
      );
      return await _0x3079c3[_0x4fb4e6(455)](
        _0x4fb4e6(456) + _0x550952 + _0x4fb4e6(462)
      );
    } else {
      return await _0x3079c3[_0x4fb4e6(455)](
        _0x4fb4e6(473) + prefix + "anticall all,212,91,231_*"
      );
    }
  }
);
smd(
  {
    call: _0x48b34b(459),
  },
  async (_0x1a2ce4) => {
    const _0x31f0ef = _0x48b34b;
    try {
      if (!bots) {
        bots = await bot_[_0x31f0ef(454)]({
          id: _0x31f0ef(465) + _0x1a2ce4[_0x31f0ef(440)],
        });
      }
      if (
        _0x1a2ce4[_0x31f0ef(457)] ||
        !bots ||
        !bots[_0x31f0ef(482)] ||
        bots[_0x31f0ef(482)] === _0x31f0ef(448)
      ) {
        return;
      }
      if (!antiCallCountries || !antiCallCountries[0]) {
        antiCallCountries = bots[_0x31f0ef(482)]?.[_0x31f0ef(450)](",") || [];
        antiCallCountries = antiCallCountries.filter(
          (_0x1e7c5a) => _0x1e7c5a[_0x31f0ef(478)]() !== ""
        );
      }
      let _0x15d906 = ("" + bots.anticall)[_0x31f0ef(451)](_0x31f0ef(437))
        ? _0x31f0ef(437)
        : "";
      let _0x166d3c =
        _0x15d906 == _0x31f0ef(437)
          ? true
          : antiCallCountries[_0x31f0ef(458)]((_0x464681) =>
              _0x1a2ce4[_0x31f0ef(479)]
                ?.[_0x31f0ef(469)]()
                ?.startsWith(_0x464681)
            );
      if (_0x166d3c || _0x1a2ce4[_0x31f0ef(472)]) {
        try {
          if (!antiCallusers || !antiCallusers[_0x1a2ce4[_0x31f0ef(479)]]) {
            antiCallusers[_0x1a2ce4.from] = {
              warn: 0,
            };
          }
          if (antiCallusers[_0x1a2ce4[_0x31f0ef(479)]][_0x31f0ef(442)] < 2) {
            await _0x1a2ce4[_0x31f0ef(455)](antiCallMessage);
          }
          antiCallusers[_0x1a2ce4[_0x31f0ef(479)]][_0x31f0ef(442)]++;
          await _0x1a2ce4[_0x31f0ef(455)](
            "*_" +
              antiCallusers[_0x1a2ce4[_0x31f0ef(479)]][_0x31f0ef(442)] +
              _0x31f0ef(464) +
              _0x1a2ce4.from.split("@")[0] +
              _0x31f0ef(476),
            {
              mentions: [_0x1a2ce4[_0x31f0ef(479)]],
            },
            _0x31f0ef(461),
            "",
            _0x1a2ce4[_0x31f0ef(440)]
          );
          return await _0x1a2ce4.decline();
        } catch {}
      }
    } catch {}
  }
);
cmd(
  {
    pattern: "jid",
    desc: "get jid of all user in a group.",
    category: "user",
    filename: __filename,
    use: "<@user>",
  },
  async ({ jid: _0x317d9b, reply: _0x355aae, quoted: _0x5256f4 }) => {
    if (_0x5256f4) {
      return _0x355aae(_0x5256f4.sender);
    } else {
      return _0x355aae(_0x317d9b);
    }
  }
);
cmd(
  {
    pattern: "getpp",
    desc: "Get Profile Pic For Given User",
    category: "user",
    filename: __filename,
  },
  async (_0x24b8a0) => {
    try {
      let _0x4cd072 = _0x24b8a0.reply_message
        ? _0x24b8a0.reply_message.sender
        : _0x24b8a0.mentionedJid[0]
        ? _0x24b8a0.mentionedJid[0]
        : _0x24b8a0.from;
      let _0x23f248;
      try {
        _0x23f248 = await _0x24b8a0.bot.profilePictureUrl(_0x4cd072, "image");
      } catch (_0x42ab42) {
        return _0x24b8a0.reply("```Profile Pic Not Fetched```");
      }
      return await _0x24b8a0.bot.sendMessage(
        _0x24b8a0.chat,
        {
          image: {
            url: _0x23f248,
          },
          caption: "  *---Profile Pic Is Here---*\n" + Config.caption,
        },
        {
          quoted: _0x24b8a0,
        }
      );
    } catch (_0x40b881) {
      await _0x24b8a0.error(_0x40b881 + "\n\ncommand : getpp", _0x40b881);
    }
  }
);
cmd(
  {
    pattern: "whois",
    desc: "Makes photo of replied sticker.",
    category: "user",
    use: "<reply to any person>",
    filename: __filename,
  },
  async (_0x5b9714) => {
    try {
      let _0x354e18 = _0x5b9714.reply_message
        ? _0x5b9714.reply_message.sender
        : _0x5b9714.mentionedJid[0]
        ? _0x5b9714.mentionedJid[0]
        : false;
      if (!_0x354e18 && _0x5b9714.isGroup) {
        const _0x561b75 =
          (await _0x5b9714.bot
            .profilePictureUrl(_0x5b9714.chat, "image")
            .catch(
              (_0x1c3876) => "https://telegra.ph/file/29a8c892a1d18fdb26028.jpg"
            )) || THUMB_IMAGE;
        const _0x3bf573 = _0x5b9714.metadata;
        const _0x3526c9 = _0x5b9714.admins
          .map(
            (_0x2df5bb, _0x5c8c6c) =>
              "  " + (_0x5c8c6c + 1) + ". wa.me/" + _0x2df5bb.id.split("@")[0]
          )
          .join("\n");
        const _0x46b7ba =
          _0x3bf573.owner ||
          _0x5b9714.admins.find((_0x297d66) => _0x297d66.admin === "superadmin")
            ?.id ||
          false;
        let _0x204314 =
          "\n      *「 GROUP INFORMATION 」*\n*▢ NAME :* \n   • " +
          _0x3bf573.subject +
          "\n*▢ Members :*\n   • " +
          _0x3bf573.participants.length +
          "\n*▢ Group Owner :*\n   • " +
          (_0x46b7ba ? "wa.me/" + _0x46b7ba.split("@")[0] : "notFound") +
          "\n*▢ Admins :*\n" +
          _0x3526c9 +
          "\n*▢ Description :*\n   • " +
          (_0x3bf573.desc?.toString() || "_not set_") +
          "\n   ";
        return await _0x5b9714.reply(
          _0x561b75,
          {
            caption: _0x204314,
          },
          "image"
        );
      } else {
        if (!_0x354e18) {
          return _0x5b9714.reply("*_Please Reply To A Person!_*");
        }
        try {
          var _0x12d99e = await _0x5b9714.bot.fetchStatus(_0x354e18);
          var _0x23847e = _0x12d99e.status;
          var _0xfd4a68 = _0x12d99e.setAt.toString();
          var _0x5d0d88 = _0xfd4a68.split(" ");
          if (_0x5d0d88.length > 3) {
            _0xfd4a68 = _0x5d0d88.slice(0, 5).join(" ");
          }
        } catch {
          var _0x23847e = "undefined";
          var _0xfd4a68 = "";
        }
        var _0x52ccee = _0x354e18.split("@")[0];
        let _0x5ae446;
        try {
          _0x5ae446 = await _0x5b9714.bot.profilePictureUrl(_0x354e18, "image");
        } catch (_0x17156a) {
          _0x5ae446 = "https://telegra.ph/file/29a8c892a1d18fdb26028.jpg";
        }
        var _0xf3d6e0 = await _0x5b9714.bot.getName(_0x354e18);
        return await _0x5b9714.bot.sendMessage(
          _0x5b9714.jid,
          {
            image: {
              url: _0x5ae446,
            },
            caption: "`YESSER MD WHATSAPP BOT`",
          },
          {
            quoted: _0x5b9714,
          }
        );
      }
    } catch (_0x31ca34) {
      await _0x5b9714.error(_0x31ca34 + "\n\ncommand : whois", _0x31ca34);
    }
  }
);
cmd(
  {
    pattern: "wa",
    desc: "Makes wa me of quoted or mentioned user.",
    category: "user",
    filename: __filename,
  },
  async (_0x3186cd) => {
    try {
      let _0x3c71d6 = _0x3186cd.reply_message
        ? _0x3186cd.reply_message.sender
        : _0x3186cd.mentionedJid[0]
        ? _0x3186cd.mentionedJid[0]
        : false;
      await _0x3186cd.reply(
        !_0x3c71d6
          ? "*Please Reply Or Mention A User*"
          : "https://wa.me/" + _0x3c71d6.split("@")[0]
      );
    } catch (_0x100353) {
      await _0x3186cd.error(_0x100353 + "\n\ncommand : wa", _0x100353, false);
    }
  }
);
cmd(
  {
    pattern: "mee",
    desc: "Makes wa me for user.",
    category: "user",
    filename: __filename,
  },
  async (_0x12ac1b) => {
    try {
      return await _0x12ac1b.reply(
        "https://wa.me/" + _0x12ac1b.sender.split("@")[0]
      );
    } catch {}
  }
);
let bgmm = false;
smd(
  {
    pattern: "antidelete",
    alias: ["delete"],
    desc: "turn On/Off auto download deletes",
    fromMe: true,
    category: "user",
    use: "<on/off>",
    filename: __filename,
  },
  async (_0x17cbbb, _0x32fa8b) => {
    try {
      bgmm =
        (await bot_.findOne({
          id: "bot_" + _0x17cbbb.user,
        })) ||
        (await bot_.new({
          id: "bot_" + _0x17cbbb.user,
        }));
      let _0x649c1d = _0x32fa8b.toLowerCase().split(" ")[0].trim();
      if (_0x649c1d === "on" || _0x649c1d === "enable" || _0x649c1d === "act") {
        if (bgmm.antidelete === "true") {
          return await _0x17cbbb.reply("*Anti_Delete already enabled!*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x17cbbb.user,
          },
          {
            antidelete: "true",
          }
        );
        return await _0x17cbbb.reply("*Anti_Delete Succesfully enabled*");
      } else if (
        _0x649c1d === "off" ||
        _0x649c1d === "disable" ||
        _0x649c1d === "deact"
      ) {
        if (bgmm.antidelete === "false") {
          return await _0x17cbbb.reply("*Anti_Delete already disabled*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x17cbbb.user,
          },
          {
            antidelete: "false",
          }
        );
        return await _0x17cbbb.reply("*Anti_Delete Succesfully deactivated*");
      } else {
        return await _0x17cbbb.send(
          "*_Use on/off to enable/disable Anti_Delete!_*"
        );
      }
    } catch (_0x29fc10) {
      await _0x17cbbb.error(_0x29fc10 + "\n\nCommand: antidelete ", _0x29fc10);
    }
  }
);
let ms = [];
let { stor, isGroup } = require("../lib");
smd(
  {
    on: "delete",
  },
  async (_0x52ff57, _0x12aaf9, { store: _0x33e289 }) => {
    try {
      let _0x2e7880 = await bot_.findOne({
        id: "bot_" + _0x52ff57.user,
      });
      if (
        _0x2e7880 &&
        _0x2e7880.antidelete &&
        _0x2e7880.antidelete === "true"
      ) {
        let _0x4a4a8f = _0x52ff57.msg.key.participant
          ? _0x52ff57.msg.key.participant
          : _0x52ff57.msg.key.fromMe
          ? _0x52ff57.user
          : _0x52ff57.msg.key.remoteJid;
        let _0x1ea1c0 = await stor();
        if (!_0x1ea1c0.messages[_0x52ff57.from]) {
          _0x1ea1c0.messages[_0x52ff57.from] = {};
        }
        ms = [
          ..._0x1ea1c0.messages[_0x52ff57.from],
          ..._0x33e289.messages[_0x52ff57.from].array,
        ];
        for (let _0x3597d4 = 0; _0x3597d4 < ms.length; _0x3597d4++) {
          if (ms[_0x3597d4].key.id === _0x52ff57.msg.key.id) {
            let _0x4d822f = await _0x52ff57.bot.fakeMessage(
              "text",
              {
                id: _0x52ff57.msg.key.id,
              },
              "*[ANTIDELETE DETECTED]*"
            );
            let _0x52c1e8 = await _0x52ff57.bot.forwardOrBroadCast(
              /pm/gi.test(DELCHAT) ? _0x52ff57.user : _0x52ff57.from,
              ms[_0x3597d4].message,
              {
                quoted:
                  ms[_0x3597d4].message && ms[_0x3597d4].message.conversation
                    ? undefined
                    : _0x4d822f,
              }
            );
            if (_0x52c1e8) {
              await _0x52ff57.bot.sendMessage(
                /pm/gi.test(DELCHAT) ? _0x52ff57.user : _0x52ff57.from,
                {
                  text:
                    "*[YESSER MD 👀 MESSAGE DEL]*\n\n*TIME:* " +
                    _0x52ff57.time +
                    "\n*CHAT:* " +
                    (await _0x52ff57.bot.getName(_0x52ff57.chat))
                      .split("\n")
                      .join("  ") +
                    "\n*DELETED BY:* @" +
                    _0x52ff57.senderNum +
                    "\n*MESSGE FROM:* @" +
                    _0x4a4a8f.split("@")[0],
                  mentions: [_0x4a4a8f, _0x52ff57.sender],
                },
                {
                  quoted: _0x52c1e8,
                }
              );
            }
            break;
          }
        }
      }
    } catch (_0x307ba0) {
      console.log(_0x307ba0);
    }
  }
);
smd(
  {
    pattern: "delspam",
    alias: ["dlspam"],
    category: "user",
    desc: "delete messages of user from chat",
    use: "[ 4/ 6/ 10 ]",
    usage:
      "delete messages of replied/@mentioned user from chat by giving number of messages!",
    filename: __filename,
  },
  async (_0x4dc028, _0x422147, { store: _0x205c9c }) => {
    try {
      if (!_0x4dc028.isGroup) {
        return await _0x4dc028.send(tlang("group"));
      }
      if (!_0x4dc028.isBotAdmin) {
        return await _0x4dc028.send("I am Not Admin!");
      }
      if (!_0x4dc028.isAdmin && !_0x4dc028.isCreator) {
        return await _0x4dc028.send(tlang("admin"));
      }
      let _0x2505f5 = _0x4dc028.quoted
        ? _0x4dc028.quoted.senderNum
        : _0x4dc028.mentionedJid[0]
        ? _0x4dc028.mentionedJid[0]
        : false;
      if (!_0x2505f5) {
        return await _0x4dc028.send(
          "*Please reply/@user to delete messages!*\n*Use '" +
            prefix +
            "delspam 5 @user' (delete 5 msgs)*"
        );
      }
      let _0x49d301 = await loadMessages(_0x205c9c, _0x4dc028.chat, _0x2505f5);
      let _0x5b8854 = parseInt(_0x422147.split(" ")[0]) || 5;
      let _0x4e3941 = _0x49d301.length - _0x5b8854;
      for (
        let _0xdded2a = _0x49d301.length - 1;
        _0xdded2a >= _0x4e3941;
        _0xdded2a--
      ) {
        try {
          if (_0x49d301[_0xdded2a]) {
            await _0x4dc028.delete(_0x49d301[_0xdded2a]);
          }
        } catch (_0x4bd6df) {}
      }
    } catch (_0x490288) {
      console.log(_0x490288);
    }
  }
);
