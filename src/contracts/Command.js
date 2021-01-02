class Command {
  constructor(discord) {
    this.discord = discord
  }

  onCommand(message) {
    throw new Error('Command onCommand method is not implemented yet!')
  }
}

module.exports = Command
