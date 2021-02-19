const DiscordCommand = require('../../contracts/DiscordCommand');
const Discord = require('discord.js-light')

const helpEmbed = new Discord.MessageEmbed()
.setColor('#FFFF00')
.setTitle("Help")
.setDescription("`< >` = Required arguments\n`[ ]` = Optional arguments")
.addFields(
  {name: `Command list`, value:"`!help` - Displays this command list\n`!relog [delay]` - Relogs the MC client, a delay can be given in seconds, if no delay is given it will default to 5 seconds\n`!override <command> [args]` - Executes the string attached. **This is a dangerous permission to grant**\n`!invite <player>` - Invites the specified user to the guild, providing the guild isn't full\n`!kick <user> [reason]` - Kicks the specified user from the guild\n`!promote <user>` - Promotes the specified user by 1 rank\n`!demote <user>` - Demotes the specified user by 1 rank"},
  {name: `Shortcuts`, value: "Help: `!h`\nRelog: `!r`\nInvite: `!i`, `!inv`\nKick: `!k`\nPromote: `!p`, `!up`\nDemote: `!d`, `!down`"}
)
.setTimestamp()
.setFooter('Made by Senither#0001');

class HelpCommand extends DiscordCommand {
  onCommand(message) {
    message
      .reply(helpEmbed)
      .then(helpMessage => setTimeout(() => helpMessage.delete(), 30000))
  }
}

module.exports = HelpCommand
