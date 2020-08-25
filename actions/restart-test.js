const fs = require('fs')
const questionComponent = require('../visual/question-component')
const database = require('../database/database')
module.exports = async (ctx) => {
    let tests
    let currentUserData
    await database.getDataList('users/' + ctx.update.callback_query.from.id).then(elem => currentUserData = elem)

    try {
        tests = fs.readFileSync(`./tests/test-${currentUserData.selectedTestId}.json`, 'utf8');
        tests = JSON.parse(tests)
    } catch (e) {
        console.log('Error:', e.stack);
    }

    currentUserData.activeTest.numberOfQuestions = 0
    currentUserData.activeTest.correctAnswers = 0

    const nextQuestion = tests[0]
    await database.writeData('users/' + ctx.update.callback_query.from.id, currentUserData)
    questionComponent(ctx, nextQuestion)

    try {
        await ctx.answerCbQuery()
    } catch (e) {
        console.log(e)
    }
}