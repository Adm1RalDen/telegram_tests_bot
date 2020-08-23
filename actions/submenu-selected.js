const Markup = require('telegraf/markup')
const buttons = require('../visual/button').createMultiButton
const subMenuItems = require('../tests/subMenuItems.json')
const requestTest = require('../API/requestTests.js')
const questionComponent = require('../visual/question-component.js')
const fs = require('fs')
const preselectedTest = require('../visual/preselected-test'
)
module.exports = async ctx => {
    const data = JSON.parse(ctx.callbackQuery.data)
    let test;
    let parenId;
    let selectedMenuItem = null

    const subItems = Object.entries(subMenuItems)

    for (let i = 0; i < subItems.length; i++) {
        for (let j = 0; j < subItems[i][1].length; j++) {
            if (subItems[i][1][j]._id === data.p) {
                selectedMenuItem = subItems[i][1][j]
                parenId = subItems[i][0]
            }
        }
    }

    try {
        try {
            test = fs.readFileSync(`./tests/test-${data.p}.json`, 'utf8');
            test = JSON.parse(test)
        } catch (e) {
            await ctx.editMessageText("Завантаження тесту", Markup.removeKeyboard())
            requestTest(ctx, selectedMenuItem.href, data.p).then(e => {
                ctx.editMessageText("Тест Був завантажений, виберіть знову: ", buttons(subMenuItems[parenId], false))
            })
            return undefined;
        }

        ctx.session.selectedTestId = data.p
        ctx.session.parenId = parenId

        const newTestData = {
            numberOfQuestions: 0,
            correctAnswers: 0,
            parenId,
            selectedTestId: data.p
        }

        if (!ctx.session.stoppedResults) { // ? якщо зупинених тестів взагалі не було ще
            ctx.session.stoppedResults = []
            ctx.session.activeTest = newTestData

            questionComponent(ctx, test[0])
            await ctx.answerCbQuery()
        } else {
            const foundTest = ctx.session.stoppedResults.find(item => item.selectedTestId === data.p)
            if (foundTest) {
                ctx.session.activeTest = foundTest
                preselectedTest(ctx, { parenId, foundTest, testLength: test.length })
            } else {
                ctx.session.activeTest = newTestData
                questionComponent(ctx, test[0])
            }
        }

    } catch (e) {
        console.log('submenu catch: ', e)
    }
}