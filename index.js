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

LocalSession = require('telegraf-session-local')

const bot = new Telegraf('1247924635:AAG1hBRcxypSpaiv7aC45_kU0McSB99ntA4')

bot.use((new LocalSession({ database: 'user_db.json' })).middleware())

bot.launch().then(() => console.log('Bot is started')).catch(err => console.log(err))


// bot.use(session())

// bot.hears('Hey', (ctx) => {
//     ctx.session.heyCounter = ctx.session.heyCounter || 0
//     ctx.session.heyCounter++
//     console.log(ctx.session)
//     return ctx.replyWithMarkdown(`_Hey counter:_ ${ctx.session.heyCounter}`)
// })



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

module.exports = { bot }