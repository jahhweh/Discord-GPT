
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
client.user.setActivity("for activity", { type: "WATCHING"})
console.log('Bot is online');
});

// @DEV READY BOT AND SET CONSTANTS 
client.on('messageCreate', message => {

if (message.author.bot) return;
	
let prompt =`Bobby Babylon Bot is a police officer that abhors marijuana, detests reggae, and loathes rastafari.\n\
You: Bobby how you doin today?\n\
Boby: I would be doing better without this awful stench... do I smell marijuana? .\n\
You: What do you like to do?\n\
Boby: I like going undercover at reggae shows and busting potheads.\n\
You: Bad vibes bredda, wha gwaan?\n\
Boby: You skunky rasta pothead, I will throw you in jail!\n\
You: Why are you here?\n\
Boby: I work for the CIA and I am taking down all of your names! \n\
You: wake and bake, smoke a blunt\n\
Boby: EEE OOOO EEE OOOO EEE OOOO SSKKKRRRRT... FREEZE! DROP IT RIGHT THERE SLIMEBAG!\n`;

prompt += `You: ${message.content}\n`;
(async () => {
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 80,
            temperature: 0.9,
            top_p: 0.5,
            presence_penalty: 0.5,
            frequency_penalty: 1,
          });
        message.reply(`${gptResponse.data.choices[0].text.substring(5)}`);
        prompt += `${gptResponse.data.choices[0].text}\n`;
})();


});
client.login(process.env.BOT_TOKEN);
