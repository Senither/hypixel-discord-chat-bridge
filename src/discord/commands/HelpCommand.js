const DiscordCommand = require('../../contracts/DiscordCommand')

class HelpCommand extends DiscordCommand {
  onCommand(message) {
    message
      .reply(
        [
          '`<>` = Required arguments, `[]` Optional arguments',
          '**Command List**',
          '`!help` - Displays this command list',
          '`!relog [delay]` - Relogs the MC client, a delay can be given in seconds, if no delay is given it will default to 5 seconds',
          '`!override <command> [args] - Executes the string attached. **This is a dangerous permission to grant**`',
          "`!invite <player>` - Invites the specified user to the guild, providing the guild isn't full",
          '`!kick <user> [reason]` - Kicks the specified user from the guild',
          '`!promote <user>` - Promotes the specified user by 1 rank',
          '`!demote <user>` - Demotes the specified user by 1 rank',
          '',
          '**Shortcuts**',
          'Help: `!h`',
          'Relog: `!r`',
          'Invite: `!i`, `!inv`',
          'Kick: `!k`',
          'Promote: `!p`, `!up`',
          'Demote: `!d`, `!down`',
        ].join('\n')
      )
      .then(helpMessage => setTimeout(() => helpMessage.delete(), 30000))
  }
}

module.exports = HelpCommand
