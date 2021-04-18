const CommunicationBridge = require('../contracts/CommunicationBridge')
const StateHandler = require('./handlers/StateHandler')
const MessageHandler = require('./handlers/MessageHandler')
const CommandHandler = require('./commands/CommandHandler')
const MessageManager = require('./MessageManager')
const Discord = require('discord.js-light')
const chalk = require('chalk')

class DiscordManager extends CommunicationBridge {
  constructor(app) {
    super()

    this.app = app

    this.messageManager = new MessageManager(this)
    this.stateHandler = new StateHandler(this)
    this.messageHandler = new MessageHandler(this, new CommandHandler(this))
  }

  connect() {
    this.client = new Discord.Client({
      cacheGuilds: true,
      cacheChannels: true,
      cacheOverwrites: false,
      cacheRoles: true,
      cacheEmojis: false,
      cachePresences: false,
    })

    this.client.on('ready', () => this.stateHandler.onReady())
    this.client.on('message', message => this.messageHandler.onMessage(message))

    this.client.login(this.app.config.discord.token).catch(error => {
      console.error('Discord Bot Error: ', error)
    })

    process.on('SIGINT', () => this.stateHandler.onClose())
  }

  onBroadcast({ username, message, guildRank }) {
    console.log(chalk.blue(`Discord Broadcast > ${username} [${guildRank}]: ${message}`))
    this.messageManager.broadcastGuildMessage(message, username, guildRank)
  }

  onLogin(username) {
    console.log(chalk.blue(`Discord Broadcast > ${username} joined`))
    this.messageManager.broadcastPlayerLogin(username)
  }

  onLogout(username) {
    console.log(chalk.blue(`Discord Broadcast > ${username} left`))
    this.messageManager.broadcastPlayerLogout(username)
  }
}

module.exports = DiscordManager
