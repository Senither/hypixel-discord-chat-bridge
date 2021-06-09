const DiscordCommand = require('../../contracts/DiscordCommand')

class KickCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()
    let reason = args.join(' ')

    this.sendMinecraftMessage(`/g kick ${user ? user : ''} ${reason ? reason : ''}`)
  }
}

module.exports = KickCommand
