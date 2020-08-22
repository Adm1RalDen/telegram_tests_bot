const fs = require('fs')
const questionComponent = require('../visual/question-component')

module.exports = async (ctx) => {
    let tests
    //const isSet = ctx.session.activeTest.findIndex((e) => e.selectedTestId === ctx.session.selectedTestId)

    try {
        tests = fs.readFileSync(`./tests/test-${ctx.session.selectedTestId}.json`, 'utf8');
        tests = JSON.parse(tests)
    } catch (e) {
        console.log('Error:', e.stack);
    }

    ctx.session.activeTest.numberOfQuestions = 0
    ctx.session.activeTest.correctAnswers = 0

    const nextQuestion = tests[0]

    questionComponent(ctx, nextQuestion)

    try {
        await ctx.answerCbQuery()
    } catch (e) {
        console.log(e)
    }
}