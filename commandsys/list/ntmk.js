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
                { name: "No to weźcie kurcze mnie wypuśćcie", value: "wypuscie.ai.jpg" },
                { name: "weźcie kurcze wypuśćcie", value: "wypuscie.ai.jpg", show: false },
                { name: "wezcie kurcze wypusccie", value: "wypuscie.ai.jpg", show: false },
                { name: "wezcie wypusccie", value: "wypuscie.ai.jpg", show: false },
                { name: "weźcie wypuśćcie", value: "wypuscie.ai.jpg", show: false },
                { name: "wypuśćcie", value: "wypuscie.ai.jpg", show: false },
                { name: "wypusccie", value: "wypuscie.ai.jpg", show: false },
                //3 tony miału
                { name: "No to mamy kurcze trzy tony miału", value: "3-tony-mialu.ai.jpg" },
                { name: "No to mamy kurcze 3 tony miału", value: "3-tony-mialu.ai.jpg", show: false },
                { name: "trzy tony miału", value: "3-tony-mialu.ai.jpg", show: false },
                { name: "trzy tony mialu", value: "3-tony-mialu.ai.jpg", show: false },
                { name: "3 tony miału", value: "3-tony-mialu.ai.jpg", show: false },
                { name: "3 tony mialu", value: "3-tony-mialu.ai.jpg", show: false },
                //Kino absolutne
                { name: "No to mamy kurcze kino absolutne", value: "absolute-cimena.jpg" },
                { name: "kino absolutne", value: "absolute-cimena.jpg", show: false },
                { name: "absolutne kino", value: "absolute-cimena.jpg", show: false },
                //Bagno
                { name: "No to mamy kurcze bagno", value: "bagno.ai.png" },
                { name: "bagno", value: "bagno.ai.png", show: false },
                //Bajo jajo
                { name: "No to mamy kurcze bajo jajo", value: "bajo-jajo.ai.png" },
                { name: "bajo jajo", value: "bajo-jajo.ai.png", show: false },
                //Bezrobocie
                { name: "No to mamy kurcze bezrobocie", value: "bezrobocie.ai.png" },
                { name: "bezrobocie", value: "bezrobocie.ai.png", show: false },
                { name: "jobless", value: "bezrobocie.ai.png", show: false },
                //Bezrobocie
                { name: "No to mamy kurcze bezrobocie", value: "bezrobocie.ai.png" },
                { name: "bezrobocie", value: "bezrobocie.ai.png", show: false },
                //Diament
                { name: "No to mamy kurcze diament", value: "diament.png" },
                { name: "diament", value: "diament.png", show: false },
                //Dofinansowanie UE
                { name: "No to mamy kurcze dofinansowanie od funduszy europejskich", value: "dofinansowanie-ue.png" },
                { name: "No to mamy kurcze dofinansowanie ue", value: "dofinansowanie-ue.png", show: false },
                { name: "dofinansowanie od funduszy europejskich", value: "dofinansowanie-ue.png", show: false },
                { name: "dofinansowanie ue", value: "dofinansowanie-ue.png", show: false },
                //Esioka
                { name: "No to mamy kurcze esioka", value: "esioka.ai.png" },
                { name: "esioka", value: "esioka.ai.png", show: false },
                //Jackpot
                { name: "No to mamy kurcze jackpot", value: "jackpot.png" },
                { name: "jackpot", value: "jackpot.png", show: false },
                //Kadzidlo
                { name: "No to mamy kurcze kadzidlo", value: "kadzidlo.ai.png" },
                { name: "kadzidlo", value: "kadzidlo.ai.png", show: false },
                //Kokpit
                { name: "No to mamy kurcze kokpit", value: "kokpit.ai.png" },
                { name: "kokpit", value: "kokpit.ai.png", show: false },
                //Kolegę
                { name: "No to mamy kurcze kolegę", value: "kolega.ai.png" },
                { name: "kolegę", value: "kolega.ai.png", show: false },
                { name: "kolege", value: "kolega.ai.png", show: false },
                //Konfidenta
                { name: "No to mamy kurcze konfidenta", value: "konfidenta.ai.png" },
                { name: "konfidenta", value: "konfidenta.ai.png", show: false },
                //Kotlet
                { name: "No to mamy kurcze kotlet", value: "kotlet.png" },
                { name: "kotlet", value: "kotlet.png", show: false },
                //Łyk monstera
                { name: "No to mamy kurcze łyk monstera", value: "esioka.ai.png" },
                { name: "łyk monstera", value: "esioka.ai.png", show: false },
                //No to nie mamy kurcze silnika
                { name: "No to nie mamy kurcze silnika", value: "ni-ma-silnika.ai.png" },
                { name: "nie ma silnika", value: "ni-ma-silnika.ai.png", show: false },
                { name: "ni ma silnika", value: "ni-ma-silnika.ai.png", show: false },
                //Nie mamy kłopotu
                { name: "No to nie mamy kurcze kłopotu", value: "nie-klopot.ai.png" },
                { name: "nie mamy kłopotu", value: "nie-klopot.ai.png", show: false },
                { name: "nie mamy klopotu", value: "nie-klopot.ai.png", show: false },
                //Nie mamy wifi
                { name: "No to nie mamy kurcze Wi-Fi", value: "nie-wifi.ai.png" },
                { name: "nie mamy wi-fi", value: "nie-wifi.ai.png", show: false },
                { name: "nie mamy wifi", value: "nie-wifi.ai.png", show: false },
                //Nocny autobus
                { name: "No to mamy kurcze nocny autobus", value: "nocny-autobus.ai.png" },
                { name: "nocny autobus", value: "nocny-autobus.ai.png", show: false },
                //Potworka
                { name: "No to mamy kurcze potworka", value: "potworka.png" },
                { name: "potworka", value: "potworka.png", show: false },
                //Problem
                { name: "No to mamy kurcze problem", value: "problem.png" },
                { name: "problem", value: "problem.png", show: false },
                //Pryncy pałki
                { name: "No to mamy kurcze pryncy pałki", value: "pryncy-palki.png" },
                { name: "pryncy pałki", value: "pryncy-palki.png", show: false },
                { name: "pryncy palki", value: "pryncy-palki.png", show: false },
                //Szpital Psychiatryczny Choroszcz //Jedno miejsce na ziemi
                { name: "No to mamy kurcze jedno miejsce na ziemi", value: "spc.ai.png" },
                { name: "jedno miejsce na ziemi", value: "spc.ai.png", show: false },
                { name: "szpital psychiatryczny choroszcz", value: "spc.ai.png", show: false },
                { name: "psychiatryk choroszcz", value: "spc.ai.png", show: false },
                //Stryrtę
                { name: "No to mamy kurcze styrtę", value: "styrte.ai.png" },
                { name: "styrtę", value: "styrte.ai.png", show: false },
                { name: "styrte", value: "styrte.ai.png", show: false },
                //Weekend
                { name: "No to mamy kurcze weekend", value: "weekend.ai.png" },
                { name: "weekend", value: "weekend.ai.png", show: false },
                //Toyota yaris
                { name: "No to mamy kurcze toyota yaris", value: "yaris.png" },
                { name: "No to mamy kurcze toyotę yaris", value: "yaris.png", show: false },
                { name: "toyota yaris", value: "yaris.png", show: false },
                { name: "yaris", value: "yaris.png", show: false },
                //Zatwardzenie
                { name: "No to mamy kurcze zatwardzenie", value: "zatwardzenie.ai.png" },
                { name: "zatwardzenie", value: "zatwardzenie.ai.png", show: false },
                //Znowu
                { name: "No to mamy kurcze znowu", value: "znowu.ai.png" },
                { name: "znowu", value: "znowu.ai.png", show: false },
                //Mamy kurcze
                { name: "No to mamy kurcze", value: "mamy-kurcze.jpg" },
                { name: "mamy kurcze", value: "mamy-kurcze.jpg", show: false },
            ],
        }),

    /**
     *
     * @param {import("../core/cmdhandler.mjs").CommandHandler} handler
     */
    async execute(handler) {
        const file = await fs.readFile(path.join("imgs", handler.options.typ))

        if (handler.options.typ.includes(".ai.")) var content = "⚠️ **Uwaga!** Oznaczono tego mema jako AI slop - jakość mema może być kurcze gorsza."

        handler.reply({
            content,
            attachments: [{ buffer: file, name: handler.options.typ }],
        })
    },
}
