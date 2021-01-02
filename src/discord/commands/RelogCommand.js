const Command = require('../../contracts/Command')

class RelogCommand extends Command {
  onCommand(message) {
    this.discord.app.minecraft.bot.quit('Relogging')

    message.reply('The Minecraft account have disconnected from the server, and will reconnect in 5 seconds.')
  }
}

module.exports = RelogCommand
