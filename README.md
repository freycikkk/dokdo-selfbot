<div align="center">
  <img src="assets/dokdo.png">
</div>

## About

**Dokdo-Selfbot** - A Modified Version of Dokdo for Discord Selfbots.

This is a powerful debugging tool for projects using `discord.js-selfbot-v13`. It extends Dokdo to work seamlessly in selfbot environments, providing an efficient way to debug and execute commands directly.

---

## Installation

<details>
    <summary>Using discord.js-selfbot-v13?</summary>

Install the latest version of `dokdo-selfbot` with:

```sh
npm i dokdo-selfbot@0.0.2
```

</details>

---

### Stable Release

```sh
npm i dokdo-selfbot@latest
```

### Development Version

```sh
npm i ViishSensei/dokdo-selfbot#main
```

---

## Example Usage

```js
const Discord = require("discord.js-selfbot-v13");
const client = new Discord.Client();

const Dokdo = require("dokdo-selfbot");

const DokdoHandler = new Dokdo(client, {
  aliases: ["dokdo", "dok"],
  prefix: "!",
  owners: ["123456789"], // Replace with your Discord user ID
});

client.on("messageCreate", async (message) => {
  if (message.content === "ping") {
    return message.channel.send("Pong"); // Handle normal commands first
  }
  DokdoHandler.run(message); // Test with commands like "!dokdo"
});

client.login("your-token-here"); // Replace with your selfbot token
```

---

## Notes

### Do You Need the Message Contents Intent?

No! Since this tool is designed for Discord selfbots, intents are not required as selfbots already have access to all messages and events. This tool can also interpret message content with custom prefixes, including mentions.

Example:

```js
new Dokdo(client, { prefix: "<@YOUR_USER_ID>" }); // Set your user mention as a prefix

// Example Command Usage: <@YOUR_USER_ID> dokdo
```

---

## Contributing

Before creating an issue or submitting a pull request, check if it already exists. For contributions, refer to the [contribution guide](./.github/CONTRIBUTING.md).
