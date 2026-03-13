const djs = require("discord.js")
const { CommandHandler, CommandHandlerError } = require("../commandsys/core/cmdhandler.mjs")
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
        const cmd = require(path.join(coredir, "commandsys", "list", int.commandName)).data
        const focused = int.options.getFocused(true)
        const choices = cmd.args.find((x) => x.name == focused.name)?.choices
        if (!choices) return
        int.respond(choices.filter((x) => x.name.includes(focused.value)).slice(0, 25))
    }
    if (int.isChatInputCommand()) {
        const cmd = require(path.join(coredir, "commandsys", "list", int.commandName))

        try {
            const handler = new CommandHandler("discord", int, client, cmd.data)
            cmd.execute(handler)
        } catch (err) {
            if (err instanceof CommandHandlerError) {
                int.reply({
                    flags: "Ephemeral",
                    embeds: [
                        {
                            title: "No to mamy kurcze kłopot...",
                            description: "Wystąpił błąd w analizowaniu komendy.\n```" + err.message + "```",
                            color: parseInt("EE2323", 16),
                        },
                    ],
                })
            } else {
                console.error(`No to mamy kurcze kłopot!\n  Lokalizacja: Discord (komneda ${int.commandName})\n  Błąd:`, err)
            }
        }
    }
})

client.on("error", (err) => {
    console.error("No to mamy kurcze kłopot!\n  Lokalizacja: Discord\n  Błąd:", err)
})

console.log("Logowanie Discord tokenem", process.env.DISCORD_BOT_TOKEN.slice(0, 6) + "*".repeat(process.env.DISCORD_BOT_TOKEN.length - 6))
client.login(process.env.DISCORD_BOT_TOKEN)
