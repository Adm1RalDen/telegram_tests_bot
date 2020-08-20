const controllButtons = require('../visual/button').createQuestionsButtons

module.exports = async ctx => {
    const data = JSON.parse(ctx.callbackQuery.data)
    const isSet = ctx.session.results.findIndex((e) => e.selectedTestId === ctx.session.selectedTestId)


    ctx.session.results[isSet].numberOfQuestions += 1

    if (data.isCorrect === false) {
        ctx.editMessageText(ctx.update.callback_query.message.text + "\n\n---------[Невірна відповідь](google.com)---------", controllButtons(['1', '2'], false))
        // ctx.session.results[isSet].numberOfQuestions += 1

    } else {
        ctx.editMessageText(ctx.update.callback_query.message.text + "\n\n---------[Вірна відповідь](google.com)---------", controllButtons(['1', '2'], false))
        ctx.session.results[isSet].correctAnswers += 1
        // ctx.session.results[isSet].numberOfQuestions += 1
    }

    await ctx.answerCbQuery()
}