const express = require('express');
const MutantService = require('../services/mutant.js');
const StatsServices = require('../services/stats.js');
const response = require('../network/response');

function mutantApi(app){
    const router = express.Router();
    app.use('/', router);   
    const  mutantService = new MutantService.MutantService();
    const  statsService = new StatsServices();

    router.post('/mutant', function (req, res) {
        mutantService.firstCheck(req.body.dna,req,res)
            .then((isMutant)=> {
                if(isMutant){
                    response.success(req, res, 'Is mutant', 200);
                }
                else response.success(req, res, 'Is human', 403);           
            })
            .catch(err => {
                response.error(req,res,'[MutantRoutes]: ' + err, 500, err);
            })   
    });

    router.get('/stats',function(req,res){
        statsService.getStats()
            .then((stats)=>{
                res.status(200);
                res.json(stats);
            })
            .catch(err => {
                console.error(err);
                res.status(500);
            })
    })
}
module.exports = mutantApi;