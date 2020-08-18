const menu = require('../tests/Menu.json')
const buttons = require('../visual').createMultiButton
const requestMenu = require('../API/requestMenu')
const requestSubMenu = require('../API/requestSubMenu')

module.exports = (ctx) => {
    // requestTest(ctx)
    // requestMenu(ctx)
    // menu.forEach(async e => {
    //     await requestSubMenu(ctx,  e.url.replace(/"/g, ''), e._id)
    // })
    
    // requestSubMenu(ctx, menu[0].url.replace(/"/g, ''), menu[0]._id)
    ctx.reply('Виберіть Розділ', buttons(menu, true))
}
