const CommunicationBridge = require('../contracts/CommunicationBridge')
const StateHandler = require('./handlers/StateHandler')
const MessageHandler = require('./handlers/MessageHandler')
const CommandHandler = require('./commands/CommandHandler')
const Discord = require('discord.js-light')
const chalk = require('chalk')

class DiscordManager extends CommunicationBridge {
  constructor(app) {
    super()

    this.app = app

    this.stateHandler = new StateHandler(this)
    this.messageHandler = new MessageHandler(this, new CommandHandler(this))
  }

  connect() {
    this.client = new Discord.Client({
      cacheGuilds: true,
      cacheChannels: true,
      cacheOverwrites: false,
      cacheRoles: true,
      cacheEmojis: false,
      cachePresences: false,
    })

    this.client.on('ready', () => this.stateHandler.onReady())
    this.client.on('message', message => this.messageHandler.onMessage(message))

    this.client.login(this.app.config.discord.token).catch(error => {
      console.error('Discord Bot Error: ', error)
    })
  }

  onBroadcast({ username, message , guildRank}) {
    this.client.channels.fetch(this.app.config.discord.channel).then(channel => {
      console.log(chalk.blue(`Discord Broadcast > ${username} [${guildRank}]: ${message}`))

      channel.send({
        embed: {
          description: message,
          color: '#6495ED',
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
  }

  onLogin(username) {
    this.client.channels.fetch(this.app.config.discord.channel).then(channel => {
      channel.send({
        embed: {
          color: 'GREEN',
          timestamp: new Date(),
          author: {
            name: `${username} joined.`,
            icon_url: 'https://www.mc-heads.net/avatar/' + username,
          },
        },
      })
    })
  }

  onLogout(username) {
    this.client.channels.fetch(this.app.config.discord.channel).then(channel => {
      channel.send({
        embed: {
          color: 'RED',
          timestamp: new Date(),
          author: {
            name: `${username} left.`,
            icon_url: 'https://www.mc-heads.net/avatar/' + username,
          },
        },
      })
    })
  }
}

module.exports = DiscordManager
