const menu = require('../tests/Menu.json')
const buttons = require('../visual').createMultiButton
const requestMenu = require('../API/requestMenu')
module.exports = (ctx) => {
    // requestTest(ctx)
    // requestMenu(ctx)
    
    ctx.reply('Виберіть Розділ', buttons(menu, true))
}
