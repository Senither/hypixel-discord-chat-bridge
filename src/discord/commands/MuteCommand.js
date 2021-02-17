const DiscordCommand = require('../../contracts/DiscordCommand')

class MuteCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      return message.reply(`You need to specify a user to mute`)
    } else if (args.length == 1) {
      return message.reply(`You need to give a time to mute for`)
    }

    let username = args[0]
    let time = args.slice(1)

    this.sendMinecraftMessage(`/g mute ${username} ${time}`)
    message.reply(`${username} has been muted for ${time}`)
  }
}

module.exports = MuteCommand
