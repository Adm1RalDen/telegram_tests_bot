const controllButtons = require('../visual/button').createQuestionsButtons

module.exports = async ctx => {
    const data = JSON.parse(ctx.callbackQuery.data)
    // const isSet = ctx.session.activeTest.findIndex((e) => e.selectedTestId === ctx.session.selectedTestId)
    ctx.session.activeTest.numberOfQuestions += 1
    // console.log('data', data)
    const isCorrect = data.b
    const answerContent = data.c
    const correctAnswer = data.d

    const asnwerNums =
        ctx.update.callback_query.message.text.split('\n').map((item, index) => {
            return index > 3 && item[0] === correctAnswer ? item.concat(' \u2705\n') : item[0] === answerContent ? item.concat(' [❌]\n') : item.concat('\n')
            // if (index > 3) {
            //     if (item[0] === correctAnswer) return item.concat('[✔]\n') // отмечаем правильный
            //         if (!isCorrect && item[0] === answerContent) return item.concat('[✘]\n')
            // }
            // return item.concat('\n')
        })
    asnwerNums[1] = `*${asnwerNums[1]}*`
    ctx.editMessageText(asnwerNums.reduce((acc, str) => acc + str)
        + `\n\n*${isCorrect ? '\ud83c\udf40 В' : '\u2757 Нев'}ірна відповідь*`,
        controllButtons(['1', '2'], false))
    ctx.session.activeTest.correctAnswers += isCorrect
    
    try {
        await ctx.answerCbQuery()
    } catch (e) {
        console.log(e)
    }
}