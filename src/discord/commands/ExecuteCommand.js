const DiscordCommand = require('../../contracts/DiscordCommand')

class ExecuteCommand extends DiscordCommand {
  onCommand(message) {
    let args = this.getArgs(message)
    let command = args.join(' ')
    if (!command.startsWith('/')) {
      command = `/${command}`
    }

    if (command) {
      this.sendMinecraftMessage(command)
      message.channel.send({
        embed: {
          color: message.guild.me.displayHexColor,
          description: `\`${command}\` executed.`
        }
      })
    }
  }
}

module.exports = ExecuteCommand
