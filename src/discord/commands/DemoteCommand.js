const DiscordCommand = require('../../contracts/DiscordCommand')

class DemoteCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      message.reply(`You need to specify a user to demote`)
    }
    else{
      let ign = args[0];
      this.discord.app.minecraft.bot.chat(`/g demote ${ign}`)
      message.reply(`${ign} has been demoted`)
    }
  }
}

module.exports = DemoteCommand
