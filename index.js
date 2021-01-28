'use strict'
process.title = 'Hypixel Skyblock Leaderboard Generator'

const app = require('./src/Application')

app
  .register()
  .then(() => {
    app.connect()
  })
  .catch(err => {
    console.error(err)
  })
