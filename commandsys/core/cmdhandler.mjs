import * as sjs from "stoat.js"
import * as djs from "discord.js"
import { setTimeout as wait } from "timers/promises"
import { request } from "undici"

/**
 *
 * @param {sjs.Client} client
 * @param {*} buffer
 * @param {*} fileName
 * @returns
 */
async function sendAttachment(client, buffer, fileName) {
    const forms = new FormData()
    forms.append("file", new Blob([buffer]), fileName)

    const resp = await request("https://cdn.stoatusercontent.com/attachments", {
        method: "POST",
        headers: {
            // undici/FormData will set Content-Type with proper boundary automatically
            Accept: "application/json",
            "X-Bot-Token": process.env.STOAT_BOT_TOKEN,
        },
        body: forms,
    })

    if (resp.statusCode == 200) return (await resp.body.json()).id
    else {
        console.error("No to mamy kurcze error", resp.statusCode, "\n ", resp.statusText)
        return null
    }
}

function parseArgs(input) {
    const args = []
    let current = ""
    let inQuotes = false

    for (let i = 0; i < input.length; i++) {
        const char = input[i]

        if (char === '"') {
            inQuotes = !inQuotes
        } else if (char === " " && !inQuotes) {
            if (current.length > 0) {
                args.push(current)
                current = ""
            }
        } else {
            current += char
        }
    }

    if (current.length > 0) {
        args.push(current)
    }

    return args
}

export class CommandHandlerError extends Error {}

export class CommandHandler {
    #state
    /**
     * @overload
     * @param {"discord"} runner
     * @param {djs.ChatInputCommandInteraction} nativehandler
     * @param {djs.Client} client
     * @param {import("./command.js").Command} command
     */
    /**
     * @overload
     * @param {"stoat"} runner
     * @param {sjs.Message} nativehandler
     * @param {djs.Client} client
     * @param {import("./command.js").Command} command
     */
    /**
     * @param {djs.Client | sjs.Client} client
     * @param {"discord" | "stoat"} runner
     * @param {djs.ChatInputCommandInteraction | sjs.Message} nativehandler
     * @param {import("./command.js").Command} command
     */
    constructor(runner, nativehandler, client, command) {
        this.runner = runner
        this.nativehandler = nativehandler
        this.client = client
        this.command = command

        this.options = {}
        if (runner == "discord" && nativehandler instanceof djs.ChatInputCommandInteraction) {
            this.#state = "not-ingered"

            for (const option of command.args) {
                const dopt = nativehandler.options.get(option.name, option.required)

                if (option.choices && dopt?.value) {
                    const e = option.choices.find((x) => [x.name, x.value].includes(dopt.value))?.value
                    if (!e) throw new CommandHandlerError(`Argument "${option.name}" nie ma takiej opcji.`)
                    this.options[option.name] = e
                } else {
                    this.options[option.name] = dopt?.value || null
                }
            }

            setTimeout(() => {
                if (this.#state == "not-ingered") {
                    this.#state = "deffering"
                    nativehandler.deferReply().then(() => (this.#state = "deffered"))
                }
            }, 2300)
        } else if (runner == "stoat") {
            const args = parseArgs(nativehandler.content.slice(`<@${client.user.id}>`.length).trim())

            for (let i = 0; i < command.args.length; i++) {
                if (command.args[i].choices && args[i + 1]) {
                    const e = command.args[i].choices.find((x) => x.name == args[i + 1]).value
                    if (!e) throw new CommandHandlerError(`Argument "${command.args[i].name}" nie ma takiej opcji.`)
                    this.options[command.args[i].name] = e
                } else {
                    this.options[command.args[i].name] = args[i + 1] || null
                }

                if (!this.options[command.args[i].name] && command.args[i].required) throw new CommandHandlerError(`Argument "${command.args[i].name}" jest wymagany.`)
            }
        }
    }

    /**
     * @param {Partial<{
     *  content: string,
     *  embeds: Array<{ title?: string, description?: string, color?: string }>,
     *  attachments: Array<{ buffer: Buffer, name: string }>
     * }>} option
     */
    async reply(option) {
        if (typeof this.nativehandler == "function") var nh = this.nativehandler()
        else var nh = this.nativehandler

        if (this.runner == "discord" && nh instanceof djs.ChatInputCommandInteraction) {
            const doptions = {}
            if (option.content) doptions.content = option.content
            if (option.embeds?.length)
                doptions.embeds = option.embeds.map((x) =>
                    new djs.EmbedBuilder()
                        .setDescription(x.description)
                        .setTitle(x.title)
                        .setColor(x.color || "Default"),
                )
            if (option.attachments?.length) doptions.files = option.attachments.map((x) => new djs.AttachmentBuilder(x.buffer, { name: x.name }))

            if (this.#state == "deffering" || this.#state == "replying") await wait(3000)

            if (this.#state == "deffered") {
                this.#state = "replying"
                const _x = await nh.editReply(doptions)
                this.#state = "replied"
                return _x
            } else if (this.#state != "replied") {
                this.#state = "replying"
                const _x = await nh.reply(doptions)
                this.#state = "replied"
                return _x
            } else return nh.followUp(doptions)
        } else if (this.runner == "stoat" && nh instanceof sjs.Message) {
            const aids = []
            for await (const attachment of option.attachments ?? []) {
                aids.push(await sendAttachment(this.client, attachment.buffer, attachment.name))
            }
            return (
                nh.reply(
                    {
                        content: option.content,
                        attachments: aids,
                        embeds: option.embeds?.map((x) => ({ description: x.description, title: x.title, colour: x.color })),
                    },
                    false,
                ) || null
            )
        }
        return null
    }
}
