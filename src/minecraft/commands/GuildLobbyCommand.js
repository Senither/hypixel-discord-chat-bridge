const MinecraftCommand = require('../../contracts/MinecraftCommand')

class GuildLobbyCommand extends MinecraftCommand {
  constructor() {
    super()

    this.name = 'GuildLobby'
    this.aliases = ['globby']
  }

  onCommand(username, message) {
    this.send(`/w ${this.minecraft.app.config.minecraft.lobbyHolder} ?tw ${username}`)
  }
}

module.exports = GuildLobbyCommand
