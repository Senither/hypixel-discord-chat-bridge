const DiscordCommand = require('../../contracts/DiscordCommand')
const Discord = require('discord.js-light')

const helpEmbed = new Discord.MessageEmbed()
  .setColor('#FFFF00')
  .setTitle('Help')
  .setDescription('`< >` = Required arguments\n`[ ]` = Optional arguments')
  .addFields(
    {
      name: `Command list`,
      value: [
        '`!help` - Displays this command list',
        '`!relog [delay]` - Relogs the MC client, a delay can be given in seconds, if no delay is given it will default to 5 seconds',
        '`!override <command> [args]` - Executes the string attached. **This is a dangerous permission to grant**',
        "`!invite <player>` - Invites the specified user to the guild, providing the guild isn't full",
        '`!kick <user> [reason]` - Kicks the specified user from the guild',
        '`!promote <user>` - Promotes the specified user by 1 rank',
        '`!demote <user>` - Demotes the specified user by 1 rank',
        '`!mute <user>` - Demotes the specified user by 1 rank',
      ].join('\n'),
    },
    {
      name: `Shortcuts`,
      value: [
        'Help: `!h`',
        'Relog: `!r`',
        'Override: `!o`, `!or`',
        'Invite: `!i`, `!inv`',
        'Kick: `!k`',
        'Promote: `!p`, `!up`',
        'Demote: `!d`, `!down`',
        'Mute: `!m`',
      ].join('\n'),
    }
  )
  .setTimestamp()
  .setFooter('Made by Senither#0001')

class HelpCommand extends DiscordCommand {
  onCommand(message) {
    message.reply(helpEmbed).then(helpMessage => {
      setTimeout(() => helpMessage.delete(), 30000)
    })
  }
}

module.exports = HelpCommand
