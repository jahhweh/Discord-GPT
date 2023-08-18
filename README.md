# 🤖💬 Discord-GPT 🤣🤯

## An OpenAI Chat-GPT Discord Bot Template

- Create your own customizable chatbot that talks back using Chat-GPT
- Reply with DALL-E! Use !paint to generate an image based on your text
- Currently using openai model gpt-3.5-turbo-16k for extended bot memory

## Getting Started

- Create a new repo using this template
- Open the repo in your preferred code editer (I use Visual Studio Code)
- Open a new terminal/console and go to the project. You should be in something like `cd users/jahhweh/desktop/Discord-GPT`
- In the terminal type and run `npm install` and then `npm run start`
  - This will install the dependencies needed for the bot to interact with Discord and OpenAI.
- The .env file
  - Rename the `.example.env` file to `.env`
  - _OpenAI_: `OPENAI_API_KEY`
    - Head over to `https://platform.openai.com/account/api-keys` to get your API key. Create an account if you need to, I promise it's worth it!
    - Copy your API Key and paste it into the .env file replacing all the X's
  - _Discord_: `BOT_TOKEN`
    - Go to Discords Developer Portal and go to the Applications tab `https://discord.com/developers/applications`
    - Click on New Application and name your app.
    - While inside your app, click on Bot, Add Bot, and name your Bot.
    - Click on Reset Token to get your BOT_TOKEN. Copy it into the .env file replacing all the X's
    - Turn on all Privileged Gateway Intents
    - Under Bot Permissions, select Administrator
    - Go to OAuth2, URL Generator, select Bot, then select Administrator
    - Copy and paste the generated URL into the discord server you want your bot to be in and your bot will join the server and talk to you!

## Begin Customizing

- The main.js file
  - **Persona**: Customize your bot to your needs. There is no good reason "You are a helpful chatbot" shouldn't be replaced with "You are an evil wizard trapped in a dungeon. You seek revenge on your captors."
  - **Max Memory**: Your bot will remember things! When set to 10, your bot will remember the last 10 prompts and the last 10 responses. Keep in mind, the entire memory will be sent to OpenAI as a prompt, along with the Persona and the users message.
  - **!paint**: Use the !paint command to get an image from DALL-E.
