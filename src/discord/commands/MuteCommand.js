const DiscordCommand = require('../../contracts/DiscordCommand')

class MuteCommand extends DiscordCommand {
  constructor() {
    super()
    
    this.name = 'mute'
    this.aliases = ['m']
  }

  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()
    let time = args.shift()

    this.sendMinecraftMessage(`/g mute ${user ? user : ''} ${time ? time : ''}`)
  }
}

module.exports = MuteCommand
