const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const buttons = require('.')

module.exports = {
    createButton: text => Markup.inlineKeyboard([
        Markup.callbackButton(text, text)
    ]).extra(),
    createMultiButton: (texts, isMain) => {
        // if (texts.length !== callbacks.length) return;
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
        if (next)
            return Extra.markdown().markup(m => {
                return m.inlineKeyboard([
                    [...buttons.map(val => {
                        return m.callbackButton(
                            val.text.slice(0, 1),
                            JSON.stringify({
                                click: 'answerClicked',
                                isCorrect: val.isAnswer
                            })
                        )
                    }),],
                    [m.callbackButton('⬅Back', 'questionBackButton')],
                    [m.callbackButton('Stop test', 'stopTesting')],
                    [m.callbackButton('Finish', 'finishTesting')],
                ])
            })
        else
            return Markup.inlineKeyboard([
                [Markup.callbackButton('⬅Back', 'questionBackButton'), Markup.callbackButton('Next➡', 'nextQuestionButton')],
                [Markup.callbackButton('Stop test', 'stopTesting')],
                [Markup.callbackButton('Finish', 'finishTesting')]

            ]).oneTime()
                .extra()
    },
    createStopButtons: buttons => {
        return Extra.markdown().markup(m => {
            return m.inlineKeyboard([
                [...buttons.map((elem) => { return m.callbackButton(elem.name, elem.action) })],
                [m.callbackButton('Stop test', 'stopTesting')],
                [m.callbackButton('Finish', 'finishTesting')],
            ])
        })
    }
}