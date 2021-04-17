class MessageManager {
  constructor(discord) {
    this.discord = discord
  }

  broadcast(content) {
    if (this.discord.app.config.discord.messageMode == 'bot') {
      this.discord.client.channels.fetch(this.discord.app.config.discord.channel).then(channel => {
        channel.send(content)
      })
    } else {
      this.discord.webhook.send(content)
    }
  }

  setupWebhook() {
    return new Promise((resolve, reject) => {
      this.discord.client.channels.cache.get(this.discord.app.config.discord.channel).fetchWebhooks().then(webhooks => {
        if (webhooks.first()) {
          this.discord.webhook = webhooks.first()
          resolve()
        } else {
          this.discord.client.channels.cache.get(this.discord.app.config.discord.channel).createWebhook(
            this.discord.client.user.username,
            { avatar: this.discord.client.user.avatarURL() }
          ).then(webhook => {
            this.discord.webhook = webhook
            resolve()
          })
        }
      })
    })
  }
}

module.exports = MessageManager