const extra = require('telegraf/extra')
const buttons = require('../visual/button').createStopButtons
const fs = require('fs')


module.exports = async (ctx) => {
    // const isSet = ctx.session.activeTest.findIndex((e) => e.selectedTestId === ctx.session.selectedTestId)

    let isSetRes = -1
    ctx.session.stoppedResults.filter((item, index) => {
        if (item.parenId === ctx.session.parenId)
            isSetRes = index
    })
    if (isSetRes < 0) {
        ctx.session.stoppedResults.push({
            parenId: ctx.session.parenId,
            numberOfQuestions: ctx.session.activeTest.numberOfQuestions,
            correctAnswers: ctx.session.activeTest.correctAnswers,
            selectedTestId: ctx.session.selectedTestId,
        })
    }
    else {
        ctx.session.stoppedResults[isSetRes] = {
            parenId: ctx.session.parenId,
            numberOfQuestions: ctx.session.activeTest.numberOfQuestions,
            correctAnswers: ctx.session.activeTest.correctAnswers,
            selectedTestId: ctx.session.selectedTestId,
        }
    }



    let allTests;

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
        name: '⬅Back to menu'
    }, {
        action: 'nextQuestionButton',
        name: 'Continue test'
    }]
    // ctx.session.activeTest = {}
    await ctx.editMessageText(mess,
        buttons(butts))
}

