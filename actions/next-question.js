const questionComponent = require('../visual/question-component.js')

const fs = require('fs')

module.exports = async ctx => {
    let tests
    const isSet = ctx.session.results.findIndex((e) => e.selectedTestId === ctx.session.selectedTestId)

    try {
        tests = fs.readFileSync(`./tests/test-${ctx.session.selectedTestId}.json`, 'utf8');
        tests = JSON.parse(tests)
    } catch (e) {
        console.log('Error:', e.stack);
    }
    const nextQuestion = tests[ctx.session.results[isSet].numberOfQuestions]


    questionComponent(ctx, nextQuestion)
    await ctx.answerCbQuery()
}