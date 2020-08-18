const Markup = require('telegraf/markup')


module.exports = {
    createButton: text => Markup.inlineKeyboard([
        Markup.callbackButton(text, text)
    ]).extra(),
    createMultiButton: (texts, isMain) => {
        // if (texts.length !== callbacks.length) return;
        return Markup.inlineKeyboard(texts.map((el, idx) => [Markup.callbackButton(el.title, JSON.stringify({ a: 'select_main', p: el._id }))])).oneTime()
            .resize().extra()
    }

}