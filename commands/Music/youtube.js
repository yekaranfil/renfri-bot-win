const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "youtube",
  description: "Starts a YouTube Together session",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["yt"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {require("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    if (!message.member.voice.channel)
      return client.send(
          message.channel,
        "❌ | **Bir şey çalmak için bir ses kanalında olmalısınız!**"
      );
    if (
      !message.member.voice.channel
        .permissionsFor(message.guild.me)
        .has("CREATE_INSTANT_INVITE")
    )
      return client.send(
        message.channel,
        "❌ | **Bot'un Davet Oluşturma İzni yok**"
      );

    let Invite = await message.member.voice.channel.activityInvite(
      "880218394199220334"
    ); //Made using discordjs-activity package
    let embed = new MessageEmbed()
      .setAuthor(
        "YouTube Together",
        "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1"
      )
      .setColor("#FF0000").setDescription(`
      **YouTube Together**'ı kullanarak YouTube'u arkadaşlarınızla bir Ses Kanalında izleyebilirsiniz. Katılmak için *YouTube'a Birlikte Katılın*'ı tıklayın!
__**[YouTube'a Birlikte Katılın](https://discord.com/invite/${Invite.code})**__
⚠ **Not:** Bu yalnızca Masaüstünde çalışır
`);
    message.channel.send(embed);
  },
  SlashCommand: {
    options: [],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | You must be in a voice channel to use this command."
        );
      if (
        !member.voice.channel
          .permissionsFor(guild.me)
          .has("CREATE_INSTANT_INVITE")
      )
        return client.sendTime(
          interaction,
          "❌ | **Bot doesn't have Create Invite Permission**"
        );

      let Invite = await member.voice.channel.activityInvite(
        "755600276941176913"
      ); //Made using discordjs-activity package
      let embed = new MessageEmbed()
        .setAuthor(
          "YouTube Together",
          "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1"
        )
        .setColor("#FF0000").setDescription(`
Using **YouTube Together** you can watch YouTube with your friends in a Voice Channel. Click *Join YouTube Together* to join in!
__**[Join YouTube Together](https://discord.com/invite/${Invite.code})**__
⚠ **Note:** This only works in Desktop
`);
      interaction.send(embed.toJSON());
    },
  },
};