const MinecraftCommand = require('../../contracts/MinecraftCommand')

class PingCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'ping'
    this.aliases = []
  }

  onCommand(username, message) {
    this.send(`/w ${username} Pong!`)
  }
}

module.exports = PingCommand
