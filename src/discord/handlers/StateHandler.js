const chalk = require('chalk')

class StateHandler {
  constructor(discord) {
    this.discord = discord
  }

  async onReady() {
    console.log(chalk.green('Discord client ready, logged in as ' + this.discord.client.user.tag))
    this.discord.client.user.setActivity('Guild Chat', { type: 'WATCHING' })

    if (this.discord.app.config.discord.messageMode == 'webhook') {
      this.discord.webhook = await this.getWebhook()
    }

    this.discord.messageManager.broadcastInfoMessage({
      author: { name: `Chat Bridge is Online` },
      color: '7CFC00',
    }, this.discord.client.user.username, this.discord.client.user.avatarURL())
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

module.exports = StateHandler