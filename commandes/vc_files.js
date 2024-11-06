const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const { getBuffer } = require("../framework/dl/Function");
const { default: axios } = require('axios');

const runtime = function (seconds) { 
 seconds = Number(seconds); 
 var d = Math.floor(seconds / (3600 * 24)); 
 var h = Math.floor((seconds % (3600 * 24)) / 3600); 
 var m = Math.floor((seconds % 3600) / 60); 
 var s = Math.floor(seconds % 60); 
 var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " d, ") : ""; 
 var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " h, ") : ""; 
 var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " m, ") : ""; 
 var sDisplay = s > 0 ? s + (s == 1 ? " second" : " s") : ""; 
 return dDisplay + hDisplay + mDisplay + sDisplay; 
 } 


zokou({ nomCom: 'vcf1',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '📄', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`*_sorry just use 👉 vcf10 to get all contact_*`) 

   


  }
);


zokou({ nomCom: 'getallmembers',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '💀', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`*_getting all members_*`) 

   


  }
);



zokou({ nomCom: 'channel',
    desc: 'To check runtime',
    Categorie: 'My Contact',
    reaction: '🎁', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`Support Here My Owner By Follow This Channel Please :https://whatsapp.com/channel/0029VakA1mu35fM18opH1s30`) 

   


  }
);


zokou({ nomCom: 'group1',
    desc: 'To check runtime',
    Categorie: 'My Contact',
    reaction: '😂', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`*Tap Here To Join YESSER MD Chatroom* https://chat.whatsapp.com/DFmm1OBboewBk9kEDBrfNv`) 

   


  }
);


zokou({ nomCom: 'update',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '⚙️', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`*_YESSER MD🎁is running on its latest vision_*`) 

   


  }
);


zokou({ nomCom: 'vision',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '🔎', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`*_YESSER  MD_*`) 

   


  }
);


  
zokou({ nomCom: 'cheka',
    desc: 'To check runtime',
    Categorie: 'My Contact',
    reaction: '😂', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`*_tap the link below to join CHEKA CHANNEL= https://whatsapp.com/channel/0029VafooOgAjPXNXqBpW01X_*`) 

   


  }
)


zokou({ nomCom: 'hack2',
    desc: 'To check runtime',
    Categorie: 'My Contact',
    reaction: '🤠', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`Injecting Malware",
    " █ 10%",
    " █ █ 20%",
    " █ █ █ 30%",
    " █ █ █ █ 40%",
    " █ █ █ █ █ 50%",
    " █ █ █ █ █ █ 60%",
    " █ █ █ █ █ █ █ 70%",
    " █ █ █ █ █ █ █ █ 80%",
    " █ █ █ █ █ █ █ █ █ 90%",
    " █ █ █ █ █ █ █ █ █ █ 100%",
    "System hijacking on process..\nConnecting to Server error to find 404",
    "Device successfully connected...\nReceiving data...",
    "Data hijacked from device 100% completed\nKilling all evidence, killing all malwares...",
    "HACKING COMPLETED",
    "SENDING LOG DOCUMENTS...",
    "SUCCESSFULLY SENT DATA AND Connection disconnected",
    "BACKLOGS CLEARED",
    "POWERED BY YESSER MD",
    "By YESSER TECH`) 

   


  }
)




zokou({ nomCom: 'problem',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '🔎', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`*_┏━━━━━━━━━━━━━━
┃YESSER-MD 
| 
┃   
┗━━━━━━━━━━━━━━━
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❶ || Creator = 𖥘 YESSER TECH 𖥘
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
❷ || WhattsApp Channel = https://whatsapp.com/channel/0029VakA1mu35fM18opH1s30
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Please Follow My YouTube Channel
🌛 https://www.youtube.com/@Yesserboy92
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
©*2024-2099 YESSER TECH_*`) 

   


  }
);


