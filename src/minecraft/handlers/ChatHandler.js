const EventHandler = require('../../contracts/EventHandler')
const CommandHandler = require('../commands/CommandHandler')
const chalk = require('chalk')

class StateHandler extends EventHandler {
  constructor(minecraft, command) {
    super()

    this.minecraft = minecraft
    this.command = command
  }

  registerEvents(bot) {
    this.bot = bot

    this.bot.on('message', (...args) => this.onMessage(...args))
  }

  onMessage(event) {
    const message = event.toString().trim()

    if (this.isLobbyJoinMessage(message)) {
      console.log(chalk.yellow('Sending Minecraft client to limbo'))
      return this.bot.chat('/ac §')
    }

    if (this.isLoginMessage(message)) {
      let user = message.split('>')[1].trim().split('joined.')[0].trim()

      return this.minecraft.broadcastLogin(user)
    }

    if (this.isLogoutMessage(message)) {
      let user = message.split('>')[1].trim().split('left.')[0].trim()

      return this.minecraft.broadcastLogout(user)
    }

    if (!this.isGuildMessage(message)) {
      return
    }

    let parts = message.split(':')
    let group = parts.shift().trim()
    let hasRank = group.endsWith(']')

    let userParts = group.split(' ')
    let username = userParts[userParts.length - (hasRank ? 2 : 1)]
    let guildRank = userParts[userParts.length - 1].replace(/[\[\]]/g, '')

    if (guildRank == username) {
      guildRank = 'Member'
    }

    if (this.isMessageFromBot(username)) {
      return
    }

    const playerMessage = parts.join(':').trim()
    if (this.command.handle(username, playerMessage)) {
      return
    }

    this.minecraft.broadcastMessage({
      username: username,
      message: playerMessage,
      guildRank: guildRank,
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

  isLoginMessage(message) {
    return message.startsWith('Guild >') && message.endsWith('joined.') && !message.includes(':')
  }

  isLogoutMessage(message) {
    return message.startsWith('Guild >') && message.endsWith('left.') && !message.includes(':')
  }
}

module.exports = StateHandler
