const MinecraftCommand = require('../../contracts/MinecraftCommand')

class PingCommand extends MinecraftCommand {
  onCommand(username, message) {
    this.send(`/w ${username} Pong!`)
  }
}

module.exports = PingCommand
