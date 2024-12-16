const {
  smd,
  fetchJson,
  fancytext,
  yt,
  getBuffer,
  smdBuffer,
  smdJson,
  pinterest,
  prefix,
  Config,
  mediafire,
} = require("../lib");
const {
  search,
  download
} = require("aptoide-scraper");
const googleTTS = require("google-tts-api");
const ytdl = require("ytdl-secktor");
const yts = require("secktor-pack");
const fs = require("fs-extra");
const axios = require("axios");
const fetch = require("node-fetch");
var videotime = 2000;
const {
  cmd
} = require("../lib/plugins");
smd(
  {
    pattern: "spotify2",
    alias: ["sp2"],
    desc: "Downloads a Spotify song.",
    category: "downloader",
    filename: __filename,
    use: "<Spotify URL>",
  },
  async (message, input) => {
    try {
      const url = input.trim();
      if (!url || !isValidUrl(url)) {
        return await message.send("*_Please provide a valid Spotify URL._*");
      }

      const apiUrl = `https://astro-api-crqy.onrender.com/}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data || data.status !== 200) {
        return await message.reply("*Failed to download the Spotify song.*");
      }

      const { song, artist, album_name, release_date, cover_url, url: songUrl } = data.result;

      let output = `*Song:* ${song}\n`;
      output += `*Artist:* ${artist.join(", ")}\n`;
      output += `*Album:* ${album_name}\n`;
      output += `*Release Date:* ${release_date}\n\n`;
      output += `*Cover Image:* ${cover_url}\n\n`;

      const buffer = await axios.get(songUrl, { responseType: "arraybuffer" });
      const fileName = `${song.replace(/\s/g, "_")}.mp3`;

      await message.bot.sendMessage(
        message.chat,
        {
          audio: buffer.data,
          fileName: fileName,
          mimetype: "audio/mpeg",
          caption: output,
        },
        { quoted: message }
      );
    } catch (error) {
      await message.error(error + "\n\nCommand: spotify2", error, "*Failed to download the Spotify song.*");
    }
  }
);

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}
smd(
  {
    pattern: "spotify",
    alias: ["sp"],
    desc: "Searches for Spotify tracks.",
    category: "search",
    filename: __filename,
    use: "<search query>",
  },
  async (message, input) => {
    try {
      const query = input.trim();
      if (!query) {
        return await message.send("*_Please provide a search query._*");
      }

      const apiUrl = `https://astro-api-crqy.onrender.com/}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data || data.status !== 200) {
        return await message.reply("*Failed to fetch Spotify tracks.*");
      }

      const tracks = data.result;
      if (!tracks || tracks.length === 0) {
        return await message.reply("*No Spotify tracks found.*");
      }

      let output = "*Spotify Search Results:*\n\n";
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        output += `*${i + 1}. ${track.title}*\n`;
        output += `Artist: ${track.artist}\n`;
        output += `Duration: ${formatDuration(track.duration)}\n`;
        output += `Popularity: ${track.popularity}\n`;
        output += `Preview: ${track.preview ? track.preview : "No preview available"}\n`;
        output += `URL: ${track.url}\n\n`;
      }

      return await message.send(output, { quoted: message });
    } catch (error) {
      await message.error(error + "\n\nCommand: spotify", error, "*Failed to search Spotify.*");
    }
  }
);

function formatDuration(durationMs) {
  const seconds = Math.floor((durationMs / 1000) % 60);
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const hours = Math.floor((durationMs / (1000 * 60 * 60)) % 24);
  return `${hours ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
}
smd(
  {
    pattern: "twitter",
    alias: ["tw", "twdl"],
    desc: "Downloads Twitter videos.",
    category: "downloader",
    filename: __filename,
    use: "<add Twitter URL>",
  },
  async (message, input) => {
    try {
      let query = input.split(" ")[0].trim();
      if (!query || !query.startsWith("https://")) {
        return await message.send(
          "*_Please provide a valid Twitter Video URL._*\n*Example: " +
            prefix +
            "tw https://twitter.com/username/status/1234567890_*"
        );
      }

      let video = await smdJson(
        "https://astro-api-crqy.onrender.com/download/twitter?url=" + query
      );

      if (!video || !video.status === 200) {
        return await message.reply("*Invalid Video URL!*");
      }

      let caption = video.data.caption
        ? video.data.caption
        : `*Twitter Video Download*\n\n*Username:* ${video.data.username}`;

      return await message.bot.sendMessage(
        message.chat,
        {
          video: { url: video.data.HD },
          caption: caption,
        },
        { quoted: message }
      );
    } catch (error) {
      await message.error(error + "\n\nCommand: twitter", error, "*_Video not found!_*");
    }
  }
);
//FIXED FB

smd({
  pattern: "facebook",
  alias: ["fb", "fbdl"],
  desc: "Downloads Facebook videos.",
  category: "downloader",
  filename: __filename,
  use: "<add Facebook URL>"
}, async (message, input) => {
  try {
    let query = input.split(" ")[0].trim();
    if (!query || !query.startsWith("https://")) {
      return await message.send("*_Please provide a valid Facebook Video URL._*\n*Example: " + prefix + "fb https://www.facebook.com/watch/?v=2018727118289093_*");
    }
    let video = await smdJson("https://astro-api-crqy.onrender.com/" + query);
    if (!video || !video.status) {
      return await message.reply("*Invalid Video URL!*");
    }
    return await message.bot.sendMessage(message.chat, {
      video: {
        url: video.result.Normal_video // Assuming you want the normal quality video
      },
      caption: Config.caption
    }, {
      quoted: message
    });
  } catch (error) {
    await message.error(error + "\n\nCommand: facebook", error, "*_Video not found!_*");
  }
});

smd({
  pattern: "tgs",
  desc: "Downloads telegram stickers.",
  category: "downloader",
  filename: __filename,
  use: "<add sticker url.>"
}, async (_0x19df48, _0x155c01) => {
  try {
    if (!_0x155c01) {
      return await _0x19df48.reply("_Enter a tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal\nKeep in mind that there is a chance of ban if used frequently");
    }
    if (!_0x155c01.includes("addstickers")) {
      return await _0x19df48.reply("_Uhh Please Enter a Valid tg sticker url_\nEg: .tgs https://t.me/addstickers/Oldboyfinal");
    }
    let _0x2a4fb1 = _0x155c01.split("|")[0];
    let _0x27aa70 = _0x2a4fb1.split("/addstickers/")[1];
    let {
      result: _0x4a601d
    } = await fetchJson("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=" + encodeURIComponent(_0x27aa70) + " ");
    let _0x54b45a = _0x155c01.split("|")[1] || "";
    let _0x56bec3 = "Total stickers: " + _0x4a601d.stickers.length + "\n*Estimated complete in:* " + _0x4a601d.stickers.length * 1.5 + " seconds\nKeep in mind that there is a chance of a ban if used frequently";
    if (_0x4a601d.is_animated) {
      return await _0x19df48.reply("Animated stickers are not supported");
    } else if (_0x54b45a.startsWith("info")) {
      return await _0x19df48.reply(_0x56bec3);
    }
    let _0x26c3a3 = parseInt(_0x54b45a.split(",")[0]) || 10;
    let _0x33784b = parseInt(_0x54b45a.split(",")[1]) || 0;
    let _0x4cca92 = _0x54b45a.split(";")[1] || "Sticker";
    let _0x3a6ece = true;
    if (_0x4cca92.includes("photo")) {
      _0x3a6ece = false;
      _0x4cca92 = "Photo";
    }
    if (_0x26c3a3 > _0x4a601d.stickers.length) {
      _0x26c3a3 = _0x4a601d.stickers.length;
    }
    if (_0x33784b > _0x4a601d.stickers.length) {
      _0x33784b = _0x4a601d.stickers.length - 5;
    }
    if (_0x33784b > _0x26c3a3) {
      let _0xe6592a = _0x26c3a3;
      _0x26c3a3 = _0x33784b;
      _0x33784b = _0xe6592a;
    }
    await _0x19df48.reply(_0x56bec3 + "\n\n_Downloading as " + _0x4cca92 + " From index *" + _0x33784b + "* to *" + _0x26c3a3 + "*._\nIf you wants more to download then use Like \n\n .tgs " + _0x2a4fb1 + " |  10 ,  20 ; photo");
    for (_0x33784b; _0x33784b < _0x26c3a3; _0x33784b++) {
      let _0x4de16f = await fetchJson("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=" + _0x4a601d.stickers[_0x33784b].file_id);
      let _0x3c2608 = "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + _0x4de16f.result.file_path;
      if (_0x3a6ece) {
        let _0x13ee38 = await getBuffer(_0x3c2608);
        await _0x19df48.reply(_0x13ee38, {
          packname: Config.packname,
          author: "Yesser-Md"
        }, "sticker");
      } else {
        await _0x19df48.bot.sendMessage(_0x19df48.chat, {
          image: {
            url: _0x3c2608
          },
          caption: "*_Telegram Sticker At Index " + (_0x33784b + 1) + " Downloaded_*"
        });
      }
    }
  } catch (_0x5a840a) {
    await _0x19df48.error(_0x5a840a + "\n\ncommand: tgs", _0x5a840a, "*_Error Sending telegram stickers!!!_*");
  }
});
smd({
  pattern: "wikimedia",
  desc: "Downloads wikimedia images.",
  category: "downloader",
  filename: __filename,
  use: "<text|search.>"
}, async (_0x47fb55, _0x5614e8) => {
  try {
    if (!_0x5614e8) {
      return await _0x47fb55.send("*_Please Give me search query!_*");
    }
    let {
      wikimedia: _0x168a95
    } = require("../lib");
    let _0x6c377e = (await _0x168a95(_0x5614e8)) || [];
    if (!_0x6c377e || !_0x6c377e[0]) {
      return await _0x47fb55.send("*_No Results Found!_*");
    }
    let _0xc4fe0 = _0x47fb55.iscreator && _0x5614e8.split("|")[1] === "all" ? _0x6c377e.length : _0x6c377e.length > 5 ? 5 : _0x6c377e.length;
    for (let _0xfe1387 = 0; _0xfe1387 < _0xc4fe0; _0xfe1387++) {
      try {
        _0x47fb55.bot.sendFromUrl(_0x47fb55.from, _0x6c377e[_0xfe1387].image, "Title: " + _0x6c377e[_0xfe1387].title + "\n*Source:* " + _0x6c377e[_0xfe1387].source, _0x47fb55, {}, "image");
      } catch {}
    }
  } catch (_0x289d8e) {
    await _0x47fb55.error(_0x289d8e + "\n\ncommand: insta", _0x289d8e);
  }
});
smd({
  pattern: "apk",
  alias: ["modapk"],
  desc: "Downloads apks  .",
  category: "downloader",
  filename: __filename,
  use: "<add sticker url.>"
}, async (_0x7b09ff, _0x4af114) => {
  try {
    if (!_0x4af114) {
      return _0x7b09ff.reply("*_Uhh dear, Give me App Name!_*");
    }
    let _0x468cc8 = await search(_0x4af114);
    let _0x538b40 = {};
    if (_0x468cc8.length) {
      _0x538b40 = await download(_0x468cc8[0].id);
    } else {
      return _0x7b09ff.reply("*_Apk not found, Try another name!!_*");
    }
    const _0x48bc12 = parseInt(_0x538b40.size);
    if (_0x48bc12 > 200) {
      return _0x7b09ff.reply("❌ File size bigger than 200mb.");
    }
    const _0x31321c = _0x538b40.dllink;
    let _0x24f726 = await fancytext("『 *APK DOWNLOADER* 』\n\n*APP Name :* " + _0x538b40.name + "\n*App Id :* " + _0x538b40.package + "\n*Last Up :* " + _0x538b40.lastup + "\n*App Size :* " + _0x538b40.size + "\n\n\n " + Config.caption, 25);
    const _0x3e266b = (_0x538b40?.name || "Downloader") + ".apk";
    const _0x585f79 = "temp/" + _0x3e266b;
    let _0x533c85 = await _0x7b09ff.reply(_0x538b40.icon, {
      caption: _0x24f726
    }, "img", _0x7b09ff);
    axios.get(_0x31321c, {
      responseType: "stream"
    }).then(_0x3cdb1d => {
      const _0x406256 = fs.createWriteStream(_0x585f79);
      _0x3cdb1d.data.pipe(_0x406256);
      return new Promise((_0xd7f976, _0x27915) => {
        _0x406256.on("finish", _0xd7f976);
        _0x406256.on("error", _0x27915);
      });
    }).then(() => {
      let _0x389371 = {
        document: fs.readFileSync(_0x585f79),
        mimetype: "application/vnd.android.package-archive",
        fileName: _0x3e266b
      };
      _0x7b09ff.bot.sendMessage(_0x7b09ff.jid, _0x389371, {
        quoted: _0x533c85
      });
      try {
        fs.unlink(_0x585f79);
      } catch {}
    }).catch(_0x2490b5 => {
      try {
        fs.unlink(_0x585f79);
      } catch {}
      ;
      _0x7b09ff.reply("*_Apk not Found, Sorry_*");
    });
  } catch (_0x4540ef) {
    await _0x7b09ff.error(_0x4540ef + "\n\ncommand: apk", _0x4540ef, "*_Apk not Found!_*");
  }
});
cmd({
  pattern: "apks",
  alias: ["apksearch"],
  desc: "Search App",
  category: "downloader",
  filename: __filename,
  use: "<Search Query>"
}, async (_0x19d516, _0x1cb962) => {
  try {
    if (!_0x1cb962) {
      return await _0x19d516.reply("*_Uhh pLease, give me app name!_*");
    }
    const _0x4ac8f2 = await search(_0x1cb962);
    if (_0x4ac8f2.length) {
      let _0x3d85b = await download(_0x4ac8f2[0].id);
      let _0x307e6f = "*YESSER MD• ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪsᴛ* \n*________________________________* \n\n*_Reply Any Number To Download._*\n_Results For : " + _0x1cb962 + "_ \n";
      for (let _0x5a5920 = 0; _0x5a5920 < _0x4ac8f2.length; _0x5a5920++) {
        _0x307e6f += "\n*" + (_0x5a5920 + 1) + " : " + _0x4ac8f2[_0x5a5920].name + "* \n*Id : " + _0x4ac8f2[_0x5a5920].id + "* \n";
      }
      return await _0x19d516.sendMessage(_0x19d516.chat, {
        image: {
          url: _0x3d85b.icon
        },
        caption: _0x307e6f
      }, {
        quoted: _0x19d516
      });
    } else {
      return _0x19d516.reply("*_APP not Found, Try Other Name_*");
    }
  } catch (_0xa7fd60) {
    _0x19d516.error(_0xa7fd60 + "\n\ncommand: apks", _0xa7fd60);
  }
});
smd({
  pattern: "soundcloud",
  alias: ["scdl", "scdownload"],
  desc: "Download audio from SoundCloud.",
  category: "downloader",
  filename: __filename,
  use: "<SoundCloud audio URL>"
}, async (msg, query) => {
  try {
    const url = query.trim();
    if (!url) {
      return await msg.reply("*Please provide a SoundCloud audio URL.*");
    }

    const apiUrl = `https://astro-api-crqy.onrender.com/}`;
    const response = await fetch(apiUrl).then(res => res.json());

    if (!response || response.status !== 200) {
      return await msg.reply("*An error occurred while downloading the SoundCloud audio.*");
    }

    const result = response.result;
    const audioUrl = result.link;
    const thumbnailUrl = result.thumb;
    const title = result.title;
    const downloadCount = result.download_count;

    await msg.bot.sendAudio(msg.chat, audioUrl, title, downloadCount, thumbnailUrl, { quoted: msg });
  } catch (err) {
    await msg.error(err + "\n\ncommand: soundcloud", err, "*An error occurred while downloading the SoundCloud audio.*");
  }
});
smd({
  pattern: "gitclone",
  desc: "Downloads apks  .",
  category: "downloader",
  filename: __filename,
  use: "<add sticker url.>"
}, async (_0x1ae8f8, _0x1c586e) => {
  try {
    let _0x59e849 = _0x1c586e ? _0x1c586e : _0x1ae8f8.reply_message ? _0x1ae8f8.reply_message.text : "";
    if (!_0x1c586e) {
      return await _0x1ae8f8.reply("*Provide Repo Url, _.gitclone https://github.com/Xiangzaoh/Zax-Md_*");
    }
    const _0x5906ab = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
    if (!_0x5906ab.test(_0x1c586e)) {
      return await _0x1ae8f8.reply("*Provide Valid Repositry Url*");
    }
    let [_0x3b1b37, _0x2f1dcc, _0x83a6d7] = _0x1c586e.match(_0x5906ab) || [];
    _0x83a6d7 = _0x83a6d7.replace(/.git$/, "");
    let _0x3e5a6d = "https://api.github.com/repos/" + _0x2f1dcc + "/" + _0x83a6d7 + "/zipball";
    let _0x2cb6ba = (await fetch(_0x3e5a6d, {
      method: "HEAD"
    })).headers.get("content-disposition").match(/attachment; filename=(.*)/)[1];
    await _0x1ae8f8.bot.sendMessage(_0x1ae8f8.jid, {
      document: {
        url: _0x3e5a6d
      },
      fileName: _0x2cb6ba,
      mimetype: "application/zip"
    });
  } catch (_0x982fee) {
    return _0x1ae8f8.error(_0x982fee + "\n\ncommand: gitclone", _0x982fee, "*_File not found!!!_*");
  }
});
const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
smd({
  pattern: "tiktokimg",
  alias: ["tiktokpic", "tiktokphoto"],
  desc: "Download TikTok image.",
  category: "downloader",
  filename: __filename,
  use: "<TikTok video URL>"
}, async (msg, query) => {
  try {
    const url = query.trim();
    if (!url) {
      return await msg.reply("*Please provide a TikTok video URL.*");
    }

    const apiUrl = `https://astro-api-crqy.onrender.com/}`;
    const response = await fetch(apiUrl).then(res => res.json());

    if (!response || response.status !== 200) {
      return await msg.reply("*An error occurred while downloading the TikTok image.*");
    }

    const imageUrl = response.result[0];
    await msg.bot.sendImage(msg.chat, imageUrl, null, { quoted: msg });
  } catch (err) {
    await msg.error(err + "\n\ncommand: tiktokimg", err, "*An error occurred while downloading the TikTok image.*");
  }
});
smd({
  pattern: "tts",
  desc: "text to speech.",
  category: "downloader",
  filename: __filename,
  use: "<Hii,this is Suhail>"
}, async (_0x55aba2, _0x56da6b) => {
  try {
    let _0x204f81 = _0x55aba2.reply_text ? _0x55aba2.reply_text : _0x56da6b;
    if (!_0x204f81) {
      return _0x55aba2.reply("*_Example : .tts Hi,I am Suhail-Md whatsapp bot._*");
    }
    try {
      let _0x1974d5 = _0x56da6b ? _0x56da6b.split(" ")[0].toLowerCase() : "en";
      const _0x18d003 = googleTTS.getAudioUrl(_0x204f81, {
        lang: _0x1974d5,
        slow: true,
        host: "https://translate.google.com"
      });
      await _0x55aba2.bot.sendMessage(_0x55aba2.jid, {
        audio: {
          url: _0x18d003
        },
        mimetype: "audio/mpeg",
        ptt: true,
        fileName: "Suhail-Md-tts.m4a"
      }, {
        quoted: _0x55aba2
      });
    } catch (_0x3537cb) {
      const _0x5596bc = googleTTS.getAudioUrl(_0x204f81, {
        lang: "en",
        slow: true,
        host: "https://translate.google.com"
      });
      await _0x55aba2.bot.sendMessage(_0x55aba2.jid, {
        audio: {
          url: _0x5596bc
        },
        mimetype: "audio/mpeg",
        ptt: true,
        fileName: "Suhail-Md-tts.m4a"
      }, {
        quoted: _0x55aba2
      });
    }
  } catch (_0x1313db) {
    return _0x55aba2.error(_0x1313db + "\n\ncommand: tts", _0x1313db, false);
  }
});
smd({
  pattern: "downmp4",
  alias: ["mp4down", "mp4fromurl"],
  desc: "download mp4 from url.",
  category: "downloader",
  use: "<url>",
  filename: __filename
}, async (_0x272f8d, _0x3c482f) => {
  try {
    let _0x53783b = ("" + (_0x3c482f ? _0x3c482f : _0x272f8d.reply_text)).split(" ")[0].toLowerCase().trim();
    if (!_0x53783b || !_0x53783b.toLowerCase().startsWith("http")) {
      return _0x272f8d.reply("*_Give me Video Link, " + prefix + "downmp4 https://telegra.ph/file/d90855d13352c8aae3981.mp4_*");
    }
    var _0x1e4a34 = _0x3c482f.toLowerCase().includes("doc") ? "document" : "video";
    await _0x272f8d.bot.sendMessage(_0x272f8d.chat, {
      [_0x1e4a34]: {
        url: _0x53783b
      },
      caption: "*HERE WE GO🤠*",
      contextInfo: {
        ...(await _0x272f8d.bot.contextInfo(Config.botname, _0x272f8d.senderName))
      }
    }, {
      quoted: _0x272f8d
    });
  } catch (_0x2306b6) {
    await _0x272f8d.error(_0x2306b6 + "\n\ncommand : downmp4", _0x2306b6, "*_Please, Give me valid video url!_*");
  }
});
smd({
  pattern: "video",
  desc: "Downloads video from yt.",
  category: "downloader",
  filename: __filename,
  use: "<faded-Alan Walker>"
}, async (_0xe5ea97, _0x36bc71) => {
  let _0x54713e = _0x36bc71 ? _0x36bc71 : _0xe5ea97.reply_text;
  var _0x5b10f0 = _0x36bc71.toLowerCase().includes("doc") ? "document" : "video";
  if (!_0x54713e) {
    return _0xe5ea97.reply("*Use : " + prefix + "video Al Quran!*");
  }
  let _0x421809 = ytIdRegex.exec(_0x36bc71) || [];
  let _0x35c755 = _0x421809[0] || false;
  try {
    if (!_0x35c755) {
      let _0x588f03 = await yts(_0x54713e);
      let _0x525771 = _0x588f03.videos[0];
      _0x35c755 = _0x525771.url;
      _0x421809 = ytIdRegex.exec(_0x35c755);
    }
  } catch {}
  try {
    let _0x1df0ed = await ytdl.getInfo(_0x35c755);
    let _0x5c8a7c = Math.floor(i.timestamp * 60);
    if (_0x5c8a7c >= videotime) {
      _0x5b10f0 = "document";
    }
    let _0x56042a = _0x1df0ed.videoDetails.title;
    let _0x5d70e6 = "./temp/" + _0x421809[1] + ".mp4";
    const _0x4195ce = ytdl(_0x35c755, {
      filter: _0x4f303f => _0x4f303f.itag == 22 || _0x4f303f.itag == 18
    }).pipe(fs.createWriteStream(_0x5d70e6));
    await new Promise((_0x3fc982, _0x3a9fa6) => {
      _0x4195ce.on("error", _0x3a9fa6);
      _0x4195ce.on("finish", _0x3fc982);
    });
    var _0x3048ab = {
      ...(await _0xe5ea97.bot.contextInfo(Config.botname, "ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
    };
    let _0x3d0cf7 = {
      [_0x5b10f0]: fs.readFileSync(_0x5d70e6),
      mimetype: "video/mp4",
      fileName: _0x56042a,
      caption: Config.caption,
      contextInfo: _0x3048ab
    };
    await _0xe5ea97.bot.sendMessage(_0xe5ea97.jid, _0x3d0cf7, {
      quoted: _0xe5ea97
    });
    try {
      fs.unlinkSync(_0x5d70e6);
    } catch {}
    ;
  } catch (_0x6c0641) {
    console.log("ytdl Download video error:", _0x6c0641);
    try {
      let _0x4e4465 = await yt.getInfo(_0x421809[1]);
      if (_0x4e4465.duration >= videotime) {
        _0x5b10f0 = "document";
      }
      let _0x3d6d42 = {
        type: "video",
        quality: _0x4e4465.pref_Quality || "best",
        format: "mp4"
      };
      let _0x3e3caf = await yt.download(_0x421809[1], _0x3d6d42);
      var _0x3048ab = {
        ...(await _0xe5ea97.bot.contextInfo(Config.botname, "ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
      };
      let _0x3448d2 = _0x4e4465.title || _0x3e3caf || _0x421809[1] || "Suhail MD -- YT Video";
      if (_0x3e3caf) {
        await _0xe5ea97.bot.sendMessage(_0xe5ea97.chat, {
          [_0x5b10f0]: {
            url: _0x3e3caf
          },
          fileName: _0x3448d2,
          caption: Config.caption,
          mimetype: "video/mp4",
          contextInfo: _0x3048ab
        });
      } else {
        await _0xe5ea97.send("Video not Found");
      }
      try {
        fs.unlinkSync("" + _0x3e3caf);
      } catch {}
    } catch (_0x55db8f) {
      return _0xe5ea97.error(_0x55db8f + "\n\ncommand: video", _0x55db8f, "*_Video not Found_*");
    }
  }
});
smd({
  pattern: "video2",
  desc: "Downloads video from yt.",
  category: "downloader",
  filename: __filename,
  use: "<faded-Alan Walker>"
}, async (_0xf4a47, _0x5af7a0) => {
  let _0x51cced = _0x5af7a0 ? _0x5af7a0 : _0xf4a47.reply_text;
  if (!_0x51cced) {
    return _0xf4a47.reply("Example : " + prefix + "video2 surah rehman");
  }
  var _0x5cbfdb = _0x51cced.toLowerCase().includes("doc") ? "document" : "video";
  let _0x45b86d = ytIdRegex.exec(_0x5af7a0) || [];
  let _0x1b8dbb = _0x45b86d[0] || false;
  try {
    if (!_0x1b8dbb) {
      let _0x39917e = await yts(_0x51cced);
      let _0x4edc53 = _0x39917e.videos[0];
      _0x1b8dbb = _0x4edc53.url;
      _0x45b86d = ytIdRegex.exec(_0x1b8dbb);
    }
  } catch {}
  try {
    let _0x158918 = await yt.getInfo(_0x45b86d[1]);
    let _0x355f66 = {
      type: "video",
      quality: _0x158918.pref_Quality || "best",
      format: "mp4"
    };
    if (_0x158918.duration >= videotime) {
      _0x5cbfdb = "document";
    }
    let _0x2b6ac2 = await yt.download(_0x45b86d[1], _0x355f66);
    let _0x10f021 = _0x158918.title || _0x2b6ac2 || _0x45b86d[1];
    var _0x1e7392 = {
      ...(await _0xf4a47.bot.contextInfo(Config.botname, "ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
    };
    if (_0x2b6ac2) {
      await _0xf4a47.bot.sendMessage(_0xf4a47.chat, {
        [_0x5cbfdb]: {
          url: _0x2b6ac2
        },
        fileName: _0x10f021,
        caption: Config.caption,
        mimetype: "video/mp4",
        contextInfo: _0x1e7392
      });
    } else {
      await _0xf4a47.send("Video not Found");
    }
    try {
      fs.unlinkSync("" + _0x2b6ac2);
    } catch {}
  } catch (_0x1257db) {
    return _0xf4a47.error(_0x1257db + "\n\ncommand: video", _0x1257db, "*_Video not Found_*");
  }
});
smd({
  pattern: "play",
  alias: ["music"],
  desc: "Sends info about the query(of youtube video/audio).",
  category: "downloader",
  filename: __filename,
  use: "<faded-Alan walker.>"
}, async (_0x54463e, _0x1f76d0) => {
  try {
    let _0x25d045 = _0x1f76d0 ? _0x1f76d0 : _0x54463e.reply_text;
    var _0x2e913a = _0x25d045.toLowerCase().includes("doc") ? "document" : "audio";
    if (!_0x25d045) {
      return _0x54463e.reply("*" + prefix + "play back in black*");
    }
    let _0x2eca3d = ytIdRegex.exec(_0x25d045) || [];
    let _0xb6fd2d = _0x2eca3d[0] || false;
    if (!_0xb6fd2d) {
      let _0x4bcf6d = await yts(_0x25d045);
      let _0xa244ed = _0x4bcf6d.videos[0];
      _0xb6fd2d = _0xa244ed.url;
    }
    _0x2eca3d = ytIdRegex.exec(_0xb6fd2d) || [];
    let _0x6845ab = await yt.getInfo(_0x2eca3d[1]);
    let _0x516e89 = _0x6845ab.title || _0x37323e || _0x2eca3d[1];
    if (_0x6845ab && _0x6845ab.duration >= videotime) {
      return await _0x54463e.reply("*_Can't dowanload, file duration too big_*");
    }
    await _0x54463e.send("_Downloading " + _0x6845ab.title + "?_");
    let _0x37323e = await yt.download(_0x2eca3d[1], {
      type: "audio",
      quality: "best"
    });
    var _0x28302f = {
      ...(await _0x54463e.bot.contextInfo(Config.botname, "ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
    };
    if (_0x37323e) {
      await _0x54463e.bot.sendMessage(_0x54463e.jid, {
        [_0x2e913a]: {
          url: _0x37323e
        },
        fileName: _0x516e89,
        mimetype: "audio/mpeg",
        contextInfo: _0x28302f
      });
    } else {
      _0x54463e.send("*_Video not Found_*");
    }
    try {
      fs.unlinkSync(_0x37323e);
    } catch {}
  } catch (_0x593953) {
    return _0x54463e.error(_0x593953 + "\n\ncommand: play", _0x593953, "*_Video not Found_*");
  }
});
smd({
  pattern: "sound",
  desc: "Downloads ringtone.",
  category: "downloader",
  filename: __filename,
  use: "<Dowanload Tiktok Sounds>"
}, async (_0x2ee3dd, _0x20a520) => {
  try {
    if (!_0x20a520) {
      return _0x2ee3dd.reply("*Give A Number Example: " + prefix + "sound 5*");
    }
    const _0x19c223 = parseInt(_0x20a520);
    if (_0x19c223.toString() == "NaN" || _0x19c223 < 1 || _0x19c223 > 160) {
      return _0x2ee3dd.reply("*_❌ Give a number between 1 to 160_*");
    }
    let _0xf0331a = "https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/sound" + _0x19c223.toString() + ".mp3";
    let _0x2ba501 = await getBuffer(_0xf0331a);
    var _0x29fdd9 = {
      ...(await _0x2ee3dd.bot.contextInfo(Config.botname, "ᴛɪᴋᴛᴏᴋ ꜱᴏᴜɴᴅ " + _0x19c223))
    };
    let _0x4737bb = {
      audio: _0x2ba501,
      fileName: "Suhail-Md tiktok Sound" + _0x19c223 + ".m4a",
      mimetype: "audio/mpeg",
      ptt: true,
      contextInfo: _0x29fdd9
    };
    return _0x2ee3dd.bot.sendMessage(_0x2ee3dd.chat, _0x4737bb, {
      quoted: _0x2ee3dd
    });
  } catch (_0x223ebb) {
    return _0x2ee3dd.error(_0x223ebb + "\n\ncommand: sound", _0x223ebb, false);
  }
});
smd({
  pattern: "tiktok",
  alias: ["tt", "ttdl"],
  desc: "Downloads Tiktok Videos Via Url.",
  category: "downloader",
  filename: __filename,
  use: "<add tiktok url.>"
}, async (message, url) => {
  try {
    const fileType = url.toLowerCase().includes("doc") ? "document" : url.toLowerCase().includes("mp3") ? "audio" : "video";

    if (!url) {
      return await message.reply(`*Uhh Please, Provide me tiktok Video Url*\n*_Ex ${prefix}tiktok https://www.tiktok.com/@dakwahmuezza/video/7150544062221749531_*`);
    }

    const tiktokUrl = url ? url.split(" ")[0] : "";

    if (!/tiktok/.test(tiktokUrl)) {
      return await message.reply("*Uhh Please, Give me Valid Tiktok Video Url!*");
    }

    const apiUrl = "https://astro-api-crqy.onrender.com/";
    const response = await fetch(`${apiUrl}?url=${tiktokUrl}`);
    const data = await response.json();

    if (data && data.video && data.video.noWatermark) {
      return await message.send(data.video.noWatermark, { caption: Config.caption }, fileType, message);
    } else {
      return await message.reply("Error While Downloading Your Video");
    }
  } catch (error) {
    return message.error(`${error}\n\ncommand: tiktok`, error);
  }
});
smd({
  pattern: "ringtone",
  desc: "Downloads ringtone.",
  category: "downloader",
  filename: __filename,
  use: "<ringtone name>"
}, async (_0x1da3da, _0x2f0451) => {
  try {
    if (!_0x2f0451) {
      return _0x1da3da.reply("Example: " + prefix + "ringtone back in black");
    }
    const {
      ringtone: _0x2ec04e
    } = require("../lib/scraper");
    let _0x5f35d4 = await _0x2ec04e(_0x2f0451);
    var _0x2e165b = {
      ...(await _0x1da3da.bot.contextInfo(Config.botname, "ʀɪɴɢᴛᴏɴᴇ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
    };
    let _0x5c9751 = {
      audio: {
        url: _0x5f35d4[0].audio
      },
      caption: "*" + _0x5f35d4[0].title + "*",
      fileName: _0x5f35d4[0].title + ".mp3",
      mimetype: "audio/mpeg",
      contextInfo: _0x2e165b
    };
    return _0x1da3da.bot.sendMessage(_0x1da3da.jid, _0x5c9751, {
      quoted: _0x1da3da
    });
  } catch (_0x430a86) {
    return _0x1da3da.error(_0x430a86 + "\n\ncommand: ringtone", _0x430a86, "*_Ringtone not found with given name!!_*");
  }
});
smd({
  pattern: "pint",
  alias: ["pinterest"],
  desc: "Downloads image from pinterest.",
  category: "downloader",
  filename: __filename,
  use: "<text|image name>"
}, async (_0xf8b0b, _0x589f9c) => {
  try {
    if (!_0x589f9c) {
      return _0xf8b0b.reply("What picture are you looking for?");
    }
    let _0x383852 = (await pinterest(_0x589f9c)) || [];
    if (!_0x383852 || !_0x383852[0]) {
      return await _0xf8b0b.send("*_No Result found!_*");
    }
    var _0x132d25 = {
      ...(await _0xf8b0b.bot.contextInfo(Config.botname, "ᴘɪɴᴛᴇʀᴇꜱᴛ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ"))
    };
    let _0x21ce53 = _0x383852.length < 5 ? _0x383852.length : 5;
    for (let _0x1af9e9 = 0; _0x1af9e9 < _0x21ce53; _0x1af9e9++) {
      await _0xf8b0b.bot.sendMessage(_0xf8b0b.chat, {
        image: {
          url: _0x383852[_0x1af9e9]
        },
        contextInfo: _0x132d25
      });
    }
  } catch (_0x5c4711) {
    return _0xf8b0b.reply("Uhh Plese, Give me a Name. Ex .pint apple");
  }
});
smd({
  pattern: "mediafire",
  alias: ["mf", "mfire"],
  desc: "Downloads media from Mediafire.",
  category: "downloader",
  filename: __filename,
  use: "<url of mediafire>"
}, async (_0x1ccf8b, _0x33d036) => {
  try {
    let _0x4ae56d = _0x33d036.includes("mediafire.com") ? _0x33d036 : _0x1ccf8b.reply_text || "";
    if (!_0x4ae56d.includes("mediafire.com")) {
      return _0x1ccf8b.reply("*_Provide mediafire url, Use: " + prefix + "mf https://www.mediafire.com/file/i33wo2xvgvid05m/muezzaverse_2221749531_musicaldown.com.mp4/file!_*");
    }
    let _0x4190c2 = _0x4ae56d.split(" ")[0];
    const _0x15a389 = await mediafire(_0x4190c2);
    if (!_0x15a389 || !_0x15a389[0]) {
      return _0x1ccf8b.reply("could not found anything");
    }
    let _0x504ec3 = "『 *Mᴇᴅɪᴀғɪʀᴇ Dᴏᴡɴʟᴏᴀᴅᴇʀ* 』\n\n *Name* : " + _0x15a389[0].nama + "\n *Size* :" + _0x15a389[0].size + "\n *Mime* : " + _0x15a389[0].mime + "\n \n\n" + Config.caption;
    _0x504ec3 = await fancytext(_0x504ec3, 25);
    var _0x227c35 = {
      ...(await _0x1ccf8b.bot.contextInfo(Config.botname, "MEDIAFIRE"))
    };
    let _0x33773c = {
      document: {
        url: _0x15a389[0].link
      },
      caption: _0x504ec3,
      fileName: _0x15a389[0].nama,
      mimetype: _0x15a389[0].mime,
      contextInfo: _0x227c35
    };
    return await _0x1ccf8b.bot.sendMessage(_0x1ccf8b.chat, _0x33773c);
  } catch (_0x50b778) {
    return _0x1ccf8b.error(_0x50b778 + "\n\ncommand: mediafire", _0x50b778, "*_File not found!!_*");
  }
});
smd({
  pattern: "song",
  alias: ["audio"],
  desc: "Downloads audio from youtube.",
  category: "downloader",
  filename: __filename,
  use: "<give text>"
}, async (_0x2c2023, _0x4ec99f) => {
  try {
    if (!_0x4ec99f) {
      return await _0x2c2023.reply("*_Give Me Search Query_*");
    }
    let _0x3b2ca6 = await yts(_0x4ec99f);
    let _0x4123ae = _0x3b2ca6.all[0];
    let _0x5883a9 = "\t *zax-ᴍᴅ • sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*   \n\n*Title :* " + _0x4123ae.title + "\nUrl : " + _0x4123ae.url + "\n*Description :* " + _0x4123ae.timestamp + "\n*Views :* " + _0x4123ae.views + "\n*Uploaded :* " + _0x4123ae.ago + "\n*Author :* " + _0x4123ae.author.name + "\n\n\n_Reply 1 To Video_ Or _1 document_\n_Reply 2 To Audio_ Or _2 document_";
    let _0x3885cc = await smdBuffer(_0x4123ae.thumbnail);
    var _0x44a363 = {
      ...(await _0x2c2023.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ꜱᴏɴɢ", _0x3885cc))
    };
    await _0x2c2023.bot.sendMessage(_0x2c2023.jid, {
      image: _0x3885cc,
      caption: _0x5883a9,
      contextInfo: _0x44a363
    });
  } catch (_0x86b411) {
    return _0x2c2023.error(_0x86b411 + "\n\ncommand: mediafire", _0x86b411, "*_File not found!!_*");
  }
});
cmd({
  pattern: "yts",
  alias: ["yt", "ytsearch"],
  desc: "Search Song From youtube",
  category: "downloader",
  filename: __filename,
  use: "<Yt Search Query>"
}, async (_0x1c8285, _0xca939c) => {
  try {
    if (!_0xca939c) {
      return await _0x1c8285.reply("*_Give Me Search Query!_*");
    }
    let _0x2878ec = await yts(_0xca939c);
    let _0x4186e4 = "*zax-ᴍᴅ • ʏᴏᴜᴛᴜʙᴇ ᴅᴏᴡɴʟᴏᴀᴅ* \n*_______________________________* \n\n_Reply Any Number To Download._\n  _For Audio: 1 mp3._\n  _For Video: 1 video._\n  _For document: 1 document._\n\n_Results For : " + _0xca939c + "_ \n\n";
    let _0x463366 = 1;
    for (let _0x308e22 of _0x2878ec.all) {
      _0x4186e4 += " \n*" + _0x463366++ + " : " + _0x308e22.title + (_0x308e22.timestamp ? "(" + _0x308e22.timestamp + ")" : "") + "*\n*Url : " + _0x308e22.url + "*";
    }
    return await _0x1c8285.sendMessage(_0x1c8285.chat, {
      image: {
        url: _0x2878ec.all[0].thumbnail
      },
      caption: _0x4186e4
    }, {
      quoted: _0x1c8285
    });
  } catch (_0x5089b0) {}
});
smd({
  pattern: "ytmp4",
  alias: ["ytv", "ytvid", "ytvideo"],
  desc: "Downloads video from youtube.",
  category: "downloader",
  filename: __filename,
  use: "<yt video url>"
}, async (_0x1d4717, _0x3716fd) => {
  let _0x2d4f04 = _0x3716fd ? _0x3716fd : _0x1d4717.reply_text;
  var _0x58ceb6 = _0x2d4f04.toLowerCase().includes("doc") ? "document" : _0x2d4f04.toLowerCase().includes("mp3") ? "audio" : "video";
  const _0x4a3f32 = ytIdRegex.exec(_0x2d4f04) || [];
  if (!_0x2d4f04 || !_0x4a3f32[0]) {
    return await _0x1d4717.reply("*_provide youtube video url!_*");
  }
  try {
    let _0x5c93a9 = await ytdl.getInfo(_0x4a3f32[0]);
    if (_0x5c93a9.videoDetails.lengthSeconds >= videotime) {
      _0x58ceb6 = "document";
    }
    let _0x1a3a4c = _0x5c93a9.videoDetails.title;
    let _0x1c86b6 = "./temp/" + _0x4a3f32[1] + ".mp4";
    const _0x1f15ef = ytdl(_0x4a3f32[0], {
      filter: _0x4c0ea7 => _0x4c0ea7.itag == 22 || _0x4c0ea7.itag == 18
    }).pipe(fs.createWriteStream(_0x1c86b6));
    await new Promise((_0x517788, _0x429bfa) => {
      _0x1f15ef.on("error", _0x429bfa);
      _0x1f15ef.on("finish", _0x517788);
    });
    var _0x3b1bff = {
      ...(await _0x1d4717.bot.contextInfo(Config.botname, "ʏᴛᴅʟ ᴠɪᴅᴇᴏ"))
    };
    let _0x4d676e = {
      [_0x58ceb6]: fs.readFileSync(_0x1c86b6),
      mimetype: "video/mp4",
      fileName: _0x1a3a4c,
      caption: "  *Here's Your Video*\n" + Config.caption,
      contextInfo: _0x3b1bff
    };
    await _0x1d4717.bot.sendMessage(_0x1d4717.jid, _0x4d676e, {
      quoted: _0x1d4717
    });
    try {
      return await fs.unlinkSync(_0x1c86b6);
    } catch {}
  } catch (_0x15d510) {
    console.log("here now,ytdl-core error: ", _0x15d510);
    try {
      let _0x5a46ec = await yt.getInfo(_0x4a3f32[1]);
      let _0x257939 = {
        type: "video",
        quality: _0x5a46ec.pref_Quality || "best",
        format: "mp4"
      };
      if (_0x5a46ec.duration >= videotime) {
        _0x58ceb6 = "document";
      }
      let _0x588c42 = await yt.download(_0x4a3f32[1], _0x257939);
      var _0x3b1bff = {
        ...(await _0x1d4717.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ"))
      };
      let _0x13be6f = _0x5a46ec.title || _0x588c42 || _0x4a3f32[1];
      if (_0x588c42) {
        await _0x1d4717.bot.sendMessage(_0x1d4717.chat, {
          [_0x58ceb6]: {
            url: _0x588c42
          },
          fileName: _0x13be6f,
          mimetype: "video/mp4",
          contextInfo: _0x3b1bff
        });
      } else {
        await _0x1d4717.send("*_Video not Found_*");
      }
      try {
        fs.unlinkSync("" + _0x588c42);
      } catch {}
      return;
    } catch (_0x363775) {
      return _0x1d4717.error(_0x363775 + "\n\ncommand: ytmp4", _0x363775, "*_Uhh dear, Video not Found!!_*");
    }
  }
});
smd({
  pattern: "ytmp3",
  alias: ["yta"],
  desc: "Downloads audio by yt link.",
  category: "downloader",
  use: "<yt video url>"
}, async (_0x3f8930, _0x5834bb) => {
  let _0x4fe91c = _0x5834bb ? _0x5834bb : _0x3f8930.reply_text;
  var _0x540f68 = _0x4fe91c.toLowerCase().includes("doc") ? "document" : "audio";
  const _0x2758ec = ytIdRegex.exec(_0x4fe91c) || [];
  if (!_0x4fe91c || !_0x2758ec[0]) {
    return await _0x3f8930.reply("*_Uhh please, Provide youtube video url!_*");
  }
  try {
    let _0x4b5067 = await ytdl.getInfo(_0x2758ec[0]);
    if (_0x4b5067.videoDetails.lengthSeconds >= videotime) {
      _0x540f68 = "document";
    }
    let _0xaca4bd = _0x4b5067.videoDetails.title;
    let _0x24816a = "./temp/" + _0x2758ec[1] + ".mp3";
    const _0x2591f0 = ytdl(_0x2758ec[0], {
      filter: _0x4e89f2 => _0x4e89f2.audioBitrate == 160 || _0x4e89f2.audioBitrate == 128
    }).pipe(fs.createWriteStream(_0x24816a));
    await new Promise((_0x401b5b, _0x3d90fd) => {
      _0x2591f0.on("error", _0x3d90fd);
      _0x2591f0.on("finish", _0x401b5b);
    });
    var _0x29af08 = {
      ...(await _0x3f8930.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ"))
    };
    let _0x4c646c = {
      [_0x540f68]: fs.readFileSync(_0x24816a),
      mimetype: "audio/mpeg",
      fileName: _0xaca4bd,
      contextInfo: _0x29af08
    };
    await _0x3f8930.bot.sendMessage(_0x3f8930.jid, _0x4c646c, {
      quoted: _0x3f8930
    });
    try {
      return await fs.unlinkSync(_0x24816a);
    } catch {}
  } catch (_0x345ce7) {
    console.log("here now,ytdl-core : ", _0x345ce7);
    try {
      let _0x5b9011 = await yt.download(_0x2758ec[1], {
        type: "audio",
        quality: "best"
      });
      var _0x29af08 = {
        ...(await _0x3f8930.bot.contextInfo(Config.botname, "ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ"))
      };
      if (_0x5b9011) {
        await _0x3f8930.bot.sendMessage(_0x3f8930.jid, {
          [_0x540f68]: {
            url: _0x5b9011
          },
          mimetype: "audio/mpeg",
          fileName: Config.caption,
          contextInfo: _0x29af08
        });
      } else {
        await _0x3f8930.send("*_audio not Found!_*");
      }
      try {
        fs.unlinkSync(_0x5b9011);
      } catch {}
    } catch (_0x2cd979) {
      await _0x3f8930.error(_0x2cd979 + "\n\ncommand: ytmp3", _0x2cd979, "*_Uhh dear, audio file not Found!!_*");
    }
  }
});
smd({
  pattern: "ytdoc",
  alias: ["ytd"],
  desc: "Downloads audio by yt link as document.",
  category: "downloader",
  use: "<ytdoc video url>"
}, async (_0x17c662, _0x429696) => {
  try {
    let _0x5696a7 = _0x429696 ? _0x429696 : _0x17c662.reply_text;
    const _0x1d542b = ytIdRegex.exec(_0x5696a7) || [];
    if (!_0x5696a7 || !_0x1d542b[0]) {
      return await _0x17c662.reply("❌Please provide me a url");
    }
    var _0x43c5ac = _0x1d542b[1];
    var _0x59bbaa = false;
    try {
      let _0x32b31a = await ytdl.getInfo(_0x1d542b[0]);
      _0x43c5ac = _0x32b31a.videoDetails.title;
      let _0x4b47c3 = "./temp/Suhail-Md " + _0x1d542b[1] + ".mp3";
      const _0x212389 = ytdl(_0x1d542b[0], {
        filter: _0xd2371a => _0xd2371a.audioBitrate == 160 || _0xd2371a.audioBitrate == 128
      }).pipe(fs.createWriteStream(_0x4b47c3));
      _0x59bbaa = _0x4b47c3;
      await new Promise((_0x1506ab, _0x26e243) => {
        _0x212389.on("error", _0x26e243);
        _0x212389.on("finish", _0x1506ab);
      });
    } catch (_0x18c033) {
      console.log("here now,ytdl-core : ", _0x18c033);
      try {
        _0x59bbaa = await yt.download(_0x1d542b[1], {
          type: "audio",
          quality: "best"
        });
      } catch (_0x4122cc) {
        return await _0x17c662.error(_0x4122cc + "\n\ncommand: ytdoc", _0x4122cc, "*_file not Found!!_*");
      }
    }
    if (!_0x59bbaa) {
      return await _0x17c662.send("*_Uhh dear, video not found_*");
    }
    var _0x10e2fa = {
      ...(await _0x17c662.bot.contextInfo(Config.botname, "ʏᴛᴅᴏᴄ ᴍᴘ3 ʏᴏᴜᴛᴜʙᴇ"))
    };
    let _0x300d1a = {
      document: {
        url: _0x59bbaa
      },
      mimetype: "audio/mpeg",
      fileName: "Suhail-Md--" + _0x1d542b[1] + ".mp3",
      caption: Config.caption,
      contextInfo: _0x10e2fa
    };
    await _0x17c662.bot.sendMessage(_0x17c662.jid, _0x300d1a, {
      quoted: _0x17c662
    });
    try {
      return await fs.unlinkSync(_0x59bbaa);
    } catch {}
  } catch (_0xbed50) {
    await _0x17c662.error(_0xbed50 + "\n\ncommand: ytdoc", _0xbed50, "*_audio file not Found!!_*");
  }
});
cmd({
  on: "text"
}, async (_0xb75e78, _0x221e78, {
  isCreator: _0xfbeec5
}) => {
  if (_0xb75e78.quoted && _0xb75e78.text) {
    const _0x5b8ee5 = _0xb75e78.quoted.text.split("\n");
    if (_0x5b8ee5[0].includes("zax-ᴍᴅ • sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ")) {
      const _0x1724ba = _0x5b8ee5.find(_0x525632 => _0x525632.startsWith("Url :"));
      let _0x43a95e = _0x1724ba.replace("Url :", "").trim();
      try {
        await _0xb75e78.sendMessage(_0xb75e78.chat, {
          react: {
            text: "✨",
            key: _0xb75e78.key
          }
        });
        let _0x4cd3b2;
        if (_0xb75e78.text.startsWith("1")) {
          let _0x3edf2a = _0x221e78.toLowerCase().includes("doc") ? "document" : _0x221e78.toLowerCase().includes("mp3") ? "audio" : "video";
          _0x4cd3b2 = "./temp/ytsong.mp4";
          const _0x5e7871 = ytdl(_0x43a95e, {
            filter: _0x145c7e => _0x145c7e.itag == 22 || _0x145c7e.itag == 18
          }).pipe(fs.createWriteStream(_0x4cd3b2));
          await new Promise((_0x540130, _0xf6b8ae) => {
            _0x5e7871.on("error", _0xf6b8ae);
            _0x5e7871.on("finish", _0x540130);
          });
          await _0xb75e78.sendMessage(_0xb75e78.chat, {
            [_0x3edf2a]: fs.readFileSync(_0x4cd3b2),
            mimetype: _0x3edf2a == "audio" ? "audio/mpeg" : "video/mp4",
            fileName: Config.caption,
            caption: Config.caption
          }, {
            quoted: _0xb75e78
          });
        } else if (_0xb75e78.text.startsWith("2")) {
          let _0x5d9956 = _0x221e78.toLowerCase().includes("doc") ? "document" : "audio";
          _0x4cd3b2 = "./temp/ytsong.mp3";
          const _0x39ddb9 = ytdl(_0x43a95e, {
            filter: _0xa5f832 => _0xa5f832.audioBitrate == 160 || _0xa5f832.audioBitrate == 128
          }).pipe(fs.createWriteStream(_0x4cd3b2));
          await new Promise((_0x4790a8, _0x9a005b) => {
            _0x39ddb9.on("error", _0x9a005b);
            _0x39ddb9.on("finish", _0x4790a8);
          });
          await _0xb75e78.sendMessage(_0xb75e78.chat, {
            [_0x5d9956]: fs.readFileSync(_0x4cd3b2),
            mimetype: "audio/mpeg",
            fileName: Config.caption
          }, {
            quoted: _0xb75e78
          });
        }
        try {
          return fs.unlinkSync(_0x4cd3b2);
        } catch (_0x51cca7) {}
      } catch (_0x189dd8) {
        return await _0xb75e78.reply("Error While Downloading Video : " + _0x189dd8);
      }
    } else if (_0x5b8ee5[0].includes("ᴀsᴛᴀ-ᴍᴅ • ʏᴏᴜᴛᴜʙᴇ ᴅᴏᴡɴʟᴏᴀᴅ")) {
      let _0x307bb6 = "*" + _0xb75e78.text.split(" ")[0] + " : ";
      const _0x56275d = _0x5b8ee5.find(_0x3b5e74 => _0x3b5e74.startsWith(_0x307bb6));
      if (_0x56275d) {
        try {
          let _0x3e1826 = _0x56275d.replace(_0x307bb6, "").split("*")[0].trim();
          const _0x4d9213 = _0x5b8ee5[_0x5b8ee5.indexOf(_0x56275d) + 1];
          const _0x37a579 = _0x4d9213.split("*")[1].replace("Url : ", "").trim();
          if (_0x37a579.startsWith("http")) {
            await _0xb75e78.sendMessage(_0xb75e78.chat, {
              react: {
                text: "✨",
                key: _0xb75e78.key
              }
            });
            let _0x1d3325 = _0x221e78.toLowerCase().includes("doc") ? "document" : _0x221e78.toLowerCase().includes("mp3") ? "audio" : "video";
            let _0x26cc84 = "./temp/Yts Download " + Math.floor(Math.random() * 10000) + ".mp4";
            const _0x104b4c = ytdl(_0x37a579, {
              filter: _0x31a431 => _0x31a431.itag == 22 || _0x31a431.itag == 18
            }).pipe(fs.createWriteStream(_0x26cc84));
            await new Promise((_0x45b31c, _0x5b6595) => {
              _0x104b4c.on("error", _0x5b6595);
              _0x104b4c.on("finish", _0x45b31c);
            });
            await _0xb75e78.sendMessage(_0xb75e78.chat, {
              [_0x1d3325]: fs.readFileSync(_0x26cc84),
              mimetype: _0x1d3325 == "audio" ? "audio/mpeg" : "video/mp4",
              fileName: "" + _0x3e1826,
              caption: _0x3e1826 + " \n " + Config.caption
            }, {
              quoted: _0xb75e78
            });
            try {
              fs.unlink(_0x26cc84);
            } catch (_0x338800) {}
          }
        } catch (_0x3de0e2) {
          _0xb75e78.error(_0x3de0e2 + "\n\nCommand yts Listener", _0x3de0e2, "*Video Not Found!*");
        }
      }
    } else if (_0x5b8ee5[0].includes("zax-ᴍᴅ • ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪsᴛ")) {
      let _0x35d668 = "*" + _0xb75e78.text.split(" ")[0] + " : ";
      const _0x205a5f = _0x5b8ee5.find(_0x304058 => _0x304058.startsWith(_0x35d668));
      if (_0x205a5f) {
        try {
          let _0x17567d = _0x205a5f.replace(_0x35d668, "").split("*")[0].trim();
          const _0x14618c = _0x5b8ee5[_0x5b8ee5.indexOf(_0x205a5f) + 1];
          const _0x2407a8 = _0x14618c.split("*")[1].replace("Id : ", "").trim();
          await _0xb75e78.sendMessage(_0xb75e78.chat, {
            react: {
              text: "✨",
              key: _0xb75e78.key
            }
          });
          let _0x37b3a4 = await download(_0x2407a8);
          let _0x478b37 = "*App Name :* " + _0x37b3a4.name;
          _0x478b37 += "\n*App id        :* " + _0x37b3a4.package;
          _0x478b37 += "\n*Last Up       :* " + _0x37b3a4.lastup;
          _0x478b37 += "\n*App Size     :* " + _0x37b3a4.size;
          _0x478b37 += "\n               \n" + Config.caption;
          let _0x5032aa = {
            document: {
              url: _0x37b3a4.dllink
            },
            mimetype: "application/vnd.android.package-archive",
            fileName: _0x37b3a4.name + ".apk",
            caption: _0x478b37
          };
          return await _0xb75e78.sendMessage(_0xb75e78.chat, _0x5032aa, {
            quoted: _0xb75e78
          });
        } catch (_0x12fd88) {
          _0xb75e78.reply("*_Can't Download, App Limit Exceed_*");
        }
      }
    }
  }
});
/** PLAYLIST */
const _0xf3b3b9 = _0xc1f2;
function _0xe8a3() {
  const _0x1872b6 = ["audio", "random", "length", ".mp4", "6710240SkWnCZ", "readFileSync", "Downloads video from playlist.", "<yt playlist url>", "title", "videos", "sendMessage", "2179701ijsDnM", "botname", "4565025fjxWjZ", "pushName", "168uBIxwJ", "document", "includes", "216vVeWdZ", "itag", "\n ⿻ File Size : ", "reply", "chat", "11410952QXDvWH", "mp3", " MB", "614495gBYQxj", "split", "toLowerCase", "floor", "downloader", "videoDetails", "audio/mpeg", "videoId", "This Process will take a bit time.", "2487090FcjOyi", "❌ File size bigger than ", "pipe", "statSync", "mb.", "test", "log", "lengthSeconds", "getInfo", "61665AJJjOP", "./temp/", "unlinkSync"];
  _0xe8a3 = function () {
    return _0x1872b6;
  };
  return _0xe8a3();
}
function _0xc1f2(_0x44febb, _0x412500) {
  const _0xe8a308 = _0xe8a3();
  _0xc1f2 = function (_0xc1f20d, _0x460a50) {
    _0xc1f20d = _0xc1f20d - 214;
    let _0x14f3b6 = _0xe8a308[_0xc1f20d];
    return _0x14f3b6;
  };
  return _0xc1f2(_0x44febb, _0x412500);
}
(function (_0x131f7c, _0x3f6081) {
  const _0x3b3c98 = _0xc1f2;
  const _0x165db2 = _0x131f7c();
  while (true) {
    try {
      const _0x538451 = -parseInt(_0x3b3c98(249)) / 1 + -parseInt(_0x3b3c98(258)) / 2 + parseInt(_0x3b3c98(236)) / 3 + -parseInt(_0x3b3c98(227)) / 4 + -parseInt(_0x3b3c98(220)) / 5 * (parseInt(_0x3b3c98(241)) / 6) + -parseInt(_0x3b3c98(246)) / 7 + -parseInt(_0x3b3c98(238)) / 8 * (-parseInt(_0x3b3c98(234)) / 9);
      if (_0x538451 === _0x3f6081) {
        break;
      } else {
        _0x165db2.push(_0x165db2.shift());
      }
    } catch (_0x1c3a5e) {
      _0x165db2.push(_0x165db2.shift());
    }
  }
})(_0xe8a3, 997920);
smd({
  pattern: "playlist",
  desc: _0xf3b3b9(229),
  category: _0xf3b3b9(253),
  filename: __filename,
  use: _0xf3b3b9(230)
}, async (_0x1283e0, _0x45d2ef, {
  Void: _0xc34be3
}) => {
  const _0x38a391 = _0xf3b3b9;
  try {
    var _0x5d6154 = 2000;
    var _0x1a03f5 = 400;
    var _0x3ef119 = _0x45d2ef[_0x38a391(251)]().includes("doc") ? "document" : _0x45d2ef[_0x38a391(251)]()[_0x38a391(240)](_0x38a391(247)) || _0x45d2ef[_0x38a391(251)]().includes(_0x38a391(223)) ? _0x38a391(223) : "video";
    const _0x5c2288 = _0x5202bc => {
      const _0x2d6457 = _0x38a391;
      return "" + Math[_0x2d6457(252)](Math[_0x2d6457(224)]() * 10000) + _0x5202bc;
    };
    if (!_0x45d2ef || !_0x45d2ef.includes("=") || !/http/gi[_0x38a391(216)](_0x45d2ef)) {
      return await _0x1283e0[_0x38a391(244)]("*Use Playlist URL, Like: " + prefix + "playlist https://www.youtube.com/playlist?list=PLZeei0S6_unh-jTeWsJI1mOI6snxeHn5c*");
    }
    let _0x1c2a7e = _0x45d2ef[_0x38a391(250)]("=")[1][_0x38a391(250)](" ")[0];
    console[_0x38a391(217)](_0x1c2a7e);
    var _0x20ebc9 = {
      listId: _0x1c2a7e
    };
    yts(_0x20ebc9, async function (_0x594f1f, _0x2548a3) {
      const _0x5c8996 = _0x38a391;
      if (_0x594f1f) {
        throw _0x594f1f;
      }
      _0x1283e0.reply(_0x5c8996(257));
      for (let _0x1492ac = 0; _0x1492ac < _0x2548a3[_0x5c8996(232)][_0x5c8996(225)]; _0x1492ac++) {
        if (_0x2548a3.videos[_0x1492ac][_0x5c8996(256)] === undefined) {
          continue;
        }
        let _0xdaf4e3 = _0x2548a3[_0x5c8996(232)][_0x1492ac][_0x5c8996(256)];
        try {
          let _0x48a6df = await ytdl[_0x5c8996(219)](_0xdaf4e3);
          if (_0x48a6df[_0x5c8996(254)][_0x5c8996(218)] >= _0x5d6154) {
            _0x3ef119 = "document";
          }
          let _0x5ec28d = _0x48a6df[_0x5c8996(254)][_0x5c8996(231)];
          let _0x1a85a9 = _0x5c2288(_0x5c8996(226));
          const _0x55ba81 = ytdl(_0xdaf4e3, {
            filter: _0x1df4a7 => _0x1df4a7.itag == 22 || _0x1df4a7[_0x5c8996(242)] == 18
          })[_0x5c8996(260)](fs.createWriteStream(_0x5c8996(221) + _0x1a85a9));
          await new Promise((_0x1e87e2, _0x352753) => {
            _0x55ba81.on("error", _0x352753);
            _0x55ba81.on("finish", _0x1e87e2);
          });
          let _0x5e17d6 = fs[_0x5c8996(214)](_0x5c8996(221) + _0x1a85a9);
          let _0x1e47e6 = _0x5e17d6.size;
          let _0x4a0671 = _0x1e47e6 / 1048576;
          if (_0x4a0671 <= _0x1a03f5) {
            let _0x3eab5e = {
              [_0x3ef119]: fs[_0x5c8996(228)](_0x5c8996(221) + _0x1a85a9),
              mimetype: _0x3ef119 == "audio" ? _0x5c8996(255) : "video/mp4",
              fileName: "" + _0x5ec28d,
              caption: _0x3ef119 == _0x5c8996(239) ? "" : " ⿻ Title : " + _0x5ec28d + _0x5c8996(243) + _0x4a0671 + _0x5c8996(248),
              headerType: 4,
              contextInfo: {
                externalAdReply: {
                  title: Config[_0x5c8996(235)],
                  body: _0x1283e0[_0x5c8996(237)],
                  thumbnail: log0,
                  renderLargerThumbnail: true,
                  mediaType: 2,
                  mediaUrl: gurl,
                  sourceUrl: gurl
                }
              }
            };
            _0xc34be3[_0x5c8996(233)](_0x1283e0[_0x5c8996(245)], _0x3eab5e, {
              quoted: _0x1283e0
            });
          } else {
            _0x1283e0[_0x5c8996(244)](_0x5c8996(259) + _0x1a03f5 + _0x5c8996(215));
          }
          try {
            fs[_0x5c8996(222)](_0x5c8996(221) + _0x1a85a9);
          } catch (_0x492195) {}
        } catch (_0x312da2) {
          console[_0x5c8996(217)](_0x312da2);
        }
      }
    });
  } catch (_0x4bcd8f) {
    console[_0x38a391(217)](_0x4bcd8f);
  }
});
