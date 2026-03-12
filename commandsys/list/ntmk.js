const { Command } = require("../core/command")
const fs = require("fs/promises")
const path = require("path")

module.exports = {
    data: new Command()
        .setName("ntmk")
        .setDescription("no to mamy kurcze...")
        .setOption({
            type: "text",
            name: "typ",
            description: "Typ mema",
            required: true,
            choices: [
                { name: "No to mamy kurcze Combo", value: "combo.png" },
                { name: "combo", value: "combo.png" },
                { name: "No to mamy kurcze hotpot", value: "hotpot.png" },
                { name: "hotpot", value: "hotpot.png" },
                { name: "No to mamy kurcze klejnot", value: "klejnot.jpg" },
                { name: "klejnot", value: "klejnot.jpg" },
                { name: "No to mamy kurcze kompot", value: "kompot.png" },
                { name: "kompot", value: "kompot.png" },
                { name: "No to mamy kur zapiał", value: "kur-zapial.png" },
                { name: "kur zapiał", value: "kur-zapial.png" },
                { name: "kur zapial", value: "kur-zapial.png" },
                { name: "No to mamy kurcze blaszka", value: "kurcze-blaszka.png" },
                { name: "kurcze blaszka", value: "kur-zapial.png" },
                { name: "No to mamy kurcze kurcze", value: "kurcze-kurcze.png" },
                { name: "kurcze kurcze", value: "kurcze-kurcze.png" },
                { name: "kurczak", value: "kurcze-kurcze.png" },
                { name: "kurcze", value: "kurcze.png" },
                { name: "kurde", value: "kurde.png" },
                { name: "No to mamy kur z", value: "kurz.png" },
                { name: "kur z", value: "kurz.png" },
                { name: "kurz", value: "kurz.png" },
                { name: "No to mamy kurcze łomot", value: "łomot.png" },
                { name: "łomot", value: "łomot.png" },
                { name: "lomot", value: "łomot.png" },
                { name: "No to mamy kurcze odlot", value: "odlot.png" },
                { name: "odlot", value: "odlot.png" },
                { name: "No to mamy kurcze pompon", value: "pompon.png" },
                { name: "pompon", value: "pompon.png" },
                { name: "No to mamy kurcze spanko", value: "spanko.png" },
                { name: "spanko", value: "spanko.png" },
                { name: "No to mamy kurcze wibromłot", value: "wibromłot.png" },
                { name: "wibromłot", value: "wibromłot.png" },
                { name: "wibromlot", value: "wibromłot.png" },
            ],
        }),

    /**
     *
     * @param {import("../core/cmdhandler.mjs").CommandHandler} handler
     */
    async execute(handler) {
        const file = await fs.readFile(path.join("imgs", handler.options.typ))

        handler.reply({
            attachments: [{ buffer: file, name: handler.options.typ }],
        })
    },
}
