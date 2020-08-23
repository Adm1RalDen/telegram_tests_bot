const extra = require('telegraf/extra')
const buttons = require('../visual/button').createStopButtons
const fs = require('fs')


module.exports = async (ctx) => {
    let allTests;

    const foundTest = ctx.session.stoppedResults.findIndex(item => item.selectedTestId === ctx.session.selectedTestId)

    if (foundTest > 0) {
        ctx.session.stoppedResults[foundTest] = ctx.session.activeTest
    }
    else {
        ctx.session.stoppedResults.push(ctx.session.activeTest)
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

