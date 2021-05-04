const DiscordCommand = require('../../contracts/DiscordCommand')

class UnmuteCommand extends DiscordCommand {
    onCommand(message) {
        let args = this.getArgs(message)

        if (args.length == 0) {
            return message.reply(`You need to specify a user to mute`)
        }

        let username = args[0]

        this.sendMinecraftMessage(`/g unmute ${username}`)
        message.reply(`${username} has been unmuted`)
    }
}

module.exports = UnmuteCommand
