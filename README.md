# Hypixel Discord Chat Bridge

A two-way chat bridge between [Hypixel](https://hypixel.net/) guild chat and a [Discord](https://discord.com/) channel. The application utilizes [Discord.js-light](https://github.com/timotejroiko/discord.js-light) for communicating with Discord, and [Mineflayer](https://github.com/PrismarineJS/mineflayer) for communicating with Hypixel.

> This application will login to Hypixel using Mineflayer which is not a normal Minecraft client, this could result in your Minecraft account getting banned from Hypixel, so use this application at your own risk.

<hr>

## Table of Content

- [Installation using NodeJS](#installation-using-nodejs)
  - [Prerequisites](#prerequisites)
  - [Setup Guide](#setup-guide)
- [Installation using Docker](#installation-using-docker)
  - [Prerequisites](#prerequisites-1)
  - [Setup Guide](#setup-guide-1)
- [Configuration](#configuration)
- [Roadmap](#roadmap)

## Installation using NodeJS

### Prerequisites

- Git
- NodeJS >= 14
- Yarn >= 1.2
- A Minecraft account

### Setup Guide

To get started, clone down the repository using:

    git clone https://github.com/Senither/hypixel-discord-chat-bridge.git

Next go into the `hypixel-discord-chat-bridge` folder and install all the dependencies using Yarn.

    yarn

While the dependencies are being installed you can copy the configuration file.

    cp config.example.json config.json

Next edit and setup the config file with a proper Minecraft and Discord settings, once you're done you can start the app.

    node index.js

## Installation using Docker

### Prerequisites

- Git
- Docker >= 20
- A Minecraft account

_Older versions may also work, but have not been tested._

### Setup Guide

To get started, clone down the repository using:

    git clone https://github.com/Senither/hypixel-discord-chat-bridge.git

Next go into the `hypixel-discord-chat-bridge` folder and open the `docker-compose.yml` file, within the file you'll find all the environment variables that can be used to setup the bot, you should fill replace the default values with your real Discord and Minecraft login info, once you're done you can start the bot using Docker.

    docker-compose up -d

And you're done! The command will start a detached instance of the bot, and ensure that the container is deleted after you're done using it.

### Configuration

#### Server

The server is the server the Minecraft client should connect to, by default it will point to Hypixels server so it can be left as-is if the plan is to use the app for Hypixel guild chat, if not then the `host` is the servers IP or hostname, and the `port` is the port the server is running on.

> Note: The port must be a number, Mineflayer expects an integer so you can't wrap the port in quotes or Mineflayer won't create a connection to the Minecraft server.

#### Minecraft

The minecraft section includes a `username` and `password` option, if using a Mojang account these should be filled out with your Mojang username and password for the Minecraft account you plan on using, your Minecraft username is most likely the email it was created with. If using with a microsoft account change `accountType` to `microsoft`, `username` and `password` are not required and will be left blank as you will be directed to the [Microsoft Link page](https://www.microsoft.com/link). There is also a `lobbyHolder` option which is used in the `!guildlobby` command, this command will whisper the user specified in the config with a message using the `?tw <username>` format, for this command to do anything another bot needs to listen, and then act when receiving the message.

#### Discord

The Discord options includes the `token`, `channel`, `commandRole`, `ownerId`, and `prefix` options.

The token is the Discord application token, if you don't already have a Discord App, you can [create a new app](https://discordapp.com/developers), then convert the app to a Discord bot, and then get your Discord bot token on the "Bot" page.

The Discord channel is the ID of the text channel the bot should be linked with, the bot will only send and listen to messages in the channel defined in the config.

The command role is the ID of any role on the server the bot is hosted for, any user with the role will be able to run all the Discord commands built into the bot, like `!kick` and `!relog`.

> Note: Any user can run the `!help` command, however all the other commands requires the user has the command role.

The owner ID is similar to the command role, however this is the ID of the user that should have full access to the `!override` command, the user with this permission can use the command to run virtually any command via the bot, and should therefore be limited to just the owner of the bot.

The prefix is the command prefixed used for all the commands in the bot on the Discord side, by default this is set it `!`.

### Commands

<> = Required arguments, [] Optional arguments
!help - Displays this command list (!h)
!relog [delay] - Relogs the MC client, a delay can be given in seconds, if no delay is given it will default to 5 seconds (!r)
!override <command> [args] - Executes the string attached. This is a dangerous permission to grant (!o, !or)
!invite <player> - Invites the specified user to the guild, providing the guild isn't full (!i, !inv)
!kick <user> [reason] - Kicks the specified user from the guild (!k)
!promote <user> - Promotes the specified user by 1 rank (!p, !up)
!demote <user> - Demotes the specified user by 1 rank (!d, !down)

### Roadmap

- [ ] Chat message filter
  - The filter should block any messages sent from Discord to Hypixel that contains banable words, and words that could potentially cause a mute.
- [ ] Log guild joins & leaves
  - Send a message in Discord when people join or leave the guild, and when people login or logout of Hypixel.
- [ ] Send Discord message when the bot comes online and offline
  - `Bridge bot is online`, `Bridge bot is offline`
- [ ] Add support for officer chat
  - Allocate a second discord channel to use for two way officer chat.

## License

Hypixel Discord Chat Bridge is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT).
