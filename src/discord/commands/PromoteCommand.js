const DiscordCommand = require('../../contracts/DiscordCommand')

class PromoteCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      message.reply(`You need to specify a user to promote`)
    }

    let username = args[0]

    this.sendMinecraftMessage(`/g promote ${username}`)
    message.reply(`${username} has been promoted`)
  }
}

module.exports = PromoteCommand
