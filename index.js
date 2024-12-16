// ZAX MD WHATSAPP BOT 
const bot = require(__dirname + '/lib/runner')
const { VERSION } = require(__dirname + '/config')

const start = async () => {
    Debug.info(`Zax ${VERSION}`)
  try {
    await bot.init()
    bot.logger.info('⏳ Starting App!')
    await bot.DATABASE.sync()
    await bot.connect()
  } catch (error) {
    Debug.error(error);
    start();
  }
}
start();

