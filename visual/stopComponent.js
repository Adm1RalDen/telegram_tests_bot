const extra = require('telegraf/extra')
const buttons = require('../visual/button').createStopButtons
const fs = require('fs')
const database = require('../database/database')

module.exports = async (ctx) => {
    let allTests;

    let currentUserData
    await database.getDataList('users/' + ctx.update.callback_query.from.id).then(elem => currentUserData = elem)
    if (!currentUserData.stoppedResults) {
        currentUserData.stoppedResults = []
    }
    const foundTest = currentUserData.stoppedResults.findIndex(item => item.selectedTestId === currentUserData.selectedTestId)

    if (foundTest > 0) {
        currentUserData.stoppedResults[foundTest] = currentUserData.activeTest
    }
    else {
        currentUserData.stoppedResults.push(currentUserData.activeTest)
    }


    try {
        allTests = fs.readFileSync(`./tests/test-${currentUserData.selectedTestId}.json`, 'utf8');
        allTests = JSON.parse(allTests)
    } catch (e) {
        console.log('Error:', e.stack);
    }


    let mess = `Правильних відповідей: ${currentUserData.activeTest.correctAnswers}.` +
        `\nПройдено тестів: ${currentUserData.activeTest.numberOfQuestions}.` +
        `\nВсього теcтів: ${allTests.length}.`

    const butts = [{
        action: 'goToBack',
        name: '⬅ Back to menu'
    }, {
        action: 'nextQuestionButton',
        name: '\u25b6 Continue'
    }]
    // currentUserData.activeTest = {}
    await database.writeData('users/' + ctx.update.callback_query.from.id, currentUserData)
    await ctx.editMessageText(mess, buttons(butts))
}

