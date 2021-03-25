const CommunicationBridge = require('../contracts/CommunicationBridge')
const CommandHandler = require('./commands/CommandHandler')
const StateHandler = require('./handlers/StateHandler')
const ErrorHandler = require('./handlers/ErrorHandler')
const ChatHandler = require('./handlers/ChatHandler')
const mineflayer = require('mineflayer')
const chalk = require('chalk')

class MinecraftManager extends CommunicationBridge {
  constructor(app) {
    super()

    this.app = app

    this.stateHandler = new StateHandler(this)
    this.errorHandler = new ErrorHandler(this)
    this.chatHandler = new ChatHandler(this, new CommandHandler(this))
  }

  connect() {
    this.bot = this.createBotConnection()

    this.errorHandler.registerEvents(this.bot)
    this.stateHandler.registerEvents(this.bot)
    this.chatHandler.registerEvents(this.bot)
  }

  createBotConnection() {
    return mineflayer.createBot({
      host: this.app.config.server.host,
      port: this.app.config.server.port,
      username: this.app.config.minecraft.username,
      password: this.app.config.minecraft.password,
      version: false,
      auth: this.app.config.minecraft.accountType,
    })
  }

  onBroadcast({ username, message }) {
    console.log(chalk.blue(`Minecraft Broadcast > ${username}: ${message}`))

    if (this.bot.player !== undefined) {
      this.bot.chat(`/gc ${username}: ${message}`)
    }
  }
}

module.exports = MinecraftManager
