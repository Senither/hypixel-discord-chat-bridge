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

    this.minecraft.broadcastMessage({ username, message })
  }

  isMessageFromBot(username) {
    return this.bot.username === username
  }
}

module.exports = StateHandler
