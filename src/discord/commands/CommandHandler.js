const RelogCommand = require(`./RelogCommand`)
const HelpCommand = require(`./HelpCommand`)
const InviteCommand = require(`./InviteCommand`)
const KickCommand = require(`./KickCommand`)
const PromoteCommand = require(`./PromoteCommand`)
const DemoteCommand = require(`./DemoteCommand`)
const OverrideCommand = require(`./OverrideCommand`)
const MuteCommand = require(`./MuteCommand`)

const chalk = require('chalk')

class CommandHandler {
  constructor(discord) {
    this.discord = discord

    this.prefix = discord.app.config.discord.prefix

    this.commands = [
      {
        trigger: [`${this.prefix}relog`, `${this.prefix}r`],
        handler: new RelogCommand(discord),
      },
      {
        trigger: [`${this.prefix}help`, `${this.prefix}h`],
        handler: new HelpCommand(discord),
      },
      {
        trigger: [`${this.prefix}invite`, `${this.prefix}inv`, `${this.prefix}i`],
        handler: new InviteCommand(discord),
      },
      {
        trigger: [`${this.prefix}kick`, `${this.prefix}k`],
        handler: new KickCommand(discord),
      },
      {
        trigger: [`${this.prefix}promote`, `${this.prefix}up`, `${this.prefix}p`],
        handler: new PromoteCommand(discord),
      },
      {
        trigger: [`${this.prefix}demote`, `${this.prefix}down`, `${this.prefix}d`],
        handler: new DemoteCommand(discord),
      },
      {
        trigger: [`${this.prefix}override`, `${this.prefix}or`, `${this.prefix}o`],
        handler: new OverrideCommand(discord),
      },
      {
        trigger: [`${this.prefix}mute`, `${this.prefix}m`],
        handler: new MuteCommand(discord),
      },
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
    if (message.content == `${this.prefix}h` || message.content == `${this.prefix}help`) {
      return command.handler.onCommand(message)
    }

    if (!this.isCommander(message.member)) {
      return message.reply("You're not allowed to run this command!")
    }

    if (command.handler.constructor.name == 'OverrideCommand' && !this.isOwner(message.member)) {
      return message.reply("You're not allowed to run this command!")
    }

    console.log(chalk.grey(`Discord Command Handler > [${command.handler.constructor.name}] ${message.content}`))

    command.handler.onCommand(message)
  }

  isCommander(member) {
    return member.roles.cache.find(r => r.id == this.discord.app.config.discord.commandRole)
  }

  isOwner(member) {
    return member.id == this.discord.app.config.discord.ownerId
  }
}

module.exports = CommandHandler
