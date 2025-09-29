// NettmobIA/server.js
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
const { start } = require('./packages/server/dist/index')
start().catch((e) => {
  console.error(e)
  process.exit(1)
})