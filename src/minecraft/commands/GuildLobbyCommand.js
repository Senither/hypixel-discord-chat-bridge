const MinecraftCommand = require('../../contracts/MinecraftCommand')

class GuildLobbyCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'guildlobby'
    this.aliases = ['globby']
    this.description = "Whispers user's username to a guild lobby account"
  }

  onCommand(username, message) {
    this.send(`/w ${this.minecraft.app.config.minecraft.lobbyHolder} ?tw ${username}`)
  }
}

module.exports = GuildLobbyCommand
