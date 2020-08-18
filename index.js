const Telegraf = require('telegraf').default
const session = require('telegraf/session')
const root = require('./commands/root')
const vis = require('./visual')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const memuItems = require('./tests/Menu.json')
const requestSubMenu = require('./API/requestSubMenu')

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
    // console.log('message was catch', data)
    const selectedMenuItem = memuItems.find(e => e._id === data.p)
    // console.log(selectedMenuItem)
    // requestSubMenu(ctx, selectedMenuItem.url.replace(/"/g, ''), data.p)
    // await ctx.editMessageText("Вибраний пункт меню: " + selectedMenuItem.title)
    await ctx.deleteMessage()
    await ctx.answerCbQuery();
})

// bot.command('onetime', ({ reply }) => // * обична клавіатура замість за варіантами вибору
//   reply('One time keyboard', Markup
//     .keyboard(['/simple', '/inline', '/pyramid'])
//     .oneTime()
//     .resize()
//     .extra()
//   )
// )

// bot.command('custom', ({ reply }) => { // * кастомна клава, також обична
//     return reply('Custom buttons keyboard', Markup
//       .keyboard([
//         ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
//         ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
//         ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
//       ])
//       .oneTime()
//       .resize()
//       .extra()
//     )
//   })


// bot.command('special', (ctx) => { // ! можна протестити тільки в приватних чатах
//     return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
//       return markup.resize()
//         .keyboard([
//           markup.contactRequestButton('Send contact'),
//           markup.locationRequestButton('Send location')
//         ])
//     }))
//   })

// bot.command('pyramid', (ctx) => { // * обична клава, у розміщенаиу вигялід пірамідки
//     return ctx.reply('Keyboard wrap', Extra.markup(
//       Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//         wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
//       })
//     ))
//   })

// bot.command('simple', (ctx) => { // * обична клава
//     return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Extra.markup(
//         Markup.keyboard(['Coke', 'Pepsi'])
//     ))
// })

// bot.command('inline', (ctx) => { // * інлайфнова клавіатура з текстом 
//     return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
//         m.inlineKeyboard([
//             m.callbackButton('Coke', 'Coke'),
//             m.callbackButton('Pepsi', 'Pepsi')
//         ])))
// })

// bot.command('random', (ctx) => {  // * інлайфнова клавіатура з текстом 
//     return ctx.reply('random example',
//         Markup.inlineKeyboard([
//             Markup.callbackButton('Coke', 'Coke'),
//             Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
//             Markup.callbackButton('Pepsi', 'Pepsi')
//         ]).extra()
//     )
// })

// bot.command('caption', (ctx) => { // * інлайнова клавіатура із зображенням та описомя
//     return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
//         Extra.load({ caption: 'Caption' })
//             .markdown()
//             .markup((m) =>
//                 m.inlineKeyboard([
//                     m.callbackButton('Plain', 'plain'),
//                     m.callbackButton('Italic', 'italic')
//                 ])
//             )
//     )
// })

module.exports = { bot }