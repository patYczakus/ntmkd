const fs = require("fs")
const path = require("path")

const botsPath = path.join(__dirname, "bots")

fs.readdir(botsPath, (err, files) => {
    if (err) {
        console.error("No to mamy kurcze kłopot z folderem botów!\n ", err)
        return
    }

    files.forEach((file) => {
        if (file.endsWith(".js") || file.endsWith(".mjs")) {
            const botPath = path.join(botsPath, file)
            require(botPath)
        }
    })
})
