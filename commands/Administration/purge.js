const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = {
  
        name: "purge",
        aliases: ["delete", "clear", 'prune'],
        category: "Moderation",
        description: "Deletes messages from a channel",
        usage: "delete [amount of messages]",
        accessableby: "Administrator",
    memberpermissions: ["ADMINISTRATOR"],

    run: async (client, message, args, user, text, prefix) => {
        if (isNaN(args[0]))
            return message.channel.send('**Please Supply A Valid Amount To Delete Messages!**');

        if (args[0] > 100)
            return message.channel.send("**Please Supply A Number Less Than 100!**");

        if (args[0] < 1)
            return message.channel.send("**Please Supply A Number More Than 1!**");

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`**Succesfully deleted \`${messages.size}/${args[0]}\` messages**`)
            .then(msg => msg.delete({ timeout: 2000 })))
            .catch(() => null)
			let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                 .setColor(`#a20808`)
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Moderation", "Purge")
                .addField("Messages", `${args[0]}`)
                .addField("Channel ID", `${message.channel.id}`)
                .addField("Used by:", message.author.username)
                .addField("Date", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
    }
}