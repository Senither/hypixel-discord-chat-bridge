const config = require('../../../config.json')

class MessageHandler {
  constructor(discord, command) {
    this.discord = discord
    this.command = command
  }

  onMessage(message) {
    if (!this.shouldBroadcastMessage(message)) {
      return
    }

    if (this.command.handle(message)) {
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
    return !message.author.bot && message.channel.id == config.discord.channel && message.content && message.content.length > 0
  }
}

module.exports = MessageHandler
