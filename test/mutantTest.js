const assert = require('assert');
const proxyquire = require('proxyquire');
const MutantService = require('../services/mutant');

describe('services - mutant',function(){
    const  mutantService = new MutantService.MutantService();
    describe('Check function isMutant',function(){
        it('Call is Mutant',function(){
            assert.strictEqual(mutantService.isMutant(["AAAA","CCAA","CCCC","ACAG"]),true);
        })
    })
    describe('Check length > 4', function(){
        it('Call check length',function(){
            assert.strictEqual(mutantService.checkLength(["CAG"]),false);
        })
    });
})

