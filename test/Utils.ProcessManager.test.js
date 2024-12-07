const assert = require("assert");
const { Client, Message, SnowflakeUtil } = require("discord.js-selfbot-v13");

// Import Dokdo
const Dokdo = require("../src");
// Import ProcessManager utility from Dokdo
const ProcessManager = require("../src/utils/ProcessManager");

// Define a secret string for testing purposes
const secret = "youshalln0tpa$$...";

// Mock Discord Client for Selfbot
const BotClient = new Client();
const dokdo = new Dokdo(BotClient, { secrets: [secret] });

// Mock Message Object
const message = new Message(BotClient, {
  id: SnowflakeUtil.generate(), // Generate a unique message ID
  channel_id: SnowflakeUtil.generate(), // Generate a unique channel ID
});

// Create a ProcessManager instance for handling filtered outputs
const Manager = new ProcessManager(message, "anystring", dokdo);

// Unit test suite for Dokdo's secret filtering functionality
describe("filter secret", function () {
  it("Basic", function () {
    // Check if the secret is properly masked
    assert.strictEqual(
      Manager.filterSecret(`my password is ${secret}`),
      "my password is [secret]", // Expect the secret to be replaced with "[secret]"
    );

    // Ensure the raw secret is not present in the filtered output
    assert.doesNotMatch(
      Manager.filterSecret(`${secret}${secret} ${secret}`),
      /youshalln0tpa\$\$\.\.\./, // The raw secret should not match the output
    );

    // Verify all occurrences of the secret are replaced with "[secret]"
    assert.strictEqual(
      Manager.filterSecret(`${secret}${secret} ${secret}`),
      "[secret][secret] [secret]", // Expect all instances to be masked
    );
  });
});
