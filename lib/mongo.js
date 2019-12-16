const db = require('mongoose');
db.Promise = global.Promise;
async function connect(url) {
    return new Promise(async(resolve, reject) => {
        await db.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(() => {
             console.log('[db] Successfully connected');
             resolve('[db] Successfully connected');
        }).catch(e => reject(e))
    });
}

module.exports = connect;