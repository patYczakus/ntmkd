const djs = require("discord.js")

module.exports = {
    Command: class {
        constructor() {
            this.name = "command"
            this.desc = "Base command class"
            this.args = []
        }

        setName(name) {
            this.name = name
            return this
        }

        setDescription(desc) {
            this.desc = desc
            return this
        }

        /**
         * Classic text/number option
         * @overload
         * @param {Object} option
         * @param {string} option.name - The name of the option
         * @param {string} option.description - The description of the option
         * @param {"text" | "number"} option.type - The type of the option
         * @param {boolean} [option.required=false] - Whether the option is required
         * @param {number} [option.min]
         * @param {number} [option.max]
         * @returns {this}
         */
        /**
         * Text choices
         * @overload
         * @param {Object} option
         * @param {string} option.name - The name of the option
         * @param {string} option.description - The description of the option
         * @param {"text"} option.type - The type of the option
         * @param {boolean} [option.required=false] - Whether the option is required
         * @param {Array<{name: string, value: string} | string>} option.choices - The choices for the option. If not Object, name and value will be the same
         * @returns {this}
         */
        /**
         * Number choices
         * @overload
         * @param {Object} option
         * @param {string} option.name - The name of the option
         * @param {string} option.description - The description of the option
         * @param {"number"} option.type - The type of the option
         * @param {boolean} [option.required=false] - Whether the option is required
         * @param {Array<{name: string, value: number} | number>} option.choices - The choices for the option. If not Object, name and value will be the same
         * @returns {this}
         */
        /**
         * Other options not required with additional parameters
         * @overload
         * @param {Object} option
         * @param {string} option.name - The name of the option
         * @param {string} option.description - The description of the option
         * @param {"boolean" | "user" | "role"} option.type - The type of the option
         * @param {boolean} [option.required=false] - Whether the option is required
         * @return {this}
         */
        setOption(option) {
            if (["text", "number"].includes(option.type) && Array.isArray(option.choices)) {
                option.choices = option.choices.map((x) => (typeof x == "object" ? x : { name: x, value: x }))
            }
            if (["text", "number"].includes(option.type) && !Array.isArray(option.choices)) {
                option.min ??= 0
                option.max ??= 2000
            }
            option.required ??= false
            this.args.push(option)
            return this
        }

        toBasicJSON() {
            return {
                name: this.name,
                description: this.desc,
                options: this.args,
            }
        }

        toDiscordCommand() {
            const slash = new djs.SlashCommandBuilder().setName(this.name).setDescription(this.desc)
            for (const arg of this.args) {
                switch (arg.type) {
                    case "text":
                        if (Array.isArray(arg.choices)) {
                            slash.addStringOption((o) =>
                                o
                                    .setName(arg.name)
                                    .setDescription(arg.description)
                                    .setRequired(arg.required || false)
                                    .setAutocomplete(true),
                            )
                        } else {
                            slash.addStringOption((o) => {
                                o.setName(arg.name)
                                    .setDescription(arg.description)
                                    .setRequired(arg.required || false)
                                if (arg.min) o.setMinLength(arg.min)
                                if (arg.max) o.setMaxLength(arg.max)
                                return o
                            })
                        }
                        break
                    case "number":
                        if (Array.isArray(arg.choices)) {
                            slash.addNumberOption((o) =>
                                o
                                    .setName(arg.name)
                                    .setDescription(arg.description)
                                    .setRequired(arg.required || false)
                                    .setAutocomplete(true),
                            )
                        } else {
                            slash.addNumberOption((o) => {
                                o.setName(arg.name)
                                    .setDescription(arg.description)
                                    .setRequired(arg.required || false)
                                if (arg.min) o.setMinValue(arg.min)
                                if (arg.max) o.setMaxValue(arg.max)
                                return o
                            })
                        }
                        break
                    case "boolean":
                        slash.addBooleanOption((o) =>
                            o
                                .setName(arg.name)
                                .setDescription(arg.description)
                                .setRequired(arg.required || false),
                        )
                        break
                    case "user":
                        slash.addUserOption((o) =>
                            o
                                .setName(arg.name)
                                .setDescription(arg.description)
                                .setRequired(arg.required || false),
                        )
                        break
                    case "role":
                        slash.addRoleOption((o) =>
                            o
                                .setName(arg.name)
                                .setDescription(arg.description)
                                .setRequired(arg.required || false),
                        )
                        break
                }
            }
            return slash
        }
    },
}
