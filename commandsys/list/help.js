const { Command } = require("../core/command")
const fs = require("fs/promises")
const path = require("path")

module.exports = {
    data: new Command().setName("help").setDescription("Centrum pomocy - to ten panel, który widzisz!"),

    /**
     *
     * @param {import("../core/cmdhandler.mjs").CommandHandler} handler
     */
    async execute(handler) {
        const cmds = (await fs.readdir(path.join("commandsys", "list"))).map((x) => {
            if (x == __filename.slice(__dirname.length)) var dt = this.data
            else var dt = require(`./${x}`).data

            return `- \`${dt.name}\` - ${dt.desc}`
        })
        handler.reply({
            embeds: [
                {
                    title: "No to mamy kurcze depot",
                    description: `Witaj! Jestem botem odpowiedzialnym za memy typu \"no to mamy kurcze...\". Poniżej masz moją listę!\n\n${cmds.join("\n")}`,
                },
            ],
        })
    },
}
