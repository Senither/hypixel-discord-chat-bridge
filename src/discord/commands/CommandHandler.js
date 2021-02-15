const config = require('../../../config.json')
const RelogCommand = require('./RelogCommand')
const HelpCommand = require('./HelpCommand')
const InviteCommand = require('./InviteCommand')
const KickCommand = require('./KickCommand')
const PromoteCommand = require('./PromoteCommand')
const DemoteCommand = require('./DemoteCommand')
const OverrideCommand = require('./OverrideCommand')
const MuteCommand = require('./MuteCommand')

class CommandHandler {
  constructor(discord) {
    this.commands = [
      {
        trigger: ['!relog', '!r'],
        handler: new RelogCommand(discord),
      },
      {
        trigger: ['!help', '!h'],
        handler: new HelpCommand(discord),
      },
      {
        trigger: ['!invite', '!inv', '!i'],
        handler: new InviteCommand(discord),
      },
      {
        trigger: ['!kick', '!k'],
        handler: new KickCommand(discord),
      },
      {
        trigger: ['!promote', '!up', '!p'],
        handler: new PromoteCommand(discord),
      },
      {
        trigger: ['!demote', '!down', '!d'],
        handler: new DemoteCommand(discord),
      },
      {
        trigger: ['!override', '!or', '!o'],
        handler: new OverrideCommand(discord),
      },
      {
        trigger: ['!mute', '!m'],
        handler: new MuteCommand(discord),
      }
    ]
  }

  handle(message) {
    const commandTrigger = message.content.toLowerCase().split(' ')[0]

    for (let command of this.commands) {
      for (let trigger of command.trigger) {
        if (trigger == commandTrigger) {
          this.runCommand(command, message)

          return true
        }
      }
    }

    return false
  }

  runCommand(command, message) {
    if (!this.isCommander(message.member)) {
      return message.reply("You're not allowed to run this command!")
    }

    console.log(`Discord Command Handler > [${command.handler.constructor.name}] ${message.content}`)

    command.handler.onCommand(message)
  }

  isCommander(member) {
    return member.roles.cache.find(r => r.id == config.discord.commandRole)
  }
}

module.exports = CommandHandler
