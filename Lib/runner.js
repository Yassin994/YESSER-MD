// YESSER MD
const fs = require("fs");
const path = require("path");
let {
  tempdb
} = require(__dirname + "/schemes.js");
const Config = require(__dirname + "/../config.js");
const blockJid = ["" + (process.env.BLOCKJIDS || "120363023983262391@g.us"), ...(typeof global.blockJids === "string" ? global.blockJids.split(",") : [])];
const allowJid = ["null", ...(typeof global.allowJids === "string" ? global.allowJids.split(",") : [])];
const Pino = require("pino");
const {
  Boom
} = require("@hapi/boom");
const FileType = require("file-type");
const express = require("express");
const app = express();
const events = require("./plugins");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
} = require("./exif");
let {
  default: SuhailMDConnect,
  proto,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  DisconnectReason,
  useMultiFileAuthState,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  makeInMemoryStore,
  jidDecode
} = require("@whiskeysockets/baileys");
const util = require("util");
var last_status = {};
global.setCmdAlias = {};
global.SmdOfficial = false;
global.sqldb = false;
global.pg_pools = false;
const {
  userdb,
  groupdb,
  bot_,
  smdBuffer
} = require("../lib");
const fetch = require("node-fetch");
const axios = require("axios");
const moment = require("moment-timezone");
let {
  sleep,
  getBuffer,
  parsedJid,
  tiny,
  botpic,
  tlang
} = require("../lib");
const {
  smsg,
  callsg,
  groupsg
} = require("./serialized.js");
const {
  runtime,
  getSizeMedia
} = require("../lib");
var prefa = !Config.HANDLERS || ["false", "null", " ", "", "nothing", "not", "empty"].includes(!Config.HANDLERS) ? true : false;
global.prefix = prefa ? "" : Config.HANDLERS[0];
global.prefixRegex = prefa || ["all"].includes(Config.HANDLERS) ? new RegExp("^") : new RegExp("^[" + Config.HANDLERS + "]");
global.prefixboth = ["all"].includes(Config.HANDLERS);
var suhails = false;
let baileys = "/Session/";
const connnectpg = async () => {
  try {
    const {
      Pool: _0x465542
    } = require("pg");
    const _0x30019b = new _0x465542({
      connectionString: global.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    const _0x3c958e = await _0x30019b.connect();
    _0x3c958e.release();
    console.log("🌍 Connected to the PostgreSQL.");
    return true;
  } catch (_0x1d99cb) {
    console.log("Could not connect with PostgreSQL.\n");
    return false;
  }
};
const connnectMongo = async () => {
  const _0x328c49 = require("mongoose");
  try {
    _0x328c49.set("strictQuery", true);
    await _0x328c49.connect(mongodb);
    console.log("🌍 Connected to the Mongodb.");
    return true;
  } catch {
    console.log("Could not connect with Mongodb.");
    return false;
  }
};
let Suhail = {};
const store = makeInMemoryStore({
  logger: Pino({
    level: "silent"
  }).child({
    level: "silent"
  })
});
try {
  if (fs.existsSync(__dirname + "/store.json")) {
    store.readFromFile(__dirname + "/store.json");
  }
} catch (_0x48e0e0) {
  console.log("CLIENT STORE ERROR:\n", _0x48e0e0);
}
require("events").EventEmitter.defaultMaxListeners = 2000;
async function syncdb() {
  let _0x13a460 = __dirname + "/assets/logo.png";
  try {
    global.log0 = typeof THUMB_IMAGE === "string" ? await getBuffer(THUMB_IMAGE.split(",")[0]) : fs.readFileSync(_0x13a460);
  } catch (_0x44315f) {
    _0x13a460 = __dirname + "/assets/logo.png";
  }
  global.log0 = global.log0 || fs.readFileSync(_0x13a460);
  const {
    state: _0x15a3ef,
    saveCreds: _0x20ee38
  } = await useMultiFileAuthState(__dirname + baileys);
  let _0x45f427 = SuhailMDConnect({
    logger: Pino({
      level: "silent" || "debug" || "fatal"
    }),
    printQRInTerminal: false,
    browser: ["Windows", "chrome", ""],
    fireInitQueries: true,
    shouldSyncHistoryMessage: true,
    downloadHistory: true,
    syncFullHistory: true,
    generateHighQualityLinkPreview: true,
    markOnlineOnConnect: false,
    auth: _0x15a3ef,
    getMessage: async _0x201d54 => {
      let _0x202ce5 = {
      };
      if (store) {
        const _0x2f5d00 = await store.loadMessage(_0x201d54.remoteJid, _0x201d54.id);
        return _0x2f5d00.message || _0x202ce5;
      }
      return _0x202ce5;
    }
  });
  store.bind(_0x45f427.ev);
  setInterval(() => {
    try {
      store.writeToFile(__dirname + "/store.json");
    } catch (_0x524572) {
      console.log("CLIENT STORE ERROR:\n", _0x524572);
    }
  }, 10000);
  _0x45f427.ev.on("call", async _0x3f8af9 => {
    let _0x142450 = await callsg(_0x45f427, JSON.parse(JSON.stringify(_0x3f8af9[0])));
    events.commands.map(async _0x422c14 => {
      if (_0x422c14.call === "offer" && _0x142450.status === "offer") {
        try {
          _0x422c14.function(_0x142450, {
            store: store,
            Void: _0x45f427
          });
        } catch (_0x30696a) {
          console.error("[CALL ERROR] ", _0x30696a);
        }
      }
      if (_0x422c14.call === "accept" && _0x142450.status === "accept") {
        try {
          _0x422c14.function(_0x142450, {
            store: store,
            Void: _0x45f427
          });
        } catch (_0x459dc1) {
          console.error("[CALL ACCEPT ERROR] ", _0x459dc1);
        }
      }
      if (_0x422c14.call === "call" || _0x422c14.call === "on" || _0x422c14.call === "all") {
        try {
          _0x422c14.function(_0x142450, {
            store: store,
            Void: _0x45f427
          });
        } catch (_0x2d468a) {
          console.error("[CALL ERROR] ", _0x2d468a);
        }
      }
    });
  });
  var _0x57662b = false;
  let _0x861b45 = {};
  let _0x2ccc30 = {};
  _0x45f427.ev.on("messages.upsert", async _0x178c71 => {
    try {
      if (!_0x178c71.messages || !Array.isArray(_0x178c71.messages)) {
        return;
      }
      _0x57662b = _0x57662b || _0x45f427.decodeJid(_0x45f427.user.id);
      for (mek of _0x178c71.messages) {
        mek.message = Object.keys(mek.message || {})[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
        if (!mek.message || !mek.key || !/broadcast/gi.test(mek.key.remoteJid)) {
          continue;
        }
        let _0x285e54 = await smsg(_0x45f427, JSON.parse(JSON.stringify(mek)), store, true);
        if (!_0x285e54.message) {
          continue;
        }
        let _0x355f8f = _0x285e54.body;
        let _0x3cfa6c = {
          body: _0x355f8f,
          mek: mek,
          text: _0x355f8f,
          args: _0x355f8f.split(" ") || [],
          botNumber: _0x57662b,
          isCreator: _0x285e54.isCreator,
          store: store,
          budy: _0x355f8f,
          Suhail: {
            bot: _0x45f427
          },
          Void: _0x45f427,
          proto: proto
        };
        events.commands.map(async _0x275aaf => {
          if (typeof _0x275aaf.on === "string") {
            let _0x2aa7cd = _0x275aaf.on.trim();
            let _0x13f5c0 = !_0x275aaf.fromMe || _0x275aaf.fromMe && _0x285e54.fromMe;
            if (/status|story/gi.test(_0x2aa7cd) && (_0x285e54.jid === "status@broadcast" || mek.key.remoteJid === "status@broadcast") && _0x13f5c0) {
              _0x275aaf.function(_0x285e54, _0x355f8f, _0x3cfa6c);
            } else if (["broadcast"].includes(_0x2aa7cd) && (/broadcast/gi.test(mek.key.remoteJid) || _0x285e54.broadcast || /broadcast/gi.test(_0x285e54.from)) && _0x13f5c0) {
              _0x275aaf.function(_0x285e54, _0x355f8f, _0x3cfa6c);
            }
          }
        });
      }
    } catch (_0x566744) {
      console.log("ERROR broadCast --------- messages.upsert \n", _0x566744);
    }
  });
  _0x45f427.ev.on("messages.upsert", async _0x1a89ab => {
    try {
      _0x57662b = _0x57662b || _0x45f427.decodeJid(_0x45f427.user.id);
      if (!global.isStart) {
        return;
      }
      for (mek of _0x1a89ab.messages) {
        if (!mek.message) {
          continue;
        }
        mek.message = Object.keys(mek.message || {})[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
        if (!mek.message || !mek.key || /broadcast/gi.test(mek.key.remoteJid)) {
          continue;
        }
        let _0x267c7c = await smsg(_0x45f427, JSON.parse(JSON.stringify(mek)), store, true);
        let _0x4c1810 = _0x267c7c;
        if (!_0x267c7c.message || _0x267c7c.chat.endsWith("broadcast")) {
          continue;
        }
        var {
          body: _0x29deaa
        } = _0x267c7c;
        var _0x4c74d6 = _0x267c7c.isCreator;
        var _0x66ea6c = typeof _0x267c7c.text == "string" ? _0x267c7c.text.trim() : false;
        if (_0x66ea6c && _0x29deaa[1] && _0x29deaa[1] == " ") {
          _0x29deaa = _0x29deaa[0] + _0x29deaa.slice(2);
        }
        let _0x1b8f63 = false;
        let _0x120ac9 = false;
        let _0x6262b6 = false;
        if (_0x66ea6c && Config.HANDLERS.toLowerCase().includes("null")) {
          _0x1b8f63 = true;
          _0x120ac9 = _0x29deaa.split(" ")[0].toLowerCase() || false;
        } else if (_0x66ea6c && !Config.HANDLERS.toLowerCase().includes("null")) {
          _0x1b8f63 = prefixboth || _0x29deaa && prefixRegex.test(_0x29deaa[0]) || _0x267c7c.isSuhail && /255716312895|255616064658/g.test(_0x57662b) && _0x29deaa[0] == ",";
          _0x120ac9 = _0x1b8f63 ? prefa ? _0x29deaa.trim().split(" ")[0].toLowerCase() : _0x29deaa.slice(1).trim().split(" ")[0].toLowerCase() : false;
          _0x6262b6 = prefixboth ? _0x29deaa.trim().split(" ")[0].toLowerCase() : "";
        } else {
          _0x1b8f63 = false;
        }
        let _0x3974cc = _0x120ac9 ? _0x120ac9.trim() : "";
        if (_0x3974cc && global.setCmdAlias[_0x3974cc] !== undefined) {
          _0x120ac9 = global.setCmdAlias[_0x3974cc];
          _0x1b8f63 = true;
        } else if (_0x267c7c.mtype == "stickerMessage") {
          _0x3974cc = "sticker-" + _0x267c7c.msg.fileSha256;
          if (global.setCmdAlias[_0x3974cc]) {
            _0x120ac9 = global.setCmdAlias[_0x3974cc];
            _0x1b8f63 = true;
          }
        }
        if (blockJid.includes(_0x267c7c.chat) && !_0x267c7c.isSuhail) {
          return;
        }
        if (_0x1b8f63 && (_0x267c7c.isBaileys || !_0x4c74d6 && Config.WORKTYPE === "private" && !allowJid.includes(_0x267c7c.chat))) {
          _0x1b8f63 = false;
        }
        const _0x4b34f4 = _0x267c7c.body ? _0x29deaa.trim().split(/ +/).slice(1) : [];
        if (!_0x4c74d6 && global.disablepm === "true" && _0x1b8f63 && !_0x267c7c.isGroup) {
          _0x1b8f63 = false;
        }
        if (!_0x4c74d6 && global.disablegroup === "true" && _0x1b8f63 && _0x267c7c.isGroup && !allowJid.includes(_0x267c7c.chat)) {
          _0x1b8f63 = false;
        }
        Suhail.bot = _0x45f427;
        if (_0x1b8f63) {
          let _0x5db8cf = events.commands.find(_0xb33ab8 => _0xb33ab8.pattern === _0x120ac9) || events.commands.find(_0x474010 => _0x474010.alias && _0x474010.alias.includes(_0x120ac9));
          if (!_0x5db8cf && prefixboth && _0x6262b6) {
            _0x5db8cf = events.commands.find(_0x578a1c => _0x578a1c.pattern === _0x6262b6) || events.commands.find(_0x42e7e4 => _0x42e7e4.alias && _0x42e7e4.alias.includes(_0x6262b6));
          }
          if (_0x5db8cf && _0x5db8cf.fromMe && !_0x267c7c.fromMe && !_0x4c74d6) {
            _0x5db8cf = false;
            return _0x267c7c.reply(tlang().owner);
          }
          if (_0x267c7c.isGroup && _0x5db8cf && _0x120ac9 !== "bot") {
            let _0x338131 = _0x861b45[_0x267c7c.chat] || (await groupdb.findOne({
              id: _0x267c7c.chat
            })) || {
              botenable: toBool(_0x267c7c.isSuhail || !blockJid.includes(_0x267c7c.chat))
            };
            if (_0x338131 && _0x338131.botenable === "false") {
              _0x5db8cf = false;
            }
            if (_0x5db8cf && _0x338131) {
              let _0xc26d65 = _0x5db8cf.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              let _0x581206 = new RegExp("\\b" + _0xc26d65 + "\\b");
              if (_0x338131.disablecmds !== "false" && _0x581206.test(_0x338131.disablecmds)) {
                _0x5db8cf = false;
              }
            }
          }
          if (!_0x4c74d6 && _0x5db8cf) {
            try {
              let _0x452ab2 = _0x2ccc30[_0x267c7c.sender] || (await userdb.findOne({
                id: _0x267c7c.sender
              })) || {
                ban: "false"
              };
              if (_0x452ab2.ban === "true") {
                _0x5db8cf = false;
                _0x267c7c.reply("*Hey " + _0x267c7c.senderName.split("\n").join("  ") + ",*\n_You are banned from using commands._");
              }
            } catch (_0x11c9fb) {
              console.log("checkban.ban", _0x11c9fb);
            }
          }
          if (_0x5db8cf) {
            if (_0x5db8cf.react) {
              _0x267c7c.react(_0x5db8cf.react);
            }
            let _0x424dfe = _0x267c7c.body ? _0x29deaa.trim().split(/ +/).slice(1).join(" ") : "";
            let _0x3d6fb6 = _0x5db8cf.pattern;
            _0x267c7c.cmd = _0x3d6fb6;
            try {
              _0x5db8cf.function(_0x267c7c, _0x424dfe, {
                cmd: _0x3d6fb6,
                text: _0x424dfe,
                body: _0x29deaa,
                args: _0x4b34f4,
                cmdName: _0x120ac9,
                isCreator: _0x4c74d6,
                smd: _0x3d6fb6,
                botNumber: _0x57662b,
                budy: _0x66ea6c,
                store: store,
                Suhail: Suhail,
                Void: _0x45f427
              });
            } catch (_0x309c89) {
              console.log("[ERROR] ", _0x309c89);
            }
          } else {
            _0x1b8f63 = false;
            const _0x2d1e50 = events.commands.find(_0x25bf6a => _0x25bf6a.category === _0x120ac9) || false;
            if (_0x2d1e50) {
              const _0x3c6973 = {};
              let _0x30bd70 = "";
              events.commands.map(async (_0x2b49f6, _0x5c2952) => {
                if (_0x2b49f6.dontAddCommandList === false && _0x2b49f6.pattern !== undefined) {
                  if (!_0x3c6973[_0x2b49f6.category]) {
                    _0x3c6973[_0x2b49f6.category] = [];
                  }
                  _0x3c6973[_0x2b49f6.category].push(_0x2b49f6.pattern);
                }
              });
              for (const _0x51621d in _0x3c6973) {
                if (_0x120ac9 == _0x51621d.toLowerCase()) {
                  _0x30bd70 = "┌───〈 *" + _0x51621d.toLowerCase() + " menu*  〉───◆\n│╭─────────────···▸\n┴│▸\n";
                  for (const _0x3e869c of _0x3c6973[_0x51621d]) {
                    _0x30bd70 += "⬡│▸ " + _0x3e869c + "\n";
                  }
                  _0x30bd70 += "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
                  break;
                }
              }
              _0x45f427.sendUi(_0x267c7c.jid, {
                caption: tiny(_0x30bd70)
              });
            }
          }
        }
        try {
          _0x861b45[_0x267c7c.chat] = (await groupdb.findOne({
            id: _0x267c7c.chat
          })) || (await groupdb.new({
            id: _0x267c7c.chat,
            botenable: _0x267c7c.chat === "120363023983262391@g.us" ? "false" : "true",
            goodbye: toBool(global.gdbye),
            welcome: toBool(global.wlcm)
          }));
          _0x2ccc30[_0x267c7c.sender] = (await userdb.findOne({
            id: _0x267c7c.sender
          })) || (await userdb.new({
            id: _0x267c7c.sender,
            name: _0x267c7c.pushName || "Unknown"
          }));
        } catch (_0x59b139) {
          main();
        }
        text = _0x267c7c.body;
        let _0x55fcd4 = {
          dbuser: _0x2ccc30[_0x267c7c.sender],
          dbgroup: _0x861b45[_0x267c7c.chat],
          body: _0x29deaa,
          mek: mek,
          text: text,
          args: _0x4b34f4,
          botNumber: _0x57662b,
          isCreator: _0x4c74d6,
          icmd: _0x1b8f63,
          store: store,
          budy: _0x66ea6c,
          Suhail: Suhail,
          Void: _0x45f427,
          proto: proto
        };
        let _0x4710ea = {
          mp4: "video",
          mp3: "audio",
          webp: "sticker",
          photo: "image",
          picture: "image",
          vv: "viewonce"
        };
        events.commands.map(async _0x155548 => {
          if (typeof _0x155548.on === "string") {
            let _0x5958b7 = _0x155548.on.trim();
            let _0x5e3be1 = !_0x155548.fromMe || _0x155548.fromMe && _0x267c7c.fromMe;
            if (_0x5958b7 === "main" && _0x5e3be1) {
              _0x155548.function(_0x267c7c, _0x29deaa, _0x55fcd4);
            } else if (_0x267c7c.text && _0x5958b7 === "text" && /text|txt|true|smd|suhail/gi.test(_0x155548.quoted) && _0x267c7c.quoted && _0x267c7c.quoted.text && _0x5e3be1) {
              _0x155548.function(_0x267c7c, _0x29deaa, _0x55fcd4);
            } else if (_0x267c7c.text && ["body", "text"].includes(_0x5958b7) && _0x5e3be1) {
              _0x155548.function(_0x267c7c, _0x29deaa, _0x55fcd4);
            } else if (typeof _0x267c7c[_0x4710ea[_0x5958b7] || _0x5958b7] === "boolean" && _0x267c7c.quoted && _0x267c7c.quoted[_0x155548.quoted] && _0x5e3be1) {
              _0x155548.function(_0x267c7c, _0x29deaa, _0x55fcd4);
            } else if (_0x5958b7 === "viewonce" && (_0x267c7c.viewOnce || mek.message.viewOnceMessageV2)) {
              try {
                _0x155548.function(_0x267c7c, _0x29deaa, _0x55fcd4);
              } catch (_0x21b9d8) {
                console.log("[ERROR] ", _0x21b9d8);
              }
            } else if (typeof _0x267c7c[_0x4710ea[_0x5958b7] || _0x5958b7] === "boolean" && _0x5e3be1) {
              _0x155548.function(_0x267c7c, _0x29deaa, _0x55fcd4);
            }
            if (_0x5958b7 === "delete" && _0x267c7c.mtype == "protocolMessage" && _0x267c7c.msg.type === "REVOKE" && _0x5e3be1) {
              _0x155548.function(_0x267c7c, _0x29deaa, _0x55fcd4);
            } else if (_0x5958b7 === "poll" && /poll/gi.test(_0x267c7c.mtype) && _0x5e3be1) {
              _0x155548.function(_0x267c7c, _0x29deaa, _0x55fcd4);
            } else if (_0x5958b7 === "quoted" && _0x267c7c.quoted && _0x5e3be1) {
              _0x155548.function(_0x267c7c, _0x29deaa, _0x55fcd4);
            }
          }
        });
      }
    } catch (_0x1f33f5) {
      console.log("client.js --------- messages.upsert \n", _0x1f33f5);
    }
  });
  let _0x4ff079 = {};
  _0x45f427.ev.on("group-participants.update", async _0x91f364 => {
    try {
      let _0x1c4167 = await groupsg(_0x45f427, JSON.parse(JSON.stringify(_0x91f364)), true);
      if (!_0x1c4167 || !_0x1c4167.isGroup) {
        return;
      }
      events.commands.map(async _0x10a8ce => {
        if (_0x1c4167.status === _0x10a8ce.group) {
          try {
            _0x10a8ce.function(_0x1c4167, {
              store: store,
              Void: _0x45f427
            });
          } catch (_0x423cf0) {
            console.error("[GROUP PARTICEPENTS ADD ERROR] ", _0x423cf0);
          }
        }
        if (/on|true|main|all|suhail|smd/gi.test(_0x10a8ce.group)) {
          try {
            _0x10a8ce.function(_0x1c4167, {
              store: store,
              Void: _0x45f427
            });
          } catch (_0x570958) {
            console.error("[GROUP PARTICEPENTS PROMOTE ERROR] ", _0x570958);
          }
        }
      });
    } catch (_0x28b55c) {
      console.log(_0x28b55c);
    }
  });
  _0x45f427.ev.on("groups.update", async _0x1c6429 => {
    try {
      for (const _0x224991 of _0x1c6429) {
        if (!store.allgroup) {
          store.allgroup = {};
        }
        store.allgroup[_0x224991.id] = _0x224991;
      }
    } catch (_0x3f8eb5) {
      console.log(_0x3f8eb5);
    }
  });
  _0x45f427.ev.on("groups.upsert", async _0x3cd17b => {
    try {
      events.commands.map(async _0x3ff8e6 => {
        if (/on|true|main|all|suhail|smd/gi.test(_0x3ff8e6.groupsetting || _0x3ff8e6.upsertgroup || _0x3ff8e6.groupupsert)) {
          _0x3ff8e6.function({
            ..._0x3cd17b[0],
            bot: _0x45f427
          }, {
            store: store,
            Void: _0x45f427,
            data: _0x3cd17b
          });
        }
      });
      await groupsg(_0x45f427, JSON.parse(JSON.stringify(_0x3cd17b[0])), false, true);
    } catch (_0x44d613) {
      console.log(_0x44d613);
    }
  });
  _0x45f427.ev.on("contacts.upsert", _0x2b1dfd => {
    try {
      for (const _0x3be64c of _0x2b1dfd) {
        store.contacts[_0x3be64c.id] = _0x3be64c;
      }
    } catch (_0x5eb8b6) {}
  });
  _0x45f427.ev.on("contacts.update", async _0x2cd9d2 => {
    for (let _0x2d9ac2 of _0x2cd9d2) {
      let _0x38200e = _0x45f427.decodeJid(_0x2d9ac2.id);
      if (store && store.contacts) {
        store.contacts[_0x38200e] = {
          id: _0x38200e,
          name: _0x2d9ac2.notify
        };
      }
    }
  });
  _0x45f427.serializeM = _0x224330 => smsg(_0x45f427, _0x224330, store, false);
  _0x45f427.ev.on("connection.update", async _0x2eb92d => {
    const {
      connection: _0x2a2ace,
      lastDisconnect: _0x4157ad,
      receivedPendingNotifications: _0x4feae5,
      qr: _0x3cc442
    } = _0x2eb92d;
    global.qr = _0x3cc442;
    if (_0x3cc442) {
      try {
        var _0x24dca2 = require("qrcode");
        _0x24dca2.toString(_0x3cc442, function (_0x238458, _0x5652c0) {
          if (_0x238458) {
            console.log(_0x238458);
          }
          log(_0x5652c0);
        });
      } catch (_0x43b7e0) {}
    }
    if (_0x2a2ace === "connecting") {
      log("ℹ️ Connecting to WhatsApp!");
    }
    if (_0x2a2ace === "open") {
      let _0x432309 = _0x45f427.decodeJid(_0x45f427.user.id);
      let _0x32ced6 = /255716312895|255616064658/g.test(_0x432309);
      let _0x1efba4 = false;
      global.plugin_dir = path.join(__dirname, "../plugins/");
      if (!isMongodb && !sqldb) {
        main();
      }
      log("✅ Whatsapp Login Successful!");
      try {
        try {
          _0x1efba4 = (await bot_.findOne({
            id: "bot_" + _0x432309
          })) || (await bot_.new({
            id: "bot_" + _0x432309
          }));
        } catch {
          _0x1efba4 = false;
        }
        let _0x5786bd = [];
        let _0x2ada28 = {};
        let _0x44fe8b = {};
        _0x5786bd = Array.isArray(_0x5786bd) ? _0x5786bd : [];
        if (_0x1efba4 && _0x1efba4.plugins) {
          log("⏳ Checking External Plugins.!!");
          _0x2ada28 = {
            ..._0x1efba4.plugins,
            ..._0x2ada28
          };
        }
        if (Object.keys(_0x2ada28 || {}).length > 0) {
          let _0x3717b5 = _0x2ada28;
          for (const _0x5c8b8e in _0x3717b5) {
            try {
              let _0x4b7094 = _0x3717b5[_0x5c8b8e].includes("raw") ? _0x3717b5[_0x5c8b8e] : _0x3717b5[_0x5c8b8e] + "/raw";
              let {
                data: _0x27e630
              } = await axios.get(_0x4b7094);
              if (_0x27e630) {
                let _0x1cd02d = _0x5c8b8e + (_0x44fe8b[_0x5c8b8e] && /.js|.smd/gi.test(_0x44fe8b[_0x5c8b8e]) ? _0x44fe8b[_0x5c8b8e] : ".js");
                const _0x56e25f = plugin_dir + (_0x1cd02d.includes("/") ? _0x1cd02d.split("/")[0] : "");
                if (!fs.existsSync(_0x56e25f)) {
                  fs.mkdirSync(_0x56e25f, {
                    recursive: true
                  });
                }
                fs.writeFileSync(plugin_dir + _0x1cd02d, _0x27e630, "utf8");
                if (!_0x5786bd.includes(_0x5c8b8e)) {
                  log(" " + _0x5c8b8e + " ✔️");
                }
              }
            } catch (_0x19522e) {
              if (_0x32ced6 || !_0x5786bd.includes(_0x5c8b8e)) {
                log(" " + _0x5c8b8e + " ❌");
              }
            }
          }
          log("\n✅ External Plugins Installed!");
        }
      } catch (_0x154a85) {
        log("❌ ERROR INSTALATION PLUGINS ", e);
      }
      await loadPlugins(plugin_dir);
      let _0x56f619 = "\nzᴀx-ᴍᴅ connected\n  Prefix  : [ " + (prefix ? prefix : "null") + " ]\n  Plugins : " + events.commands.length + "\n  Mode    : " + Config.WORKTYPE + "\n  Database: " + (isMongodb ? "MongoDb" : sqldb ? "PostegreSql" : "ZAX DB");
      try {
        const _0x2b8bf5 = require("../lib/scraper");
        let _0x4e29fb = await _0x2b8bf5.syncgit();
        if (_0x4e29fb.total !== 0) {
          _0x56f619 += "\n𝗡𝗲𝘄 𝗨𝗽𝗱𝗮𝘁𝗲 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲\nRedeploy Bot as Soon as Possible!\n";
        }
      } catch (_0x2a548b) {}
      global.qr_message = {
        message: "BOT ALREADY CONNECTED!",
        bot_user: _0x432309,
        connection: _0x56f619.trim()
      };
      print(_0x56f619);
      await _0x45f427.sendMessage(_0x432309, {
        text: "```" + ("" + _0x56f619).trim() + "```"
      }, {
        disappearingMessagesInChat: true,
        ephemeralExpiration: 20
      });
      global.isStart = true;
      let _0x23a2ca = true;
      let _0x11b5e8 = {
        bot: _0x45f427,
        user: _0x432309,
        isSuhail: _0x32ced6,
        isCreator: _0x23a2ca
      };
      let _0x5bd74f = {
        dbbot: _0x1efba4,
        botNumber: _0x432309,
        isCreator: _0x23a2ca,
        isSuhail: _0x32ced6,
        store: store,
        Suhail: _0x11b5e8,
        Void: _0x45f427,
        ..._0x2eb92d
      };
      events.commands.map(async _0x48341d => {});
    }
    if (_0x2a2ace === "close") {
      await sleep(5000);
      global.isStart = false;
      global.qr_message = {
        message: "CONNECTION CLOSED WITH BOT!"
      };
      let _0x2d7a8c = new Boom(_0x4157ad?.error)?.output.statusCode;
      if (_0x2d7a8c === DisconnectReason.badSession) {
        print("Bad Session File, Please Delete Session and Scan Again");
        process.exit(0);
      } else if (_0x2d7a8c === DisconnectReason.connectionClosed) {
        print("Connection closed, reconnecting....");
        syncdb().catch(_0x24ece0 => console.log(_0x24ece0));
      } else if (_0x2d7a8c === DisconnectReason.connectionLost) {
        print("Connection Lost from Server, reconnecting...");
        syncdb().catch(_0x3db775 => console.log(_0x3db775));
      } else if (_0x2d7a8c === DisconnectReason.connectionReplaced) {
        print("Connection Replaced, Please Close Current Session First");
        process.exit(1);
      } else if (_0x2d7a8c === DisconnectReason.loggedOut) {
        print("Device Logged Out, Please Scan Again And Run.");
        process.exit(1);
      } else if (_0x2d7a8c === DisconnectReason.restartRequired) {
        print("Restart Required, Restarting...");
        syncdb().catch(_0x447b1e => console.log(_0x447b1e));
      } else if (_0x2d7a8c === DisconnectReason.timedOut) {
        print("Connection TimedOut, Reconnecting...");
        syncdb().catch(_0x4cef83 => console.log(_0x4cef83));
      } else if (_0x2d7a8c === DisconnectReason.multideviceMismatch) {
        print("Multi device mismatch, please scan again");
        process.exit(0);
      } else {
        print("Connection closed with bot. Please put New Session ID again.");
        print(_0x2d7a8c);
        process.exit(0);
      }
    }
  });
  _0x45f427.ev.on("creds.update", _0x20ee38);
  _0x45f427.lastStatus = async () => {
    console.log("last_status :", last_status);
    return last_status;
  };
  _0x45f427.decodeJid = _0x16ae11 => {
    if (!_0x16ae11) {
      return _0x16ae11;
    }
    if (/:\d+@/gi.test(_0x16ae11)) {
      let _0x5a4e78 = jidDecode(_0x16ae11) || {};
      return _0x5a4e78.user && _0x5a4e78.server && _0x5a4e78.user + "@" + _0x5a4e78.server || _0x16ae11;
    } else {
      return _0x16ae11;
    }
  };
  _0x45f427.getName = (_0x20c405, _0x55b0ff = false) => {
    let _0x56c351 = _0x45f427.decodeJid(_0x20c405);
    let _0x2d91e9;
    let _0x58a189 = "+" + _0x20c405.replace("@s.whatsapp.net", "");
    if (_0x56c351.endsWith("@g.us")) {
      return new Promise(async _0x4bfd89 => {
        _0x2d91e9 = store.contacts[_0x56c351] || {};
        if (!_0x2d91e9.name?.notify && !_0x2d91e9.subject) {
          try {
            _0x2d91e9 = (await _0x45f427.groupMetadata(_0x56c351)) || {};
          } catch (_0x5ae2af) {}
        }
        _0x4bfd89(_0x2d91e9.subject || _0x2d91e9.name || _0x58a189);
      });
    } else {
      _0x2d91e9 = _0x56c351 === "0@s.whatsapp.net" ? {
        id: _0x56c351,
        name: "WhatsApp"
      } : _0x56c351 === _0x45f427.decodeJid(_0x45f427.user.id) ? _0x45f427.user : store.contacts[_0x56c351] || {};
    }
    if (_0x2d91e9.name || _0x2d91e9.subject || _0x2d91e9.verifiedName) {
      return _0x2d91e9.name || _0x2d91e9.subject || _0x2d91e9.verifiedName || _0x58a189;
    } else {
      return userdb.findOne({
        id: _0x56c351
      }).then(_0x12de65 => _0x12de65.name || _0x58a189).catch(_0x3ae7dc => {
        _0x58a189;
      });
    }
  };
  _0x45f427.sendContact = async (_0x2c5b8c, _0x57d993, _0x9ad2b9 = "", _0x307346 = {}) => {
    let _0x5242f0 = [];
    for (let _0x45f08b of _0x57d993) {
      _0x5242f0.push({
        displayName: await _0x45f427.getName(_0x45f08b + "@s.whatsapp.net"),
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:" + (await _0x45f427.getName(_0x45f08b + "@s.whatsapp.net")) + "\nFN:" + global.OwnerName + "\nitem1.TEL;waid=" + _0x45f08b + ":" + _0x45f08b + "\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:" + global.email + "\nitem2.X-ABLabel:GitHub\nitem3.URL:" + global.github + "\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;" + global.location + ";;;;\nitem4.X-ABLabel:Region\nEND:VCARD"
      });
    }
    return _0x45f427.sendMessage(_0x2c5b8c, {
      contacts: {
        displayName: _0x5242f0.length + " Contact",
        contacts: _0x5242f0
      },
      ..._0x307346
    }, {
      quoted: _0x9ad2b9
    });
  };
  _0x45f427.setStatus = _0x47c855 => {
    _0x45f427.query({
      tag: "iq",
      attrs: {
        to: "@s.whatsapp.net",
        type: "set",
        xmlns: "status"
      },
      content: [{
        tag: "status",
        attrs: {},
        content: Buffer.from(_0x47c855, "utf-8")
      }]
    });
    return _0x47c855;
  };
  _0x45f427.messageId = (_0x2bf21a = 8, _0x4c2174 = "SUHAILMD") => {
    const _0x37b774 = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for (let _0x5997cd = 0; _0x5997cd < _0x2bf21a; _0x5997cd++) {
      const _0x134b19 = Math.floor(Math.random() * _0x37b774.length);
      _0x4c2174 += _0x37b774.charAt(_0x134b19);
    }
    return _0x4c2174;
  };
  _0x45f427.send5ButImg = async (_0x53a3aa, _0x396295 = "", _0x2ab7c6 = "", _0x2fe9f1, _0x25d594 = [], _0x43f109, _0x171aed = {}) => {
    let _0x438287 = await prepareWAMessageMedia({
      image: _0x2fe9f1,
      jpegThumbnail: _0x43f109
    }, {
      upload: _0x45f427.waUploadToServer
    });
    var _0x3af2b4 = generateWAMessageFromContent(_0x53a3aa, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          imageMessage: _0x438287.imageMessage,
          hydratedContentText: _0x396295,
          hydratedFooterText: _0x2ab7c6,
          hydratedButtons: _0x25d594
        }
      }
    }), _0x171aed);
    _0x45f427.relayMessage(_0x53a3aa, _0x3af2b4.message, {
      messageId: _0x45f427.messageId()
    });
  };
  _0x45f427.sendButtonText = (_0x408e73, _0x3aa3b1 = [], _0x582686, _0x5c1341, _0x80b1a5 = "", _0x454a84 = {}) => {
    let _0x23248c = {
      text: _0x582686,
      footer: _0x5c1341,
      buttons: _0x3aa3b1,
      headerType: 2,
      ..._0x454a84
    };
    _0x45f427.sendMessage(_0x408e73, _0x23248c, {
      quoted: _0x80b1a5,
      ..._0x454a84
    });
  };
  _0x45f427.sendText = (_0x2deef1, _0x29a624, _0x549765 = "", _0x27b8ae) => _0x45f427.sendMessage(_0x2deef1, {
    text: _0x29a624,
    ..._0x27b8ae
  }, {
    quoted: _0x549765
  });
  _0x45f427.sendImage = async (_0xed65ac, _0x3eef7a, _0x1c120e = "", _0x5b78f7 = "", _0x114ea4) => {
    let _0x29d38f = Buffer.isBuffer(_0x3eef7a) ? _0x3eef7a : /^data:.*?\/.*?;base64,/i.test(_0x3eef7a) ? Buffer.from(_0x3eef7a.split`,`[1], "base64") : /^https?:\/\//.test(_0x3eef7a) ? await await getBuffer(_0x3eef7a) : fs.existsSync(_0x3eef7a) ? fs.readFileSync(_0x3eef7a) : Buffer.alloc(0);
    return await _0x45f427.sendMessage(_0xed65ac, {
      image: _0x29d38f,
      caption: _0x1c120e,
      ..._0x114ea4
    }, {
      quoted: _0x5b78f7
    });
  };
  _0x45f427.sendTextWithMentions = async (_0x1a738d, _0xcfbb23, _0x67e5ae, _0x4cceb9 = {}) => _0x45f427.sendMessage(_0x1a738d, {
    text: _0xcfbb23,
    contextInfo: {
      mentionedJid: [..._0xcfbb23.matchAll(/@(\d{0,16})/g)].map(_0x3915e4 => _0x3915e4[1] + "@s.whatsapp.net")
    },
    ..._0x4cceb9
  }, {
    quoted: _0x67e5ae
  });
  _0x45f427.sendImageAsSticker = async (_0x596e58, _0x67a185, _0x2b02e4 = {}) => {
    let _0x12447e;
    if (_0x2b02e4 && (_0x2b02e4.packname || _0x2b02e4.author)) {
      _0x12447e = await writeExifImg(_0x67a185, _0x2b02e4);
    } else {
      _0x12447e = await imageToWebp(_0x67a185);
    }
    await _0x45f427.sendMessage(_0x596e58, {
      sticker: {
        url: _0x12447e
      },
      ..._0x2b02e4
    }, _0x2b02e4);
  };
  _0x45f427.sendVideoAsSticker = async (_0x3e3ec9, _0x446336, _0x3fd725 = {}) => {
    let _0xcbbe9;
    if (_0x3fd725 && (_0x3fd725.packname || _0x3fd725.author)) {
      _0xcbbe9 = await writeExifVid(_0x446336, _0x3fd725);
    } else {
      _0xcbbe9 = await videoToWebp(_0x446336);
    }
    await _0x45f427.sendMessage(_0x3e3ec9, {
      sticker: {
        url: _0xcbbe9
      },
      ..._0x3fd725
    }, _0x3fd725);
  };
  _0x45f427.sendMedia = async (_0x5d58e6, _0x1bbc4b, _0x560de6 = "", _0x2e96bf = "", _0x53fe7e = "", _0x1d654d = {}) => {
    let _0x3eeed5 = await _0x45f427.getFile(_0x1bbc4b, true);
    let {
      mime: _0x477f42,
      ext: _0x5f5d73,
      res: _0x1f737d,
      data: _0x42a0d9,
      filename: _0x39669f
    } = _0x3eeed5;
    if (_0x1f737d && _0x1f737d.status !== 200 || file.length <= 65536) {
      try {
        throw {
          json: JSON.parse(file.toString())
        };
      } catch (_0x52f85a) {
        if (_0x52f85a.json) {
          throw _0x52f85a.json;
        }
      }
    }
    let _0x15c7a6 = "";
    let _0x185cac = _0x477f42;
    let _0x52b0a3 = _0x39669f;
    if (_0x1d654d.asDocument) {
      _0x15c7a6 = "document";
    }
    if (_0x1d654d.asSticker || /webp/.test(_0x477f42)) {
      let {
        writeExif: _0x41298b
      } = require("./exif");
      let _0x2124ac = {
        mimetype: _0x477f42,
        data: _0x42a0d9
      };
      _0x52b0a3 = await _0x41298b(_0x2124ac, {
        packname: _0x1d654d.packname ? _0x1d654d.packname : Config.packname,
        author: _0x1d654d.author ? _0x1d654d.author : Config.author,
        categories: _0x1d654d.categories ? _0x1d654d.categories : []
      });
      await fs.promises.unlink(_0x39669f);
      _0x15c7a6 = "sticker";
      _0x185cac = "image/webp";
    } else if (/image/.test(_0x477f42)) {
      _0x15c7a6 = "image";
    } else if (/video/.test(_0x477f42)) {
      _0x15c7a6 = "video";
    } else if (/audio/.test(_0x477f42)) {
      _0x15c7a6 = "audio";
    } else {
      _0x15c7a6 = "document";
    }
    await _0x45f427.sendMessage(_0x5d58e6, {
      [_0x15c7a6]: {
        url: _0x52b0a3
      },
      caption: _0x2e96bf,
      mimetype: _0x185cac,
      fileName: _0x560de6,
      ..._0x1d654d
    }, {
      quoted: _0x53fe7e,
      ..._0x1d654d
    });
    return fs.promises.unlink(_0x52b0a3);
  };
  _0x45f427.downloadAndSaveMediaMessage = async (_0x1d00d8, _0x57a659 = "null", _0x4b4157 = false, _0x3ae08c = true) => {
    let _0x4ad184 = _0x1d00d8.msg ? _0x1d00d8.msg : _0x1d00d8;
    let _0x33cf09 = _0x4ad184.mimetype || "";
    let _0x31d4cb = _0x1d00d8.mtype ? _0x1d00d8.mtype.split(/Message/gi)[0] : _0x4ad184.mtype ? _0x4ad184.mtype.split(/Message/gi)[0] : _0x33cf09.split("/")[0];
    const _0x1a85a8 = await downloadContentFromMessage(_0x4ad184, _0x31d4cb);
    let _0x3fe19d = Buffer.from([]);
    for await (const _0x4f8dc5 of _0x1a85a8) {
      _0x3fe19d = Buffer.concat([_0x3fe19d, _0x4f8dc5]);
    }
    if (_0x4b4157) {
      return _0x3fe19d;
    }
    let _0x44338f = await FileType.fromBuffer(_0x3fe19d);
    let _0x3d9ee2 = "./temp/" + _0x57a659 + "." + _0x44338f.ext;
    fs.writeFileSync(_0x3d9ee2, _0x3fe19d);
    return _0x3d9ee2;
  };
  _0x45f427.forward = async (_0x15655e, _0x47e0b5, _0x4ca65a, _0x2ee512, _0x21acb2 = true) => {
    try {
      let _0x1c135d = _0x47e0b5.mtype;
      let _0x929cce = {};
      console.log("Forward function Called and Type is : ", _0x1c135d);
      if (_0x1c135d == "conversation") {
        _0x929cce = {
          text: _0x47e0b5.text,
          contextInfo: _0x4ca65a
        };
        for (let _0x5d8331 of parsedJid(_0x15655e)) {
          await _0x45f427.sendMessage(_0x5d8331, _0x929cce, {
            quoted: _0x2ee512,
            messageId: _0x45f427.messageId()
          });
        }
        return;
      }
      const _0x173cf1 = _0x265240 => {
        return "" + Math.floor(Math.random() * 10000) + _0x265240;
      };
      let _0x54defa = _0x47e0b5.msg ? _0x47e0b5.msg : _0x47e0b5;
      let _0x39ee9b = (_0x47e0b5.msg || _0x47e0b5).mimetype || "";
      let _0x448104 = _0x47e0b5.mtype ? _0x47e0b5.mtype.replace(/Message/gi, "") : _0x39ee9b.split("/")[0];
      const _0x5b3cf8 = await downloadContentFromMessage(_0x54defa, _0x448104);
      let _0x5566f2 = Buffer.from([]);
      for await (const _0x5cb271 of _0x5b3cf8) {
        _0x5566f2 = Buffer.concat([_0x5566f2, _0x5cb271]);
      }
      let _0xf3f6a0 = await FileType.fromBuffer(_0x5566f2);
      let _0x37d810 = await _0x173cf1(_0xf3f6a0.ext);
      let _0x170743 = "./temp/" + _0x37d810;
      fs.writeFileSync(_0x170743, _0x5566f2);
      if (_0x1c135d == "videoMessage") {
        _0x929cce = {
          video: fs.readFileSync(_0x170743),
          mimetype: _0x47e0b5.mimetype,
          caption: _0x47e0b5.text,
          contextInfo: _0x4ca65a
        };
      } else if (_0x1c135d == "imageMessage") {
        _0x929cce = {
          image: fs.readFileSync(_0x170743),
          mimetype: _0x47e0b5.mimetype,
          caption: _0x47e0b5.text,
          contextInfo: _0x4ca65a
        };
      } else if (_0x1c135d == "audioMessage") {
        _0x929cce = {
          audio: fs.readFileSync(_0x170743),
          mimetype: _0x47e0b5.mimetype,
          seconds: 200001355,
          ptt: true,
          contextInfo: _0x4ca65a
        };
      } else if (_0x1c135d == "documentWithCaptionMessage" || _0xf3f6a0 == "documentMessage") {
        _0x929cce = {
          document: fs.readFileSync(_0x170743),
          mimetype: _0x47e0b5.mimetype,
          caption: _0x47e0b5.text,
          contextInfo: _0x4ca65a
        };
      } else {
        fs.unlink(_0x170743, _0xd0e477 => {
          if (_0xd0e477) {
            console.error("Error deleting file:", _0xd0e477);
          } else {
            console.log("File deleted successfully");
          }
        });
      }
      for (let _0x473eb4 of parsedJid(_0x15655e)) {
        try {
          await _0x45f427.sendMessage(_0x473eb4, _0x929cce, {
            quoted: _0x2ee512,
            messageId: _0x45f427.messageId()
          });
        } catch (_0x142f04) {}
      }
      return fs.unlink(_0x170743, _0x236a13 => {
        if (_0x236a13) {
          console.error("Error deleting file:", _0x236a13);
        } else {
          console.log("File deleted successfully");
        }
      });
    } catch (_0x53962e) {
      console.log(_0x53962e);
    }
  };
  _0x45f427.downloadMediaMessage = async _0x4a42f6 => {
    let _0x5ef8aa = _0x4a42f6.msg ? _0x4a42f6.msg : _0x4a42f6;
    let _0x286974 = (_0x4a42f6.msg || _0x4a42f6).mimetype || "";
    let _0x1d33e1 = _0x4a42f6.mtype ? _0x4a42f6.mtype.replace(/Message/gi, "") : _0x286974.split("/")[0];
    const _0x2f9e7a = await downloadContentFromMessage(_0x5ef8aa, _0x1d33e1);
    let _0x382995 = Buffer.from([]);
    for await (const _0x846e13 of _0x2f9e7a) {
      _0x382995 = Buffer.concat([_0x382995, _0x846e13]);
    }
    return _0x382995;
  };
  _0x45f427.forwardOrBroadCast2 = async (_0x427112, _0x64e7fe, _0x3dd4fd = {}, _0x52533a = "") => {
    try {
      let _0x301319 = _0x64e7fe.mtype;
      if (_0x301319 === "videoMessage" && _0x52533a === "ptv") {
        _0x64e7fe = {
          ptvMessage: {
            ..._0x64e7fe.msg
          }
        };
      }
      let _0x5b036b = {
        ..._0x3dd4fd,
        contextInfo: {
          ...(_0x3dd4fd.contextInfo ? _0x3dd4fd.contextInfo : {}),
          ...(_0x3dd4fd.linkPreview ? {
            linkPreview: {
              ..._0x3dd4fd.linkPreview
            }
          } : {}),
          ...(_0x3dd4fd.quoted && _0x3dd4fd.quoted.message ? {
            quotedMessage: {
              ...(_0x3dd4fd.quoted?.message || {})
            }
          } : {})
        }
      };
      var _0x29d765 = _0x64e7fe.message ? _0x64e7fe.message : _0x64e7fe;
      let _0x96fa75 = _0x301319 ? _0x301319 : Object.keys(_0x29d765)[0];
      _0x29d765 = {
        ..._0x5b036b,
        ..._0x29d765
      };
      const _0xcba9a = await generateWAMessageFromContent(_0x427112, _0x29d765, _0x3dd4fd ? {
        ...(_0x96fa75 == "conversation" ? {
          extendedTextMessage: {
            text: _0x29d765[_0x96fa75]
          }
        } : _0x29d765[_0x96fa75]),
        ..._0x5b036b,
        contextInfo: {
          ...(_0x29d765[_0x96fa75]?.contextInfo || {}),
          ..._0x5b036b.contextInfo
        }
      } : {});
      await _0x45f427.relayMessage(_0x427112, _0xcba9a.message, {
        messageId: _0x45f427.messageId()
      });
      return _0xcba9a;
    } catch {}
  };
  _0x45f427.forwardOrBroadCast = async (_0x3838a3, _0x3e5303, _0x15dde3 = {}, _0x5eb9ec = "") => {
    try {
      if (!_0x15dde3 || typeof _0x15dde3 !== "object") {
        _0x15dde3 = {};
      }
      _0x15dde3.messageId = _0x15dde3.messageId || _0x45f427.messageId();
      var _0x55fc5f = _0x3e5303.message ? _0x3e5303.message : _0x3e5303;
      let _0x1b6947 = _0x55fc5f.mtype ? _0x55fc5f.mtype : Object.keys(_0x55fc5f)[0];
      if (_0x1b6947 === "videoMessage" && _0x5eb9ec === "ptv") {
        _0x55fc5f = {
          ptvMessage: {
            ..._0x3e5303.msg
          }
        };
        _0x1b6947 = "ptvMessage";
      } else if (_0x1b6947 == "conversation") {
        _0x55fc5f = {
          extendedTextMessage: {
            text: _0x55fc5f[_0x1b6947]
          }
        };
        _0x1b6947 = "extendedTextMessage";
      }
      _0x55fc5f[_0x1b6947] = {
        ...(_0x55fc5f[_0x1b6947] || _0x55fc5f),
        ..._0x15dde3
      };
      const _0x5ec9f7 = generateWAMessageFromContent(_0x3838a3, _0x55fc5f, _0x15dde3);
      await _0x45f427.relayMessage(_0x3838a3, _0x5ec9f7.message, {
        messageId: _0x15dde3.messageId
      });
      return _0x5ec9f7;
    } catch (_0x14b294) {
      console.log(_0x14b294);
    }
  };
  _0x45f427.forwardMessage = _0x45f427.forwardOrBroadCast;
  _0x45f427.copyNForward = async (_0x192e6b, _0x244f6a, _0xb68ab3 = false, _0xccee27 = {}) => {
    try {
      let _0x35fd84;
      if (_0xccee27.readViewOnce) {
        _0x244f6a.message = _0x244f6a.message && _0x244f6a.message.ephemeralMessage && _0x244f6a.message.ephemeralMessage.message ? _0x244f6a.message.ephemeralMessage.message : _0x244f6a.message || undefined;
        _0x35fd84 = Object.keys(_0x244f6a.message.viewOnceMessage.message)[0];
        delete (_0x244f6a.message && _0x244f6a.message.ignore ? _0x244f6a.message.ignore : _0x244f6a.message || undefined);
        delete _0x244f6a.message.viewOnceMessage.message[_0x35fd84].viewOnce;
        _0x244f6a.message = {
          ..._0x244f6a.message.viewOnceMessage.message
        };
      }
      let _0x264c1c = Object.keys(_0x244f6a.message)[0];
      try {
        _0x244f6a.key.fromMe = true;
      } catch (_0x4e2b84) {}
      let _0x24b7ce = await generateForwardMessageContent(_0x244f6a, _0xb68ab3);
      let _0xbdc558 = Object.keys(_0x24b7ce)[0];
      let _0x31f462 = {};
      if (_0x264c1c != "conversation") {
        _0x31f462 = _0x244f6a.message[_0x264c1c].contextInfo;
      }
      _0x24b7ce[_0xbdc558].contextInfo = {
        ..._0x31f462,
        ..._0x24b7ce[_0xbdc558].contextInfo
      };
      const _0x4265c0 = await generateWAMessageFromContent(_0x192e6b, _0x24b7ce, _0xccee27);
      await _0x45f427.relayMessage(_0x192e6b, _0x4265c0.message, {
        messageId: _0x45f427.messageId()
      });
      return _0x4265c0;
    } catch (_0x18f115) {
      console.log(_0x18f115);
    }
  };
  _0x45f427.sendFileUrl = async (_0x2d0ef2, _0x24c9db, _0x111136 = "", _0x5e7182 = "", _0x3a0ddf = {
    author: "Asta-Md"
  }, _0x6f6f13 = "") => {
    try {
      let _0x5266b0 = await axios.head(_0x24c9db);
      let _0x299044 = _0x5266b0?.headers["content-type"] || "";
      let _0xbd77bc = _0x299044.split("/")[0];
      let _0x55657b = false;
      if (_0x299044.split("/")[1] === "gif" || _0x6f6f13 === "gif") {
        _0x55657b = {
          video: {
            url: _0x24c9db
          },
          caption: _0x111136,
          gifPlayback: true,
          ..._0x3a0ddf
        };
      } else if (_0x299044.split("/")[1] === "webp" || _0x6f6f13 === "sticker") {
        _0x55657b = {
          sticker: {
            url: _0x24c9db
          },
          ..._0x3a0ddf
        };
      } else if (_0xbd77bc === "image" || _0x6f6f13 === "image") {
        _0x55657b = {
          image: {
            url: _0x24c9db
          },
          caption: _0x111136,
          ..._0x3a0ddf,
          mimetype: "image/jpeg"
        };
      } else if (_0xbd77bc === "video" || _0x6f6f13 === "video") {
        _0x55657b = {
          video: {
            url: _0x24c9db
          },
          caption: _0x111136,
          mimetype: "video/mp4",
          ..._0x3a0ddf
        };
      } else if (_0xbd77bc === "audio" || _0x6f6f13 === "audio") {
        _0x55657b = {
          audio: {
            url: _0x24c9db
          },
          mimetype: "audio/mpeg",
          ..._0x3a0ddf
        };
      } else if (_0x299044 == "application/pdf") {
        _0x55657b = {
          document: {
            url: _0x24c9db
          },
          mimetype: "application/pdf",
          caption: _0x111136,
          ..._0x3a0ddf
        };
      }
      if (_0x55657b) {
        try {
          return await _0x45f427.sendMessage(_0x2d0ef2, _0x55657b, {
            quoted: _0x5e7182
          });
        } catch {}
      }
      try {
        var _0x51ef30 = _0x5266b0?.headers["content-disposition"]?.split("=\"")[1]?.split("\"")[0] || "file";
        if (_0x51ef30) {
          const _0x362a9d = [".jpg", ".jpeg", ".png"];
          const _0x324f58 = [".mp4", ".avi", ".mov", ".mkv", ".gif", ".m4v", ".webp"];
          var _0x5bbf8d = _0x51ef30.substring(_0x51ef30.lastIndexOf("."))?.toLowerCase() || "nillll";
          var _0x1c07e0;
          if (_0x362a9d.includes(_0x5bbf8d)) {
            _0x1c07e0 = "image/jpeg";
          } else if (_0x324f58.includes(_0x5bbf8d)) {
            _0x1c07e0 = "video/mp4";
          }
          _0x299044 = _0x1c07e0 ? _0x1c07e0 : _0x299044;
          let _0x417900 = {
            fileName: _0x51ef30 || "file",
            caption: _0x111136,
            ..._0x3a0ddf,
            mimetype: _0x299044
          };
          return await _0x45f427.sendMessage(_0x2d0ef2, {
            document: {
              url: _0x24c9db
            },
            ..._0x417900
          }, {
            quoted: _0x5e7182
          });
        }
      } catch (_0x22af5e) {}
      let _0x1573e0 = {
        fileName: _0x51ef30 ? _0x51ef30 : "file",
        caption: _0x111136,
        ..._0x3a0ddf,
        mimetype: _0x299044
      };
      return await _0x45f427.sendMessage(_0x2d0ef2, {
        document: {
          url: _0x24c9db
        },
        ..._0x1573e0
      }, {
        quoted: _0x5e7182
      });
    } catch (_0x4a1a50) {
      console.log("Erorr in client.sendFileUrl() : ", _0x4a1a50);
      throw _0x4a1a50;
    }
  };
  _0x45f427.sendFromUrl = _0x45f427.sendFileUrl;
  const _0x540712 = {};
  let _0x5ea3e4 = [];
  _0x45f427.sendUi = async (_0xa30672, _0x2f164c = {}, _0x1ff6ba = "", _0x4ece4e = "", _0x5d45a7 = "", _0x3557a4 = false) => {
    let _0x3fe53a = {};
    try {
      const _0x41f6ab = /(https?:\/\/\S+)/gi;
      const _0x1c0aa6 = [".jpg", ".jpeg", ".png"];
      const _0x44bea3 = [".mp4", ".avi", ".mov", ".mkv", ".gif", ".m4v", ".webp"];
      let _0x4547ac = video = false;
      if (!_0x5ea3e4 || !_0x5ea3e4[0]) {
        _0x5ea3e4 = global.userImages ? global.userImages.split(",") : [await botpic()];
        _0x5ea3e4 = _0x5ea3e4.filter(_0x39daf0 => _0x39daf0.trim() !== "");
      }
      let _0x30e58c = _0x4ece4e && _0x5d45a7 ? _0x5d45a7 : _0x5ea3e4[Math.floor(Math.random() * _0x5ea3e4.length)];
      if (!_0x540712[_0x30e58c]) {
        const _0x211ab8 = _0x30e58c.substring(_0x30e58c.lastIndexOf(".")).toLowerCase();
        if (_0x1c0aa6.includes(_0x211ab8)) {
          _0x4547ac = true;
        }
        if (_0x44bea3.includes(_0x211ab8)) {
          video = true;
        }
        _0x540712[_0x30e58c] = {
          image: _0x4547ac,
          video: video
        };
      }
      _0x1ff6ba = _0x1ff6ba && _0x1ff6ba.quoted?.key ? _0x1ff6ba.quoted : _0x1ff6ba || "";
      let _0x2b249b;
      if ((_0x3557a4 && _0x5d45a7 && global.style > 0 || !_0x5d45a7) && /text|txt|nothing|smd|suhail/.test(global.userImages) || _0x4ece4e == "text") {
        _0x2b249b = {
          text: _0x2f164c.text || _0x2f164c.caption,
          ..._0x2f164c
        };
      } else if (_0x4ece4e == "image" || _0x540712[_0x30e58c].image) {
        _0x2b249b = {
          image: {
            url: _0x30e58c
          },
          ..._0x2f164c,
          mimetype: "image/jpeg"
        };
      } else if (_0x4ece4e == "video" || _0x540712[_0x30e58c].video) {
        _0x2b249b = {
          video: {
            url: _0x30e58c
          },
          ..._0x2f164c,
          mimetype: "video/mp4",
          gifPlayback: true,
          height: 274,
          width: 540
        };
      }
      const _0x5b7e9c = _0x3557a4 && _0x5d45a7 && global.style > 0 ? await smdBuffer(_0x5d45a7) : null;
      _0x3fe53a = {
        ...(await _0x45f427.contextInfo(Config.botname, _0x1ff6ba && _0x1ff6ba.senderName ? _0x1ff6ba.senderName : Config.ownername, _0x5b7e9c))
      };
      if (_0x2b249b) {
        return await _0x45f427.sendMessage(_0xa30672, {
          contextInfo: _0x3fe53a,
          ..._0x2b249b
        }, {
          quoted: _0x1ff6ba
        });
      }
    } catch (_0x54ac06) {
      console.log("erorr in userImages() : ", _0x54ac06);
    }
    try {
      return await _0x45f427.sendMessage(_0xa30672, {
        image: {
          url: await botpic()
        },
        contextInfo: _0x3fe53a,
        ..._0x2f164c
      });
    } catch {
      return _0x45f427.sendMessage(_0xa30672, {
        text: _0x2f164c.text || _0x2f164c.caption,
        ..._0x2f164c
      });
    }
  };
  _0x45f427.contextInfo = async (_0x1a1326 = Config.botname, _0x351381 = Config.ownername, _0x19c490 = log0, _0x300d4d = 1, _0x4dcb67 = gurl, _0x1ee872 = false) => {
    try {
      let _0x2f4b0b = _0x1ee872 ? _0x1ee872 : global.style;
      if (_0x2f4b0b >= 5) {
        return {
          externalAdReply: {
            title: _0x1a1326,
            body: _0x351381,
            renderLargerThumbnail: true,
            showAdAttribution: true,
            thumbnail: _0x19c490 || log0,
            mediaType: _0x300d4d || 1,
            mediaUrl: _0x4dcb67,
            sourceUrl: _0x4dcb67
          }
        };
      } else if (_0x2f4b0b == 4) {
        return {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: _0x1a1326,
            body: _0x351381,
            renderLargerThumbnail: true,
            thumbnail: _0x19c490 || log0,
            mediaType: _0x300d4d || 1,
            mediaUrl: _0x4dcb67,
            sourceUrl: _0x4dcb67
          }
        };
      } else if (_0x2f4b0b == 3) {
        return {
          externalAdReply: {
            title: _0x1a1326,
            body: _0x351381,
            renderLargerThumbnail: true,
            thumbnail: _0x19c490 || log0,
            mediaType: _0x300d4d || 1,
            mediaUrl: _0x4dcb67,
            sourceUrl: _0x4dcb67
          }
        };
      } else if (_0x2f4b0b == 2) {
        return {
          externalAdReply: {
            title: _0x1a1326,
            body: _0x351381,
            thumbnail: _0x19c490 || log0,
            showAdAttribution: true,
            mediaType: 1,
            mediaUrl: _0x4dcb67,
            sourceUrl: _0x4dcb67
          }
        };
      } else if (_0x2f4b0b == 1) {
        return {
          externalAdReply: {
            title: _0x1a1326,
            body: _0x351381,
            thumbnail: _0x19c490 || log0,
            mediaType: 1,
            mediaUrl: _0x4dcb67,
            sourceUrl: _0x4dcb67
          }
        };
      } else {
        return {};
      }
    } catch (_0x1bcc49) {
      console.log("error in client.contextInfo() : ", _0x1bcc49);
      return {};
    }
  };
  _0x45f427.cMod = (_0xf961d1, _0x1560d8, _0x773611 = "", _0x57415a = _0x45f427.user.id, _0x31cfea = {}) => {
    let _0x58b21a = Object.keys(_0x1560d8.message)[0];
    let _0x2c8db4 = _0x58b21a === "ephemeralMessage";
    if (_0x2c8db4) {
      _0x58b21a = Object.keys(_0x1560d8.message.ephemeralMessage.message)[0];
    }
    let _0x2a0c63 = _0x2c8db4 ? _0x1560d8.message.ephemeralMessage.message : _0x1560d8.message;
    let _0x251463 = _0x2a0c63[_0x58b21a];
    if (typeof _0x251463 === "string") {
      _0x2a0c63[_0x58b21a] = _0x773611 || _0x251463;
    } else if (_0x251463.caption) {
      _0x251463.caption = _0x773611 || _0x251463.caption;
    } else {
      _0x251463.text &&= _0x773611 || _0x251463.text;
    }
    if (typeof _0x251463 !== "string") {
      _0x2a0c63[_0x58b21a] = {
        ..._0x251463,
        ..._0x31cfea
      };
    }
    if (_0x1560d8.key.participant) {
      _0x57415a = _0x1560d8.key.participant = _0x57415a || _0x1560d8.key.participant;
    } else if (_0x1560d8.key.participant) {
      _0x57415a = _0x1560d8.key.participant = _0x57415a || _0x1560d8.key.participant;
    }
    if (_0x1560d8.key.remoteJid.includes("@s.whatsapp.net")) {
      _0x57415a = _0x57415a || _0x1560d8.key.remoteJid;
    } else if (_0x1560d8.key.remoteJid.includes("@broadcast")) {
      _0x57415a = _0x57415a || _0x1560d8.key.remoteJid;
    }
    _0x1560d8.key.remoteJid = _0xf961d1;
    _0x1560d8.key.fromMe = _0x57415a === _0x45f427.user.id;
    return proto.WebMessageInfo.fromObject(_0x1560d8);
  };
  _0x45f427.getFile = async (_0xf50baa, _0x5e5f49) => {
    let _0x3a70e7;
    let _0x1efbe6 = Buffer.isBuffer(_0xf50baa) ? _0xf50baa : /^data:.*?\/.*?;base64,/i.test(_0xf50baa) ? Buffer.from(_0xf50baa.split`,`[1], "base64") : /^https?:\/\//.test(_0xf50baa) ? await (_0x3a70e7 = await getBuffer(_0xf50baa)) : fs.existsSync(_0xf50baa) ? (_0xd0bbd6 = _0xf50baa, fs.readFileSync(_0xf50baa)) : typeof _0xf50baa === "string" ? _0xf50baa : Buffer.alloc(0);
    let _0x515b01 = (await FileType.fromBuffer(_0x1efbe6)) || {
      mime: "application/octet-stream",
      ext: ".bin"
    };
    let _0xd0bbd6 = "./theme/null." + _0x515b01.ext;
    if (_0x1efbe6 && _0x5e5f49) {
      fs.promises.writeFile(_0xd0bbd6, _0x1efbe6);
    }
    return {
      res: _0x3a70e7,
      filename: _0xd0bbd6,
      size: getSizeMedia(_0x1efbe6),
      ..._0x515b01,
      data: _0x1efbe6
    };
  };
  _0x45f427.sendFile = async (_0x2e43c6, _0x2bba87, _0x3ebfe9, _0x4ae9e9 = {
    quoted: ""
  }, _0x2a7796 = {}) => {
    let _0x46db3b = await _0x45f427.getFile(_0x2bba87, true);
    let {
      filename: _0x5783cc,
      size: _0x507391,
      ext: _0x350fa2,
      mime: _0x186c9e,
      data: _0x115073
    } = _0x46db3b;
    let _0x4a4904 = "";
    let _0x95ea42 = _0x186c9e;
    let _0xe24b98 = _0x5783cc;
    if (_0x2a7796.asDocument) {
      _0x4a4904 = "document";
    }
    if (_0x2a7796.asSticker || /webp/.test(_0x186c9e)) {
      let {
        writeExif: _0x183b03
      } = require("./exif.js");
      let _0x451d3b = {
        mimetype: _0x186c9e,
        data: _0x115073
      };
      _0xe24b98 = await _0x183b03(_0x451d3b, {
        packname: Config.packname,
        author: Config.packname,
        categories: _0x2a7796.categories ? _0x2a7796.categories : []
      });
      await fs.promises.unlink(_0x5783cc);
      _0x4a4904 = "sticker";
      _0x95ea42 = "image/webp";
    } else if (/image/.test(_0x186c9e)) {
      _0x4a4904 = "image";
    } else if (/video/.test(_0x186c9e)) {
      _0x4a4904 = "video";
    } else if (/audio/.test(_0x186c9e)) {
      _0x4a4904 = "audio";
    } else {
      _0x4a4904 = "document";
    }
    await _0x45f427.sendMessage(_0x2e43c6, {
      [_0x4a4904]: {
        url: _0xe24b98
      },
      mimetype: _0x95ea42,
      fileName: _0x3ebfe9,
      ..._0x2a7796
    }, {
      quoted: _0x4ae9e9 && _0x4ae9e9.quoted ? _0x4ae9e9.quoted : _0x4ae9e9,
      ..._0x4ae9e9
    });
    return fs.promises.unlink(_0xe24b98);
  };
  _0x45f427.fakeMessage = async (_0x508616 = "text", _0x5eb591 = {}, _0x220539 = "➬ Suhail SER", _0x3b5ed0 = {}) => {
    const _0x381f35 = [777, 0, 100, 500, 1000, 999, 2021];
    let _0x2c45e1 = {
      id: _0x45f427.messageId(),
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      ..._0x5eb591
    };
    let _0x48d5a2 = {};
    if (_0x508616 == "text" || _0x508616 == "conservation" || !_0x508616) {
      _0x48d5a2 = {
        conversation: _0x220539
      };
    } else if (_0x508616 == "order") {
      _0x48d5a2 = {
        orderMessage: {
          itemCount: _0x381f35[Math.floor(_0x381f35.length * Math.random())],
          status: 1,
          surface: 1,
          message: "❏ " + _0x220539,
          orderTitle: "live",
          sellerJid: "255716312895@s.whatsapp.net"
        }
      };
    } else if (_0x508616 == "contact") {
      _0x48d5a2 = {
        contactMessage: {
          displayName: "" + _0x220539,
          jpegThumbnail: log0
        }
      };
    } else if (_0x508616 == "image") {
      _0x48d5a2 = {
        imageMessage: {
          jpegThumbnail: log0,
          caption: _0x220539
        }
      };
    } else if (_0x508616 == "video") {
      _0x48d5a2 = {
        videoMessage: {
          url: log0,
          caption: _0x220539,
          mimetype: "video/mp4",
          fileLength: "4757228",
          seconds: 44
        }
      };
    }
    return {
      key: {
        ..._0x2c45e1
      },
      message: {
        ..._0x48d5a2,
        ..._0x3b5ed0
      }
    };
  };
  _0x45f427.parseMention = async _0x1856e6 => {
    return [..._0x1856e6.matchAll(/@([0-9]{5,16}|0)/g)].map(_0x1aec2a => _0x1aec2a[1] + "@s.whatsapp.net");
  };
  app.get("/chat", (_0x242f3d, _0x25f2c0) => {
    let _0x5d3a21 = _0x242f3d.query.chat || _0x242f3d.query.jid || _0x45f427.user.id || _0x45f427.user.m || "";
    if (["all", "msg", "total"].includes(_0x5d3a21)) {
      return _0x25f2c0.json({
        chat: _0x5d3a21,
        conversation: JSON.stringify(store, null, 2)
      });
    }
    if (!_0x5d3a21) {
      return _0x25f2c0.json({
        ERROR: "Chat Id parameter missing"
      });
    }
    _0x5d3a21 = _0x45f427.decodeJid(_0x5d3a21);
    const _0x5bce2b = (store.messages[_0x5d3a21] || store.messages[_0x5d3a21 + "@s.whatsapp.net"] || store.messages[_0x5d3a21 + "@g.us"])?.array || false;
    if (!_0x5bce2b) {
      return _0x25f2c0.json({
        chat: _0x5d3a21,
        Message: "no messages found in given chat id!"
      });
    }
    _0x25f2c0.json({
      chat: _0x5d3a21,
      conversation: JSON.stringify(_0x5bce2b, null, 2)
    });
  });
  _0x45f427.dl_size = global.dl_size || 200;
  _0x45f427.awaitForMessage = async (_0x310060 = {}) => {
    return new Promise((_0x1f3a95, _0x5ceb47) => {
      if (typeof _0x310060 !== "object") {
        _0x5ceb47(new Error("Options must be an object"));
      }
      if (typeof _0x310060.sender !== "string") {
        _0x5ceb47(new Error("Sender must be a string"));
      }
      if (typeof _0x310060.remoteJid !== "string") {
        _0x5ceb47(new Error("ChatJid must be a string"));
      }
      if (_0x310060.timeout && typeof _0x310060.timeout !== "number") {
        _0x5ceb47(new Error("Timeout must be a number"));
      }
      if (_0x310060.filter && typeof _0x310060.filter !== "function") {
        _0x5ceb47(new Error("Filter must be a function"));
      }
      const _0x455889 = _0x310060?.timeout || undefined;
      const _0x14f3c6 = _0x310060?.filter || (() => true);
      let _0x7013ab = undefined;
      let _0x59f115 = _0x93a420 => {
        let {
          type: _0x5ce3ef,
          messages: _0x29cb3d
        } = _0x93a420;
        if (_0x5ce3ef == "notify") {
          for (let _0x4f6edf of _0x29cb3d) {
            const _0x525a05 = _0x4f6edf.key.fromMe;
            const _0x5b6ca8 = _0x4f6edf.key.remoteJid;
            const _0x9c93a6 = _0x5b6ca8.endsWith("@g.us");
            const _0x51a83a = _0x5b6ca8 == "status@broadcast";
            const _0x4fb2f5 = _0x45f427.decodeJid(_0x525a05 ? _0x45f427.user.id : _0x9c93a6 || _0x51a83a ? _0x4f6edf.key.participant : _0x5b6ca8);
            if (_0x4fb2f5 == _0x310060.sender && _0x5b6ca8 == _0x310060.remoteJid && _0x14f3c6(_0x4f6edf)) {
              _0x45f427.ev.off("messages.upsert", _0x59f115);
              clearTimeout(_0x7013ab);
              _0x1f3a95(_0x4f6edf);
            }
          }
        }
      };
      _0x45f427.ev.on("messages.upsert", _0x59f115);
      if (_0x455889) {
        _0x7013ab = setTimeout(() => {
          _0x45f427.ev.off("messages.upsert", _0x59f115);
          _0x5ceb47(new Error("Timeout"));
        }, _0x455889);
      }
    });
  };
  return _0x45f427;
}
let asciii = "\n\n    \n" + Config.VERSION + "\nYESSER\nMD\nPREMIUM WHATSAPP BOT 2025\n\n";
console.log(asciii);
global.lib_dir = __dirname;
global.toBool = (_0x58e3aa, _0x444fff = false) => /true|yes|ok|act|sure|enable|smd|suhail/gi.test(_0x58e3aa) ? _0x444fff ? true : "true" : _0x444fff ? false : "false";
async function loadPlugins(_0x3c3939) {
  try {
    fs.readdirSync(_0x3c3939).forEach(_0x5bd80f => {
      const _0x266c1d = path.join(_0x3c3939, _0x5bd80f);
      if (fs.statSync(_0x266c1d).isDirectory()) {
        loadPlugins(_0x266c1d);
      } else if (_0x5bd80f.includes("_Baileys") || _0x5bd80f.includes("_MSGS")) {
        log("\nRENTBOTT's DATA DETECTED!", "\nUSER NUMBER:", _0x5bd80f.replace("_MSGS", "").replace("_Baileys", ""), "\n\n");
      } else if ([".js", ".smd", ".suhail"].includes(path.extname(_0x5bd80f).toLowerCase())) {
        try {
          require(_0x266c1d);
        } catch (_0x10d793) {
          log("\n❌There's an error in '" + _0x5bd80f + "' file ❌ \n\n", _0x10d793);
        }
      }
    });
  } catch (_0x1ee66d) {}
}
const html = "\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Xiangzaoh Bouncing Text</title>\n  <style>\n    body, html {\n      margin: 0;\n      padding: 0;\n      height: 100%;\n    }\n\n    .container {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 100%;\n    }\n\n    .bounce {\n      animation: bounce 2s infinite;\n    }\n\n    @keyframes bounce {\n      0%, 100% {\n        transform: translateY(0);\n      }\n      50% {\n        transform: translateY(-20px);\n      }\n    }\n  </style>\n</head>\n<body>\n  <div class=\"container\">\n    <h1 class=\"bounce\">Xiangzaoh</h1>\n  </div>\n</body>\n</html>\n";
app.set("json spaces", 3);
app.get("/", (_0x224326, _0x279343) => {
  try {
    let _0x5464ef = path.join(__dirname, "assets", "index.html");
    if (fs.existsSync(_0x5464ef)) {
      _0x279343.sendFile(_0x5464ef);
    } else {
      _0x279343.type("html").send(html);
    }
  } catch (_0x33178d) {}
});
app.get("/suhail", (_0x1001d5, _0x2f8b80) => _0x2f8b80.type("html").send(html));
app.get("/var", (_0x3cb00b, _0x1be87f) => _0x1be87f.json({
  ...Config,
  SESSION_ID: SESSION_ID
}));
app.get("/qr", async (_0x44490f, _0x25c0f8) => {
  try {
    if (!global.qr) {
      throw "QR NOT FETCHED!";
    }
    let _0x7f6cbd = require("qrcode");
    _0x25c0f8.end(await _0x7f6cbd.toBuffer(global.qr));
  } catch (_0x3d29cb) {
    console.log("/qr PATH_URL Error : ", _0x3d29cb);
    if (!_0x25c0f8.headersSent) {
      _0x25c0f8.send({
        error: _0x3d29cb.message || _0x3d29cb,
        reason: global.qr_message || "SERVER DOWN!",
        uptime: runtime(process.uptime())
      });
    }
  }
});
app.get("/logo", (_0x57d672, _0x40d20a) => _0x40d20a.end(global.log0));
let quickport = global.port ? global.port : Math.floor(Math.random() * 9000) + 1000;
app.listen(quickport, () => console.log("Zax-Md Server on http://localhost:" + quickport + "/  "));
global.print = console.log;
global.log = console.log;
global.Debug = {
  ...console
};
if (!/true|log|smd|error|logerror|err|all|info|loginfo|warn|logwarn/.test(global.MsgsInLog)) {
  console.log = () => {};
}
if (!/error|logerror|err|all/.test(global.MsgsInLog)) {
  console.error = () => {};
}
if (!/info|loginfo|all/.test(global.MsgsInLog)) {
  console.info = () => {};
}
if (!/warn|logwarn|all/.test(global.MsgsInLog)) {
  console.warn = () => {};
}
let Appurls = [];
if (global.appUrl && /http/gi.test(global.appUrl)) {
  Appurls = [global.appUrl, "http://localhost:" + quickport];
}
if (process.env.REPL_ID) {
  Appurls.push("https://" + process.env.REPL_ID + ".pike.replit.dev");
  Appurls.push("https://" + process.env.REPL_ID + "." + (process.env.REPLIT_CLUSTER || "pike") + ".replit.dev");
}
if (process.env.REPL_SLUG) {
  Appurls.push("https://" + process.env.REPL_SLUG + "." + process.env.REPL_OWNER + ".repl.co");
}
if (process.env.PROJECT_DOMAIN) {
  Appurls.push("https://" + process.env.PROJECT_DOMAIN + ".glitch.me");
}
if (process.env.CODESPACE_NAME) {
  Appurls.push("https://" + process.env.CODESPACE_NAME + ".github.dev");
}
function keepAlive() {
  setInterval(() => {
    for (let _0x1eaee7 = 0; _0x1eaee7 < Appurls.length; _0x1eaee7++) {
      const _0x37e313 = Appurls[_0x1eaee7];
      if (/(\/\/|\.)undefined\./.test(_0x37e313)) {
        continue;
      }
      try {
        axios.get(_0x37e313);
      } catch (_0x452a44) {}
      try {
        fetch(_0x37e313);
      } catch (_0x39bd91) {}
    }
  }, 300000);
}
if (Array.isArray(Appurls)) {
  keepAlive();
}
async function MakeSession(_0x2980ef = SESSION_ID, _0x3256b3 = __dirname + "/Session", _0x1442a2 = false) {
  let _0x32d064 = ("" + _0x2980ef).replace(/^SESSION_\d{2}_\d{2}_\d{2}_\d{2}_/gi, "").replace(/^SESSION_ID_\d{2}_\d{2}_\d{2}_\d{2}_/gi, "").replace(/^ZAX_\d{2}_\d{2}_\d{2}_\d{2}_/gi, "").replace(/ZAX;;;/gi, "").replace(/ZAX;;;/gi, "").replace(/ZAX;;;/gi, "").trim();
  function _0x35b09f(_0x3c5fc5) {
    return Buffer.from(_0x3c5fc5, "base64").toString("utf-8");
  }
  function _0x5d898a(_0x5c827f, _0x3bb2ee) {
    return new Promise((_0xbd7787, _0x16dad1) => {
      fs.readFile(_0x3bb2ee, "utf8", (_0x5cc7de, _0x74f271) => {
        if (_0x5cc7de) {
          _0xbd7787(false);
        } else {
          _0xbd7787(_0x74f271.includes(_0x5c827f));
        }
      });
    });
  }
  const _0x56d09a = "/Xiangzaoh/";
  const _0x29a63b = toBool(_0x1442a2 || global.IS_ZAX || process.env.IS_ZAX, true) || (await _0x5d898a(_0x56d09a, "./Dockerfile"));
  if (_0x29a63b) {
    SmdOfficial = "yes";
    if (!fs.existsSync(_0x3256b3)) {
      fs.mkdirSync(_0x3256b3);
    }
    if (_0x32d064 && _0x32d064.startsWith("PId_")) {
      try {
        let _0x24da2d = _0x32d064.replace("PId_", "");
        const _0xdf31dc = require("pastebin-js");
        const _0x1015ea = new _0xdf31dc("ECRgNok5kmfqqPofmC4NwFM8J6rx3qSO");
        const _0x1c41e8 = await _0x1015ea.getPaste(_0x24da2d);
        console.log({
          pasteId: _0x24da2d
        });
        _0x32d064 = _0x1c41e8 && typeof _0x1c41e8 == "string" ? Buffer.from(_0x1c41e8, "utf-8").toString("base64") : _0x32d064;
      } catch (_0x1b95e2) {
        console.log("CAN'T GET SESSION FROM PASTE ID\nERROR : ", _0x1b95e2);
      }
    }
    if (_0x32d064 && /guru/gi.test(_0x32d064) && _0x32d064.length < 30) {
      try {
        let _0x5412d8 = global.gurupaste || "https://pastebin.guruapi.tech/pastes?action=getpaste&id=";
        const {
          data: _0x499c92
        } = await axios.get(_0x5412d8 + _0x32d064);
        const _0x31ee76 = _0x499c92 && _0x499c92.content ? _0x499c92.content : false;
        let _0x5e3755 = _0x31ee76 ? _0x35b09f(_0x31ee76) : {};
        const _0x4a93a1 = JSON.parse(_0x5e3755);
        fs.writeFileSync(_0x3256b3 + "/creds.json", JSON.stringify(_0x4a93a1, null, 2));
        log("\nSession Data Saved.");
      } catch (_0x5e90bf) {
        log("EMPTY SESSION_ID FROM GURU SERVER\nPLEASE SCAN THE QR AGAIN FROM [ " + global.scan + " ]\n\n\nERROR: ", _0x5e90bf);
      }
    } else if (_0x32d064 && _0x32d064.length > 3 && _0x32d064.length < 20) {
      try {
        let {
          data: _0x453470
        } = await axios.get("https://paste.c-net.org/" + _0x32d064);
        fs.writeFileSync(_0x3256b3 + "/creds.json", _0x35b09f(_0x453470), "utf8");
      } catch (_0x43fc30) {
        log("\nERROR GETTING SESSION_ID FROM PASTE SERVER\n \nPLEASE SCAN THE QR AGAIN FROM [ " + global.scan + " ]\n");
      }
    } else if (_0x32d064) {
      try {
        log("Connecting With Session ID!");
        let _0x41d689 = _0x35b09f(_0x32d064);
        const _0x50ba4f = JSON.parse(_0x41d689);
        if (_0x50ba4f["creds.json"]) {
          for (const _0x4a1cef in _0x50ba4f) {
            try {
              fs.writeFileSync(_0x3256b3 + "/" + _0x4a1cef, typeof _0x50ba4f[_0x4a1cef] == "string" ? _0x50ba4f[_0x4a1cef] : JSON.stringify(_0x50ba4f[_0x4a1cef], null, 2));
            } catch (_0x2f470b) {}
          }
        } else {
          fs.writeFileSync(_0x3256b3 + "/creds.json", JSON.stringify(_0x50ba4f, null, 2));
        }
        log("\nCredentials Saved Successfully.");
      } catch (_0x14b049) {
        log("INVALID SESSION_ID ERROR FROM SERVER\nPLEASE SCAN THE QR AGAIN FROM [ " + global.scan + " ]\n\n\nERROR : ", _0x14b049);
      }
    }
  } else {
    SmdOfficial = false;
    log("\n\nA cheap copy of Yassin994 Found.\nDeploy From : https://github.com" + _0x56d09a + "YESSER-MD\n");
    process.exit(0);
  }
}
MakeSession();
async function main() {
  if (mongodb && mongodb.includes("mongodb")) {
    try {
      isMongodb = await connnectMongo();
    } catch {}
  }
  if (!global.isMongodb && global.DATABASE_URL && !["false", "null"].includes(global.DATABASE_URL)) {
    try {
      global.sqldb = await connnectpg();
    } catch {}
  }
}
module.exports = {
  init: MakeSession,
  connect: syncdb,
  logger: global.Debug,
  DATABASE: {
    sync: main
  }
};
