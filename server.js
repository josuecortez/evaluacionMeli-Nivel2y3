const express =  require('express');
const bodyParser = require('body-parser');
const {config} = require('./config/index');
const mutantApi = require('./routes/mutant')
const db = require('./lib/mongo');
var app = express();
//new MongoLib().connect();
db('mongodb+srv://db_user_meli:db_user_meli@clustermeli-uxmue.mongodb.net/db_EvMeli?retryWrites=true&w=majority');
app.use(bodyParser.json());
mutantApi(app);
app.listen(config.port, function(){
    console.log(`Listening http://localhost:${config.port}`);
})
module.exports = app;