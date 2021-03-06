const axios = require('axios')
const cheerio = require('cheerio')
const menuUrl = require('../constans').menuUrl
const writeToFile = require('../utils/writeToFile')
const crypto = require("crypto")

module.exports = (ctx) => {
    let menuArray
    axios(menuUrl).then(e => {
        const $ = cheerio.load(e.data)

        const menu = $('.list-group-item')
        menuArray = menu.map((index, menuItem) => {
            let item = $(menuItem)
            return {
                title: JSON.stringify(item.text()),
                url: JSON.stringify(item.attr('href')),
                _id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (symbol, res) => ('x' == symbol ? (res = Math.random() * 16 | 0) : (res & 0x3 | 0x8)).toString(16))
            }

        })
        const newArr = []
        for (let i = 0; i < menuArray.length; i++) {
            newArr.push(menuArray[i])
        }
        console.log(newArr)
        writeToFile(newArr, 'Menu.json')
    }).catch((err) => {
        ctx.reply('Failed: ' + err)
    })

}