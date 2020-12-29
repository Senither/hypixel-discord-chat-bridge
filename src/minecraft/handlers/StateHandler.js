const EventHandler = require('../../contracts/EventHandler')

class StateHandler extends EventHandler {
  constructor(minecraft) {
    super()

    this.loginAttempts = 0
    this.minecraft = minecraft
  }

  registerEvents(bot) {
    this.bot = bot

    this.bot.on('login', (...args) => this.onLogin(...args))
    this.bot.on('end', (...args) => this.onEnd(...args))
    this.bot.on('kicked', (...args) => this.onKicked(...args))
  }

  onLogin() {
    this.loginAttempts = 0
  }

  onEnd() {
    let loginDelay = this.loginAttempts * 5000

    if (loginDelay > 60000) {
      loginDelay = 60000
    }

    console.log(`Minecraft bot disconnected from server, attempting reconnect in ${loginDelay / 1000} seconds`)

    setTimeout(() => this.minecraft.connect(), loginDelay)
  }

  onKicked(reason) {
    console.log(reason)
    console.log(`Minecraft bot was kicked from server for "${reason}"`)

    this.loginAttempts++
  }
}

module.exports = StateHandler
