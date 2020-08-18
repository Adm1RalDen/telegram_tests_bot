const writeToFile = require('../utils/writeToFile')

module.exports = (parentId, dataFromProps, fileName) => {
    fs.readFile(
        path.join(__dirname, '..', 'tests', fileName),
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
            writeToFile(readData, fileName)
        }
    )
}