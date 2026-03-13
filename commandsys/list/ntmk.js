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
            description: "Wybór konkretnego mema",
            required: true,
            choices: [
                { name: "No to mamy kurcze Combo", value: "combo.png" },
                { name: "combo", value: "combo.png", show: false },
                { name: "No to mamy kurcze hotpot", value: "hotpot.png" },
                { name: "hotpot", value: "hotpot.png", show: false },
                { name: "No to mamy kurcze klejnot", value: "klejnot.jpg" },
                { name: "klejnot", value: "klejnot.jpg", show: false },
                { name: "No to mamy kurcze kompot", value: "kompot.png" },
                { name: "kompot", value: "kompot.png", show: false },
                { name: "No to mamy kur zapiał", value: "kur-zapial.png" },
                { name: "kur zapiał", value: "kur-zapial.png", show: false },
                { name: "kur zapial", value: "kur-zapial.png", show: false },
                { name: "No to mamy kurcze blaszka", value: "kurcze-blaszka.png" },
                { name: "kurcze blaszka", value: "kur-zapial.png", show: false },
                { name: "No to mamy kurcze kurcze", value: "kurcze-kurcze.png" },
                { name: "kurcze kurcze", value: "kurcze-kurcze.png", show: false },
                { name: "kurczak", value: "kurcze-kurcze.png", show: false },
                { name: "kurcze", value: "kurcze.png" },
                { name: "kurde", value: "kurde.png" },
                { name: "No to mamy kur z", value: "kurz.png" },
                { name: "kur z", value: "kurz.png", show: false },
                { name: "kurz", value: "kurz.png", show: false },
                { name: "No to mamy kurcze łomot", value: "łomot.png" },
                { name: "łomot", value: "łomot.png", show: false },
                { name: "lomot", value: "łomot.png", show: false },
                { name: "No to mamy kurcze odlot", value: "odlot.png" },
                { name: "odlot", value: "odlot.png", show: false },
                { name: "No to mamy kurcze pompon", value: "pompon.png" },
                { name: "pompon", value: "pompon.png", show: false },
                { name: "No to mamy kurcze spanko", value: "spanko.png" },
                { name: "spanko", value: "spanko.png", show: false },
                { name: "No to mamy kurcze wibromłot", value: "wibromłot.png" },
                { name: "wibromłot", value: "wibromłot.png", show: false },
                { name: "No to mamy kurcze STM32 NUCLEO-F072RB0 - STM32F072RB ARM Cortex M0", value: "arm-cortex-m0.jpg" },
                { name: "STM32 NUCLEO-F072RB0 - STM32F072RB ARM Cortex M0", value: "arm-cortex-m0.jpg", show: false },
                { name: "STM32 NUCLEO-F072RB0", value: "arm-cortex-m0.jpg", show: false },
                { name: "STM32F072RB ARM Cortex M0", value: "arm-cortex-m0.jpg", show: false },
                { name: "ARM Cortex M0", value: "arm-cortex-m0.jpg", show: false },
                { name: "No to mamy kurcze kłopot", value: "klopot.png" },
                { name: "kłopot", value: "klopot.png", show: false },
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
