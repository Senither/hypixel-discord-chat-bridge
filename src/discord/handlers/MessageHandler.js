const config = require('../../../config.json')

class MessageHandler {
  constructor(discord) {
    this.discord = discord
  }

  onMessage(message) {
    if (! this.shouldBroadcastMessage(message)) {
      return
    }

    this.discord.broadcastMessage({
      username: message.member.displayName,
      message: message.content
    })
  }

  shouldBroadcastMessage(message) {
    return this.discord.client.user.id != message.author.id
        && message.channel.id == config.discord.channel
        && message.content
        && message.content.length > 0
  }
}


module.exports = MessageHandler
