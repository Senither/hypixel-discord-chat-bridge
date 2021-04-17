class MessageManager {
  constructor(discord) {
    this.discord = discord
  }

  broadcastMessage(message, username, icon) {
    switch (this.discord.app.config.discord.messageMode.toLowerCase()) {
      case 'bot':
        this.discord.client.channels.fetch(this.discord.app.config.discord.channel).then(channel => {
          channel.send(message)
        })
        break
      case 'webhook':
        this.discord.webhook.send(
          message, { username: username, avatarURL: icon }
        )
        break
      default:
        throw new Error('Invalid message mode: must be bot or webhook')
    }
  }

  broadcastEmbed(embed, username, icon) {
    switch (this.discord.app.config.discord.messageMode.toLowerCase()) {
      case 'bot':
        this.discord.client.channels.fetch(this.discord.app.config.discord.channel).then(channel => {
          channel.send(embed)
        })
        break
      case 'webhook':
        this.discord.webhook.send(
          { username: username, avatarURL: icon, embeds: [embed] }
        )
        break
      default:
        throw new Error('Invalid message mode: must be bot or webhook')
    }
  }

  async setupWebhook() {
    if (this.discord.app.config.discord.messageMode != 'bot') {
      this.discord.webhook = await this.getWebhook()
    }
  }

  async getWebhook() {
    let channel = this.discord.client.channels.cache.get(this.discord.app.config.discord.channel)
    let webhooks = await channel.fetchWebhooks()
    if (webhooks.first()) {
      return webhooks.first()
    } else {
      var res = await channel.createWebhook(this.discord.client.user.username, {
        avatar: this.discord.client.user.avatarURL(),
      })
      return res
    }
  }
}

module.exports = MessageManager