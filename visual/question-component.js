const createQuestionsButtons = require('./').createQuestionsButtons

module.exports = async (ctx, test) => {
    const { number, question, answerOptions } = test

    await ctx.editMessageText('Запитання номер: ' + number + '\n' + question, createQuestionsButtons(answerOptions))
}