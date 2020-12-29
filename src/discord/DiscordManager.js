const config = require('../../config.json')
const CommunicationBridge = require('../contracts/CommunicationBridge')
const StateHandler = require('./handlers/StateHandler')
const MessageHandler = require('./handlers/MessageHandler')
const Discord = require('discord.js-light')

class DiscordManager extends CommunicationBridge {
  connect() {
    this.stateHandler = new StateHandler(this)
    this.messageHandler = new MessageHandler(this)

    this.client = new Discord.Client({
      cacheGuilds: true,
      cacheChannels: true,
      cacheOverwrites: false,
      cacheRoles: false,
      cacheEmojis: false,
      cachePresences: false
    })

    this.client.on('ready', () => this.stateHandler.onReady())
    this.client.on('message', message => this.messageHandler.onMessage(message))

    this.client.login(config.discord.token).catch(error => {
      console.error('Discord Bot Error: ', error)
    })
  }

  onBroadcast({ username, message }) {
    this.client.channels.fetch(config.discord.channel).then(channel => {
      channel.send({
        embed: {
          description: message,
          color: 8311585,
          timestamp: new Date,
          footer: {
            text: 'Message was sent'
          },
          author: {
            name: username,
            icon_url: 'https://www.mc-heads.net/avatar/' + username
          }
        }
      })
    })
  }
}

module.exports = DiscordManager
