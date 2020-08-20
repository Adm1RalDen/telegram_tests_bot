
const buttons = require('../visual/button').createMultiButton
const subMenuItems = require('../tests/subMenuItems.json')

module.exports = async ctx => {
    const data = JSON.parse(ctx.callbackQuery.data)
    const parenId = data.p

    await ctx.editMessageText("Виберіть Тест:", buttons(subMenuItems[parenId], false))
    await ctx.answerCbQuery();
}