const express = require('express');
const MutantService = require('../services/mutant.js');
const response = require('../network/response');

function mutantApi(app){
    const router = express.Router();
  app.use('/mutant', router);   
    const  mutantService = new MutantService.MutantService();

    router.post('/', function (req, res) {
        mutantService.firstCheck(req.body.dna,req,res)
            .then((isMutant)=> {
                if(isMutant){
                    response.success(req, res, 'Es mutante', 200);
                }
                else response.success(req, res, 'No es mutante', 403);           
            })
            .catch(e => {
                response.error(req,res,'[MutantNetwork]: ' + e, 500, e);
            })
    
    });
}
module.exports = mutantApi;