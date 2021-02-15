<<<<<<< HEAD
const DiscordCommand = require('../../contracts/DiscordCommand')

class InviteCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      message.reply(`You need to specify a user to invite`)
    }
    else{
      let ign = args[0];
      this.discord.app.minecraft.bot.chat(`/g invite ${ign}`)
      message.reply(ign+` has been invited to the guild`)
    }
  }
}

module.exports = InviteCommand
=======
const DiscordCommand = require('../../contracts/DiscordCommand')

class InviteCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      message.reply(`You need to specify a user to invite`)
    }
    else{
      let ign = args[0];
      this.discord.app.minecraft.bot.chat(`/g invite `+ign)
      message.reply(ign+` has been invited to the guild`)
    }
  }
}

module.exports = InviteCommand
>>>>>>> bce7993ad63c2843450b5ad38f4b67fef94479c1
