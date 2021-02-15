const DiscordCommand = require('../../contracts/DiscordCommand')

class MuteCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)

    if (args.length == 0) {
      message.reply(`You need to specify a user to mute`)
    }
    else if (args.length == 1){
      message.reply(`You need to give a time to mute for`)
    }
    else{
      let ign = args[0];
      let time = args.slice(1);
      this.discord.app.minecraft.bot.chat(`/g mute ${ign} ${time}`)
      message.reply(`${ign} has been muted for ${time}`)
    }
  }
}

module.exports = MuteCommand