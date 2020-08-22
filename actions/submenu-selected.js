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
    let parendId;
    let isSetRes = -1;

    const selectedMenuItem = Object.entries(subMenuItems).find(e => e[1].find(el => el._id === data.p && (parendId = e[0])))

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

        if (!ctx.session.stoppedResults) {
            ctx.session.stoppedResults = []
        } else {
            ctx.session.stoppedResults.find((item, index) => {
                if (item.parenId === ctx.session.parenId) {
                    isSetRes = index
                }
            })
        }

        if (isSetRes < 0) {
            ctx.session.activeTest = {
                numberOfQuestions: 0,
                correctAnswers: 0,
            }

            ctx.session.selectedTestId = data.p
            ctx.session.parenId = parendId

            questionComponent(ctx, test[0])
            await ctx.answerCbQuery()
        } else {
            // TODO якщо ми знайшли зупинений тест, потрібно запитати у користувача,
            //  TODO чи бажає він його продовжити,чи почати заново, також  відобразити минулі резултати та надати можливість повернутися назад
            preselectedTest(ctx, { parendId, data })
            // ctx.session.activeTest = ctx.session.stoppedResults[isSetRes]
        }

    } catch (e) {
        console.log(e)
    }
}