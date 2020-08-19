const axios = require('axios')
const cheerio = require('cheerio')
const baseURL = require('../constans').baseURL
const parseHTMLTestsData = require('../utils/parseHTMLTestData')
const writeToFile = require('../utils/writeToFile')
// const subMenuItemsList = require('../tests/subMenuItems.json')


module.exports = async (ctx, href, id) => {
    console.log('started parse new href')
    return axios(href).then(e => {
        const $ = cheerio.load(e.data)

        let lastPage = $('.pagination').last()[0].children
        lastPage = lastPage[lastPage.length - 1].lastChild.children[0].data  //Last page of pagination
        // console.log(lastPage)
        const urls = new Array(lastPage - 1).fill('').map((e, i) => href + '/' + (i + 2))

        // записать дату з першої сторінки
        const testArray = parseHTMLTestsData(e.data)


        return Promise.all(urls.map(url => {
            // console.log(url)
            return axios(url)
        })).then(responses => { 
            console.log('succes promise all data')
            return responses.map(e => {
                return parseHTMLTestsData(e.data)
            })
        }).then(e => {
            console.log('started write to file')
            // записати дату з усіх сторінок в один файл
            // console.log('Succes write test')
            return writeToFile([...testArray, ...e.flat()], `test-${id}.json`)
        }).catch((err) => { console.log('Error requestTests 34', err) })
    }).catch((e) => {
        console.log('Failed: ', e)
    })
}