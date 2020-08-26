const finishComponent = require('../visual/finishComponent.js')

module.exports = async ctx => {
    finishComponent(ctx)
    await ctx.answerCbQuery();
}