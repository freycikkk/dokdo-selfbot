const { system, DateFormatting } = require("../utils");
const version = require("../../package.json").version;
const selfbot_version =
  require("../../package.json").peerDependencies["discord.js-selfbot-v13"];

module.exports = async function (message, parent) {
  let summary = `Dokdo-Selfbot v${version}, discord.js-selfbot-v13 \`${selfbot_version}\`, \`Node.js ${
    process.version
  }\` on \`${process.platform}\`\nProcess started at ${DateFormatting.relative(
    system.processReadyAt(),
  )}, bot was ready at ${DateFormatting.relative(parent.client.readyAt)}.\n`;

  // Memory in MB/GB format for clarity
  const memoryUsage = (system.memory().rss / 1024 / 1024).toFixed(2); // Convert to MB
  summary += `\nUsing ${memoryUsage}MB of memory at this process.\n`;

  const cache = `${parent.client.guilds.cache.size} guild(s) and ${parent.client.users.cache.size} user(s)`;

  summary += `Running on PID ${process.pid}\n\nThis bot is not sharded and can see ${cache}.\n\`GuildPresences\` intent is enabled, \`GuildMembers\` intent is enabled and \`MessageContent\` intent is enabled.`;

  // WebSocket latency
  summary += `\nAverage websocket latency: ${parent.client.ws.ping}ms`;

  return message.channel.send(summary);
};
