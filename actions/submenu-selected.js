const Markup = require('telegraf/markup')
const buttons = require('../visual/button').createMultiButton
const subMenuItems = require('../tests/subMenuItems.json')
const requestTest = require('../API/requestTests.js')
const questionComponent = require('../visual/question-component.js')
const fs = require('fs')

module.exports = async ctx => {
    const data = JSON.parse(ctx.callbackQuery.data)
    let test;
    let parendId;
    let fileData;

    const selectedMenuItem = Object.entries(subMenuItems).find(e => e[1].find(el => {
        if (el._id === data.p) {
            parendId = e[0]
            return true
        } else {
            return false
        }
    }))

    try {
        //!  test = require(`./tests/test-${data.p}.json`) для чтения файлов нельзя юзать require 
        try {
            test = fs.readFileSync(`./tests/test-${data.p}.json`, 'utf8');
            test = JSON.parse(test)
        } catch (e) {
            await ctx.editMessageText("Завантаження тесту", Markup.removeKeyboard())
            requestTest(ctx, selectedMenuItem[1][0].href, data.p).then(e => {
                ctx.editMessageText("Тест Був завантажений, виберіть знову: ", buttons(subMenuItems[parendId], false))
            })

        }

        ctx.session.startTest = 'asd'

        if (!ctx.session.results) {
            ctx.session.results = []
        }

        const isSet = ctx.session.results.findIndex((e) => e.selectedTestId === data.p)

        if (isSet === -1)
            ctx.session.results.push({
                parendId,
                numberOfQuestions: 0,
                correctAnswers: 0,
                selectedTestId: data.p,
            })

        ctx.session.selectedTestId = data.p

        ctx.session.parenId = parendId
        const testQuestionNumber = typeof ctx.session.results[isSet] !== 'undefined' ? ctx.session.results[isSet].numberOfQuestions : 0

        let firstQuestion = test[testQuestionNumber]

        questionComponent(ctx, firstQuestion)

        await ctx.answerCbQuery();
    } catch (e) {
        console.log(e)
    }
}