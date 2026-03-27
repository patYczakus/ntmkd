const { Command } = require("../core/command")
const fs = require("fs/promises")
const path = require("path")

module.exports = {
    data: new Command().setName("help").setDescription("Centrum pomocy bota").setOption({
        type: "text",
        name: "cmd",
        description: "Komenda do wyszukania",
    }),

    /**
     *
     * @param {import("../core/cmdhandler.mjs").CommandHandler} handler
     */
    async execute(handler) {
        if (!handler.options.cmd) {
            const cmds = (await fs.readdir(path.join("commandsys", "list"))).map((x) => {
                if (x == __filename.slice(__dirname.length)) var dt = this.data
                else var dt = require(`./${x}`).data

                return `- \`${dt.name}\` - ${dt.desc}`
            })
            handler.reply({
                embeds: [
                    {
                        title: "No to mamy kurcze depot!",
                        description: `Witaj! Jestem botem odpowiedzialnym za memy typu \"no to mamy kurcze...\". Działam jednocześnie na Discordzie, oraz na Stoucie!\n\nPoniżej masz moją listę, jeśli chcesz zdobyć więcej informacji, wpisz \`help <komenda>\`:\n${cmds.join("\n")}`,
                    },
                ],
            })
        } else {
            const _choices = (arg) => {
                const filtered = arg.filter((x) => x.show ?? true).toSorted(() => Math.random() - 0.5)

                if (filtered.length > 20) {
                    return (
                        filtered
                            .slice(0, 20)
                            .map((y) => `\n   - ${y.name}`)
                            .join("") + `\n   - *+${filtered.length - 20} możliwości*`
                    )
                }
                return filtered.map((y) => `\n   - ${y.name}`).join("")
            }

            let cmd
            try {
                if (handler.options.cmd == this.data.name) cmd = this.data
                else cmd = require(`./${handler.options.cmd}`).data
            } catch {
                handler.reply({
                    embeds: [
                        {
                            title: "No to mamy kurcze kłopot...",
                            description: `Nie mam takiej komendy. Może jest gdzieś literówka?`,
                            color: "#EE2323",
                        },
                    ],
                })
                return
            }

            handler.reply({
                embeds: [
                    {
                        title: `/${cmd.name}`,
                        description: `${cmd.desc}\n\nArgumenty: ${cmd.args
                            .map((x) => `\n- \` ${x.name}\` - ${x.description}${x.choices ? ` (wybór)${_choices(x.choices)}` : ""}`)
                            .join("")}`,
                    },
                ],
            })
        }
    },
}
