const DiscordCommand = require('../../contracts/DiscordCommand')

class KickCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      message.reply(`You need to specify a user to kick`)
    }
    else{
      let ign = args[0];
      this.discord.app.minecraft.bot.chat(`/g kick `+ign)
      message.reply(ign+` has been kicked from the guild`)
    }
  }
}

module.exports = KickCommand
