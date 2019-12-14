const db = require('mongoose');
db.Promise = global.Promise;
async function connect(url) {
    await db.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('[db] Conectada con exito');
    }).catch(e => console.error(e))
}

module.exports = connect;