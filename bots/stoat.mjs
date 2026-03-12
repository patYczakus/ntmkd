import * as sjs from "stoat.js"
import * as path from "path"
import { CommandHandler } from "../commandsys/core/cmdhandler.mjs"
import * as coredir from "../coredir.js"

const client = new sjs.Client({
    autoReconnect: true,
    heartbeatInterval: 10,
})

client.on("ready", () => {
    console.log("No to mamy kurcze depot na Stoacie!\n  ID: " + client.user.id)
})

client.on("messageCreate", (message) => {
    if (message.author.bot) return
    if (message.channel.type !== "TextChannel") return
    if (!message.content.startsWith(`<@${client.user.id}>`)) return

    const command = message.content.slice(`<@${client.user.id}>`.length).trim().split(/ +/)[0] || "help"

    /**
     * @type {{ data: import("../commandsys/core/command").Command, execute: (handler: CommandHandler) => void | Promise<void> }}
     */
    let cmd
    try {
        cmd = require(path.join(coredir, "commandsys", "list", command))
    } catch {}
    if (!cmd) return
    const handler = new CommandHandler("stoat", message, cmd.data)
    cmd.execute(handler)
})

client.on("error", (err) => {
    console.error("No to mamy kurcze kłopot!\n  Lokalizacja: Stout\n  Błąd:", err)
})

console.log("Logowanie Stoat tokenem", process.env.STOAT_BOT_TOKEN.slice(0, 6) + "*".repeat(process.env.STOAT_BOT_TOKEN.length - 6))
client.loginBot(process.env.STOAT_BOT_TOKEN)
