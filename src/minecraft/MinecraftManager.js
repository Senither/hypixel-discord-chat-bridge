<<<<<<< HEAD
const config = require('../../config.json')
const CommunicationBridge = require('../contracts/CommunicationBridge')
const CommandHandler = require('./commands/CommandHandler')
const StateHandler = require('./handlers/StateHandler')
const ErrorHandler = require('./handlers/ErrorHandler')
const ChatHandler = require('./handlers/ChatHandler')
const mineflayer = require('mineflayer')

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
      host: config.server.host,
      port: config.server.port,
      username: config.minecraft.username,
      password: config.minecraft.password,
      version: false,
      auth: config.minecraft.accountType,
    })
  }

  onBroadcast({ username, message }) {
    console.log(`Minecraft Broadcast > ${username}: ${message}`)

    if (this.bot.player !== undefined) {
      this.bot.chat(`/gc ${username}: ${message}`)
    }
  }
}

module.exports = MinecraftManager
=======
const config = require('../../config.json')
const CommunicationBridge = require('../contracts/CommunicationBridge')
const CommandHandler = require('./commands/CommandHandler')
const StateHandler = require('./handlers/StateHandler')
const ErrorHandler = require('./handlers/ErrorHandler')
const ChatHandler = require('./handlers/ChatHandler')
const mineflayer = require('mineflayer')

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
      host: config.server.host,
      port: config.server.port,
      username: config.minecraft.username,
      password: config.minecraft.password,
      version: false,
      auth: config.minecraft.accountType,
    })
  }

  onBroadcast({ username, message }) {
    console.log(`Minecraft Broadcast > ${username}: ${message}`)

    if (this.bot.player !== undefined) {
      this.bot.chat(`/gc ${username}: ${message}`)
    }
  }
}

module.exports = MinecraftManager
>>>>>>> bce7993ad63c2843450b5ad38f4b67fef94479c1
