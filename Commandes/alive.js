const { zokou } = require('../framework/zokou');
const {addOrUpdateDataInAlive , getDataFromAlive} = require('../bdd/alive')
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
    {
        nomCom : 'alive',
        categorie : 'General'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser} = commandeOptions;

 const data = await getDataFromAlive();

 if (!arg || !arg[0] || arg.join('') === '') {

    if(data) {
       
        const {message , lien} = data;


        var mode = "public";
        if ((s.MODE).toLocaleLowerCase() != "yes") {
            mode = "private";
        }
      
    
     
    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

    const alivemsg = `
*Owner* : ${s.OWNER_NAME}
*Mode* : ${mode}
*Date* : ${date}
*Hours(GMT)* : ${temps}

 ${message}
 
 
 *yessertech*`

 if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Checking for .jpeg or .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(alivemsg);
    
}

    } else {
        if(!superUser) { repondre("*hi there im actually active *") ; return};

      await   repondre("𝗬𝗘𝗦𝗦𝗘𝗥 𝗠𝗗 𝗜𝗦 𝗔𝗟𝗶𝗩𝗘 𝗔𝗟𝗟 𝗧𝗛𝗘 𝗧𝗜𝗠𝗘🤠");
         repondre("don't do fake thinks :)")
     }
 } else {

    if(!superUser) { repondre ("𝗼𝗵 𝗳𝘂𝗰𝗸^ 𝗯𝗶𝘁𝗰𝗵 𝘆𝗼𝘂𝗿 𝘁𝗼𝗼 𝘄𝗲𝗮𝗸 𝘁𝗼 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗯𝗼𝘁") ; return};

  
    const texte = arg.join(' ').split(';')[0];
    const tlien = arg.join(' ').split(';')[1]; 


    
await addOrUpdateDataInAlive(texte , tlien)

repondre(' 𝗻𝗼 𝗹𝗼𝘃𝗲 𝗻𝗼 𝘀𝘁𝗿𝗲𝘀𝘀 🚫. ')

}
    });
