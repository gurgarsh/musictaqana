const Discord = require(`discord.js`);
const { Client, Collection, MessageEmbed,MessageAttachment } = require(`discord.js`);
const { readdirSync } = require(`fs`);
const { join } = require(`path`);
const db = require('quick.db');
const { TOKEN, PREFIX, AVATARURL, BOTNAME, } = require(`./config.json`);
const figlet = require("figlet");
const client = new Client({ disableMentions: `` , partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.login('NzkyMDQ3MjA0MzYxMTc1MDkx.X-YBcQ.OelK5nNtlhMDKiYxb6sw1ytlP_0');
client.commands = new Collection();
client.setMaxListeners(0);
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);

//this fires when the BOT STARTS DO NOT TOUCH
client.on(`ready`, () => {	
//////////////

////////
   
   ///////////////////////////////
    ////////////IFCHEMPTY//////////
        //remove everything in between those 2 big comments if you want to disable that the bot leaves when ch. or queue gets empty!
        setInterval(() => { 
          let member;
        client.guilds.cache.forEach(async guild =>{
        await delay(15);
          member = await client.guilds.cache.get(guild.id).members.cache.get(client.user.id)
        //if not connected
          if(!member.voice.channel)
          return;
        //if alone 
        if (member.voice.channel.members.size === 1) 
        { return member.voice.channel.leave(); }
      });
      
   
     client.user.setActivity(`${PREFIX}help | Music Bot`, { type: "LISTENING"});   
           
           
     client.user.setActivity(`${client.guilds.cache.size} Guilds | Users ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`, { type: "LISTENING"});
           
           
      }, (5000));    
      ////////////////////////////////
      ////////////////////////////////
    figlet.text(`${client.user.username} ready!`, function (err, data) {
      if (err) {
          console.log('Something went wrong');
          console.dir(err);
      }
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
      console.log(data)
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
    })
   
});
//DO NOT TOUCH
//FOLDERS:
//Admin custommsg data FUN General Music NSFW others
commandFiles = readdirSync(join(__dirname, `Music`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Music`, `${file}`));
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `others`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `others`, `${file}`));
  client.commands.set(command.name, command);
}
//COMMANDS //DO NOT TOUCH
client.on(`message`, async (message) => {
  if (message.author.bot) return;
  
  //getting prefix 
  let prefix = await db.get(`prefix_${message.guild.id}`)
  //if not prefix set it to standard prefix in the config.json file
  if(prefix === null) prefix = PREFIX;

  //information message when the bot has been tagged
  if(message.content.includes(client.user.id)) {
    message.reply(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(`${message.author.username}, My Prefix is ${prefix}, to get started; type ${prefix}help`, message.author.displayAvatarURL({dynamic:true})));
  } 
   
   //An embed announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}embed`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(saymsg)
    .setAuthor(message.author.username,message.author.avatarURL())
    .setFooter(message.author.username, message.author.displayAvatarURL)
    .setTimestamp()
    //delete the Command
    message.delete({timeout: 300})
    //send the Message
    message.channel.send(embed)
  }

if(message.content.startsWith(`${prefix}invite`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
     message.react("<a:setting:813404135181385759>").catch(console.error);
    const embed = new Discord.MessageEmbed()
    .setDescription("<a:rast:813403866472251399> **[Click here](https://discord.com/api/oauth2/authorize?client_id=792047204361175091&permissions=8&scope=bot) to invite the bot.**")
    .setColor("RANDOM")
    //send the Message
    message.author.send(embed)
  } 
   
//An slots announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}slots`)){
  //define the temporary Embed
    let temEmbed = new MessageEmbed()
    .setDescription("<a:slots:816723092763574303><a:slots:816723092763574303><a:slots:816723092763574303>")
    .setColor("RANDOM")
    //send it and safe it in a variable
    let result = await message.channel.send(temEmbed)
    //define lyrics Embed
    let lyricsEmbed = new MessageEmbed()
      .setTitle("✳️ | Lyrics")
      .setDescription(lyrics)
      .setColor("RANDOM")
    //if to long make slice it
    if (lyricsEmbed.description.length >= 2048)
      //slice the embed description and redefine it
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
      //edit to approve
    return result.edit(lyricsEmbed).catch(console.error);
  }   
  
   //An help announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}help`)){
    //define saymsg
    message.react("<a:yes:813397195771740182>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setThumbnail(`https://cdn.discordapp.com/attachments/795388713659269150/813727451204812820/fc9a04b21ba97a192f3afd090c16d96f.png`)
    .setColor("RANDOM")
    .setImage(``)
    .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
    .setAuthor("Remix Bot ✨", "https://cdn.discordapp.com/attachments/795388713659269150/814606427887763456/fc9a04b21ba97a192f3afd090c16d96f.png")
    .setDescription(`
<a:Erore:813505315534405632> **Prefix Bot**
 __**>**__
• ────── <a:dark:813714900777959444> ────── •
<a:discord:813406342173818910> **User Commands**
\`invite\` - \`support\` - \`about\`
\`ping\` - \`prefix\` - \`uptime\` - \`embed\`
• ────── <a:dark:813714900777959444> ────── •
<a:remix:815540220031533087> **Music Commands**
\`play\` - \`skip\` - \`skipto\`
\`stop\` - \`volume\` - \`nowplaying\`
\`shuffle\` - \`search\` - \`resume\`
\`remove\` - \`queue\` - \`filter\`
\`loop\` - \`lyrics\` - \`radio\`
• ────── <a:dark:813714900777959444> ────── •
<:file:813460388057972736> **Gif Commands**
\`boy1\` - \`boy2\` - \`boy3\` - \`boy4\`
\`boy5\` - \`boy6\` - \`boy7\` - \`boy8\`
\`boy9\` - \`girl1\` - \`girl2\`\`girl3\`
\`girl4\` - \`girl5\` - \`girl6\` - \`girl7\`
• ────── <a:dark:813714900777959444> ────── •
<a:links:813729922643263558> **Links**
**[Support](https://discord.gg/FRZ5vAJ4Rm) - [Invite](https://discord.com/api/oauth2/authorize?client_id=792047204361175091&permissions=8&scope=bot)**

`)

    //send the Message
    message.channel.send(embed)
  }
   
 client.on("guildCreate" , DarkMan => {
  if(DarkMan.memberCount < 250){
    console.log(`  name ( ${DarkMan.name} ) zhmaray memberakan ( ${DarkMan.memberCount}) created by DarkMan`)//by DarkMan
    DarkMan.leave();
  }
})  
   
//An suuport announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}support`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription (`

  <a:links:813729922643263558>  **Links**

[Support Sever](https://discord.gg/FRZ5vAJ4Rm)
====
[Add Bot](https://discord.com/api/oauth2/authorize?client_id=792047204361175091&permissions=8&scope=bot)`)
    .setFooter(message.author.username, message.author.displayAvatarURL)
    .setImage(``)
    .setTitle(`<a:discord:813406342173818910> __**Support Remix Bot**__ <a:discord:813406342173818910>`) 
    .setThumbnail(`https://cdn.discordapp.com/attachments/795388713659269150/814606427887763456/fc9a04b21ba97a192f3afd090c16d96f.png`)
    .setTimestamp()
    
    //send the Message
    message.channel.send(embed)
  }  
   
//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}boy1`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/813646250871095337/813689623364239370/giphy.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }
   
//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}boy2`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/811929643027398677/816395234648784926/20210228_004338.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }
   
//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}boy3`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/813646250871095337/813689882203521095/image0_44.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }
   
//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}boy4`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/813646250871095337/813689927567933449/image0_24.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }
   
//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}boy5`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/796122909533405195/815540935924252682/image0-7.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }
   
//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}boy6`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/813646250871095337/815618863588311050/image0.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  } 
   
//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}boy7`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/813646250871095337/815618240771391519/image0.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }
   
//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}boy8`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/813646250871095337/815618862547468350/image0.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }
   
//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}boy9`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/813646250871095337/815618832067854406/image0.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }
   
 //An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}girl1`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/793945035455856660/816385790246256690/image0.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }

//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}girl2`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://media.discordapp.net/attachments/811677719003529226/811846974814158958/image0.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }

//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}girl3`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/793945035455856660/816386252684525658/image0.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }

//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}girl4`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/793945035455856660/816385946580025414/image0.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }

//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}girl5`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/793945035455856660/816385865500459008/image0.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }

//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}girl6`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/793945035455856660/816385827529424906/image0.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }
   
//An gif announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}girl7`)){
    //define saymsg
    message.react("<a:DarkMan:814434932591820812>").catch(console.error);
     const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/793945035455856660/816385719274307654/image0.gif`)
    .setColor("RANDOM")

    //send the Message
    message.channel.send(embed)
  }
   
//An about announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}about`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("About Remix Bot.", "https://cdn.discordapp.com/emojis/813397195771740182.gif?v=1")
    .setThumbnail(`https://cdn.discordapp.com/attachments/637301756610740234/811675308536102982/20210217_195031.gif`)
    .setFooter(message.author.username, message.author.displayAvatarURL)
    .setTimestamp()
    .setDescription(`

**[Support](https://discord.gg/FRZ5vAJ4Rm)** | **[Invite](https://discord.com/api/oauth2/authorize?client_id=792047204361175091&permissions=8&scope=bot)**
<a:rast:813403866472251399> \`Owner Bot :\`
<@637299944939585576>
◈ ━━━━━━━━ ● ━━━━━━━━ ◈
<a:waya:813455060864073788> \`Set Status :\`
 **Online**
◈ ━━━━━━━━ ● ━━━━━━━━ ◈
<a:time:813403485902864435> \`Time Create :\`
**Dec 25, 2020**
◈ ━━━━━━━━ ● ━━━━━━━━ ◈
<a:DarkMan:813510767386165263> \`Prefix Bot :\`
__** **>** **__
◈ ━━━━━━━━ ● ━━━━━━━━ ◈
<a:setting:813404135181385759> \`Moderation :\`
**Music Bot**

`)

    //send the Message
    message.channel.send(embed)
  }    
   
//command Handler DO NOT TOUCH
 const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
 if (!prefixRegex.test(message.content)) return;
 const [, matchedPrefix] = message.content.match(prefixRegex);
 const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
 const commandName = args.shift().toLowerCase();
 const command =
   client.commands.get(commandName) ||
   client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
 if (!command) return;
 if (!cooldowns.has(command.name)) {
   cooldowns.set(command.name, new Collection());
 }
 const now = Date.now();
 const timestamps = cooldowns.get(command.name);
 const cooldownAmount = (command.cooldown || 1) * 1000;
 if (timestamps.has(message.author.id)) {
   const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
   if (now < expirationTime) {
     const timeLeft = (expirationTime - now) / 1000;
     return message.reply(
      new MessageEmbed().setColor("RANDOM")
      .setTitle(`<a:halaya:813455108577689601> Please wait \`${timeLeft.toFixed(1)} seconds\` before reusing the \`${prefix}${command.name}\`!`)    
     );
   }
 }
 timestamps.set(message.author.id, now);
 setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
 try {
   command.execute(message, args, client);
 } catch (error) {
   console.error(error);
   message.reply( new MessageEmbed().setColor("RANDOM")
   .setTitle(`<a:halaya:813455108577689601> There was an error executing that command.`)).catch(console.error);
 }


});
function delay(delayInms) {
 return new Promise(resolve => {
   setTimeout(() => {
     resolve(2);
   }, delayInms);
 });
}


//Bot coded by DarkMan#2021
