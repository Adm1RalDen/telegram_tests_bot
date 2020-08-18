const fs = require('fs')
const path = require('path')

module.exports = (data, filename) => {
    fs.writeFile(path.join(__dirname, '..', 'tests', filename),
        JSON.stringify(data, null, 2),
        (err) => {
            if (err) ctx.reply('Error' + err)
        })
}