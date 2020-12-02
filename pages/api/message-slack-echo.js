const Slack = require('slack');
const token = process.env.slacklogger_token
const bot = new Slack({token})
const channel = 'testing';

const delay = 10000

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export default async (req, res) => {
  if (req.method === 'POST') {
    
    await bot.chat.postMessage({channel, text: `[2]\n${req.body.message}`})


    await bot.chat.postMessage({channel, text: `\nThe final message will be delayed for ${delay}ms...`})

    await sleep(delay)

    const slackResponse = await bot.chat.postMessage({channel, text: `[3]\n${req.body.message}`})

    res.statusCode = 200
    res.json({ ...slackResponse })

  } else {
    res.statusCode = 400
    res.json({ message: 'Bad Request', code: 400 })
  }
  
}
