const EventHandler = require('../../contracts/EventHandler')

class StateHandler extends EventHandler {
  constructor(minecraft) {
    super()

    this.minecraft = minecraft
  }

  registerEvents(bot) {
    this.bot = bot

    this.bot.on('message', (...args) => this.onMessage(...args))
  }

  onMessage(event) {
    const message = event.toString().trim()

    if (this.isLobbyJoinMessage(message)) {
      console.log('Sending Minecraft client to limbo')

      return this.bot.chat('/limbo')
    }

    if (!this.isGuildMessage(message)) {
      return
    }

    let parts = message.split(':')
    let group = parts.shift().trim()
    let hasRank = group.endsWith(']')

    let userParts = group.split(' ')
    let username = userParts[userParts.length - (hasRank ? 2 : 1)]

    if (this.isMessageFromBot(username)) {
      return
    }

    this.minecraft.broadcastMessage({
      username: username,
      message: parts.join(':').trim(),
    })
  }

  isMessageFromBot(username) {
    return this.bot.username === username
  }

  isLobbyJoinMessage(message) {
    return (message.endsWith(' the lobby!') || message.endsWith(' the lobby! <<<')) && message.includes('[MVP+')
  }

  isGuildMessage(message) {
    return message.startsWith('Guild >') && message.includes(':')
  }
}

module.exports = StateHandler
