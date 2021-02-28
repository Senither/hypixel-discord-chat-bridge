const DiscordCommand = require('../../contracts/DiscordCommand')
const Discord = require('discord.js-light')
const config = require('../../../config.json')
const prefix = config.discord.prefix
const package = require('../../../package.json')

const helpEmbed = new Discord.MessageEmbed()
  .setTitle('Help')
  .setDescription('`< >` = Required arguments\n`[ ]` = Optional arguments')
  .addFields(
    {
      name: `Command list`,
      value: [
        '`help` - Displays this command list',
        '`relog [delay]` - Relogs the MC client, a delay can be given in seconds, if no delay is given it will default to 5 seconds',
        '`override <command> [args]` - Executes the string attached. **This is a dangerous permission to grant**',
        "`invite <player>` - Invites the specified user to the guild, providing the guild isn't full",
        '`kick <user> [reason]` - Kicks the specified user from the guild',
        '`promote <user>` - Promotes the specified user by 1 rank',
        '`demote <user>` - Demotes the specified user by 1 rank',
        '`mute <user>` - Demotes the specified user by 1 rank',
      ].join('\n'),
    },
    {
      name: `Shortcuts`,
      value: [
        'Help: `h`',
        'Relog: `r`',
        'Override: `o`, `or`',
        'Invite: `i`, `inv`',
        'Kick: `k`',
        'Promote: `p`, `up`',
        'Demote: `d`, `down`',
        'Mute: `m`',
      ].join('\n'),
      inline: true,
    },
    {
      name: `Info`,
      value: [
        `Prefix: \`${prefix}\``,
        `Guild Channel: <#${config.discord.channel}>`,
        //`Officer Channel: \`Still in development\``
        `Command Role: <@&${config.discord.commandRole}>`,
        `Version: \`${package.version}\``,
      ].join('\n'),
      inline: true,
    }
  )
  .setTimestamp()
  .setFooter('Made by Senither and neyoa ❤')

class HelpCommand extends DiscordCommand {
  onCommand(message) {
    message.reply(helpEmbed.setColor(message.guild.me.displayHexColor)).then(helpMessage => {
      setTimeout(() => helpMessage.delete(), 30000)
    })
  }
}

module.exports = HelpCommand
