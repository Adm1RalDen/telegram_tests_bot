const cheerio = require('cheerio')


module.exports = (data) => {
    const testArray = []
    const $ = cheerio.load(data)

    $('.list-group h4').map((e, el) => {
        const question = el.childNodes[1].data // complete questions

        const answerOptions = $(el.childNodes[2]).children().filter((index, curr) => index < 5).map((e, el) => {
            if ($(el).css('background-color')) {
                return {
                    text: $(el).text().replace(/\t/g, ''),
                    isAnswer: true,

                }
            } else {
                return {
                    text: $(el).text().replace(/\t/g, ''),
                    isAnswer: false,
                }
            }

        })


        testArray.push({
            question,
            answerOptions,
            number: $(el).children()[0].children[0].data
        })
    })


    const newARR = testArray.map(val => {
        const newAnsOpt = []
        for (let i = 0; i < val.answerOptions.length; i++) {
            newAnsOpt.push({
                text: val.answerOptions[i].text.replace(/\n/g, '').trim(),
                isAnswer: val.answerOptions[i].isAnswer

            })
        }

        return {
            number: val.number,
            question: val.question.replace(/\n/g, '').trim(),
            answerOptions: newAnsOpt
        }
    })


    return newARR
}