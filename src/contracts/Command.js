class Command {
  constructor(discord) {
    this.discord = discord
  }

  getArgs(message) {
    let args = message.content.split(' ')

    args.shift()

    return args
  }

  onCommand(message) {
    throw new Error('Command onCommand method is not implemented yet!')
  }
}

module.exports = Command
