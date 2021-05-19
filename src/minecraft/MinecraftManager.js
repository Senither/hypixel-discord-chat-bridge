const config = require("../../config.json");
const CommunicationBridge = require("../contracts/CommunicationBridge");
const StateHandler = require("./handlers/StateHandler");
const ErrorHandler = require("./handlers/ErrorHandler");
const ChatHandler = require("./handlers/ChatHandler");
const mineflayer = require("mineflayer");

class MinecraftManager extends CommunicationBridge {
  constructor(app) {
    super();

    this.app = app;

    this.stateHandler = new StateHandler(this);
    this.errorHandler = new ErrorHandler(this);
    this.chatHandler = new ChatHandler(this);
  }

  connect() {
    this.bot = this.createBotConnection();

    this.errorHandler.registerEvents(this.bot);
    this.stateHandler.registerEvents(this.bot);
    this.chatHandler.registerEvents(this.bot);
  }

  createBotConnection() {
    return mineflayer.createBot({
      host: config.server.host,
      port: config.server.port,
      username: config.minecraft.username,
      password: config.minecraft.password,
      version: false,
      auth: "mojang",
    });
  }

  onBroadcast({ username, message, reply }) {
    console.log(`Minecraft Broadcast > ${username}: ${message}`);

    if (this.bot.player !== undefined) {
      this.bot.chat(
        `/gc ${reply ? `Replying to: ${reply}` : `${username}:`} ${message}`
      );
    }
  }
}

module.exports = MinecraftManager;
