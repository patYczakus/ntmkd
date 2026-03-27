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
                //Combo
                { name: "No to mamy kurcze Combo", value: "combo.png" },
                { name: "combo", value: "combo.png", show: false },
                //Hotpot
                { name: "No to mamy kurcze hotpot", value: "hotpot.png" },
                { name: "hotpot", value: "hotpot.png", show: false },
                //Klejnot
                { name: "No to mamy kurcze klejnot", value: "klejnot.jpg" },
                { name: "klejnot", value: "klejnot.jpg", show: false },
                //Kompot
                { name: "No to mamy kurcze kompot", value: "kompot.png" },
                { name: "kompot", value: "kompot.png", show: false },
                //Kur zapiał
                { name: "No to mamy kur zapiał", value: "kur-zapial.png" },
                { name: "kur zapiał", value: "kur-zapial.png", show: false },
                { name: "kur zapial", value: "kur-zapial.png", show: false },
                //Blaszka
                { name: "No to mamy kurcze blaszka", value: "kurcze-blaszka.png" },
                { name: "kurcze blaszka", value: "kurcze-blaszka.png", show: false },
                { name: "blaszka", value: "kurcze-blaszka.png", show: false },
                //Kurcze kurcze
                { name: "No to mamy kurcze kurcze", value: "kurcze-kurcze.png" },
                { name: "kurcze kurcze", value: "kurcze-kurcze.png", show: false },
                { name: "kurczak", value: "kurcze-kurcze.png", show: false },
                //Kurcze
                { name: "kurcze", value: "kurcze.png" },
                //Kurde
                { name: "kurde", value: "kurde.png" },
                //Kurz
                { name: "No to mamy kur z", value: "kurz.png" },
                { name: "kur z", value: "kurz.png", show: false },
                { name: "kurz", value: "kurz.png", show: false },
                //Łomot
                { name: "No to mamy kurcze łomot", value: "łomot.png" },
                { name: "łomot", value: "łomot.png", show: false },
                { name: "lomot", value: "łomot.png", show: false },
                //Odlot
                { name: "No to mamy kurcze odlot", value: "odlot.png" },
                { name: "odlot", value: "odlot.png", show: false },
                //Pompon
                { name: "No to mamy kurcze pompon", value: "pompon.png" },
                { name: "pompon", value: "pompon.png", show: false },
                //Spanko
                { name: "No to mamy kurcze spanko", value: "spanko.png" },
                { name: "spanko", value: "spanko.png", show: false },
                //Wibromłot
                { name: "No to mamy kurcze wibromłot", value: "wibromłot.png" },
                { name: "wibromłot", value: "wibromłot.png", show: false },
                //ARM Cortex M0
                { name: "No to mamy kurcze STM32 NUCLEO-F072RB0 - STM32F072RB ARM Cortex M0", value: "arm-cortex-m0.jpg" },
                { name: "STM32 NUCLEO-F072RB0 - STM32F072RB ARM Cortex M0", value: "arm-cortex-m0.jpg", show: false },
                { name: "STM32 NUCLEO-F072RB0", value: "arm-cortex-m0.jpg", show: false },
                { name: "STM32F072RB ARM Cortex M0", value: "arm-cortex-m0.jpg", show: false },
                { name: "STM32F072RB", value: "arm-cortex-m0.jpg", show: false },
                { name: "ARM Cortex M0", value: "arm-cortex-m0.jpg", show: false },
                //Kłopot [OG]
                { name: "No to mamy kurcze kłopot", value: "klopot.png" },
                { name: "kłopot", value: "klopot.png", show: false },
                //Kłopot [Minecraft]
                { name: "No to mamy kurcze kłopot (wersja Minecraft)", value: "klopot-minecraft-ver.jpg" },
                { name: "kłopot (mc ver)", value: "klopot-minecraft-ver.jpg", show: false },
                //Blade
                { name: "No to mamy kurcze blade", value: "kurcze-blade.png" },
                { name: "kurcze blade", value: "kurcze-blade.png", show: false },
                //Prosze
                { name: "Kurcze prosze", value: "kurcze-blade.jpg" },
                { name: "prosze", value: "kurcze-prosze.jpg", show: false },
                //Kakaovy chlebicek
                { name: "No to mamy kurcze kakaový chlebíček", value: "kakaowy-chlebicek.png" },
                { name: "kakaový chlebíček", value: "kakaowy-chlebicek.png", show: false },
                { name: "kakaovy chlebicek", value: "kakaowy-chlebicek.png", show: false },
                //Maćka (credits: @pieselswiat)
                { name: "No to mamy kucze maćka", value: "maćka.jpg" },
                { name: "maćka", value: "maćka.jpg", show: false },
                { name: "macka", value: "maćka.jpg", show: false },
                { name: "maciek", value: "maćka.jpg", show: false },
                //No to spierdalam
                { name: "No to spierdalam", value: "no-to-spierdalam.jpg", show: false },
                //Zakola
                { name: "No to mamy kucze zakola", value: "zakola.jpg" },
                { name: "zakola", value: "zakola.jpg", show: false },
                //Dzika
                { name: "No to mamy kucze dzika", value: "dzika.png" },
                { name: "dzika", value: "dzika.png", show: false },
                //Nalot
                { name: "No to mamy kucze nalot", value: "nalot.jpg" },
                { name: "nalot", value: "nalot.jpg", show: false },
                //No to weźcie kurcze mnie wypuśćcie
                { name: "No to weźcie kurcze mnie wypuśćcie", value: "wypuscie.jpg" },
                { name: "weźcie kurcze wypuśćcie", value: "wypuscie.jpg", show: false },
                { name: "wezcie kurcze wypusccie", value: "wypuscie.jpg", show: false },
                { name: "wezcie wypusccie", value: "wypuscie.jpg", show: false },
                { name: "weźcie wypuśćcie", value: "wypuscie.jpg", show: false },
                { name: "wypuśćcie", value: "wypuscie.jpg", show: false },
                { name: "wypusccie", value: "wypuscie.jpg", show: false },
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
