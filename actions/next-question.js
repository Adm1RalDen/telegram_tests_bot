const questionComponent = require('../visual/question-component.js')
const database = require('../database/database')
const fs = require('fs')

module.exports = async ctx => {
    let tests
    //const isSet = ctx.session.activeTest.findIndex((e) => e.selectedTestId === ctx.session.selectedTestId)
    let currentUserData
    await database.getDataList('users/' + ctx.update.callback_query.from.id).then(elem => currentUserData = elem)

    try {
        tests = fs.readFileSync(`./tests/test-${currentUserData.activeTest.selectedTestId}.json`, 'utf8');
        tests = JSON.parse(tests)
    } catch (e) {
        console.log('Error:', e.stack);
    }
    const nextQuestion = tests[currentUserData.activeTest.numberOfQuestions]
    await database.writeData('users/' + ctx.update.callback_query.from.id, currentUserData)
    questionComponent(ctx, nextQuestion)
    await ctx.answerCbQuery()
}