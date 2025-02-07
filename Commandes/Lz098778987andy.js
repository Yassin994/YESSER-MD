const {
  zokou
} = require("../framework/zokou");
const yts = require("yt-search");
zokou({
  'nomCom': "video",
  'categorie': "Search",
  'reaction': '🤳'
}, async (_0x5949b0, _0x5baae4, _0x3a94eb) => {
  const {
    ms: _0x5983ad,
    repondre: _0x635a46,
    arg: _0x30ebe9
  } = _0x3a94eb;
  if (!_0x30ebe9[0x0]) {
    _0x635a46("Please insert a song/video name.");
    return;
  }
  try {
    let _0x1ce9a9 = _0x30ebe9.join(" ");
    const _0x41f7af = await yts(_0x1ce9a9);
    const _0x4c658e = _0x41f7af.videos;
    if (_0x4c658e && _0x4c658e.length > 0x0) {
      const _0x30b168 = _0x4c658e[0x0];
      const _0x26a944 = {
        'image': {
          'url': _0x30b168.thumbnail
        },
        'caption': "YOUTUBE SEARCH\n\n © 𝚳𝚪 𝚫𝚴𝐃𝚩𝚫𝐃"
      };
      await _0x5baae4.sendMessage(_0x5949b0, _0x26a944, {
        'quoted': _0x5983ad
      });
      await _0x5baae4.sendMessage(_0x5949b0, {
        'video': {
          'url': _0x30b168.url
        },
        'mimetype': "video/mp4"
      }, {
        'quoted': _0x5983ad
      });
      _0x635a46("Downloaded Successfully✅");
    } else {
      _0x635a46("No videos found.");
    }
  } catch (_0x3b7436) {
    console.error("Error from API:", _0x3b7436);
    _0x635a46("Searching...😪");
  }
});
zokou({
  'nomCom': 'song',
  'categorie': "Download",
  'reaction': '🎺'
}, async (_0x59ddf5, _0x58c8b7, _0x43867f) => {
  const {
    ms: _0x1676d0,
    repondre: _0x1e8024,
    arg: _0x2bac41
  } = _0x43867f;
  if (!_0x2bac41[0x0]) {
    _0x1e8024("Please insert a song name.");
    return;
  }
  try {
    let _0x57159a = _0x2bac41.join(" ");
    const _0x23e972 = await yts(_0x57159a);
    const _0x1b10ba = _0x23e972.videos;
    if (_0x1b10ba && _0x1b10ba.length > 0x0) {
      const _0x3eec13 = _0x1b10ba[0x0];
      const _0x369750 = {
        'image': {
          'url': _0x3eec13.thumbnail
        },
        'caption': "YOUTUBE SEARCH\n\n ©𝚳𝚪 𝚫𝚴𝐃𝚩𝚫𝐃"
      };
      await _0x58c8b7.sendMessage(_0x59ddf5, _0x369750, {
        'quoted': _0x1676d0
      });
      await _0x58c8b7.sendMessage(_0x59ddf5, {
        'audio': {
          'url': 'your_download_url'
        },
        'mimetype': "audio/mp4"
      }, {
        'quoted': _0x1676d0
      });
      _0x1e8024("*Downloaded Successfully ✅*");
    } else {
      _0x1e8024("No audio found.");
    }
  } catch (_0x43792f) {
    console.error("Error from API:", _0x43792f);
    _0x1e8024("An error occurred while searching or downloading the audio.");
  }
});
zokou({
  'nomCom': "play",
  'categorie': 'Download',
  'reaction': '🎤'
}, async (_0x5af0bd, _0x3d387a, _0x1e68f3) => {
  const {
    ms: _0x29402c,
    repondre: _0x4bd959,
    arg: _0x410d76
  } = _0x1e68f3;
  if (!_0x410d76[0x0]) {
    _0x4bd959("Please insert a song name.");
    return;
  }
  try {
    let _0x3548af = _0x410d76.join(" ");
    const _0x4048ad = await yts(_0x3548af);
    const _0x46b582 = _0x4048ad.videos;
    if (_0x46b582 && _0x46b582.length > 0x0) {
      const _0x42b788 = _0x46b582[0x0];
      const _0x138150 = _0x42b788.url;
      const _0x549b95 = await fetch("https://api.ssateam.my.id/api/ytdl?urls=" + encodeURIComponent(_0x138150) + "&apiKey=root");
      const _0x44b9bf = await _0x549b95.json();
      if (_0x44b9bf.status === 0xc8 && _0x44b9bf.success) {
        const _0x37c038 = _0x44b9bf.result.download_url;
        const _0x4301f2 = {
          'image': {
            'url': _0x42b788.thumbnail
          },
          'caption': "YOUTUBE SEARCH\n\n ©𝚳𝚪 𝚫𝚴𝐃𝚩𝚫𝐃"
        };
        await _0x3d387a.sendMessage(_0x5af0bd, _0x4301f2, {
          'quoted': _0x29402c
        });
        await _0x3d387a.sendMessage(_0x5af0bd, {
          'audio': {
            'url': _0x37c038
          },
          'mimetype': "audio/mp4"
        }, {
          'quoted': _0x29402c
        });
        _0x4bd959("*Downloaded Successfully ✅*");
      } else {
        _0x4bd959("Failed to download audio. Please try again later.");
      }
    } else {
      _0x4bd959("No audio found.");
    }
  } catch (_0x5d2a11) {
    console.error("Error from API:", _0x5d2a11);
    _0x4bd959("An error occurred while searching or downloading the audio.");
  }
});
