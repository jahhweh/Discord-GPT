
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const Discord = require('discord.js'); 
const client = new Discord.Client({ 
	intents: [
	"GUILDS",
	"GUILD_MESSAGES",
	"GUILD_MEMBERS"
	],
});

client.once('ready', async () => {
client.user.setActivity("the chat", { type: "WATCHING"})
console.log('Bot is online');
});

// @DEV READY BOT AND SET CONSTANTS 
client.on('messageCreate', message => {

  if (message.author.bot) return;
  
  let prompt =`${message.content}`;
  
  (async () => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a helpful chatbot."}, 
        {"role": "user", "content": prompt}],
      temperature: 1.1,
      max_tokens: 50
    });
    message.reply(`${completion.data.choices[0].message.content}`)
    prompt += `${completion.data.choices[0].message.content}`
  
    console.log(completion.data.choices[0].message.content);
  })();



});
client.login(process.env.BOT_TOKEN);