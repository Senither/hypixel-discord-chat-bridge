const DiscordCommand = require('../../contracts/DiscordCommand')

class DemoteCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      return message.reply(`You need to specify a user to demote`)
    }

    let username = args[0]

    this.sendMinecraftMessage(`/g demote ${username}`)
    message.reply(`${username} has been demoted`)
  }
}

module.exports = DemoteCommand
