const config = require('../../config.json')
const CommunicationBridge = require('../contracts/CommunicationBridge')
const StateHandler = require('./handlers/StateHandler')
const MessageHandler = require('./handlers/MessageHandler')
const CommandHandler = require('./commands/CommandHandler')
const Discord = require('discord.js-light')

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
      cacheRoles: false,
      cacheEmojis: false,
      cachePresences: false,
    })

    this.client.on('ready', () => this.stateHandler.onReady())
    this.client.on('message', message => this.messageHandler.onMessage(message))

    this.client.login(config.discord.token).catch(error => {
      console.error('Discord Bot Error: ', error)
    })
  }

  onBroadcast({ username, message, type }) {
    this.client.channels.fetch(config.discord.channel).then(channel => {
      let embed = null

      switch (type) {
        case 'message':
          console.log(`Discord Broadcast > ${username}: ${message}`)

          embed = {
            embed: {
              description: message,
              color: 8311585,
              timestamp: new Date(),
              footer: {
                text: 'Message was sent',
              },
              author: {
                name: username,
                icon_url: 'https://www.mc-heads.net/avatar/' + username,
              },
            },
          }
          break

        case 'network':
          // TODO your discretion
          break

        case 'guildLog':
          // TODO your discretion
          break
      }

      if (embed !== null) {
        channel.send(embed)
      }
    })
  }
}

module.exports = DiscordManager
