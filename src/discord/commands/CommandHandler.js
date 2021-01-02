const config = require('../../../config.json')
const RelogCommand = require('./RelogCommand')

class CommandHandler {
  constructor(discord) {
    this.commands = [
      {
        trigger: ['!relog', '!r'],
        handler: new RelogCommand(discord),
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
    if (!this.isCommander(message.member)) {
      return message.reply("You're not allowed to run this command!")
    }

    console.log(`Command Handler > [${command.handler.constructor.name}] ${message.content}`)

    command.handler.onCommand(message)
  }

  isCommander(member) {
    return member.roles.cache.find(r => r.id == config.discord.commandRole)
  }
}

module.exports = CommandHandler
