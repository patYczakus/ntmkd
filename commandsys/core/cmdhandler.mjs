import * as sjs from "stoat.js"
import * as djs from "discord.js"

async function sendAttachment(client, buffer, fileName) {
    if (!client.ready()) return null
    if (!client.sessionId) return null

    const forms = new FormData()
    forms.append("file", new Blob(buffer), fileName)

    const resp = await request("https://cdn.stoatusercontent.com/attachments", {
        method: "POST",
        headers: {
            "X-Session-Token": client.sessionId,
        },
        body: forms,
    })

    if (resp.statusCode == 200) return (await resp.json()).id
    else {
        console.error("No to mamy kurcze error", resp.statusCode, "\n ", resp.statusText)
        return null
    }
}

export class CommandHandler {
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
            for (const option of command.args) {
                const dopt = nativehandler.options.get(option.name, option.required)
                this.options[option.name] = dopt.value
            }
        }
    }

    /**
     * @param {Partial<{
     *  content: string,
     *  embeds: Array<{ title?: string, description?: string, color?: string }>,
     *  attachments: Array<{ buffer: Buffer, name: string }>
     * }>} option
     * @param {Array}
     * @param
     */
    async reply(option) {
        if (this.runner == "discord" && this.nativehandler instanceof djs.ChatInputCommandInteraction) {
            if (this.nativehandler.deferred)
                return this.nativehandler.editReply({
                    embeds: option.embeds,
                    content: option.content,
                    attachments: option.attachments.map((x) => new djs.AttachmentBuilder(x.buffer, { name: x.name })),
                })
            else if (!this.nativehandler.replied) return this.nativehandler.reply(option)
            else return this.nativehandler.followUp(option)
        } else if (this.runner == "stoat" && this.nativehandler instanceof sjs.Message) {
            const aids = []
            for await (const attachment of option.attachments ?? []) {
                aids.push(await sendAttachment(this.client, attachment.buffer, attachment.name))
            }
            return (
                this.nativehandler.reply({
                    content: option.content,
                    attachments: aids,
                    embeds: option.embeds,
                }) || null
            )
        }
        return null
    }
}
