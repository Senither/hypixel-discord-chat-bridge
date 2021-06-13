const DiscordCommand = require('../../contracts/DiscordCommand')

class InviteCommand extends DiscordCommand {
  constructor() {
    super()
    
    this.name = 'invite'
    this.aliases = ['i', 'inv']
  }

  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()

    this.sendMinecraftMessage(`/g invite ${user ? user : ''}`)
  }
}

module.exports = InviteCommand
