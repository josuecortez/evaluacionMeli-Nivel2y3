const assert = require('assert');
const MutantService = require('../services/mutant');

describe('services - mutant',function(){
    const  mutantService = new MutantService.MutantService();
    describe('Check array ',function(){
        it('verify that the array meets the condition nxn return false',function(){
            assert.rejects(mutantService.firstCheck(["ACTGCCTA"]),false)
            .catch(err => function(err){
                if (err) return done(err);
            });
        })
    })
    describe('Check array ',function(){
        it('verify that the array contains ACTG return false',function(){
            assert.rejects(mutantService.firstCheck(["TACR"]),false)
            .catch(err => function(err){
                if (err) return done(err);
            });
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
    describe('Check horizontal return true', function(){
        it('Call check horizontal function',function(){
            assert.strictEqual(mutantService.checkHorizontal(["AAAA","TTTT","ACCG","ATTG"]),true);
        })
    });
    describe('Check vertical return true', function(){
        it('Call check vertical function',function(){
            assert.strictEqual(mutantService.checkVertical(["ACTG","ATGG","ACCG","ATTG"]),true);
        })
    });
    describe('Check get column ', function(){
        it('This function get the first vertical row',function(){
            assert.deepEqual(mutantService.getColumn(["ACTG","ATGG","ACCG","ATTG"],4,0),["AAAA"]);
        })
    });

    describe('Check oblicuo ', function(){
        it('Call checkoblicuo function return true',function(){
            assert.strictEqual(mutantService.checkOblicuo(["AATGA","AAAGT","ACAAG","ATTAA","ACTAG"]),true);
        })
    });

    describe('Get main diagonal ', function(){
        it('Call getDiagonalPrincipal function return: the main diagonal',function(){
            assert.deepEqual(mutantService.getDiagonalPrincipal(["AATGA","AAAGT","ACAAG","ATTAA","ACTAG"]),["AAAAG"]);
        })
    });

    describe('Get top diagonal ', function(){
        it('Call getDiagonalSup function return: get the top diagonal of the main diagonal',function(){
            assert.deepEqual(mutantService.getDiagonalSup(["AATGA","AAAGT","ACAAG","ATTAA","ACTAG"],1),["AAAA"]);
        })
    });

    describe('Get lower diagonal ', function(){
        it('Call getDiagonalSup function return: get the lower diagonal of the main diagonal',function(){
            assert.deepEqual(mutantService.getDiagonalInf(["AATGA","AAAGT","ACAAG","ATTAA","ACTAG"],1,4),["ACTA"]);
        })
    });

    describe('Check for valid characters ', function(){
        it('Call checkValidCharacter function return false',function(){
            assert.strictEqual(mutantService.checkValidCharacter("AcTG"),false);
        })
    });
});




