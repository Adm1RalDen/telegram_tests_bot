const axios = require('axios')
const cheerio = require('cheerio')
const fs = require("fs")
const path = require('path')

const menuUrl = require('../constans').menuUrl
const writeToFile = require('../utils/writeToFile')
const addToFile = require('../utils/addToFile')


module.exports = (ctx, url, idParentMenu) => {
    let menuArray
    axios(url).then(e => {
        const $ = cheerio.load(e.data)
        console.log('success ')

        const arrayHref = $('a.btn.btn-default.full-width').map((i, el) => $(el).attr('href')).filter((i, el) => i % 2 !== 0)

        const arrayTitles = $('.col-md-6').map((i, el) => $(el).text()).filter((i, el) => i % 2 === 0)

        const subMenuArray = []
        for (let i = 0; i < arrayHref.length; i++) {
            subMenuArray.push({
                _id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (symbol, res) => ('x' == symbol ? (res = Math.random() * 16 | 0) : (res & 0x3 | 0x8)).toString(16)),
                href: arrayHref[i],
                title: arrayTitles[i].replace(/[\t\n] | Всього тестів: [0-9]*/g, '').trim()
            })
        }
        const newSunmenuItem = {
            [idParentMenu]: subMenuArray
        }

        if (fs.existsSync(path.join(__dirname, '..', 'tests', 'subMenuItems2.json'),)) {
            addToFile(idParentMenu, subMenuArray)
        } else {
            writeToFile(newSunmenuItem, 'subMenuItems2.json')
        }
        // console.log(newSunmenuItem)
        // writeToFile(newSunmenuItem, 'subMenuItems.json')
        // console.log(newSunmenuItem)

        // addToFile(idParentMenu, subMenuArray)

        // console.log(subMenuArray)
        // console.log($('.col-md-6'))
        // const menu = $('.list-group-item')
        // menuArray = menu.map((index, menuItem) => {
        //     let item = $(menuItem)
        //     return {
        //         title: JSON.stringify(item.text()),
        //         url: JSON.stringify(item.attr('href')),
        //         _id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (symbol, res) => ('x' == symbol ? (res = Math.random() * 16 | 0) : (res & 0x3 | 0x8)).toString(16))
        //     }

        // })
        // const newArr = []
        // for (let i = 0; i < menuArray.length; i++) {
        //     newArr.push(menuArray[i])
        // }
        // console.log(newArr)
        // writeToFile(newArr, 'Menu.json')
    }).catch((err) => {
        ctx.reply('Failed: ' + err)
    })

}