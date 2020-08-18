const axios = require('axios')
const cheerio = require('cheerio')
const baseURL = require('../constans').baseURL
const parseHTMLTestsData = require('../utils/parseHTMLTestData')
const writeToFile = require('../utils/writeToFile')

module.exports = (ctx) => {
    axios(baseURL + 1).then(e => {
        const $ = cheerio.load(e.data)

        let lastPage = $('.pagination').last()[0].children
        lastPage = lastPage[lastPage.length - 1].lastChild.children[0].data  //Last page of pagination
        // console.log(lastPage)
        const urls = new Array(lastPage - 1).fill('').map((e, i) => baseURL + (i + 2))

        // записать дату з першої сторінки
        const testArray = parseHTMLTestsData(e.data)


        Promise.all(urls.map(url => axios(url))) // отримати всі інші сторінки, отримати їх дату , добавити до дати з першої сторінки
            .then(responses => {
                return responses.map(e => {
                    return parseHTMLTestsData(e.data)
                })
            }).then(e => {
                // записати дату з усіх сторінок в один файл
                writeToFile([...testArray, ...e.flat()], 'test1-1.json')
            })
    }).catch(() => {
        ctx.reply('Failed: ', e)
    })
}