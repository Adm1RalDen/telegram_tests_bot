const stopComponent = require('../visual/stopComponent.js')

module.exports = async ctx => {
    stopComponent(ctx)
    await ctx.answerCbQuery();
}