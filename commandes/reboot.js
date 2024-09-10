const {zokou}=require("../framework/zokou")







zokou({nomCom:"restart",categorie:"Mods",reaction:"☔"},async(dest,z,com)=>{


  
const{repondre,ms,dev,superUser}=com;

  if(!superUser)
  {
    return repondre("This command is for owner or YESSER TEACH");
  }

  const {exec}=require("child_process")

    repondre("YESSER-MD  bot Restarting ⏳");

  exec("pm2 restart all");
  

  



})
