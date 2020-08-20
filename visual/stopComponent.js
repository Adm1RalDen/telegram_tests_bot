const extra = require('telegraf/extra')
const buttons = require('../visual/button').createStopButtons
const fs = require('fs')


module.exports = async (ctx) => {
    const isSet = ctx.session.results.findIndex((e) => e.selectedTestId === ctx.session.selectedTestId)

    let allTests;

    try {
        allTests = fs.readFileSync(`./tests/test-${ctx.session.selectedTestId}.json`, 'utf8');
        allTests = JSON.parse(allTests)
    } catch (e) {
        console.log('Error:', e.stack);
    }


    let mess = `Правильних відповідей: ${ctx.session.results[isSet].correctAnswers}.` +
        `\nПройдено тестів: ${ctx.session.results[isSet].numberOfQuestions}.` +
        `\nВсього теcтів: ${allTests.length}.`

    const butts = [{
        action: 'goToBack',
        name: '⬅Back to menu'
    }, {
        action: 'nextQuestionButton',
        name: 'Continue test'
    }]

    await ctx.editMessageText(mess,
        buttons(butts))
}

