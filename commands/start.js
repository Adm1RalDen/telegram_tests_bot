const menu = require('../tests/Menu.json')
const buttons = require('../visual').createMultiButton
// const requestMenu = require('../API/requestMenu')
const requestTest = require('../API/requestTests')
// const requestSubMenu = require('../API/requestSubMenu')
// const parseHTMLToSubMenuData = require('../utils/parseHTMLToSubMenuData')
// const { default: Axios } = require('axios')
// const writeToFile = require('../utils/writeToFile')
const subMenuItems = require('../tests/subMenuItems.json')

module.exports = (ctx) => {

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
    // ! - кінець коду

    // Object.entries(subMenuItems).forEach((val) => {
    //     // console.log(val[1][0].href)
    //     setTimeout(() => requestTest(ctx, val[1][0].href, val[0]), 5000)
    // })

    // requestSubMenu(ctx, menu[0].url.replace(/"/g, ''), menu[0]._id)

    // requestTest(ctx)
    ctx.reply('Виберіть Розділ', buttons(menu, true))
}
