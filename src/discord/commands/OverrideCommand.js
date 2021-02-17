const config = require('../../../config.json')
const DiscordCommand = require('../../contracts/DiscordCommand')

class OverrideCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      return message.reply(`No command specified`)
    }

    this.sendMinecraftMessage(`/${args}`)
    message.reply(`/${args} has been executed`)
  }
}

module.exports = OverrideCommand
