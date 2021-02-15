const config = require('../../../config.json')
const DiscordCommand = require('../../contracts/DiscordCommand')

class OverrideCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      message.reply(`No command specified`)
    } else {
      this.discord.app.minecraft.bot.chat(`/${args}`)
      message.reply(`/${args} has been executed`)
    }
  }
}

module.exports = OverrideCommand
