const createQuestionsButtons = require('./').createQuestionsButtons

module.exports = async (ctx, test) => {
    const { number, question, answerOptions } = test

    questionBold = `\u2753*${question}*`
    let answers = []
    answerOptions.map((item, index) => {
        let answerStr = '\n' + `*${item.text.slice(0, 2)}*` + ' ' + item.text.slice(2, item.text.length).trim()
        answers.push(answerStr)
    })

    let numberArr = number.split('').join('\u20e3') + '\u20e3'

    let mess = 'Запитання номер: ' + numberArr + '\n' + questionBold + '\n\n' + answers.reduce((acc, str) => {
        return acc + str + '\n'
    }, '')

    await ctx.editMessageText(mess,
        createQuestionsButtons(answerOptions))
}
