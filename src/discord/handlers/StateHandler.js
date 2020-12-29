class StateHandler {
  constructor(discord) {
    this.discord = discord
  }

  onReady() {
    console.log('Discord client ready')
  }
}


module.exports = StateHandler
