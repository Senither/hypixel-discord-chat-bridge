FROM node:14-alpine

# Environment Variables

# Minecraft Server
ENV SERVER_HOST=mc.hypixel.net
ENV SERVER_PORT=25565
# Minecraft Account
ENV MINECRAFT_USERNAME=yourUsername
ENV MINECRAFT_PASSWORD=yourPassword
ENV MINECRAFT_ACCOUNT_TYPE=mojang
# Discord Account
ENV DISCORD_TOKEN=yourDiscordToken
# Discord Settings
ENV DISCORD_CHANNEL=discordChannelId
ENV DISCORD_COMMAND_ROLE=discordCommandRoleId
ENV DISCORD_OWNER_ID=discordOwnerId
ENV DISCORD_PREFIX=!

# Docker set up instructions

# Setup the working directory
WORKDIR /srv

# Installs our dependencies
COPY package.json /srv/
COPY yarn.lock /srv/
RUN yarn install

# Copy over the source code
COPY src /srv/src/
COPY index.js /srv/

# Start the application
CMD [ "yarn", "start" ]
