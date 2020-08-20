const Telegraf = require('telegraf').default
const session = require('telegraf/session')
const root = require('./commands/root')
const vis = require('./visual')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const memuItems = require('./tests/Menu.json')
const requestSubMenu = require('./API/requestSubMenu')
const buttons = require('./visual/button').createMultiButton
const controllButtons = require('./visual/button').createQuestionsButtons
const subMenuItems = require('./tests/subMenuItems.json')
const menu = require('./tests/Menu.json')
const requestTest = require('./API/requestTests.js')
const questionComponent = require('./visual/question-component.js')
const stopComponent = require('./visual/stopComponent.js')
const fs = require('fs')

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
    let fileData;

    const selectedMenuItem = Object.entries(subMenuItems).find(e => e[1].find(el => {
        if (el._id === data.p) {
            parendId = e[0]
            return true
        } else {
            return false
        }
    }))

    try {
        // console.log('1',ctx.session)
        //!  test = require(`./tests/test-${data.p}.json`) для чтения файлов нельзя юзать require 
        try {
            test = fs.readFileSync(`./tests/test-${data.p}.json`, 'utf8');
            test = JSON.parse(test)
        } catch (e) {
            console.log('Error:', e.stack);
        }

        // console.log(test)
        ctx.session.startTest = 'asd'

        const isSet = ctx.session.results.findIndex((e) => e.selectedTestId === data.p)

        if (!ctx.session.results) {
            ctx.session.results = []
        }
        else if (ctx.session.results) {
            if (isSet === -1)
                ctx.session.results.push({
                    parendId,
                    numberOfQuestions: 0,
                    correctAnswers: 0,
                    selectedTestId: data.p,
                })
        }
        ctx.session.selectedTestId = data.p

        ctx.session.parenId = parendId
        const testQuestionNumber = typeof ctx.session.results[isSet] !== 'undefined' ? ctx.session.results[isSet].numberOfQuestions : 0

        let firstQuestion = test[testQuestionNumber]
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
bot.action(/answerClicked/, async ctx => {
    const data = JSON.parse(ctx.callbackQuery.data)
    const isSet = ctx.session.results.findIndex((e) => e.selectedTestId === ctx.session.selectedTestId)


    // console.log('here', data, '\n', ctx.session)
    await ctx.answerCbQuery()

    ctx.session.results[isSet].numberOfQuestions += 1

    if (data.isCorrect === false) {
        ctx.editMessageText("Невірна відповідь", controllButtons(['1', '2'], false))
        // ctx.session.results[isSet].numberOfQuestions += 1

    } else {
        ctx.editMessageText("Вірна відповідь", controllButtons(['1', '2'], false))
        ctx.session.results[isSet].correctAnswers += 1
        // ctx.session.results[isSet].numberOfQuestions += 1
    }
})

bot.action(/nextQuestionButton/, async ctx => {
    let tests
    const isSet = ctx.session.results.findIndex((e) => e.selectedTestId === ctx.session.selectedTestId)

    try {
        tests = fs.readFileSync(`./tests/test-${ctx.session.selectedTestId}.json`, 'utf8');
        tests = JSON.parse(tests)
    } catch (e) {
        console.log('Error:', e.stack);
    }
    const nextQuestion = tests[ctx.session.results[isSet].numberOfQuestions]


    questionComponent(ctx, nextQuestion)
    await ctx.answerCbQuery()
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
    // console.log(ctx.session)
    await ctx.editMessageText("Виберіть Тест:", buttons(subMenuItems[ctx.session.parenId], false))
})

bot.action(/continueButtons/, async ctx => { 

    await ctx.answerCbQuery();
})

bot.action(/stopTesting/, async ctx => {
    stopComponent(ctx)
    await ctx.answerCbQuery();
})
bot.action(/finishTesting/, async ctx => { })

module.exports = { bot }