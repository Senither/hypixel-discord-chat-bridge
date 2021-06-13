const DiscordCommand = require('../../contracts/DiscordCommand')

class PromoteCommand extends DiscordCommand {
  constructor() {
    super()

    this.name = 'promote'
    this.aliases = ['p', 'up']
  }

  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()

    this.sendMinecraftMessage(`/g promote ${user ? user : ''}`)
  }
}

module.exports = PromoteCommand
