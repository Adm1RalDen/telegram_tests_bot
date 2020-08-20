const buttons = require('../visual/button').createMultiButton
const subMenuItems = require('../tests/subMenuItems.json')

module.exports = async ctx => {
    await ctx.editMessageText("Виберіть Тест:", buttons(subMenuItems[ctx.session.parenId], false))
}