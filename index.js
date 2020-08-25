const Telegraf = require('telegraf').default
const root = require('./commands/root')
const submenySelected = require('./actions/submenu-selected')
const answerClicked = require('./actions/answer-clicked')
const nextQuestion = require('./actions/next-question')
const selectMain = require('./actions/select-main')
const goToBack = require('./actions/go-to-back')
const questionBack = require('./actions/question-back')
const continueButtons = require('./actions/continue-buttons')
const stopTesting = require('./actions/stop-testing')
const finishTesting = require('./actions/finish-testing')
const restartTest = require('./actions/restart-test')



LocalSession = require('telegraf-session-local')

const bot = new Telegraf('1396374445:AAEXWe-_lz02mb-DXXIAekK1aRyP7A9AmBM')
try {

    bot.use((new LocalSession({ database: 'user_db.json' })).middleware())

    bot.launch().then(() => console.log('Bot is started')).catch(err => console.log(err))

    bot.start(root.start)

    bot.command(...root.getTest)

    bot.action(/submenu_sel/, submenySelected)
    bot.action(/answerClicked/, answerClicked)
    bot.action(/nextQuestionButton/, nextQuestion)
    bot.action(/select_main/, selectMain)
    bot.action(/goToBack/, goToBack)
    bot.action(/questionBackButton/, questionBack)
    bot.action(/continueButtons/, continueButtons)
    bot.action(/stopTesting/, stopTesting)
    bot.action(/finishTesting/, finishTesting)
    bot.action(/RestartCurrentTest/, restartTest)
} catch (e) {
    console.log('global catch error: ', e)
}
module.exports = { bot }