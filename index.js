const Telegraf = require('telegraf').default
const session = require('telegraf/session')
const root = require('./commands/root')
const vis = require('./visual')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const memuItems = require('./tests/Menu.json')
const requestSubMenu = require('./API/requestSubMenu')
const buttons = require('./visual/button').createMultiButton
const subMenuItems = require('./tests/subMenuItems.json')
const menu = require('./tests/Menu.json')
const requestTest = require('./API/requestTests.js')
const questionComponent = require('./visual/question-component.js')


LocalSession = require('telegraf-session-local')

const bot = new Telegraf('1247924635:AAG1hBRcxypSpaiv7aC45_kU0McSB99ntA4')

const keyboard = Markup.keyboard([
    Markup.pollRequestButton('Create poll', 'regular'),
    Markup.pollRequestButton('Create quiz', 'quiz')
])


// bot.on('poll', (ctx) => )
bot.on('poll_answer', (ctx) => { })

//   bot.start((ctx) => ctx.reply('supported commands: /poll /quiz', Extra.markup(keyboard)))

bot.command('poll', (ctx) => {
    ctx.setChatTitle('Тести по медицині')
    ctx.telegram.sendQuiz(ctx.chat.id, 'Your favorite math constant', ['x', 'e', 'π', 'φ', 'γ'], {
        is_anonymous: false,
        correct_option_id: 0,
        explanation: 'some value',
        open_period: 5,
        close_date: 5,
        reply_markup: Extra.HTML().markup((m) =>
            m.inlineKeyboard([
                m.callbackButton('Coke', 'Coke'),
                m.callbackButton('Pepsi', 'Pepsi')
            ])),

    })
}


    // ctx.replyWithQuiz(
    //     'Your favorite math constant',
    //     ['x', 'e', 'π', 'φ', 'γ'],
    //     { is_anonymous: true, correct_option_id: 0, }
    // )
)

bot.command('inline', (ctx) => {
    return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
        m.inlineKeyboard([
            m.callbackButton('Coke', 'Coke'),
            m.callbackButton('Pepsi', 'Pepsi')
        ])))
})


bot.use((new LocalSession({ database: 'user_db.json' })).middleware())

bot.launch().then(() => console.log('Bot is started')).catch(err => console.log(err))

bot.start(root.start)
bot.command(...root.getTest)

bot.command('btnTest', ctx => {
    const fname = ctx.from.first_name
    ctx.reply('123', vis.createMultiButton(['AAA', 'BBB'], [() => console.log('AAA pressed'), () => console.log('BBB pressed')]))
})
bot.action('button_pressed_AAA', () => console.log('AAA pressed'))

bot.action('next', (ctx) => ctx.reply(testArray[1].question.data, inlineMessageRatingKeyboard))

bot.hears('get next', ctx => {
    ctx.session.counter = ctx.session.counter || 0
    ctx.session.counter++
    ctx.replyWithMarkdown(`Counter updated, new value: \`${ctx.session.counter}\``)
})

bot.action(/submenu_sel/, async ctx => {
    const data = JSON.parse(ctx.callbackQuery.data)
    let test;
    let parendId;

    // const selectedMenuItem = Object.entries(subMenuItems).find(e => e[1].find(el => {
    //     if (el._id === data.p) {
    //         parendId = e[0]
    //         return true
    //     } else {
    //         return false
    //     }
    // }))

    try {
        test = require(`./tests/test-${data.p}.json`)
        ctx.session.startTest = 'dsfdsa'
        ctx.session.numberQeustion = 1
        ctx.session.parenId = parendId
        ctx.session.selectedTestId = data.p
        const firstQuestion = test[10]
        // console.log('we', questionComponent)
        questionComponent(ctx, firstQuestion)
        // TODO винять тест на який натиснув користувач
        // await ctx.editMessageText("Ви успішно вибрали тест", Markup.removeKeyboard())
        await ctx.answerCbQuery();
    } catch (e) {
        console.log(e)
        // await ctx.editMessageText("Завантаження тесту", Markup.removeKeyboard())

        // // console.log(parenId)
        // // console.log(selectedMenuItem)
        // requestTest(ctx, selectedMenuItem[1][0].href, data.p).then(e => {
        //     ctx.editMessageText("Тест Був завантажений, виберіть знову: ", buttons(subMenuItems[parendId], false))
        // })
    }
    // console.log(test)

})

bot.action(/answerIsTrue/, async ctx => {
    const tests = require(`test-${ctx.session.selectedTestId}.json`)
    const nextQuestion = tests[ctx.session.numberQeustion - 1]
    ctx.session.numberQeustion = ctx.session.numberQeustion++
    questionComponent(ctx, nextQuestion)
    await ctx.answerCbQuery();
})

bot.action(/answerIsFalse/, async ctx => {
    console.log('success false')
    await ctx.answerCbQuery();
})


bot.action(/select_main/, async ctx => {
    const data = JSON.parse(ctx.callbackQuery.data)
    const parenId = data.p

    await ctx.editMessageText("Виберіть Тест:", buttons(subMenuItems[parenId], false))
    // await ctx.deleteMessage()
    await ctx.answerCbQuery();
})

bot.action(/goToBack/, async ctx => {
    await ctx.editMessageText('Виберіть Розділ', buttons(menu, true))
    await ctx.answerCbQuery();
})

bot.action(/questionBackButton/, async ctx => {
    console.log(ctx.session)
    // await ctx.editMessageText("Виберіть Тест:", buttons(subMenuItems[ctx.session.parenId], false))
})

bot.action(/nextQuestion/, async ctx => { })

module.exports = { bot }