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

    ctx.session.selectedTestId = foundTest.selectedTestId
    ctx.session.activeTest = foundTest
    ctx.session.parenId = parenId

    let mess = `Цей тест був призупинений з такими результатами: ` +
        `\n\n\nПравильних відповідей: ${foundTest.correctAnswers}.` +
        `\nПройдено тестів: ${foundTest.numberOfQuestions}.` +
        `\nВсього теcтів: ${testLength}.` +
        `\n\nЩо ви бажаєте зробити ?`

    await ctx.editMessageText(mess, buttons(butts))


    try {
        await ctx.answerCbQuery()
    } catch (e) {
        console.log(e)
    }
}

