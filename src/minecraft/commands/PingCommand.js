const MinecraftCommand = require('../../contracts/MinecraftCommand')

class PingCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'ping'
    this.aliases = []
    this.description = 'Replies with `Pong!` to the user'
  }

  onCommand(username, message) {
    this.send(`/w ${username} Pong!`)
  }
}

module.exports = PingCommand
