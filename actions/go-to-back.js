const buttons = require('../visual/button').createMultiButton
const database = require('../database/database.js')

module.exports = async ctx => {
    database.getDataList('menu').then(elem => ctx.editMessageText('Виберіть Розділ', buttons(elem, true)))
    await ctx.answerCbQuery();
}