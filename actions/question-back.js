const buttons = require('../visual/button').createMultiButton
const database = require('../database/database')

module.exports = async ctx => {
    let currentUserData
    await database.getDataList('users/' + ctx.update.callback_query.from.id).then(elem => currentUserData = elem)

    let subMenuItems
    await database.getDataList('submenu/').then(elem => subMenuItems = elem)

    await ctx.editMessageText("Виберіть Тест:", buttons(subMenuItems[currentUserData.parenId], false))
}