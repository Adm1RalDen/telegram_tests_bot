const axios = require('axios')
const cheerio = require('cheerio');
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const vis = require('../visual');
const { callbackButton } = require('telegraf/markup');

module.exports = ['getTest', async ctx => {
    const testArray = []
    try {
        const response = await axios('https://xn--80adi8aaufcj8j.xn--j1amh/testbase/base/13')
        const $ = cheerio.load(response.data)

        
        
        $('.list-group h4').map((e, el) => {
            const question = el.childNodes[1] // complete questions
            const answerOptions = $(el.childNodes[2]).children().map((e, el) => {
                // console.log($(el).text().replace(/\t/g, ''))
                if ($(el).css('background-color')) {
                    return {
                        text: $(el).text().replace(/\t/g, ''),
                        isAnswer: true
                    }
                } else {
                    return {
                        text: $(el).text().replace(/\t/g, ''),
                        isAnswer: false
                    }
                }

            })
            // $('.list-group h4').map((e, el) => console.log(el.childNodes[2].innerText))
            // console.log('hello', $(answerOptions).text().replace(/\t/g, '').split('\n').filter(e => e.length))


            testArray.push({
                question,
                answerOptions,
            })
        })

        // console.log(Array(testArray[0].answerOptions))

        // const buttons = m => testArray[0].answerOptions.map((i, el) => {
        //     return m.callbackButton(el.text.replace(/\n/g, ''), el.text.replace(/\n/g, ''))
        // })

        // console.log(buttons)
        // console.log(typeof testArray[0].answerOptions[0].text.replace(/\n/g, ''))

        const inlineMessageRatingKeyboard = Markup.inlineKeyboard([
            [
                Markup.callbackButton(testArray[0].answerOptions[0].text.replace(/\n/g, ''), 'next'),
            ],
            [
                Markup.callbackButton(testArray[0].answerOptions[1].text.replace(/\n/g, ''), 'next')
            ]

        ]).extra()

        ctx.reply(testArray[0].question.data, inlineMessageRatingKeyboard)
        // ctx.reply(testArray[0].question.data, Markup
        //     .keyboard([testArray[0].answerOptions[0].text.replace(/\n/g, ''),
        //     testArray[0].answerOptions[1].text.replace(/\n/g, ''),
        //     testArray[0].answerOptions[2].text.replace(/\n/g, ''),
        //     testArray[0].answerOptions[3].text.replace(/\n/g, ''),
        //     testArray[0].answerOptions[4].text.replace(/\n/g, '')
        //     ])
        //     .oneTime()
        //     .resize()
        //     .extra()
        // )
        // ctx.reply(testArray[0].question.data, Extra.HTML().markup((m) =>
        //     m.inlineKeyboard([m.callbackButton(String(testArray[0].answerOptions[0].text.replace(/\n/g, '')))])))


        // m.inlineKeyboard([m.callbackButton(String(testArray[0].answerOptions[0].text.replace(/\n/g, '')), String(testArray[0].answerOptions[0].text.replace(/\n/g, '')))])))

        // $('.list-group h4').map((e, el) => $(el.childNodes[2]).children().map((e, el) => console.log($(el).css('background-color'))))

        // console.log(testArray[0].answerOptions)

    } catch (e) {
        ctx.reply('Failed request')
    }
}]