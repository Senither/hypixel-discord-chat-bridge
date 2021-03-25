const chalk = require('chalk')

class StateHandler {
  constructor(discord) {
    this.discord = discord
  }

  onReady() {
    console.log(chalk.green('Discord client ready, logged in as ' + this.discord.client.user.tag))
  }
}

module.exports = StateHandler
