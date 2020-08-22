const extra = require('telegraf/extra')
const buttons = require('../visual/button').createStopButtons
const fs = require('fs')


module.exports = async (ctx) => {
    let allTests;
    let isSetRes = -1

    ctx.session.stoppedResults.find((item, index) => {
        if (item.parenId === ctx.session.parenId)
            isSetRes = index
    })

    const testData = {
        parenId: ctx.session.parenId,
        numberOfQuestions: ctx.session.activeTest.numberOfQuestions,
        correctAnswers: ctx.session.activeTest.correctAnswers,
        selectedTestId: ctx.session.selectedTestId,
    }

    if (isSetRes < 0) {
        ctx.session.stoppedResults.push(testData)
    }
    else {
        ctx.session.stoppedResults[isSetRes] = testData
    }


    try {
        allTests = fs.readFileSync(`./tests/test-${ctx.session.selectedTestId}.json`, 'utf8');
        allTests = JSON.parse(allTests)
    } catch (e) {
        console.log('Error:', e.stack);
    }


    let mess = `Правильних відповідей: ${ctx.session.activeTest.correctAnswers}.` +
        `\nПройдено тестів: ${ctx.session.activeTest.numberOfQuestions}.` +
        `\nВсього теcтів: ${allTests.length}.`

    const butts = [{
        action: 'goToBack',
        name: '⬅ Back to menu'
    }, {
        action: 'nextQuestionButton',
        name: '\u25b6 Continue'
    }]
    // ctx.session.activeTest = {}
    await ctx.editMessageText(mess, buttons(butts))
}

