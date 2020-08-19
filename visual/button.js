const Markup = require('telegraf/markup')


module.exports = {
    createButton: text => Markup.inlineKeyboard([
        Markup.callbackButton(text, text)
    ]).extra(),
    createMultiButton: (texts, isMain) => {
        // if (texts.length !== callbacks.length) return;
        return Markup.inlineKeyboard([...texts.map((el, idx) =>
            [
                Markup.callbackButton(
                    el.title,
                    JSON.stringify(
                        {
                            a: isMain ? 'select_main' : 'submenu_sel',
                            p: el._id
                        }
                    ))
            ]
        ), isMain ? [] : [Markup.callbackButton('⬅Back', 'goToBack')]
        ]

        ).oneTime()
            .resize()
            .extra()
    },
    createQuestionsButtons: (buttons) => {
        return Markup.inlineKeyboard([
            [
                ...buttons.map(val => {
                    return Markup.callbackButton(
                        val.text.slice(0, 1),
                        val.isAnswer ? 'answerIsTrue' : 'answerIsFalse'
                    )

                }),
            ],
            [Markup.callbackButton('⬅Back', 'questionBackButton'), Markup.callbackButton('Next', 'questionNext')],
            [Markup.callbackButton('Finish', 'finishTesting')],

        ]).oneTime()
            .extra()
    }

}