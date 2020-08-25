const buttons = require('../visual/button').createStopButtons
const fs = require('fs')
const questionComponent = require('../visual/question-component')

module.exports = async (ctx, params) => {
    const butts = [{
        action: 'goToBack',
        name: '⬅ Back to menu'
    }, {
        action: 'nextQuestionButton',
        name: '\u25b6 Continue'
    }]

    const { parenId, foundTest, testLength } = params
    let currentUserData
    await database.getDataList('users/' + ctx.update.callback_query.from.id).then(elem => currentUserData = elem)

    currentUserData.selectedTestId = foundTest.selectedTestId
    currentUserData.activeTest = foundTest
    currentUserData.parenId = parenId

    let mess = `Цей тест був призупинений з такими результатами: ` +
        `\n\n\nПравильних відповідей: ${foundTest.correctAnswers}.` +
        `\nПройдено тестів: ${foundTest.numberOfQuestions}.` +
        `\nВсього теcтів: ${testLength}.` +
        `\n\nЩо ви бажаєте зробити ?`

    await database.writeData('users/' + ctx.update.callback_query.from.id, currentUserData)
    await ctx.editMessageText(mess, buttons(butts))


    try {
        await ctx.answerCbQuery()
    } catch (e) {
        console.log(e)
    }
}

