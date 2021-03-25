const fs = require('fs')

class Configuration {
  properties = {
    server: {
      host: 'localhost',
      port: 25565,
    },
    minecraft: {
      username: null,
      password: null,
      lobbyHolder: null,
      accountType: 'mojang',
    },
    discord: {
      token: null,
      channel: null,
      commandRole: '',
      ownerId: '',
      prefix: '!',
    },
  }

  constructor() {
    if (fs.existsSync('config.json')) {
      this.properties = require('../config.json')
    }
  }

  get server() {
    return this.properties.server
  }

  get minecraft() {
    return this.properties.minecraft
  }

  get discord() {
    return this.properties.discord
  }
}

module.exports = Configuration
