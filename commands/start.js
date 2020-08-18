const menu = require('../tests/Menu.json')
const buttons = require('../visual').createMultiButton
// const requestMenu = require('../API/requestMenu')
// const requestSubMenu = require('../API/requestSubMenu')
// const parseHTMLToSubMenuData = require('../utils/parseHTMLToSubMenuData')
// const { default: Axios } = require('axios')
// const writeToFile = require('../utils/writeToFile')

module.exports = (ctx) => {
    // requestTest(ctx)
    // requestMenu(ctx)

    // ! код який запише усі підменю в файл
    // const urls = menu.map(e => {
    //     return e.url.replace(/"/g, '')
    //     // requestSubMenu(ctx, e.url.replace(/"/g, ''), e._id)
    // })
    // console.log('urls length', urls.length)
    // Promise.all(urls.map(url => Axios(url))).then(response => {
    //     return response.map((e, index) => {
    //         return [menu[index]._id, parseHTMLToSubMenuData(e.data)]
    //     })
    // }).then(e => {
    //     console.log('parsedHTMLData length', e.length)
    //     console.log('first parsed html data', e[0])
    //     const allMenuItems = e.reduce((prev, curr) => {
    //         // console.log(prev)
    //         prev[curr[0]] = curr[1]
    //         return prev
    //     }, {})

    //     writeToFile(allMenuItems, 'subMenuItems2.json')

    //     // console.log(Object.keys(allMenuItems))
    // }).catch(e => console.log(e))
    // ! - кінець кодц

    // requestSubMenu(ctx, menu[0].url.replace(/"/g, ''), menu[0]._id)
    ctx.reply('Виберіть Розділ', buttons(menu, true))
}
