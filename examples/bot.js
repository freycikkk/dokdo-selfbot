const { Client } = require("discord.js-selfbot-v13");
const client = new Client();
const config = require("./config");

const Dokdo = require("../src");

const DokdoHandler = new Dokdo(client, {
  aliases: ["dokdo", "dok"],
  prefix: "!",
  owners: ["123456789"],
  noPerm: (message) => message.reply("🚫 You have no permission to use dokdo."),
  globalVariable: { VIISH_MODIFIED_THIS_CODE: true },
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.content === "ping") return message.reply("pong");
  await DokdoHandler.run(message);
});

client.login(config.token);
