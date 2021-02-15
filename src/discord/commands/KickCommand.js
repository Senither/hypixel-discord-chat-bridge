const DiscordCommand = require('../../contracts/DiscordCommand')

class KickCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      message.reply(`You need to specify a user to kick`)
    } else if (args.length == 1) {
      message.reply(`You need to give a reason for kicking`)
    } else {
      let ign = args[0]
      let reason = args.slice(1)
      this.discord.app.minecraft.bot.chat(`/g kick ${ign} ${reason}`)
      message.reply(`${ign} has been kicked from the guild for reason ${reason}`)
    }
  }
}

module.exports = KickCommand
