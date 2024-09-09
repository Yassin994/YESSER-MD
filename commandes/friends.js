const {
  zokou
} = require("../framework/zokou");
const {
  getAllSudoNumbers,
  isSudoTableNotEmpty
} = require("../bdd/sudo");
const conf = require("../set");
zokou({
  'nomCom': "agents",
  'categorie': 'General',
  'reaction': "🌛"
}, async (_0x1b06c5, _0x54bb8b, _0x2358bf) => {
  const {
    ms: _0x2aecc0,
    mybotpic: _0x43a6e2
  } = _0x2358bf;
  const _0x21b56d = [{
    'nom': "YESSER from Tanzania",
    'nom': "yesser Tech from Tanzania 🇹🇿",
    'numero': "load..."
  }, {
    'nom': "YESSER from TANZANIA ",
    'numero': "255621995482"
  }, {
    'nom': "your enemy",
    'numero': "255716662453"
  }, {
    'nom': " yesser boy",
    'numero': "255685957360"
  }, {
    'nom': "Boniphace from Tanzania 🇹🇿",
    'numero': "255716661569"
  }, {
    'nom': "🏹 yesser",
    'numero': "255621995482"
  }, {
    'nom': "Dullah From Tanzania 🇹🇿",
    'numero': "255716945971"
  }, {
    'nom': "🤕",
    'numero': "load..."
  }, {
'nom': "🤕",
    'numero': "load...."
  }, {
'nom': "🤕",
    'numero': "load...."
  }, {
'nom': "🤕",
    'numero': "Load...."
  }, {
'nom': "Kingfreditech From Tanzania 🇹🇿",
    'numero': "255620814108"
  }, {
    'nom': "🤕",
    'numero': "load...."
  }];
  let _0x2d5c7e = "Hello👋  *I'm YESSER Md Wa Bot* \nThe Following Numbers Are For  *YESSER_MD* Agents, \nYou Can Ask Them Anything Regarding yesser Bot \nFollow Our Channel For More Tech :https://whatsapp.com/channel/0029VaiMm7d4yltT51HS1T1G \n*KEEP USING YESSER MD*:\n\n";
  for (const _0x14eeec of _0x21b56d) {
    _0x2d5c7e += "----------------\n(●) " + _0x14eeec.nom + " : https://wa.me/" + _0x14eeec.numero + "\n";
  }
  var _0x11d31d = _0x43a6e2();
  if (_0x11d31d.match(/\.(mp4|gif)$/i)) {
    try {
      _0x54bb8b.sendMessage(_0x1b06c5, {
        'video': {
          'url': _0x11d31d
        },
        'caption': _0x2d5c7e
      }, {
        'quoted': _0x2aecc0
      });
    } catch (_0x55af9c) {
      console.log("🥵🥵 Menu erreur " + _0x55af9c);
      repondre("🥵🥵 Menu erreur " + _0x55af9c);
    }
  } else {
    if (_0x11d31d.match(/\.(jpeg|png|jpg)$/i)) {
      try {
        _0x54bb8b.sendMessage(_0x1b06c5, {
          'image': {
            'url': _0x11d31d
          },
          'caption': _0x2d5c7e
        }, {
          'quoted': _0x2aecc0
        });
      } catch (_0x39b1ed) {
        console.log("🥵🥵 Menu erreur " + _0x39b1ed);
        repondre("🥵🥵 Menu erreur " + _0x39b1ed);
      }
    } else {
      repondre(_0x11d31d);
      repondre("link error");
    }
  }
});
