const fetch = require("node-fetch");
const Discord = require("discord.js-selfbot-v13");

module.exports.source = (version) => {
  const isDev = version.includes("dev");
  const parsed = version.match(/^(\d+)\.\d+\.\d+$/)?.[0];
  return `https://discordjs-self-v13.netlify.app/#/docs/docs/${
    isDev ? "main" : parsed
  }.json`;
};

/**
 * @param {string} q
 * @returns {Promise<Discord.MessageOptions|string>}
 */
module.exports.docs = async (q) => {
  const params = new URLSearchParams({
    force: true,
    src: this.source(Discord.version),
    q,
  });
  const res = await fetch(`https://djsdocs.sorta.moe/v2/embed?${params}`);
  const embed = await res.json();
  if (!embed) {
    return { content: "Nothing found" };
  } else {
    return { embeds: [embed] };
  }
};
