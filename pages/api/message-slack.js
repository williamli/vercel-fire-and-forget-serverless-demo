const axios = require('axios');

const Slack = require('slack');
const token = process.env.slacklogger_token
const bot = new Slack({token})
const channel = 'testing';


export default async (req, res) => {
  
  if (req.method === 'POST') {
    
    const message = `\n\n==== [${Date.now()}] ====\n\n${req.body.message}\n\n========`

    const slackResponse = await bot.chat.postMessage({channel, text: `The following message will be repeated 3 times:\n\n[1]\n${message}`})

    axios.post(`${req.headers.origin}/api/message-slack-echo`, {
      message
    })
    
    res.statusCode = 200
    res.json({ ...slackResponse })

  } else {
    res.statusCode = 400
    res.json({ message: 'Bad Request', code: 400 })
  }
  
}
