const { smd, tlang, send, prefix, Config, groupdb } = require("../lib");
let gis = require("async-g-i-s");
const axios = require("axios");
const fetch = require("node-fetch");
const { shazam } = require("../lib");

smd({
  pattern: "bing",
  alias: ["bingsearch"],
  desc: "Search on Bing.",
  category: "search",
  filename: __filename,
  use: "<search query>"
}, async (msg, query) => {
  try {
    if (!query) {
      return await msg.reply("*Please provide a search query.*");
    }

    const apiUrl = `https://api-smd.onrender.com/api/bingsearch?query=${encodeURIComponent(query)}`;
    const response = await fetch(apiUrl).then(res => res.json());

    if (!response || !response.status) {
      return await msg.reply("*An error occurred while fetching the search results.*");
    }

    const results = response.result;
    let resultText = `*Bing Search Results for "${query}"*\n\n`;

    for (const result of results) {
      resultText += `*Title:* ${result.title}\n*Description:* ${result.description}\n*URL:* ${result.url}\n\n`;
    }

    await msg.reply(resultText);
  } catch (err) {
    await msg.error(err + "\n\ncommand: bing", err, "*An error occurred while searching on Bing.*");
  }
});
smd(
  {
    pattern: "shazam",
    alias: ["shazam"],
    category: "search",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (message) => {
    try {
      let mime = message.reply_message ? message.reply_message.mtype : "";
      if (!/audio/.test(mime))
        return message.reply(`Reply audio ${prefix}find`);
      let buff = await message.reply_message.download();
      let data = await shazam(buff);
      if (!data || !data.status) return message.send(data);
      let h = `*TITLE: _${data.title}_* \n*ARTIST: _${data.artists}_*\n *ALBUM:* _${data.album}_ `;
      await message.bot.sendUi(
        message.jid,
        { caption: h },
        { quoted: message },
        "text",
        "true"
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: find`,
        e,
        `*_Didn't get any results, Sorry!_*`
      );
    }
  }
);
smd(
  {
    pattern: "github",
    category: "search",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (message, match) => {
    try {
      message.react("🔍");
      if (!match)
        return message.reply(
          `Give me a user name like ${prefix}github Yassin994`
        );

      const { data } = await axios(`https://api.github.com/users/${match}`);
      if (!data)
        return await message.send(
          `*_Didn't get any results, Provide valid user name!_*`
        );
      let gitdata = data;
      message.sendMessage(
        message.jid,
        {
          image: { url: gitdata.avatar_url },
          caption: `ㅤㅤㅤ*[ GITHUB USER INFO ]*

🚩 Id : ${gitdata.id}
🔖 Nickname : ${gitdata.name}
🔖 Username : ${gitdata.login}
✨ Bio : ${gitdata.bio}
🏢 Company : ${gitdata.company}
📍 Location : ${gitdata.location}
📧 Email : ${gitdata.email}
📰 Blog : ${gitdata.blog}
🔓 Public Repo : ${gitdata.repos_url}
🔐 Public Gists : ${gitdata.gists_url}
💕 Followers : ${gitdata.followers}
👉 Following : ${gitdata.following}
🔄 Updated At : ${gitdata.updated_at}
🧩 Created At : ${gitdata.created_at}`,
        },
        { quoted: message }
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: github`,
        e,
        `*_Didn't get any results, Sorry!_*`
      );
    }
  }
);

//------------------------------------------------------------------------------------
smd(
  {
    pattern: "coffe",
    alias: ["tea", "kofi"],
    category: "search",
    react: "🫡",
    desc: "send randome coffe",
    filename: __filename,
  },
  async (m) => {
    try {
      // m.react("🫡")
      return await m.bot.sendMessage(
        m.chat,
        {
          image: { url: "https://coffee.alexflipnote.dev/random" },
          caption: `Here is your Coffee...`,
        },
        { quoted: m }
      );
    } catch (e) {
      return await m.error(
        `${e}\n\n command: coffe`,
        e,
        `*_Didn't get any results, Sorry!_*`
      );
    }
  }
);
smd(
  {
    pattern: "lyrics",
    alias: ["lyric"],
    category: "search",
    desc: "Searche lyrics of given song name",
    use: "<text | song>",
    filename: __filename,
  },

  async (message, text, { cmdName }) => {
    if (!text)
      return message.reply(
        `*_Uhh please, give me song name_*\n*_Example ${
          prefix + cmdName
        } blue eyes punjabi_*`
      );
    try {
      const res = await (
        await fetch(`https://api.maher-zubair.tech/search/lyrics?q=${text}`)
      ).json();
      if (!res.status) return message.send("*Please Provide valid name!!!*");
      if (!res.result)
        return message.send("*There's a problem, try again later!*");
      const { thumb, lyrics, title, artist } = res.result,
        tbl = "```",
        tcl = "*",
        tdl = "_*",
        contextInfo = {
          externalAdReply: {
            ...(await message.bot.contextInfo("*YESSER*-MD", `Lyrics-${text}`)),
          },
        };
      await send(
        message,
        `*Title:* ${title}\n*Artist:* ${artist} \n${tbl}${lyrics}${tbl} `,
        { contextInfo: contextInfo },
        ""
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: ${cmdName}`,
        e,
        `*_Didn't get any lyrics, Sorry!_*`
      );
    }
  }
);

smd(
  {
    pattern: "imdb",
    category: "search",
    desc: "sends info of asked movie/series.",
    use: "<text>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!match)
        return message.reply(`_Name a Series or movie ${tlang().greet}._`);
      let { data } = await axios.get(
        `http://www.omdbapi.com/?apikey=742b2d09&t=${match}&plot=full`
      );
      if (!data || data.cod == "404")
        return await message.reply(`*_Please provide valid country name!_*`);

      let imdbt =
        "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` 𝕀𝕄𝔻𝔹 𝕊𝔼𝔸ℝℂℍ```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
      imdbt += "🎬Title      : " + data.Title + "\n";
      imdbt += "📅Year       : " + data.Year + "\n";
      imdbt += "⭐Rated      : " + data.Rated + "\n";
      imdbt += "📆Released   : " + data.Released + "\n";
      imdbt += "⏳Runtime    : " + data.Runtime + "\n";
      imdbt += "🌀Genre      : " + data.Genre + "\n";
      imdbt += "👨🏻‍💻Director   : " + data.Director + "\n";
      imdbt += "✍Writer     : " + data.Writer + "\n";
      imdbt += "👨Actors     : " + data.Actors + "\n";
      imdbt += "📃Plot       : " + data.Plot + "\n";
      imdbt += "🌐Language   : " + data.Language + "\n";
      imdbt += "🌍Country    : " + data.Country + "\n";
      imdbt += "🎖️Awards     : " + data.Awards + "\n";
      imdbt += "📦BoxOffice  : " + data.BoxOffice + "\n";
      imdbt += "🏙️Production : " + data.Production + "\n";
      imdbt += "🌟imdbRating : " + data.imdbRating + "\n";
      imdbt += "❎imdbVotes  : " + data.imdbVotes + "\n\n";
      imdbt += Config.caption;
      await message.bot.sendUi(
        message.jid,
        { caption: imdbt },
        { quoted: message },
        "image",
        data.Poster
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: ${cmdName}`,
        e,
        `*_Uhh dear, Didn't get any results!_*`
      );
    }
  }
);
smd(
  {
    pattern: "weather",
    category: "search",
    desc: "Sends weather info about asked place.",
    use: "<location>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text)
        return message.reply(
          `*_Give me city name, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      let { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
      );
      if (!data || data.cod === "404")
        return await message.reply(`*_Please provide valid city name!_*`);
      let textw = `*🌟Weather of  ${text}*\n\n`;
      textw += `*Weather:-* ${data.weather[0].main}\n`;
      textw += `*Description:-* ${data.weather[0].description}\n`;
      textw += `*Avg Temp:-* ${data.main.temp}\n`;
      textw += `*Feels Like:-* ${data.main.feels_like}\n`;
      textw += `*Pressure:-* ${data.main.pressure}\n`;
      textw += `*Humidity:-* ${data.main.humidity}\n`;
      textw += `*Humidity:-* ${data.wind.speed}\n`;
      textw += `*Latitude:-* ${data.coord.lat}\n`;
      textw += `*Longitude:-* ${data.coord.lon}\n`;
      textw += `*Country:-* ${data.sys.country}\n\n`;
      textw += Config.caption;
      message.bot.sendUi(
        message.jid,
        { caption: textw },
        { quoted: message },
        "text",
        "true"
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: weather`,
        e,
        `*_Please provide valid city name!_*`
      );
    }
  }
);
smd(
  {
    pattern: "npm",
    desc: "download mp4 from url.",
    category: "search",
    use: "<package name>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!match) return message.reply("Please give me package name.📦");
      const { data } = await axios.get(
        `https://api.npms.io/v2/search?q=${match}`
      );
      let txt = data.results
        .map(
          ({ package: pkg }) =>
            `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
        )
        .join("\n\n")
        ?.trim();
      data && txt
        ? await message.reply(txt)
        : await message.reply("*No Result Found. Sorry!!*");
    } catch (e) {
      await message.error(`${e}\n\ncommand : npm`, e);
    }
  }
);
smd(
  {
    pattern: "cric",
    category: "search",
    desc: "Sends info of given query from Google Search.",
    use: "<text>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      await message.reply(`*_Please Wait, Getting Cricket Info_*`);
      const response = await fetch(
        "https://api.cricapi.com/v1/currentMatches?apikey=f68d1cb5-a9c9-47c5-8fcd-fbfe52bace78"
      );
      const dat = await response.json();

      for (let i = 0; i < dat.data.length; i++) {
        let j = i + 1;
        text += `\n*--------------------- MATCH ${i}-------------------*`;
        text += "\n*Match Name:* " + dat.data[i].name;
        text += "\n*Match Status:* " + dat.data[i].status;
        text += "\n*Match Date:* " + dat.data[i].dateTimeGMT;
        text += "\n*Match Started:* " + dat.data[i].matchStarted;
        text += "\n*Match Ended:* " + dat.data[i].matchEnded;
      }
      return await message.reply(text);
    } catch (e) {
      return await message.error(
        `${e}\n\n command: cric`,
        e,
        `*_Uhh dear, Didn't get any results!_*`
      );
    }
  }
);
smd(
  {
    pattern: "google",
    alias: ["search", "gsearch"],
    category: "search",
    desc: "Sends info of given query from Google Search.",
    use: "<text>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text)
        return message.reply(
          `*_Uhh please, give me a query_*\n*_Example : ${prefix}google Zax Md._*`
        );
      let google = require("google-it");
      google({ query: text }).then((res) => {
        let msg = `Google Search From : ${text} \n\n`;
        for (let g of res) {
          msg += `➣ Title : ${g.title}\n`;
          msg += `➣ Description : ${g.snippet}\n`;
          msg += `➣ Link : ${g.link}\n\n────────────────────────\n\n`;
        }

        return message.reply(msg);
      });
    } catch (e) {
      return await message.error(
        `${e}\n\n command: google`,
        e,
        `*_Uhh dear, Didn't get any results!_*`
      );
    }
  }
);
smd(
  {
    pattern: "image",
    alias: ["img", "pic"],
    category: "search",
    desc: "Searches Image on Google",
    use: "<text>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      let text = match ? match : message.reply_text;
      if (!text)
        return message.reply(`Provide me a query!\n*Ex : .image luffy |10*`);

      let name1 = text.split("|")[0] || text;
      let name2 = text.split("|")[1] || `5`;

      let nn = parseInt(name2) || 5;
      let Group = await groupdb.findOne({ id: message.chat });
      let safe = Group.nsfw == "true" ? "off" : "on";
      try {
        let n = await gis(name1, {
          query: { safe: safe },
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        });
        console.log("images results : ", n);

        if (n && n[0]) {
          nn = n && n.length > nn ? nn : n.length;
          message.reply(`*_Sending images of '${name1}' in chat!_*`);
          for (let i = 0; i < nn; i++) {
            try {
              let random = Math.floor(Math.random() * n.length);
              message.bot.sendFromUrl(
                message.jid,
                n[random].url,
                "",
                message,
                {},
                "image"
              );
              n.splice(random, 1);
            } catch {}
          }
          return;
        }
      } catch (e) {
        console.log("ERROR IN SYNC G>I>S IMAGE PACKAGE\n\t", e);
      }

      let urlsArray = [];
      const params = {
        q: name1,
        tbm: "isch",
        hl: "en",
        gl: "in",
        ijn: "0",
      };
      const headers = {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36",
        "Accept-Encoding": "application/json",
      };

      const res = await axios.get("https://www.google.com/search", {
        headers: headers,
        params: params,
      });
      let body = res.data;
      body = body.slice(body.lastIndexOf("AF_initDataCallback"));
      body = body.slice(body.indexOf("["));
      body = body.slice(0, body.indexOf("</script>") - 1);
      body = body.slice(0, body.lastIndexOf(","));

      const img = JSON.parse(body);

      const imgObjects = img[56][1][0][0][1][0];

      for (let i = 0; i < name2; i++) {
        if (imgObjects[i] && imgObjects[i][0][0]["444383007"][1]) {
          let url = imgObjects[i][0][0]["444383007"][1][3][0]; // the url
          urlsArray.push(url);
        }
      }

      for (let url of urlsArray) {
        try {
          message.bot.sendFromUrl(message.chat, url, "", message, {}, "image");
        } catch {}
      }
    } catch (e) {
      return await message.error(
        `${e}\n\n command: image`,
        e,
        `*_Uhh dear, Didn't get any results!_*`
      );
    }
  }
);
