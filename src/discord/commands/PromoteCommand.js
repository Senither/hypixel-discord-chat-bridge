const DiscordCommand = require('../../contracts/DiscordCommand')

class PromoteCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      message.reply(`You need to specify a user to promote`)
    } else {
      let ign = args[0]
      this.discord.app.minecraft.bot.chat(`/g promote ${ign}`)
      message.reply(`${ign} has been promoted`)
    }
  }
}

module.exports = PromoteCommand
