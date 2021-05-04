const DiscordCommand = require('../../contracts/DiscordCommand')

class SetrankCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      return message.reply(`You need to specify a user to set the rank of`)
    } else if (args.length == 1) {
      return message.reply(`You need to give a rank to set`)
    }

    let user = args.shift()
    let rank = args.join(' ')

    this.sendMinecraftMessage(`/g setrank ${user} ${rank}`)
    message.reply(`${user} has had their rank set to ${rank}`)
  }
}

module.exports = SetrankCommand
