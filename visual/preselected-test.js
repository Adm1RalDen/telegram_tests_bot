const buttons = require('../visual/button').createStopButtons
const fs = require('fs')
const questionComponent = require('../visual/question-component')

module.exports = async (ctx, params) => {
    let selectedTest;
    const butts = [{
        action: 'goToBack',
        name: '⬅ Back to menu'
    }, {
        action: 'nextQuestionButton',
        name: '\u25b6 Continue'
    }]

    const { parendId, data } = params

    const stopedData = ctx.session.stoppedResults.find(item => item.parenId === ctx.session.parenId)
    console.log(stopedData)
    try {
        selectedTest = fs.readFileSync(`./tests/test-${ctx.session.selectedTestId}.json`, 'utf8');
        selectedTest = JSON.parse(selectedTest)
    } catch (e) {
        console.log('Error:', e.stack);
    }

    if (stopedData) {
        ctx.session.selectedTestId = stopedData.selectedTestId
        ctx.session.activeTest = stopedData

        let mess = `Цей тест був призупинений з такими результатами: ` +
            `\n\n\nПравильних відповідей: ${stopedData.correctAnswers}.` +
            `\nПройдено тестів: ${stopedData.numberOfQuestions}.` +
            `\nВсього теcтів: ${selectedTest.length}.` +
            `\n\nЩо ви бажаєте зробити ?`

        await ctx.editMessageText(mess, buttons(butts))
    } else {
        ctx.session.selectedTestId = data.p
        ctx.session.parenId = parendId

        questionComponent(ctx, selectedTest)
    }

    try {
        await ctx.answerCbQuery()
    } catch (e) {
        console.log(e)
    }
}

