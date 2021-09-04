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
- [Deploy directly to Replit](#deploy-directly-to-replit)
  - [Prerequisites](#prerequisites-2)
  - [Setup Guide](#setup-guide-2)
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

## Deploy directly to Replit

### Prerequisites

You'll need a GitHub account to deploy directly to Replit, as well as a [Replit](https://replit.com/) account that is linked with your GitHub account, if you don't already have a [Replit](https://replit.com/) account you can simply sign in with your GitHub account directly.

### Setup Guide

1. First [fork this project](https://github.com/Senither/hypixel-discord-chat-bridge/fork) onto your own GitHub account, once you have a copy of the project on your own account, sign in to Replit and import the project into Replit.
2. Now that the project is imported you should be able to click on the project in the Replit dashboard to create a new project from it, when the project has been created you should be able to select some settings about the project, make sure the selected language is set to `Node.js`, you can leave the _"configure the run button"_ settings as the default.
3. Next, copy or rename the `config.example.json` file to `config.json`, you can find the files on the left-hand side of the Replit dashboard, when the file has been copied or renamed you should open the file and setup the settings, such as the Minecraft account details, and the Discord information
4. Lastly you'll need to install all the dependencies for the project, this can be done by selecting the _"Shell"_ tab which should open the shell command prompt, then in that write `yarn install` to install all the dependencies.
5. Now that the dependencies are installed you're now ready to start the project, just click on the big _"Run"_ button at the top of the screen, and wait for the project to be booted up, after the project is up and running you should see two messages in the Console tab indicating that both the Discord and Minecraft clients have connected and are ready to be used.

### Configuration

#### Server

The server is the server the Minecraft client should connect to, by default it will point to Hypixels server so it can be left as-is if the plan is to use the app for Hypixel guild chat, if not then the `host` is the servers IP or hostname, and the `port` is the port the server is running on.

> Note: The port must be a number, Mineflayer expects an integer so you can't wrap the port in quotes or Mineflayer won't create a connection to the Minecraft server.

#### Minecraft

The minecraft section includes a `username` and `password` option, if using a Mojang account these should be filled out with your Mojang username and password for the Minecraft account you plan on using, your Minecraft username is most likely the email it was created with. If using with a microsoft account change `accountType` to `microsoft`, `username` and `password` are not required and will be left blank as you will be directed to the [Microsoft Link page](https://www.microsoft.com/link). There is also a `lobbyHolder` option which is used in the `!guildlobby` command, this command will whisper the user specified in the config with a message using the `?tw <username>` format, for this command to do anything another bot needs to listen, and then act when receiving the message. And there is a `apikey` option this option is for the Hypixel API key.

#### Discord

The Discord options includes the `token`, `channel`, `commandRole`, `ownerId`, `prefix` and `messageMode` options.

The token is the Discord application token, if you don't already have a Discord App, you can [create a new app](https://discordapp.com/developers), then convert the app to a Discord bot, and then get your Discord bot token on the "Bot" page.

The Discord channel is the ID of the text channel the bot should be linked with, the bot will only send and listen to messages in the channel defined in the config.

The command role is the ID of any role on the server the bot is hosted for, any user with the role will be able to run all the Discord commands built into the bot, like `!kick` and `!relog`.

> Note: Any user can run the `!help` command, however all the other commands requires the user has the command role.

The owner ID is similar to the command role, however this is the ID of the user that should have full access to the `!override` command, the user with this permission can use the command to run virtually any command via the bot, and should therefore be limited to just the owner of the bot.

The prefix is the command prefixed used for all the commands in the bot on the Discord side, by default this is set it `!`.

The messageMode can either be `bot` or `webhook`. This selects how the messages should be displayed when sent from Minecraft to Discord. If webhook mode is selected the bot requires the `Manage Webhooks` permission in the channel it's running in. The bot always requires the `Send Messages` and `View Channel` permissions in the channel you're using it in.

- [View Webhook example](https://i.imgur.com/tulcMVA.png)
- [View Bot Mode example](https://i.imgur.com/L8XhcNn.png)

> Note: The Discord rate limit for webhooks is 30 requests every 60 seconds, whereas for normal bot messages it's 5 messages every 5 seconds. Using webhooks effectively halves the number of messages the bot can send per minute which may cause issues in an active guild.

### Commands

`< >` = Required arguments, `[ ]` Optional arguments

- `!help` - Displays the list of commands (`!h`)
- `!relog [delay]` - Relogs the MC client, a delay can be given in seconds, if no delay is given it will default to 5 seconds (`!r`)
- `!override <command> [args]` - Executes the string attached. This is a dangerous permission to grant (`!o`, `!or`)
- `!invite <player>` - Invites the specified user to the guild, providing the guild isn't full (`!i`, `!inv`)
- `!kick <user> [reason]` - Kicks the specified user from the guild (`!k`)
- `!promote <user>` - Promotes the specified user by 1 rank (`!p`, `!up`)
- `!demote <user>` - Demotes the specified user by 1 rank (`!d`, `!down`)

### Roadmap

- [ ] Chat message filter
  - The filter should block any messages sent from Discord to Hypixel that contains banable words, and words that could potentially cause a mute.
- [ ] Log guild events
  - Guild joins/leaves/kicks, mutes/unmutes and promotion/demotions
- [ ] Ingame commands
  - Add commands for players to use ingame to check other player stats (eg `!skills <ign>`, `!weight <ign>` etc)
- [ ] Add support for officer chat
  - Allocate a second discord channel to use for two way officer chat.

## License

Hypixel Discord Chat Bridge is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT).
