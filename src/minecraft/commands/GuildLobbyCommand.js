const config = require('../../../config.json')
const MinecraftCommand = require('../../contracts/MinecraftCommand')

class GuildLobbyCommand extends MinecraftCommand {
  onCommand(username, message) {
    this.send(`/w ${config.minecraft.lobbyHolder} ?tw ${username}`)
  }
}

module.exports = GuildLobbyCommand
