// NettmobIA/server.js
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
if (!process.env.PORT) process.env.PORT = process.env.APP_PORT || '4001'
const { start } = require('./packages/server/dist/index')
start().catch((e)=>{ console.error(e); process.exit(1) })