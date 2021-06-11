const DiscordCommand = require('../../contracts/DiscordCommand')

class DemoteCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()

    this.sendMinecraftMessage(`/g demote ${user ? user : ''}`)
  }
}

module.exports = DemoteCommand
