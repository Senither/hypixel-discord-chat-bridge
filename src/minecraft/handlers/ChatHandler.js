const EventHandler = require('../../contracts/EventHandler')

class StateHandler extends EventHandler {
  constructor(minecraft) {
    super()

    this.minecraft = minecraft
  }

  registerEvents(bot) {
    this.bot = bot

    this.bot.on('chat', (...args) => this.onMessage(...args))
  }

  onMessage(username, message) {
    if (this.isMessageFromBot(username)) {
      return
    }

    if (this.isLobbyJoinMessage(message)) {
      return this.bot.chat('/limbo')
    }

    this.minecraft.broadcastMessage({ username, message })
  }

  isMessageFromBot(username) {
    return this.bot.username === username
  }

  isLobbyJoinMessage(message) {
    return message.endsWith(' the lobby!')
        && message.includes('[MVP+')
  }
}

module.exports = StateHandler
