const DiscordCommand = require('../../contracts/DiscordCommand')
const { version } = require('../../../package.json')

class HelpCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)
  }

  onCommand(message) {
    message.channel.send({
      embed: {
        title: 'Help',
        description: '`< >` = Required arguments\n`[ ]` = Optional arguments',
        fields: [
          {
            name: `Command list`,
            value: [
              '`help` - Displays this command list',
              '`relog [delay]` - Relogs the MC client, a delay can be given in seconds, if no delay is given it will default to 5 seconds',
              '`execute <command> [args]` - Executes the string attached. **This is a dangerous permission to grant**',
              "`invite <player>` - Invites the specified user to the guild, providing the guild isn't full",
              '`kick <user> [reason]` - Kicks the specified user from the guild',
              '`setrank <user> <rank>` - Sets the specified user to the given guild rank',
              '`mute <user> [time]` - Mutes the specified user by some amount of time',
              '`unmute <user>` - Unmutes the specified user',
            ].join('\n'),
          },
          {
            name: `Shortcuts`,
            value: [
              'Help: `h`',
              'Relog: `r`',
              'Execute: `e`, `exec`',
              'Invite: `i`, `inv`',
              'Kick: `k`',
              'Setrank: `set`, `rank`',
              'Mute: `m`',
              'Unmute: `um`',
            ].join('\n'),
            inline: true,
          },
          {
            name: `Info`,
            value: [
              `Prefix: \`${this.discord.app.config.discord.prefix}\``,
              `Guild Channel: <#${this.discord.app.config.discord.channel}>`,
              `Command Role: <@&${this.discord.app.config.discord.commandRole}>`,
              `Version: \`${version}\``,
            ].join('\n'),
            inline: true,
          }
        ],
        timestamp: new Date(),
        footer: {
          text: 'Made by Senither and neyoa ❤'
        },
        color: message.guild.me.displayHexColor
      }
    }).then(helpMessage => {
      setTimeout(() => {
        helpMessage.delete()
        if (message.deletable) {
          message.delete()
        }
      }, 30000)
    })
  }
}

module.exports = HelpCommand
