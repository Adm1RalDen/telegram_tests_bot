
const cheerio = require('cheerio')

module.exports = (data) => {
    const $ = cheerio.load(data)

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
    return subMenuArray
}