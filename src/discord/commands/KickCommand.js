<<<<<<< HEAD
const DiscordCommand = require('../../contracts/DiscordCommand')

class KickCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      message.reply(`You need to specify a user to kick`)
    }
    else if (args.length == 1){
      message.reply(`You need to give a reason for kicking`)
    }
    else{
      let ign = args[0];
      let reason = args.slice(1);
      this.discord.app.minecraft.bot.chat(`/g kick ${ign} ${reason}`)
      message.reply(`${ign} has been kicked from the guild for reason ${reason}`)
    }
  }
}

module.exports = KickCommand
=======
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
>>>>>>> bce7993ad63c2843450b5ad38f4b67fef94479c1
