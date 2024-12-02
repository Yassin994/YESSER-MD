// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUZUMFFqOXZReGhzcDY0MGE2MXVUUDhjYXFwQi9mUFNCT3F5ekRFeTAwRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidERoU0VkMWs1bWYxNHl3MHpRcHdMK0VFZk00UGNyWTBHZ1lUaTBoMGJsYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNQ3hBWlRRMThtbk4wRGdyZEc0bHIvV2dpSHBjd2hYTmFtOFlkMHB0OVVJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwQ3dqMUFYT2loVTNudTZocklMeXkrM2RkMUY5WmlucnByam5NVHlXTUNJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVNRFdKN3J5dWlLMkEyMkd3dW9va2ZIMlBEV3k4aC9kVU01NFZGWHVibkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9MZGxDeFFnZVVIeEsxTkJibGVwN0ErQTRUdnFzWXF2eUlDNWZzOVVmVlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUR2UDE2M2M1Y1F1SlBMMkRNQ3dFYzcwTVRZZENnUUplMUJEaWt0RE1Vdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY3pYWlB4WWtvVlgzNG9SM3dFRzNxR0M1Ri8yYnhpc2lTa2RpL3dkL1BHYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndXYzFKK1A0WjJCZ2dJYTJlemR4Ti9zZ1VyZHc3VkJhTU91OGZ4NW5sZ1U5bVJUc1N2MHRVdDVWYzZObEk2dmNqcHQwdEt2NU1VNFpsNFBlaFRXMURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDQsImFkdlNlY3JldEtleSI6ImFtVzBsbExMWGUvbiswYjBNRW5uT0NLZWZsSHFFUGlLSWhTSW0zaXRzelU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImdjWE45QlVBUmJtOU9oajJQamRWY2ciLCJwaG9uZUlkIjoiNGU0MzBiMGQtY2M5Yy00MmIxLWJlYTUtMmJkNjk4MWIxODM3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVleGVTV2tOR1Z3VXlRU1Y5MFNBWC9qazAyND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBOElXMDkybnVaYXYvc3YzdnMyWkRkemg1MWc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWVNZRFRLSDgiLCJtZSI6eyJpZCI6IjkyMzEyNjUwNzM0MTo0MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJzeWVkaGFtenU1MTIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BIOTNia0VFTHp1K2JnR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlNkZjRDOFpXaVlxa3ZiV3NYZzhSOUVmYk1LRy9Sa2ZnSVFiWGMxZ1RqVlE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkEyMHU5UlplbTBwWmZHUkllZWxuSmxCeEFGTnY1R3piV0hiMHozWlFXUXRjZ1BYSnBWWDRrQzBjaDluUTFWZjU1TUxHaTdHQXB5VFRzYkdQOUZWWkFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI5RkoyMDZYeTdWQ3hQRTRSYjFpaldLV3l2UFVtUWNCSTdEK2pMWlVBOGVNMk9aWEdKWlRxNDVGa1RycnJqRlVjbm9pVjJESTc4Umt4a1BCZHBvd3hBdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzEyNjUwNzM0MTo0MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVblgrQXZHVm9tS3BMMjFyRjRQRWZSSDJ6Q2h2MFpINENFRzEzTllFNDFVIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMwMDQ5ODc2fQ==",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "©yessertech",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "923126507341",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
