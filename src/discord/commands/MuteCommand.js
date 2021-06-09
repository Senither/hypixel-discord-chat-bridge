const DiscordCommand = require('../../contracts/DiscordCommand')

class MuteCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()
    let time = args.shift()

    this.sendMinecraftMessage(`/g mute ${user ? user : ''} ${time ? time : ''}`)
  }
}

module.exports = MuteCommand
