const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const express = require("express")

const prefix = '!';
const limit = 1000;
const df = 'db.json';

let counts = {};

if (fs.existsSync(df)) {
  const data = fs.readFileSync(df);
  counts = JSON.parse(data);
}

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  client.channels.cache.forEach(async (channel) => {
    if (channel.type === 'text') {
      const messages = await channel.messages.fetch();
      messages.forEach((message) => {
        const count = (message.content.match(/\b.*nigger.*\b/gi) || []).length;
        if (count > 0) {
          if (!counts[message.author.id]) {
            counts[message.author.id] = 0;
          }
          counts[message.author.id] += count;
        }
      });
    }
  });

  SAVENIGGERS();
});

client.on('message', (message) => {
  if (message.author.bot) return;

  const count = (message.content.match(/\b.*nigger.*\b/gi) || []).length;
  if (count > 0) {
    if (!counts[message.author.id]) {
      counts[message.author.id] = 0;
    }
    counts[message.author.id] += count;
    SAVENIGGERS();
  }

  if (counts[message.author.id] >= limit) {
    const user = message.author;
    user.send('# [trickster\'s basement] Congratulations on saying nigger over 1000 times! You have proved to be a formidable racist. youre still a dumb fucking nigger though lol kys faggot');
  }

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'check') {
      const count = counts[message.author.id] || 0;
      message.reply(`## You have sent the grand gaynigger word "nigger" over ${count} times. - Niggerbot`);
    }
  }
});

function SAVENIGGERS() {
  fs.writeFileSync(df, JSON.stringify(counts));
}

const app = express()

const server = app.listen(3000, () => {
    console.log(`hellooo im at ${server.address().port}`)
})

app.get("/", (req, res) => {
    res.send("niggerbot/nbot here")
})
client.login("MTA4NDg0MjM1MzA3ODA2MzE0NA.G4SMe2.3YMoWeQ9ElJJdOUsAsBbI9zDXFiIj5kpO4tfao");
