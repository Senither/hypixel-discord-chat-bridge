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

    if (! this.isGuildMessage(message)) {

      let state = null
      let username = null

      if (this.isGuildLogMessage(message)) {
        // Format: [rank] [player] ____ the guild!
        let parts = message.split(' ')
        state = parts[parts.length - 3]
        username = parts[parts.length - 4]
      }

      else if(this.isGuildKickMessage(message)) {
        // Format: [rank] [player] was kicked from the guild by [rank] [player]!"
        let parts = message.split(' was kicked ')
        state = 'kicked'

        let userParts = parts.shift().split(' ')
        username = userParts[userParts.length - 1]
      }

      if (state !== null) {
        this.minecraft.broadcastMessage({
          username: username,
          message: state,
          type: 'guildLog'
        })
      }

      return
    }

    // Verified that message has "Guild >"

    if (!this.isChatMessage(message) &&
        this.isNetworkMessage(message)) {

      // Format: Guild > [player] ___.
      let parts = message.split(' ')
      let state = parts[parts.length - 1].slice(0, -1)
      let username = parts[parts.length - 2]

      this.minecraft.broadcastMessage({
        username: username,
        message: state,
        type: 'network'
      })

      return
    }

    let parts = message.split(':')
    let group = parts.shift().trim()
    let hasRank = group.endsWith(']')

    let userParts = group.split(' ')
    let username = userParts[
      userParts.length - (hasRank ? 2 : 1)
    ]

    if (this.isMessageFromBot(username)) {
      return
    }

    this.minecraft.broadcastMessage({
      username: username,
      message: parts.join(':').trim(),
      type: 'message',
    })
  }

  isMessageFromBot(username) {
    return this.bot.username === username
  }

  isLobbyJoinMessage(message) {
    return (
        message.endsWith(' the lobby!')
     || message.endsWith(' the lobby! <<<')
    ) && message.includes('[MVP+')
  }

  isGuildMessage(message) {
    return message.startsWith('Guild >')
  }

  isChatMessage(message) {
    return message.includes(':')
  }

  // Guild join and leave messages
  // [rank] [player] joined the guild!
  // [rank] [player] left the guild!
  // [rank] [player] was kicked from the guild by [rank] [player]!

  isGuildLogMessage(message) {
    return message.endsWith('joined the guild!')
        || message.endsWith('left the guild!')
  }

  isGuildKickMessage(message) {
    return message.includes('was kicked from the guild by')
  }

  // Network join and leave messages
  // Guild > [player] joined.
  // Guild > [player] left.

  isNetworkMessage(message){
    return message.endsWith('joined.')
        || message.endsWith('left.')
  }
}

module.exports = StateHandler
