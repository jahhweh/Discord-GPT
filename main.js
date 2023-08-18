// @DEV Discord-GPT by @jahhweh
// OpenAI Chat-GPT Discord Bot Template
// Create and customize your own chatbot!
// It's fairly straight forward but if you have
// any issues, feel free to message me 
// on X (twitter) @jahhweh

require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const Discord = require('discord.js');

// @DEV connect to discord with the required intents
const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS"
  ],
});

// @DEV connect to OpenAI 
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// @DEV This is where you can customize your bot.
// Change the persona text to anything you'd like.
// But keep in mind, OpenAI does have built 
// in moderation for some words, phrases, and topics.
const persona = "You are a helpful chatbot"

// @DEV maxMemory is the total number of prompts and responses
// the bot is allowed to have. When set to 10, the bot 
// will remember the last 10 prompts and the last 10
// responses
const maxMemory = 10;

// @DEV botMemory holds all of the prior prompts and responses
const botMemory = [];

// @DEV This is the channel your bot will talk in
// Right click on the discord channel and copy the
// channel ID and paste it here
const botChannel = "1234567890"

// @DEV setup prefix for bot command
// The bot will listen to commands that start
// with ! but you can change this to whatever
// you'd like
const prefix = '!';
const args = message.content.slice(prefix.length).split(/ +/);
const command = args.shift().toLowerCase();

// @DEV start chatbot once
client.once('ready', async () => {

  // @DEV This is the bots status
  client.user.setActivity("the chat", { type: "WATCHING" })
  console.log('Bot is online');
});

// @DEV When a new message is sent in the chat...
client.on('messageCreate', message => {

  // @DEV if message is from bot, do not reply
  if (message.author.bot) return;

  // @DEV only reply to messages in the bot channel
  // You can add more channels or delete this line
  // to have the bot reply in all channels
  if (message.channel.id !== botChannel) return;

  // @DEV generate image based on prompt
  // If the user uses the command !paint, create an image
  // using the message contents. You can change this to anything
  // else or add new commands.
  if (message.content.includes('!paint') || command === '!paint') {

    (async () => {

      // @DEV reply to chat and let the user know what is being painted
      message.reply(`Painting: ${message.content.slice(message.content.indexOf('!paint') + 7)}`);
      try {
        const response = await openai.createImage({

          //@DEV The prompt is the users message minutes the command
          prompt: `${message.content.slice(message.content.indexOf('!paint') + 7)}`,

          // @DEV n is the amount of pictures requested. We only want 1
          n: 1,

          // @DEV The size of the picture can be 256, 512, or 1028
          // The larger sizes cost more to create! 
          size: "256x256",
        });

        // @DEV Send the picture to the chat
        message.channel.send(response.data.data[0].url);
      } catch (e) {
        message.reply('Failed to Paint! ', e.message);
      }
    })();
  }

  // @DEV If the message does not include the prompt !paint
  // go on to chat with the bot
  else {

    // @DEV set chatbot prompt as discord message
    let prompt = message.content;

    // @DEV generate response
    (async () => {
      try {
        const chatMessages = [

          // @DEV persona, botMemory, and prompt
          // are all sent to OpenAI as the input.
          { "role": "system", "content": persona },
          ...botMemory,
          { "role": "user", "content": prompt }
        ];

        const completion = await openai.createChatCompletion({
          // @DEV The Chat-GPT model we are using
          model: "gpt-3.5-turbo-16k",

          // @DEV The persona, botMemory, and prompt gets sent
          // as the input
          messages: chatMessages,

          // @DEV temperature determines how random or focused
          // each response is. Higher values like 0.8 will make 
          // the output more random, while lower values like 0.2 
          // will make it more focused and deterministic.
          temperature: 0.7,

          // @DEV max_tokens is basically the amount of text
          // the chatbot will use to reply.
          // gpt-turbo-16k is capable of 16,000 tokens so you
          // can probably get away with a much higher max_tokens
          // count but your bot may ramble... a lot. Also, keep
          // in mind that the entire botMemory is sent to OpenAI
          // as input. If set to a high limit, this will use
          // the majority of allowed tokens. 
          max_tokens: 500,

          // @DEV presence_penalty: Positive values penalize new 
          // tokens based on whether they appear in the text so far, 
          // increasing the model's likelihood to talk about new topics.
          // Values can be between -2 and 2
          presence_penalty: 0.5,

          // @DEV frequency_penalty: Positive values penalize new tokens 
          // based on their existing frequency in the text so far, 
          // decreasing the model's likelihood to repeat the same line verbatim.
          // Values can be between -2 and 2
          frequency_penalty: 0.2
        });

        // @DEV get the response text from the returned data
        const response = completion.data.choices[0].message.content;

        // @DEV reply to the chat with the response
        message.reply(response);

        // @DEV If the bot memory has reached its max,
        // delete the oldest inputs
        if (botMemory.length >= maxMemory * 2) {
          botMemory.splice(0, 2);
        }
        botMemory.push({ "role": "user", "content": prompt });
        botMemory.push({ "role": "assistant", "content": response });
      } catch (e) {

        // @DEV If something went wrong, post it to
        // the chat
        message.reply('Failed to chat! ', e.message);
      }
    })();
  }
});

// @DEV Below are a few other useful functions
//
// // @DEV Reply to a specific message. This is formatted
// // to work similarly as a command. The message is sent
// // as a reply to the user 
// if (message.content.toLowerCase() === "hello") {
//   message.reply("Beep boop 😄")
// }
//
// // @DEV Send a message to the channel if a user
// // sends the command.
// if (command === 'ping') {
//   message.channel.send('pong!');
// }
//
// // @DEV Require prefix. Place this snippet
// // in your code to prevent the bot from responding
// // to every message and only respond to messages
// // if they start with the command prefix
// if (!message.content.startsWith(prefix)) {
//   return
// }
//
// @DEV Post an embed
// const botHelpEmbed = new MessageEmbed()
// 	.setColor('#f2d649')
// 	.setTitle('How to use Discord-GPT')
// 	.setAuthor({ name: 'jahhweh', iconURL: 'https://gateway.pinata.cloud/ipfs/QmQ9pK9Gk7nbQVfNY97ZAG3qUZE2gQv1MHxoGbVtrfgcrM' })
// 	.setDescription(
//     "Discord-GPT is your own customizable Chat-GPT chatbot. \n" +
//     "Use ! to send commands to the bot. \n \n" +
//     "**Main Commands** \n" +
//     "!paint - request a painting from DALL-E... !paint a self portrait of gpt-3.5-turbo. \n" +
//     "❤️💛💚\n" +
//     "Send me something cool! ---> jahhweh.eth"
//   )
// 	.setThumbnail(' ') // @DEV This is the image on the top right
// 	.setImage(' ') // @DEV This is the large image along the bottom of the embed
// 	.setTimestamp()
// 	.setFooter({ text: 'discord-gpt chatbot template by @jahhweh', iconURL: 'https://gateway.pinata.cloud/ipfs/QmQ9pK9Gk7nbQVfNY97ZAG3qUZE2gQv1MHxoGbVtrfgcrM' });
//
// if (command === 'help'){
//     message.channel.send({ embeds: [botHelpEmbed] });
// }

// @DEV leave this on the very bottom of the code!
client.login(process.env.BOT_TOKEN);