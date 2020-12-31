const config = require('../../../config.json')

class MessageHandler {
  constructor(discord) {
    this.discord = discord
  }

  onMessage(message) {
    if (!this.shouldBroadcastMessage(message)) {
      return
    }

    const content = this.stripDiscordContent(message.content).trim()
    if (content.length == 0) {
      return
    }

    this.discord.broadcastMessage({
      username: message.member.displayName,
      message: this.stripDiscordContent(message.content),
    })
  }

  stripDiscordContent(message) {
    return message
      .replace(/<[@|#|!|&]{1,2}(\d+){16,}>/g, '\n')
      .replace(/<:\w+:(\d+){16,}>/g, '\n')
      .replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, '\n')
      .split('\n')
      .map(part => {
        part = part.trim()

        return part.length == 0 ? '' : part + ' '
      })
      .join('')
  }

  shouldBroadcastMessage(message) {
    return (
      this.discord.client.user.id != message.author.id &&
      message.channel.id == config.discord.channel &&
      message.content &&
      message.content.length > 0
    )
  }
}

module.exports = MessageHandler
