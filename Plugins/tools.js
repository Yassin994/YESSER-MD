let { smd, smdBuffer} = require(global.lib_dir || "../lib");
let fs = require("fs");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Config = require("../config");
const { react } = require("../lib/Zax");
let s_ser = true;
const axios = require('axios');
smd(
  {
    pattern: "repo",
    alias: ["git", "sc", "script"],
    desc: "Sends info about repo",
    category: "general",
    filename: __filename
  }, async _0x45da98 => {
    try {
      let {
        data: _0x44f98c
      } = await axios.get("https://api.github.com/repos/Yassin994/YESSER-MD");
      let _0x1c73f9 = ("\nyesser md ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ, ᴍᴀᴅᴇ ʙʏ yessertech ᴀɴᴅ ᴅᴇᴘʟᴏʏᴇᴅ ʙʏ *" + Config.ownername + "*.\n\n  *❲❒❳ Stars:* " + (_0x44f98c?.stargazers_count || "120+") + " stars\n  *❲❒❳ Forks:* " + (_0x44f98c?.forks_count || "1000+") + " forks\n  *❲❒❳ Authors:* Yassin994\n  *❲❒❳ Created On:* " + (_0x44f98c?.created_at || "undefined") + "\n  *❲❒❳ Repo:* _https://github.com/Yassin994/YESSER-MD_\n  *❲❒❳ Scan:* _" + scan + "_" + (Config.caption ? "\n\n" + Config.caption : "")).trim();
      return await _0x45da98.sendUi(_0x45da98.jid, {
        caption: _0x1c73f9
      });
    } catch (_0x5816fe) {
      await _0x45da98.error(_0x5816fe + "\n\ncommand: repo", _0x5816fe);
    }
  }
 );
  smd(
  {
    pattern: "cpu",
    desc: "To check bot status",
    category: "general",
    filename: __filename
  }, async _0x51c639 => {
    try {
      const _0x78d515 = process.memoryUsage();
      const _0x14b376 = os.cpus().map(_0x4baa78 => {
        _0x4baa78.total = Object.keys(_0x4baa78.times).reduce((_0x124129, _0x54fdbe) => _0x124129 + _0x4baa78.times[_0x54fdbe], 0);
        return _0x4baa78;
      }
     );
      const _0x52bb92 = _0x14b376.reduce((_0x371aab, _0x42f37d, _0x41ec3e, {
        length: _0x3f2c1a
      }) => {
        _0x371aab.total += _0x42f37d.total;
        _0x371aab.speed += _0x42f37d.speed / _0x3f2c1a;
        _0x371aab.times.user += _0x42f37d.times.user;
        _0x371aab.times.nice += _0x42f37d.times.nice;
        _0x371aab.times.sys += _0x42f37d.times.sys;
        _0x371aab.times.idle += _0x42f37d.times.idle;
        _0x371aab.times.irq += _0x42f37d.times.irq;
        return _0x371aab;
      }, {
        speed: 0,
        total: 0,
        times: {
          user: 0,
          nice: 0,
          sys: 0,
          idle: 0,
          irq: 0
        }
      }
     );
      timestampe = speed();
      latensie = speed() - timestampe;
      var _0x54755f = performance.now();
      var _0x366cd8 = performance.now();
      respon = ("*❲❒❳ " + Config.botname + " Server Info ❲❒❳*\n\n  *❲❒❳ Runtime:* " + runtime(process.uptime()) + "\n  *❲❒❳ Speed:* " + latensie.toFixed(3) + "/" + (_0x366cd8 - _0x54755f).toFixed(3) + " ms\n  *❲❒❳ RAM:* " + formatp(os.totalmem() - os.freemem()) + " / " + formatp(os.totalmem()) + "\n\n  *❲❒❳ Memory Usage:*\n      " + Object.keys(_0x78d515).map((_0x4a444a, _0xf623b7, _0x26f7ee) => _0x4a444a.padEnd(Math.max(..._0x26f7ee.map(_0x470f51 => _0x470f51.length)), " ") + ": " + formatp(_0x78d515[_0x4a444a])).join("\n      ") + "\n\n" + (_0x14b376[0] ? "  *❲❒❳ Total CPU Usage:*\n  *" + _0x14b376[0].model.trim() + " (" + _0x52bb92.speed + " MHZ)*\n      " + Object.keys(_0x52bb92.times).map(_0x1a945a => "-" + (_0x1a945a + "").padEnd(6) + ": " + (_0x52bb92.times[_0x1a945a] * 100 / _0x52bb92.total).toFixed(2) + "%").join("\n      ") + "\n\n  *❲❒❳ CPU Core Usage (" + _0x14b376.length + " Core CPU)*\n  " + _0x14b376.map((_0x1ada4d, _0x5999d4) => "*Core " + (_0x5999d4 + 1) + ": " + _0x1ada4d.model.trim() + " (" + _0x1ada4d.speed + " MHZ)*\n      " + Object.keys(_0x1ada4d.times).map(_0x2cc08d => "-" + (_0x2cc08d + "").padEnd(6) + ": " + (_0x1ada4d.times[_0x2cc08d] * 100 / _0x1ada4d.total).toFixed(2) + "%").join("\n      ")).join("\n\n") : "") + "\n").trim();
      return await _0x51c639.send(respon, {}, "", _0x51c639);
    } catch (_0x102a1d) {
      await _0x51c639.error(_0x102a1d + "\n\ncommand: cpu", _0x102a1d, "*_No responce from Server side, Sorry!!_*");
    }
  }
 );
smd(
  {
    pattern: "zip",
    alias: ["zipcode"],
    desc: "Provides information about a US zip code.",
    category: "tools",
    use: "zip [zip_code]",
    examples: ["zip 90001", "zip 33162"]
  },
  async (message, input) => {
    const zipCode = input;

    if (!zipCode) {
      return message.reply("Please provide a zip code.");
    }

    try {
      const response = await axios.get(`https://api.zippopotam.us/us/${zipCode}`);
      const { postCode, country, countryAbbreviation, places } = response.data;

      let output = `
*Zip Code:* ${postCode}
*Country:* ${country} (${countryAbbreviation})
*Places:*
`;

      places.forEach((place, index) => {
        output += `\n${index + 1}. ${place["place name"]}, ${place.state} (${place.latitude}, ${place.longitude})`;
      });

      await message.send(output);
    } catch (error) {
      await message.error(
        error + "\n\nCommand: zip",
        error,
        "Failed to retrieve zip code information."
      );
    }
  }
);
smd(
  {
    pattern: "channel",
    desc: "To check ping",
    react: "🗨️",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const channelMessage = `YESSER CHANNEL SUPPORT\n\n _ʜᴇʏ ʜᴇʀᴇ's ᴏᴜʀ ᴄʜᴀɴɴᴇʟ ʟɪɴᴋ, ᴘʟᴇᴀsᴇ ғᴏʟʟᴏᴡ ᴀɴᴅ sᴜᴘᴘᴏʀᴛ ᴜs ᴛᴏ ᴋᴇᴇᴘ ᴛʜɪs ᴘʀᴏᴊᴇᴄᴛ ᴀʟɪᴠᴇ_\n *ʟɪɴᴋ:* https://whatsapp.com/channel/0029VakA1mu35fM18opH1s30\n\n ${Config.botname} *WORKS*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(channelMessage, { contextInfo });
  }
);
smd(
  {
    pattern: "group1",
    desc: "To check ping",
    react: "🗨️",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const SupportMsg = `YESSER MD GROUP SUPPORT\n\n *ʟɪɴᴋ:* https://chat.whatsapp.com/DFmm1OBboewBk9kEDBrfNv\n\n ${Config.botname} *WORKS*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(SupportMsg, { contextInfo });
  }
);
smd(
  {
    pattern: "cleartmp",
    type: "tools",
    info: "Clear temporary files cache",
  },
  async (_0xadf9f3) => {
    try {
      const _0xae4773 = "./temp";
      if (fs.existsSync(_0xae4773)) {
        fs.readdirSync(_0xae4773).forEach((_0x1577c1) =>
          fs.rmSync(_0xae4773 + "/" + _0x1577c1)
        );
      }
      await _0xadf9f3.reply("_The *temp* folder has been cleaned_");
    } catch (_0x3308a1) {
      _0xadf9f3.error(_0x3308a1 + "\n\nCommand: cleartmp", _0x3308a1, false);
    }
  }
);
smd(
  {
    cmdname: "restart",
    info: "To restart bot",
    type: "tools",
    fromMe: s_ser,
    filename: __filename,
  },
  async (_0x514d3c) => {
    const { exec: _0x1912df } = require("child_process");
    _0x514d3c.reply("Restarting");
    _0x1912df("pm2 restart all");
  }
);
smd(
  {
    cmdname: "shutdown",
    info: "To restart bot",
    type: "tools",
    fromMe: s_ser,
    filename: __filename,
  },
  async (_0x514d3c) => {
    const { exec: _0x1912df } = require("child_process");
    _0x514d3c.reply("Shutting Down");
    _0x1912df("pm2 stop all");
  }
);
let tmpUrl = "https://telegra.ph/file/b8e96b599e0fa54d25940.jpg";
const secmailData = {};
smd(
  {
    pattern: "tempmail",
    alias: ["tmpmail", "newmail", "tempemail"],
    info: "Create tempory email address, and use it according your need!",
    type: "tools",
  },
  async (_0x10eae6) => {
    try {
      if (!secmailData[_0x10eae6.sender]) {
        const _0x5b6408 = await tempmail.create();
        if (!_0x5b6408 || !_0x5b6408[0]) {
          return await _0x10eae6.reply("*Request Denied!*");
        }
        const _0x17929d = _0x5b6408[0].split("@");
        secmailData[_0x10eae6.sender] = {
          email: _0x5b6408[0],
          login: _0x17929d[0],
          domain: _0x17929d[1],
        };
      }
      var _0x54710d = false;
      try {
        _0x54710d = await smdBuffer(tmpUrl);
      } catch (_0x40985f) {}
      await _0x10eae6.reply(
        (
          "*YOUR TEMPMAIL INFO*\n      \n      \n  *EMAIL:* ➪ " +
          secmailData[_0x10eae6.sender].email +
          "\n  *Login:* ➪ " +
          secmailData[_0x10eae6.sender].login +
          "\n  *Domain:* ➪ " +
          secmailData[_0x10eae6.sender].domain +
          "\n  \n  \n  *USE _" +
          prefix +
          "checkmail_ to get latest emails!*\n  *USE _" +
          prefix +
          "delmail_ to delete current email!*\n  \n  " +
          Config.caption +
          "\n  "
        ).trim(),
        {
          contextInfo: {
            ...(await _0x10eae6.bot.contextInfo(
              "TEMPMAIL",
              _0x10eae6.senderName,
              _0x54710d
            )),
          },
        },
        "smd",
        _0x10eae6
      );
    } catch (_0x2c8958) {
      console.log(_0x2c8958);
      await _0x10eae6.reply("*Request Denied!*");
    }
  }
);
smd(
  {
    pattern: "checkmail",
    alias: ["readmail", "reademail"],
    type: "tools",
    info: "check mails in your temporary email address!",
  },
  async (_0x39080b) => {
    try {
      const _0x13bdf9 = _0x39080b.sender;
      const _0x1ca6eb = secmailData[_0x13bdf9];
      if (!_0x1ca6eb || !_0x1ca6eb.email) {
        return await _0x39080b.reply(
          "*You haven't created a temporary email.*\n  *Use _" +
            prefix +
            "tempmail_ to create email first!*"
        );
      }
      const _0xb59e7d = await tempmail.mails(_0x1ca6eb.login, _0x1ca6eb.domain);
      if (!_0xb59e7d || !_0xb59e7d[0] || _0xb59e7d.length === 0) {
        return await _0x39080b.reply(
          "*EMPTY  ➪ No mails received yet!* \n*Use _" +
            prefix +
            "delmail_ to delete mail!*"
        );
      }
      var _0x392c45 = false;
      try {
        _0x392c45 = await smdBuffer(tmpUrl);
      } catch (_0x27f4a4) {}
      for (const _0x2b6dd0 of _0xb59e7d) {
        const _0x587f7f = await tempmail.emailContent(
          _0x1ca6eb.login,
          _0x1ca6eb.domain,
          _0x2b6dd0.id
        );
        console.log({
          emailContent: _0x587f7f,
        });
        if (_0x587f7f) {
          const _0xa4d211 =
            "\n  *From* ➪ " +
            _0x2b6dd0.from +
            "\n  *Date* ➪  " +
            _0x2b6dd0.date +
            "\n  *EMAIL ID* ➪  [" +
            _0x2b6dd0.id +
            "]\n  *Subject* ➪  " +
            _0x2b6dd0.subject +
            "\n  *Content* ➪  " +
            _0x587f7f;
          await _0x39080b.reply(
            _0xa4d211,
            {
              contextInfo: {
                ...(await _0x39080b.bot.contextInfo(
                  "*EMAIL ➪ " + _0x2b6dd0.id + "*",
                  _0x39080b.senderName,
                  _0x392c45
                )),
              },
            },
            "smd",
            _0x39080b
          );
        }
      }
    } catch (_0x4473c8) {
      console.log(_0x4473c8);
      await _0x39080b.reply("*Request Denied!*");
    }
  }
);
smd(
  {
    pattern: "delmail",
    alias: ["deletemail", "deltemp", "deltmp"],
    type: "tools",
    info: "Delete tempory email address!",
  },
  async (_0x536927) => {
    try {
      const _0x35c5db = _0x536927.sender;
      if (secmailData[_0x35c5db]) {
        delete secmailData[_0x35c5db];
        await _0x536927.reply("*Successfully deleted the email address.*");
      } else {
        await _0x536927.reply("*No email address to delete.*");
      }
    } catch (_0x527b01) {
      console.log(_0x527b01);
      await _0x536927.reply("*Request Denied!*");
    }
  }
);
const tempmail = {};
tempmail.create = async () => {
  const _0x4b8b0a =
    "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1";
  try {
    let _0x64d3a = await fetch(_0x4b8b0a);
    if (!_0x64d3a.ok) {
      throw new Error("HTTP error! status: " + _0x64d3a.status);
    }
    let _0x3d6ee6 = await _0x64d3a.json();
    return _0x3d6ee6;
  } catch (_0x5fcd34) {
    console.log(_0x5fcd34);
    return null;
  }
};
tempmail.mails = async (_0xf78957, _0x22b96c) => {
  const _0x52bcfa =
    "https://www.1secmail.com/api/v1/?action=getMessages&login=" +
    _0xf78957 +
    "&domain=" +
    _0x22b96c;
  try {
    let _0x334113 = await fetch(_0x52bcfa);
    if (!_0x334113.ok) {
      throw new Error("HTTP error! status: " + _0x334113.status);
    }
    let _0x21e568 = await _0x334113.json();
    return _0x21e568;
  } catch (_0x470fd0) {
    console.log(_0x470fd0);
    return null;
  }
};
tempmail.emailContent = async (_0x2bb874, _0x365dd7, _0x53af41) => {
  const _0x525052 =
    "https://www.1secmail.com/api/v1/?action=readMessage&login=" +
    _0x2bb874 +
    "&domain=" +
    _0x365dd7 +
    "&id=" +
    _0x53af41;
  try {
    let _0x5287ec = await fetch(_0x525052);
    if (!_0x5287ec.ok) {
      throw new Error("HTTP error! status: " + _0x5287ec.status);
    }
    let _0x321f50 = await _0x5287ec.json();
    const _0x2d0a5f = _0x321f50.htmlBody;
    console.log({
      htmlContent: _0x2d0a5f,
    });
    const _0x59fd31 = cheerio.load(_0x2d0a5f);
    const _0x492dcb = _0x59fd31.text();
    return _0x492dcb;
  } catch (_0x47924e) {
    console.log(_0x47924e);
    return null;
  }
};
smd(
  {
    pattern: "igstalk",
    desc: "Get information about an Instagram user.",
    category: "stalker",
    filename: __filename,
    use: "<username>",
  },
  async (m, username) => {
    try {
      if (!username) {
        return await m.send("*_Please provide an Instagram username!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/stalk/instagram?q=${encodeURIComponent(
        username
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const {
        photo_profile,
        username: igUsername,
        fullname,
        posts,
        followers,
        following,
        bio,
      } = data.result;

      const caption = `
*Instagram User Information*

*Username:* ${igUsername}
*Full Name:* ${fullname}
*Bio:* ${bio || "NO BIO"}

*Posts:* ${posts}
*Followers:* ${followers}
*Following:* ${following}

\t*YESSER IG STALKER*
`;

      await m.bot.sendFromUrl(m.from, photo_profile, caption, m, {}, "image");
    } catch (e) {
      await m.error(`${e}\n\ncommand: igstalk`, e);
    }
  }
);
smd(
  {
    pattern: "ytstalk",
    desc: "Get information about a YouTube channel.",
    category: "stalker",
    filename: __filename,
    use: "<channel_name>",
  },
  async (m, channelName) => {
    try {
      if (!channelName) {
        return await m.send("*_Please provide a YouTube channel name!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/stalk/ytchannel?q=${encodeURIComponent(
        channelName
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const channels = data.result;

      if (!channels || !Array.isArray(channels) || channels.length === 0) {
        return await m.send("*_No channels found!_*");
      }

      for (const channel of channels) {
        const {
          channel_id,
          channel_name,
          channel_about,
          channel_created,
          channel_picture,
        } = channel;

        const caption = `
*YouTube Channel Information*

*Channel Name:* ${channel_name}
*Channel ID:* ${channel_id}
*Channel Description:* ${channel_about}
*Channel Created:* ${new Date(channel_created).toLocaleString()}

*Profile Picture:*
`;

        const profilePictureUrl =
          channel_picture.high.url || channel_picture.medium.url;

        await m.bot.sendFromUrl(
          m.from,
          profilePictureUrl,
          caption,
          m,
          {},
          "image"
        );
      }
    } catch (e) {
      await m.error(`${e}\n\ncommand: ytstalk`, e);
    }
  }
);
smd(
  {
    pattern: "gitstalk",
    desc: "Get information about a GitHub user.",
    category: "stalker",
    filename: __filename,
    use: "<username>",
  },
  async (m, username) => {
    try {
      if (!username) {
        return await m.send("*_Please provide a GitHub username!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/stalk/githubuser?q=${encodeURIComponent(
        username
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const {
        login,
        id,
        avatar_url,
        name,
        company,
        blog,
        location,
        bio,
        public_repos,
        public_gists,
        followers,
        following,
        created_at,
        updated_at,
      } = data.result;

      const caption = `
*GitHub User Information*

*Username:* ${login}
*Name:* ${name || "N/A"}
*ID:* ${id}
*Bio:* ${bio || "N/A"}
*Company:* ${company || "N/A"}
*Blog:* ${blog || "N/A"}
*Location:* ${location || "N/A"}

*Public Repositories:* ${public_repos}
*Public Gists:* ${public_gists}
*Followers:* ${followers}
*Following:* ${following}

*Account Created:* ${new Date(created_at).toLocaleString()}
*Last Updated:* ${new Date(updated_at).toLocaleString()}

*Avatar:*
`;

      await m.bot.sendFromUrl(m.from, avatar_url, caption, m, {}, "image");
    } catch (e) {
      await m.error(`${e}\n\ncommand: gitstalk`, e);
    }
  }
);
smd(
  {
    pattern: "ipstalk",
    desc: "Get information about an IP address.",
    category: "misc",
    filename: __filename,
    use: "<ip_address>",
  },
  async (m, ipAddress) => {
    try {
      if (!ipAddress) {
        return await m.send("*_Please provide an IP address!_*");
      }

      const apiUrl = `https://api.maher-zubair.tech/stalk/ip?q=${encodeURIComponent(
        ipAddress
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(
          `*_Error: ${response.status} ${response.statusText}_*`
        );
      }

      const data = await response.json();

      if (data.status !== 200) {
        return await m.send("*_An error occurred while fetching the data._*");
      }

      const {
        continent,
        country,
        countryCode,
        regionName,
        city,
        zip,
        lat,
        lon,
        timezone,
        currency,
        isp,
        org,
        as,
        reverse,
        mobile,
        proxy,
        hosting,
        ip,
      } = data.result;

      const caption = `
*IP Address Information*

*IP Address:* ${ip}
*Reverse DNS:* ${reverse}
*Continent:* ${continent}
*Country:* ${country} (${countryCode})
*Region:* ${regionName}
*City:* ${city}
*ZIP Code:* ${zip}
*Latitude:* ${lat}
*Longitude:* ${lon}
*Timezone:* ${timezone}
*Currency:* ${currency}
*ISP:* ${isp}
*Organization:* ${org}
*AS:* ${as}
*Mobile:* ${mobile ? "Yes" : "No"}
*Proxy:* ${proxy ? "Yes" : "No"}
*Hosting:* ${hosting ? "Yes" : "No"}
`;

      await m.send(caption);
    } catch (e) {
      await m.error(`${e}\n\ncommand: ipstalk`, e);
    }
  }
);

 smd(
   {
     pattern: "allsocial",
     desc: "Download media from various social platforms.",
     category: "downloader",
     filename: __filename,
     use: "<url>",
   },
   async (m, url) => {
     try {
       if (!url) {
         return await m.send("*_Please provide a URL!_*");
       }
 
       const apiUrl = `https://api.maher-zubair.tech/download/alldownload2?url=${encodeURIComponent(
         url
       )}`;
       const response = await fetch(apiUrl);
 
       if (!response.ok) {
         return await m.send(
           `*_Error: ${response.status} ${response.statusText}_*`
         );
       }
 
       const data = await response.json();
       const result = data.result;
 
       if (!result || !result.medias || !result.medias.length) {
         return await m.send("*_No media found!_*");
       }
 
       const { title, thumbnail, medias } = result;
       const caption = `*Title:* ${title}\n\n*Source:* ${medias[0].source}`;
 
       await m.bot.sendFromUrl(m.from, thumbnail, caption, m, {}, "image");
 
       for (const media of medias) {
         const { url, formattedSize, quality, extension } = media;
         const mediaCaption = `*Quality:* ${quality}\n*Size:* ${formattedSize}\n*Extension:* ${extension}`;
         await m.bot.sendFromUrl(m.from, url, mediaCaption, m, {}, "video");
       }
     } catch (e) {
       await m.error(`${e}\n\ncommand: allsocial`, e);
     }
   }
 );
