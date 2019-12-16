const chalk = require('chalk');

exports.success = function (req, res, message, status){
    res.status(status || 200).send({
        body: message
    })
};

exports.error = function (req, res, message, status, details) {
    console.error(chalk.yellowBright('[response error]: ' + details));
    res.status(status || 500).send({
        error: message,
        message: true, 
        body: req.body,
        method: req.method
    })
}
