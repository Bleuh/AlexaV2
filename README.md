# AlexaV2
Build a conversational agent with Firebase webhook.

The webhook will tell you the 3 most popular games on Twitch in french language.

Code annotated with [Flow](http://flowtype.org/).

## Installation

```bash
# Clone the project
git clone https://github.com/Bleuh/AlexaV2

# Navigate into functions folder
cd functions/

# Install dependency
npm i
```
## Run function
Install and init firebase ([Get Started](https://firebase.google.com/docs/functions/get-started))

This function use Twitch API, before use it, you need to add an API_KEY in your .env (use : https://dev.twitch.tv/) or set [Firebase Environment configuration](https://firebase.google.com/docs/functions/config-env) like this :
```bash
firebase functions:config:set api.key=YOUR_KEY
# if firebase env -> before run serve
firebase functions:config:get > .runtimeconfig.json
```
.runtimeconfig.json
```json
{
  "api": {
    "key": "YOUR_KEY"
  }
}
```

Build & Run
```bash
npm run build
npm run serve
```

### Go further
Run local, test online with Dialogflow webhook and ngrok
```bash
npm run serve
npm run tunnel
```
Get your temporary ngrok link and use it on Dialogflow !


## Deployement
Firebase will init first "prepublish" before deployement
```bash
firebase deploy -only functions
```

## Test & Experimentation
Unit test (Mocha | Istanbul | Chai)
```bash
npm test
```

[Online Dialogflow test](https://bot.dialogflow.com/ec7674ae-6463-4abd-a246-591d38e58d28)

Try to get the 3 most popular games on Twitch :

Try  "Donne moi les jeux les plus regarder sur Twitch"

Easter egg is hide try to find it (it's about Alexa of course)