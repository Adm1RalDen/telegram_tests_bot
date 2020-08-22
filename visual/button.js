const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
// const buttons = require('.')

module.exports = {
    createMultiButton: (texts, isMain) => {
        ;
        return Markup.inlineKeyboard([...texts.map((el, idx) =>
            [Markup.callbackButton(
                el.title,
                JSON.stringify({
                    a: isMain ? 'select_main' : 'submenu_sel',
                    p: el._id
                }))]
        ), isMain ? [] : [Markup.callbackButton('⬅Back', 'goToBack')]
        ]).oneTime()
            .resize()
            .extra()
    },
    createQuestionsButtons: (buttons, next = true) => {
        let buttonsMarkup = [];

        if (next) {
            let d = buttons.find((item, index) => {
                if (item.isAnswer) return item
            }).text.slice(0, 1) //Получаем правильный ответ для текущего теста
            buttonsMarkup = (m) => [
                [...buttons.map(val => {
                    return m.callbackButton(
                        val.text.slice(0, 1),
                        JSON.stringify({
                            a: 'answerClicked',//action
                            b: val.isAnswer,//boolean ответ правильный или нет
                            c: val.text.slice(0, 1), //выбранный ответ 
                            d  //ответ для текущего теста
                        })
                    )
                }),
                ],
                [m.callbackButton('\u26d4 Stop', 'stopTesting')],
                [m.callbackButton('\ud83c\udfc1 Finish', 'finishTesting')]
            ]
        }
        else {
            buttonsMarkup = m => [
                [m.callbackButton('➡ Next', 'nextQuestionButton')],
                [m.callbackButton('\u26d4 Stop', 'stopTesting')],
                [m.callbackButton('\ud83c\udfc1 Finish', 'finishTesting')]
            ]
        }

        return Extra.markdown().markup(m => {
            return m.inlineKeyboard(buttonsMarkup(m))
        })
    },
    createStopButtons: buttons => {
        return Extra.markdown().markup(m => {
            return m.inlineKeyboard([
                [...buttons.map((elem) => { return m.callbackButton(elem.name, elem.action) })],
                [m.callbackButton('\ud83d\udd04 Restart', 'RestartCurrentTest')],
                // [m.callbackButton('\ud83c\udfc1 Finish', 'finishTesting')],
            ])
        })
    }
}