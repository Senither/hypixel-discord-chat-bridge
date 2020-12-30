Hypixel Discord Chat Bridge
===========================

A two way chat bridge between [Hypixel](https://hypixel.net/) guild chat, and [Discord](https://discord.com/) channels.

The application utilizes [Discord.js-light](https://github.com/timotejroiko/discord.js-light) for communicating with Discord, and [Mineflayer](https://github.com/PrismarineJS/mineflayer) for communicating with Hypixel.

> This application will login to Hypixel using Mineflayer which is not a normal Minecraft client, this could result in your Minecraft account getting banned from Hypixel, so use this application at your own risk.

<hr>

## Table of Content

 - [Prerequisites](#prerequisites)
 - [Installation & Setup](#installation-setup)
 - [Configuration](#configuration)
 - [Roadmap](#roadmap)

### Prerequisites

 * Git
 * NodeJS >= 14
 * Yarn >= 1.2
 * 60~ MB of Memory
 * A Minecraft account

### Installation & Setup

To get started, clone down the repository using:

    git clone https://github.com/Senither/hypixel-discord-chat-bridge.git

Next go into the `hypixel-discord-chat-bridge` folder and install all the dependencies using Yarn.

    yarn

While the dependencies are being installed you can copy the configuration file.

    cp config.example.json config.json

Next edit and setup the config file with a proper Minecraft and Discord settings, once you're done you can start the app.

    node index.js

### Configuration

#### Server

The server is the server the Minecraft client should connect to, by default it will point to Hypixels server so it can be left as-is if the plan is to use the app for Hypixel guild chat, if not then the `host` is the servers IP or hostname, and the `port` is the port the server is running on.

> Note: The port must be a number, Mineflayer expects an integer so you can't wrap the port in quotes or Mineflayer won't create a connection to the Minecraft server.

#### Minecraft

The minecraft section includes a `username` and `password` option, these should be filled out with your Mojang username and password for the Minecraft account you plan on using, your Minecraft username is most likely the email it was created with.

#### Discord

The Discord options includes the `token` and `channel` options.

The token is the Discord application token, if you don't already have a Discord App, you can [create a new app](https://discordapp.com/developers), then convert the app to a Discord bot, and then get your Discord bot token on the "Bot" page.

The Discord channel is the ID of the text channel the bot should be linked with, the bot will only send and listen to messages in the channel defined in the config.

### Roadmap

- [ ] Chat message filter
  - The filter should block any messages sent from Discord to Hypixel that contains banable words, and words that could potentially cause a mute.
- [ ] Make the console output more informative, and look nicer
  - This can be done by using something like [Winston](https://www.npmjs.com/package/winston), or [chalk](https://www.npmjs.com/package/chalk).
- [ ] Log guild joins & leaves
  - Send a message in Discord when people join or leave the guild, and when people login or logout of Hypixel.

## License

Hypixel Discord Chat Bridge is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT).
