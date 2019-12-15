const assert = require('assert');
const proxyquire = require('proxyquire');
const MutantService = require('../services/mutant');

describe('services - mutant',function(){
    const  mutantService = new MutantService.MutantService();
    describe('Check array ',function(){
        it('verify that the array meets the condition nxn return false',function(){
            assert.strictEqual(mutantService.isMutant(["ACTGCCTA"]),false);
        })
    })
    describe('Check array ',function(){
        it('verify that the array contains ACTG return false',function(){
            assert.strictEqual(mutantService.isMutant(["TACR"]),false);
        })
    })
    describe('verify row that matches return true',function(){
        it('Call chechRow function ',function(){
            assert.strictEqual(mutantService.isMutant(["AAAA","CCAA","CCCC","ACAG"]),true);
        })
    })
    describe('Check length > 4 return false', function(){
        it('Call checkLength function',function(){
            assert.strictEqual(mutantService.checkLength(["CAG"]),false);
        })
    });
    
})



