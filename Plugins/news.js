let { smd } = require("../lib");
const axios = require("axios");
smd({ pattern: "wabeta", desc: "Fetches the latest WhatsApp beta information.", category: "news", filename: __filename, use: "wabeta", }, async (message, input) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/details/wabetainfo";
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (!data || data.status !== 200 || !data.result) {
      return message.send("*Failed to fetch WhatsApp beta information.*");
    }
    const { title, updateFor, date, image, subtitle, link, desc, QandA } = data.result;
    let output = `*${title}*\n\n`;
    output += `*Update For:* ${updateFor.join(", ")}\n`;
    output += `*Date:* ${date}\n\n`;
    output += `*${subtitle}*\n\n`;
    output += `${desc}\n\n`;
    output += `*Image:* ${image}\n`;
    output += `*Link:* ${link}\n\n`;
    output += "*Q&A:*\n";
    QandA.forEach((qa) => {
      output += `\n*Q:* ${qa.question}\n*A:* ${qa.answer}\n`;
    });
    return message.send(output, { quoted: message, thumbnail: image });
  } catch (error) {
    console.error(error);
    return message.error(
      error + "\n\nCommand: wabeta",
      error,
      "*Failed to fetch WhatsApp beta information.*"
    );
  }
});

smd(
  {
    pattern: "iosnews",
    alias: ["ios"],
    desc: "Fetches the latest iOS news.",
    category: "news",
    filename: __filename,
    use: "iosnews",
  },
  async (message, input) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/details/ios";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || data.status !== 200 || !data.result) {
        return message.send("*Failed to fetch iOS news.*");
      }

      const { title, link, images, desc } = data.result;

      let output = `*${title}*\n\n`;
      output += `${desc}\n\n`;
      output += `*Link:* ${link}\n\n`;

      if (images && images.length > 0) {
        output += "*Images:*\n";
        images.forEach((image) => {
          output += `${image}\n`;
        });
        output += "\n";
      }

      return message.send(output, { quoted: message, thumbnail: image });
    } catch (error) {
      console.error(error);
      return message.error(
        error + "\n\nCommand: iosnews",
        error,
        "*Failed to fetch iOS news.*"
      );
    }
  }
);

smd(
  {
    pattern: "googlenews",
    alias: ["gnews"],
    desc: "Fetches the latest Google news.",
    category: "news",
    filename: __filename,
    use: "googlenews",
  },
  async (message, input) => {
    try {
      const { GMSNEWS } = require("gms-mobile-news");

      const news = await GMSNEWS();

      news
        .latest_news()
        .then((result) => {
          const { title, date, link, image, short_desc, full_desc } =
            result.result;

          let output = `*${title}*\n\n`;
          output += `*Date:* ${date}\n\n`;
          output += `${short_desc}\n\n`;
          output += `*Link:* ${link}\n\n`;
          output += `*Image:* ${image}\n\n`;
          output += `*Full Description:*\n${full_desc}`;

          return message.send(output, { quoted: message, thumbnail: image });
        })
        .catch((error) => {
          console.log(error);
          return message.reply("*Failed to fetch Google news.*");
        });
    } catch (error) {
      await message.error(
        error + "\n\nCommand: googlenews",
        error,
        "*Failed to fetch Google news.*"
      );
    }
  }
);
smd(
  {
    pattern: "spacenews",
    desc: "Fetches articles from the Spaceflight News API.",
    category: "news",
    filename: __filename,
    use: "!spacenews",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.spaceflightnewsapi.net/v4/articles/";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || !data.results || data.results.length === 0) {
        return await m.send(
          "*Failed to fetch articles from Spaceflight News API.*"
        );
      }

      const article = data.results[0];
      const { title, url, image_url, summary, published_at } = article;

      let output = `*Title:* ${title}\n\n`;
      output += `*Summary:* ${summary}\n\n`;
      output += `*Published At:* ${published_at}\n\n`;
      output += `*LINK:* ${url}`;

      // If image_url is available, add it to the output
   /*   if (image_url) {
        output += `\n\n*Image:* ${image_url}`;
      } */

      await m.send(output, {quoted: m, thumbnail: image_url});
    } catch (e) {
      await m.error(`${e}\n\ncommand: spacenews`, e);
    }
  }
);

smd(
  {
    pattern: "technews",
    alias: ["tn"],
    desc: "Fetches the latest tech news.",
    category: "news",
    filename: __filename,
    use: "technews",
  },
  async (message, input) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/details/tnews";
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data || data.status !== 200) {
        return await message.reply("*Failed to fetch tech news.*");
      }

      const { title, link, img, desc } = data.result;

      let output = `*${title}*\n\n`;
      output += `${desc}\n\n`;
      output += `*Link:* ${link}\n\n`;
      output += `*Image:* ${img}`;

      return await message.send(output, { quoted: message, thumbnail: img });
    } catch (error) {
      await message.error(
        error + "\n\nCommand: technews",
        error,
        "*Failed to fetch tech news.*"
      );
    }
  }
);
smd(
  {
    pattern: "population",
    desc: "Fetches current population statistics.",
    category: "statistics",
    filename: __filename,
    use: "!population",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/details/population";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || data.status !== 200 || !data.result) {
        return await m.send("*Failed to fetch population statistics.*");
      }

      const { current, this_year, today } = data.result;
      const { total, male, female } = current;
      const { births, deaths } = today;

      let output = "*Current Population Statistics*\n\n";
      output += `Total Population: ${total}\n`;
      output += `Male: ${male}\n`;
      output += `Female: ${female}\n\n`;
      output += "*Today's Statistics*\n";
      output += `Births: ${births}\n`;
      output += `Deaths: ${deaths}`;

      await m.send(output);
    } catch (e) {
      await m.error(`${e}\n\ncommand: population`, e);
    }
  }
);
