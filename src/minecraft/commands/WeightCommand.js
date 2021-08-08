const MinecraftCommand = require('../../contracts/MinecraftCommand')
const fetch = require('node-fetch')

class WeightCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'weight'
    this.aliases = ['we']
    this.description = "Tells a player his weight"
  }

  async onCommand(username, message) {
    let args = message.split(' ')
    let ign = args[1]
    let method = args[2]

    if (args.length == 1) {
      ign = username
    }
    if (args.length == 2) {
      method = `weight`
    }

    fetch(`https://api.mojang.com/users/profiles/minecraft/${ign}`)
      .then(res => {
        if (res.status != 200) {
        return this.send(`/gc No MC account found for ${ign}`)
      }
    })

    ign = await getTrueIgn(ign);

    const apiData = await getApiData(ign);

    if (apiData.status != 200) {
      console.log(`${apiData.reason}`)
      this.send(`/gc Something went wrong!`)
    }

    this.send(`/gc ${ign} his weight for their ${apiData.data.name} profile is ${toFixed(apiData.data.weight)} + ${toFixed(apiData.data.weight_overflow)} Overflow ${toFixed(apiData.data.weight + apiData.data.weight_overflow)} Total`)
  }
}

function toFixed(num) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (0 || -1) + '})?');
  return num.toString().match(re)[0];
}

async function getUUID(ign) {
  const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${ign}`);
  const result = await response.json();
  return result.id;
}

async function getApiData(ign, method) {
  delete require.cache[require.resolve('../../../config.json')];
  const config = require('../../../config.json');

  const UUID = await getUUID(ign);
  const response = await fetch(`https://hypixel-api.senither.com/v1/profiles/${UUID}/${method}?key=${config.minecraft.apikey}`);
  return await response.json();
}

async function getTrueIgn(ign) {
  const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${ign}`);
  const result = await response.json();
  return result.name;
}

module.exports = WeightCommand
