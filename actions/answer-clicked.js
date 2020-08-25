const controllButtons = require('../visual/button').createQuestionsButtons
const database = require('../database/database')

module.exports = async ctx => {
    const data = JSON.parse(ctx.callbackQuery.data)
    let currentUserData
    await database.getDataList('users/' + ctx.update.callback_query.from.id).then(elem => currentUserData = elem)

    currentUserData.activeTest.numberOfQuestions += 1

    const isCorrect = data.b
    const answerContent = data.c
    const correctAnswer = data.d

    const asnwerNums =
        ctx.update.callback_query.message.text.split('\n').map((item, index) => {
            return index > 3 && item[0] === correctAnswer ? item.concat(' \u2705\n') : item[0] === answerContent ? item.concat(' [❌]\n') : item.concat('\n')
        })
    asnwerNums[1] = `*${asnwerNums[1]}*`
    ctx.editMessageText(asnwerNums.reduce((acc, str) => acc + str)
        + `\n\n*${isCorrect ? '\ud83c\udf40 В' : '\u2757 Нев'}ірна відповідь*`,
        controllButtons(['1', '2'], false))
    currentUserData.activeTest.correctAnswers += isCorrect

    await database.writeData('users/' + ctx.update.callback_query.from.id, currentUserData)
    try {
        await ctx.answerCbQuery()
    } catch (e) {
        console.log(e)
    }
}