# Super Simple OpenAI Chatbot for Discord
- javascript
- node
- currently using model gpt-3.5-turbo
## Quick Start
- edit .env
- `npm install` then `npm run start`

## Step-By-Step
- edit the .env file and input your openAI API key <br>
To find your API key, go to OpenAI website and click on API <br>
Then create an account or sign in <br>
Click on your profile picture and select View API Keys <br>
- edit the .env file and input your discord Bot Token <br>
Go to Discord Developers Portal and create an account or sign in <br>
Click on Applications, New Application, and name your app <br>
Click on Bot, Add Bot, and name your Bot <br>
Click Reset Token to get your Bot Token <br>
Turn on all Privileged Gateway Intents <br>
Under Bot Permissions, select Administrator <br>
Go to OAuth2, URL Generator, and select Bot, then select Administrator <br>
Copy and paste the generated URL into your Discord Server and add your Bot <br>
- open project file in editor (i use visual studio code) <br>
open project in terminal, npm install <br>
in terminal type 'npm run start' to start the bot <br>