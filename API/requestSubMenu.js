const axios = require('axios')
const cheerio = require('cheerio')
const crypto = require("crypto")
const fs = require("fs")
const path = require('path')

const menuUrl = require('../constans').menuUrl
const writeToFile = require('../utils/writeToFile')

const addToFile = (parentId, dataFromProps) => {
    fs.readFile(
        path.join(__dirname, '..', 'tests', 'subMenuItems.json'),
        'utf-8',
        (err, data) => {
            if (err) throw err
            let readData = JSON.parse(data)
            // console.log('we is here', readData)
            if (typeof readData === 'object')
                readData[parentId] = dataFromProps
            else {
                readData = {
                    [parentId]: dataFromProps
                }
            }
            writeToFile(readData, 'subMenuItems.json')
        }
    )
}

module.exports = (ctx, url, idParentMenu) => {
    let menuArray
    axios(url).then(e => {
        const $ = cheerio.load(e.data)
        console.log('success ')

        const arrayHref = $('a.btn.btn-default.full-width').map((i, el) => $(el).attr('href')).filter((i, el) => i % 2 !== 0)
        // console.log(arrayHref.length)
        const arrayTitles = $('.col-md-6').map((i, el) => $(el).text()).filter((i, el) => i % 2 === 0)
        // console.log(arrayTitles.length)

        const subMenuArray = []
        for (let i = 0; i < arrayHref.length - 1; i++) {
            subMenuArray.push({
                _id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (symbol, res) => ('x' == symbol ? (res = Math.random() * 16 | 0) : (res & 0x3 | 0x8)).toString(16)),
                href: arrayHref[i],
                title: arrayTitles[i].replace(/[\t\n] | Всього тестів: [0-9]*/g, '').trim()
            })
        }
        const newSunmenuItem = {
            [idParentMenu]: subMenuArray
        }

        // writeToFile(newSunmenuItem, 'subMenuItems.json')
        // console.log(newSunmenuItem)

        addToFile(idParentMenu, subMenuArray)

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