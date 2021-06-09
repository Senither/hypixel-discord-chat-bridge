const EventHandler = require('../../contracts/EventHandler')

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
      this.minecraft.app.log.minecraft('Sending Minecraft client to limbo')
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
    
    if ((this.isLogEventMessage1(message) || this.isLogEventMessage2(message) || this.isLogEventMessage3(message)) && !this.isGuildMessage(message)) {
      let msg = message.replace(/(\[[A-z\+]+\])+? /gm, "")

      return this.minecraft.broadcastEventLog(msg)
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
    if (playerMessage.length == 0 || this.command.handle(username, playerMessage)) {
      return
    }

    if (playerMessage == '@') {
      return
    }

    console.log(playerMessage)

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
  
  isLogEventMessage1(message) {
    return message.endsWith(" joined the guild!") || message.endsWith(" left the guild!") || (message.includes(" was kicked from the guild by ") && message.endsWith('!'))
  }

  isLogEventMessage2(message) {
    return (message.includes(" has muted ") && message.includes(" for ")) || message.includes(" has unmuted ")
  }

  isLogEventMessage3(message) {
    return (message.includes(" was promoted from ") || message.includes(" was demoted from ")) && message.includes(" to ")
  }
}

module.exports = StateHandler
