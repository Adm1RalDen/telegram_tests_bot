const extra = require('telegraf/extra')
const markup = extra.markdown()
const createQuestionsButtons = require('./').createQuestionsButtons
const Telegraf = require('telegraf')

module.exports = async (ctx, test) => {
    const { number, question, answerOptions } = test
    
    questionBold = `*${question}*`
    let answers = []
    answerOptions.map((item, index) => {
        let answerStr = '\n' + `*${item.text.slice(0, 2)}*` + ' ' + item.text.slice(2, item.text.length).trim()
        answers.push(answerStr)
    })
    // console.log(answers)
    let mess = 'Запитання номер: ' + number + '\n' + questionBold + '\n\n' + answers.reduce((acc, str) => {
        return acc + str + '\n'
    }, '')
    // console.log(mess)
    await ctx.editMessageText(mess,
        createQuestionsButtons(answerOptions))
}

// bot.action('page2', (ctx) => {
//     ctx.editMessageText('*Page 2*\nmore info..',
//         Telegraf.Extra.markdown().markup((m) =>
//             m.inlineKeyboard([
//                 m.callbackButton('<< Back', 'page1')
//             ])))
// })