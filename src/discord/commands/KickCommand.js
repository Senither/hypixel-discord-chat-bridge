const DiscordCommand = require('../../contracts/DiscordCommand')

class KickCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      return message.reply(`You need to specify a user to kick`)
    } else if (args.length == 1) {
      return message.reply(`You need to give a reason for kicking`)
    }

    let username = args[0]
    let reason = args.slice(1).join(' ')

    this.sendMinecraftMessage(`/g kick ${username} ${reason}`)
    message.reply(`${username} has been kicked from the guild for reason ${reason}`)
  }
}

module.exports = KickCommand
