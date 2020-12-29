const EventHandler = require('../../contracts/EventHandler')

class StateHandler extends EventHandler {
  registerEvents(bot) {
    this.bot = bot

    this.bot.on('error', (...args) => this.onError(...args))
  }

  onError(error) {
    if (this.isConnectionResetError(error)) {
      return
    }

    console.error('Minecraft Bot Error: ', error)
  }

  isConnectionResetError(error) {
    return error.hasOwnProperty('code')
        && error.code == 'ECONNRESET'
  }
}

module.exports = StateHandler
