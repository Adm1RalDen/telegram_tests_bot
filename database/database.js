const admin = require('firebase-admin');

const serviceAccount = require("C:/Users/MaRv/Downloads/telegrambot-a761b-firebase-adminsdk-p4o0y-6f6f1b3116.json");

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://telegrambot-a761b.firebaseio.com"
});
const database = app.database();

// console.log(database)


module.exports = {
    getDataList: async (url) => {
        let dataArr
        await database.ref(url).once('value').then((elem) => {
            dataArr = elem.val()
        })

        return dataArr
    },
    writeData: async (url, data) => {
        await database.ref(url).set(data)
    },
    // updateData: async (url, data, uid) => {
    //     let updates = {}
    //     console.log(data)
    //     updates[url + uid + '/username'] = data.username
    //     await database.ref().update(updates)
    // }
}
//
