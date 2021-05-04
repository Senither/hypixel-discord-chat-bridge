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
        trigger: [`relog`, `r`],
        handler: new RelogCommand(discord),
      },
      {
        trigger: [`help`, `h`],
        handler: new HelpCommand(discord),
      },
      {
        trigger: [`invite`, `inv`, `i`],
        handler: new InviteCommand(discord),
      },
      {
        trigger: [`kick`, `k`],
        handler: new KickCommand(discord),
      },
      {
        trigger: [`promote`, `up`, `p`],
        handler: new PromoteCommand(discord),
      },
      {
        trigger: [`demote`, `down`, `d`],
        handler: new DemoteCommand(discord),
      },
      {
        trigger: [`override`, `or`, `o`],
        handler: new OverrideCommand(discord),
      },
      {
        trigger: [`mute`, `m`],
        handler: new MuteCommand(discord),
      },
    ]
  }

  handle(message) {
    if (!message.content.startsWith(this.prefix)) {
      return false
    }

    const commandTrigger = message.content.toLowerCase().substr(this.prefix.length).split(' ')[0]

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
    if (command.handler.constructor.name == 'HelpCommand') {
      return command.handler.onCommand(message)
    }

    if (!this.isCommander(message.member)) {
      return message.channel.send({
        embed: {
          color: 'DC143C',
          description: `<@!${message.author.id}> You're not allowed to run this command!`
        }
      })
    }

    if (command.handler.constructor.name == 'OverrideCommand' && !this.isOwner(message.member)) {
      return message.channel.send({
        embed: {
          color: 'DC143C',
          description: `<@!${message.author.id}> You're not allowed to run this command!`
        }
      })
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
