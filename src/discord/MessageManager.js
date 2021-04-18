class MessageManager {
  constructor(discord) {
    this.discord = discord
  }

  broadcastGuildMessage(message, username, guildRank) {
    switch (this.discord.app.config.discord.messageMode.toLowerCase()) {
      case 'bot':
        this.discord.client.channels.fetch(this.discord.app.config.discord.channel).then(channel => {
          channel.send({
            embed: {
              description: message,
              color: '6495ED',
              timestamp: new Date(),
              footer: {
                text: guildRank,
              },
              author: {
                name: username,
                icon_url: 'https://www.mc-heads.net/avatar/' + username,
              },
            },
          })
        })
        break
      case 'webhook':
        message = message.replace(/@/g, '') // Stop @everyone
        this.discord.webhook.send(
          message, { username: username, avatarURL: 'https://www.mc-heads.net/avatar/' + username }
        )
        break
      default:
        throw new Error('Invalid message mode: must be bot or webhook')
    }
  }

  broadcastPlayerLogin(username) {
    switch (this.discord.app.config.discord.messageMode.toLowerCase()) {
      case 'bot':
        this.discord.client.channels.fetch(this.discord.app.config.discord.channel).then(channel => {
          channel.send({
            embed: {
              color: '7CFC00',
              timestamp: new Date(),
              author: {
                name: `${username} joined.`,
                icon_url: 'https://www.mc-heads.net/avatar/' + username,
              },
            }
          })
        })
        break
      case 'webhook':
        this.discord.webhook.send(
          { username: username, avatarURL: 'https://www.mc-heads.net/avatar/' + username, embeds: [{ color: '7CFC00', author: { name: `${username} joined.` } }] }
        )
        break
      default:
        throw new Error('Invalid message mode: must be bot or webhook')
    }
  }

  broadcastPlayerLogout(username) {
    switch (this.discord.app.config.discord.messageMode.toLowerCase()) {
      case 'bot':
        this.discord.client.channels.fetch(this.discord.app.config.discord.channel).then(channel => {
          channel.send({
            embed: {
              color: 'DC143C',
              timestamp: new Date(),
              author: {
                name: `${username} left.`,
                icon_url: 'https://www.mc-heads.net/avatar/' + username,
              },
            }
          })
        })
        break
      case 'webhook':
        this.discord.webhook.send(
          { username: username, avatarURL: 'https://www.mc-heads.net/avatar/' + username, embeds: [{ color: 'DC143C', author: { name: `${username} left.` } }] }
        )
        break
      default:
        throw new Error('Invalid message mode: must be bot or webhook')
    }
  }

  broadcastInfoMessage(embed) {
    this.discord.client.channels.fetch(this.discord.app.config.discord.channel).then(channel => {
      channel.send({ embed: embed })
    })
  }
}

module.exports = MessageManager