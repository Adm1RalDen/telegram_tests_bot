const buttons = require('../visual/button').createMultiButton
const menu = require('../tests/Menu.json')

module.exports = async ctx => {
    await ctx.editMessageText('Виберіть Розділ', buttons(menu, true))
    await ctx.answerCbQuery();
}