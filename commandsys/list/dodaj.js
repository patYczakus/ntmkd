const { Command } = require("../core/command")

module.exports = {
    data: new Command().setName("dodaj").setDescription("Wysyła linki do dodania bota"),

    /**
     *
     * @param {import("../core/cmdhandler.mjs").CommandHandler} handler
     */
    async execute(handler) {
        return handler.reply({
            content: `Wiedziałeś o tym, że jestem nie tylko na tej platformie? Obczaj mnie na:
- [Stoat](<https://stoat.chat/bot/01KKF83WPRBSNQESRWVJJAQD5H>)
- [Discord](<https://discord.com/oauth2/authorize?client_id=1481722926196850700>)`,
        })
    },
}
