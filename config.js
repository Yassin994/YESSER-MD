const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV01TNk9vMFUySGMyZ0I0Z2pXbUhISHZjZGxvWjUra1BicXhYSWNRTVJHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRytNRXRsTXp1aDN0NGNTa1dhSGZHdW53UytGNXJXcHVXSm1IL2t6MlpRND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTVJnbjJOamF1ZitDOTdwaEY3N09JNVRpOTRMRmxoYTRjbnZmSEpjTW40PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOVmpCdEdNMStXbHVkcVpMSUZ6dTdxTVZIWjNKdzlYQVZ4RmRPem5PY1RnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlDMWRWNVNtQktWT0p3SkZyRjBvTzZaRzBELzYwbGNMclRvTEpjVmg5MW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjArYjhhaWpFVTNRODBicnhyZ1FndGEyYzJPL1h5NU5UWVZOYldUS2tueGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME91SThxSFZoTmFJdG5rV2hWbnlIZ3dCKzNTQjdsUGk5azZGNmFQaWEyVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWVUZE45ZmFlQ25WNGU1eE5NdXdFN3hlVjBWVkEwL2h3TnJNdFZqYWowUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRCNnhiUUhIcmpua1ZQR2ZXMXNkN0hFbXFmemQ5SUppbkNmMGV4OWNGU1RDZFI1Uk9IeDhDTWFvazh1OHRWMnYzVStheVc4K0tFNGlCVHRvR3d0MER3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzMsImFkdlNlY3JldEtleSI6InF6NVlOTWw3Q2RBMzVUbHhZK2NYcGx5bkpSV0Q1cGE2QUM0b2hId0svams9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImpLVXBjaTNnVE9TeHlQdDlTaEJNenciLCJwaG9uZUlkIjoiNTU4MWZiNjItNjUzYi00MTQwLTk4OWItMWM5MTEyYmY2MTc3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImF6ZVhZNFAvMzQzVDlPWW5NazhvU2VwRy91TT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtVkwrYWNVTUsyNTRUTVo0dGNldEtsdnIySUU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiM1pEUE1CMVkiLCJtZSI6eyJpZCI6IjI1NDc1OTEzMDAxMzo1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKL3M2YWtGRUpLWXY3c0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJMN3MyOHRubkI4NkVFZURJalFoMzJSQkR1UVE4RVRTNklqai9tZXAvRTBrPSIsImFjY291bnRTaWduYXR1cmUiOiJtZTVBdHhSVm5sczVnUFpuR2ZQWWoveElLZlgzeDVDems5MFFuZ2RXWTFLVlM5UzM1SjJGeTJLbTdYK2I1Q1pDZGdTYWxjeFVYeThXWXlhaXJrS1JBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNW9IaFlHUTNoYW1heUJldERLbUxJdVM3R3hJdCsxMUQycnFyNm40S0srSS9ldm1ka24vVldKa0J3dFJ3eTlFZmZiMGo5S2pIc3RWMlRoR3JnbnhlQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NTkxMzAwMTM6NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTKzdOdkxaNXdmT2hCSGd5STBJZDlrUVE3a0VQQkUwdWlJNC81bnFmeE5KIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM1MzgwMDAwfQ==",
    CAPTION: process.env.CAPTION || "code by yessertech ",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_REPLY_STATUS: process.env.AUTO_REPLY_STATUS || "true",
    READ_MESSAGE: process.env.READ_MESSAGE || "true", // Added auto-read configuration
    MODE: process.env.MODE || "public",
    AUTO_VOICE: process.env.AUTO_VOICE || "true",
    AUTO_STICKER: process.env.AUTO_STICKER || "false",
    AUTO_REPLY: process.env.AUTO_REPLY || "false",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/3kdkf6.jpg",
    ALIVE_MSG: process.env.ALIVE_MSG || "HII DEAR IM ONLINE I'M YESSER-MD WHATSAPP BOT 👍🤠",
    ANTI_LINK: process.env.ANTI_LINK || "true",
    ANTI_BAD: process.env.ANTI_BAD || "true",
    PREFIX: process.env.PREFIX || ".",
    FAKE_RECORDING: process.env.FAKE_RECORDING || "true",
    FAKE_TYPING: process.env.FAKE_TYPING || "false",
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "true",
    CURRENT_STATUS: process.env.CURRENT_STATUS || "true",
    AUTO_REACT: process.env.AUTO_REACT || "true",
    HEART_REACT: process.env.HEART_REACT || "true",
    OWNER_REACT: process.env.OWNER_REACT || "true",
    BOT_NAME: process.env.BOT_NAME || "yessertech",
    STATUS_REPLY: process.env.STATUS_REPLY || "`✅ your status seen 👀`",
    OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39", // omdbapi.com
};
