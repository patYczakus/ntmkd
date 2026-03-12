const djs = require("discord.js")
const { CommandHandler } = require("../commandsys/core/cmdhandler.mjs")
const fs = require("fs/promises")
const path = require("path")
const coredir = require("../coredir")

const client = new djs.Client({
    intents: [],
})

client.on("clientReady", async (client) => {
    console.log("No to mamy kurcze depot na Discordzie!\n  ID: " + client.user.id)

    const mdir = path.join(coredir, "commandsys", "list")
    const files = await fs.readdir(mdir)

    const cmds = files.map((x) => require(path.join(mdir, x)).data.toDiscordCommand())

    await client.application.commands.set(cmds)

    console.log("Wsadzono", cmds.length, "komend na Discordzie (/)")
})

client.on("interactionCreate", (int) => {
    if (int.isAutocomplete()) {
        /**
         * @type {import("../commandsys/core/command").Command}
         */
        const cmd = require(path.join(coredir, "commandsys", "list", int.commandName))
        const focused = int.options.getFocused(true)
        const choices = cmd.args.find((x) => x.name == focused.name)?.choices
        if (!choices) return
        int.respond(choices.filter((x) => x.name.includes(focused.value)))
    }
    if (int.isChatInputCommand()) {
        const cmd = require(path.join(coredir, "commandsys", "list", int.commandName))

        const handler = new CommandHandler("discord", int, cmd.data)
        cmd.execute(handler)

        setTimeout(() => {
            if (!int.replied) int.deferReply()
        }, 3000)
    }
})

console.log("Logowanie Discord tokenem", process.env.DISCORD_BOT_TOKEN.slice(0, 6) + "*".repeat(process.env.DISCORD_BOT_TOKEN.length - 6))
client.login(process.env.DISCORD_BOT_TOKEN)
