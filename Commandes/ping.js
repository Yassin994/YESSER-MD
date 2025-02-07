"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "ping", reaction: "🥶", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = 'Test ping.... \n\n\n YESSER MD IS ACTIVE \n\n\n';
    let d = '                                                                           I no love no stress 💔';
    let varmess = z + d;
    var video = 'https://files.catbox.moe/9e7vmv.jpg';
    await zk.sendMessage(dest, { video: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
