const chalk = require('chalk')

class StateHandler {
  constructor(discord) {
    this.discord = discord
  }

  async onReady() {
    console.log(chalk.green('Discord client ready, logged in as ' + this.discord.client.user.tag))
    this.discord.client.user.setActivity('Guild Chat', { type: 'WATCHING' })

    await this.discord.messageManager.setupWebhook()
    this.discord.messageManager.broadcastInfoMessage({
      author: { name: `Chat Bridge is Online` },
      color: '7CFC00',
    }, this.discord.client.user.username, this.discord.client.user.avatarURL())
  }
}

module.exports = StateHandler
