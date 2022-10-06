const Discord = require("discord.js");
const { MessageButton } = require('discord-buttons');


module.exports = {
    name: "Kullanıcı",
    description: "s",
    usage: "",
    enabled: true,
    guildOnly: false,
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: [],




run : (client, message, args) => {
    const erkekrol = "842905946928709672" //erkek rolünün id sini "842905946928709672" arasına giriniz
    const kadınrol = "751151400536375314" //kadın rolünün id sini "842905946928709672" arasına giriniz
    const kayitsizrol = "888087615981641778" //kayıtsız rolünü girin
    const kayıtrol = ["751135931150499880"] //kayıt yetkililerinin rolünü girin
    const tag1 = "" //sunucunuzun tagını girin
    const tagsız = "" //sunucunuzda tag yoksa kişinin isminin başına ne eklenmeliyse onu girin
    const xerkekemoji = "👨" 
    const xkızemoji = "👩" 
    const xiptalemoji = "❌" 
    const xonayemoji = "✅" 
    if(!kayıtrol.some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args.join(' '))
    if(!uye) return message.channel.send("Bir kullanıcı girin.")
    const isim = args[1];
    const yas = args[2];
    if(!isim) return message.channel.send("Bir isim girin.")
    if(!yas) return message.channel.send("Bir yaş girin.")
    const buttonErkek = new MessageButton()
    .setStyle('blurple')
    .setLabel(xerkekemoji)
    .setID('buttonErkek')

    const buttonKadın = new MessageButton()
    .setStyle('blurple')
    .setLabel(xkızemoji)
    .setID('buttonKadın')

    const buttoniptal = new MessageButton()
    .setStyle('red')
    .setLabel(xiptalemoji)
    .setID('buttoniptal')

    message.channel.send("**Kişiye Ne Olarak Kaydetmek İstediğinizi Seçiniz**", {buttons: [buttonErkek, buttonKadın, buttoniptal]}).then(async function(sent) {
        sent.createButtonCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
            if(button.id == "buttonErkek") {
                uye.setNickname(`${tag1} ${isim} | ${yas}`)
            const tag = uye.user.username.includes(tag1) ? tag1 : (tagsız === "" ? tag1 : tagsız);
                uye.roles.add(erkekrol).catch()
                uye.roles.remove(kayitsizrol).catch()    
                const embed = new Discord.MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`uye başarıyla erkek olarak kayıt edildi`)
                message.channel.send(embed)
                await message.react(xonayemoji)
                button.reply.defer()
            } else if(button.id =="buttonKadın") {
                uye.setNickname(`${tag1} ${isim} | ${yas}`)
            const tag = uye.user.username.includes(tag1) ? tag1 : (tagsız === "" ? tag1 : tagsız);
                uye.roles.add(kadınrol)
                uye.roles.remove(kayitsizrol).catch()
                const embed = new Discord.MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`uye başarıyla kadin olarak kayıt edildi`)
                message.channel.send(embed)
                await message.react(xonayemoji)
                button.reply.defer()
            } else if(button.id == "buttoniptal") {
                button.reply.defer()
                sent.delete()
            }
        })
    })

}
    }
