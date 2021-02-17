const DiscordCommand = require('../../contracts/DiscordCommand')

class InviteCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      return message.reply(`You need to specify a user to invite`)
    }

    let username = args[0]

    this.sendMinecraftMessage(`/g invite ${username}`)
    message.reply(`${username} has been invited to the guild`)
  }
}

module.exports = InviteCommand
