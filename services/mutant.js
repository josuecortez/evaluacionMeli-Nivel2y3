//const MongoLib = require('../lib/mongo');
const Model = require('../utils/schema/mutant');
var isMutant;
var coincidencias = 0;
class MutantService {
    // constructor() {
    //     this.collection = 'mutant';
    //     this.mongoDB = new MongoLib();
    // }
    firstCheck(dna, req, res) {
        return new Promise((resolve, reject) => {
            if (!dna) {
                console.error('[mutantController] Los datos son vacíos')
                reject('Los datos son vacíos.');
                return false;
            }
            let check = this.checkMutant(dna);
            if (!check) {
                console.error('[mutantController] No cumple con las dimensiones nxn o no cumple con los caracteres A T C G');
                reject('No cumple con las dimensiones nxn o no cumple con los caracteres A T C G');
                return false;
            }
            let checkLenght = this.checkLength(dna);
            if (!checkLenght) {
                console.error('[mutantController] El tamaño de cada fila debe ser mayor o igual a 4');
                reject('[mutantController] El tamaño de cada fila debe ser mayor o igual a 4');
                return false;
            }
            let isMutant = this.isMutant(dna);
            resolve(isMutant);
        });
    }
    isMutant(dna) {
        //verifico si hay coincidencias horizontales
        var verifyMutant = false;
        var horizontal = this.checkHorizontal(dna);
        if (horizontal) {
            verifyMutant = true;
            const fullDna = {
                dna:dna,
                mutant: verifyMutant
            };
            const mutant = new Model(fullDna);
            mutant.save();
            return true;
        }
        //verifico si hay coincidencias verticales
        var vertical = this.checkVertical(dna);
        if (vertical) {
            verifyMutant = true;
            const fullDna = {
                dna: dna,
                mutant: verifyMutant
            };
            const mutant = new Model(fullDna);
            mutant.save();
            return true;
        }
        //verifico si hay coincidencias oblicuas
        var oblicuo = this.checkOblicuo(dna);
        if (oblicuo) {
            verifyMutant = true;
            const fullDna = {
                dna: dna,
                mutant: verifyMutant
            };          
            const mutant = new Model(fullDna);
            mutant.save();
            return true;
        }
        // debo crear el objeto en bd
        const fullDna = {
            dna: dna,
            mutant: verifyMutant
        };
        const mutant = new Model(fullDna);
        mutant.save();
        return false
    }
    //verifico con la expresion regular coincidencias de a 4
    checkRow(row) {
        return new RegExp("A{4}|T{4}|C{4}|G{4}").test(row);
    }
    checkHorizontal(dna) {
        var lenght = dna.length;
        for (var i = 0; i < lenght; i++) {
            //verificar por fila si es mutante
            isMutant = this.checkRow(dna[i]);
            if (isMutant) {
                coincidencias++;
                if (coincidencias > 1) {
                    return true;
                }
            };
        }
        return false
    }

    checkVertical(dna) {
        var position = 0;
        var length = dna.length;
        for (var i = 0; i < length; i++) {
            var columnVertical = this.getColumn(dna, length, position);
            isMutant = this.checkRow(columnVertical);
            if (isMutant) {
                coincidencias++;
                if (coincidencias > 1) {
                    return true;
                }
            }
            position++;
        }
        return false;
    }
    getColumn(array, length, position) {
        var vertical = [];
        var concat = "";
        for (var i = 0; i < length; i++) {
            var char = array[i].charAt(position);
            concat += char;
        }
        vertical.push(concat);
        return vertical;
    }
    checkOblicuo(dna) {
        var length = dna.length;
        var limitFor = length - 4;
        var diagonalPrincipal = this.getDiagonalPrincipal(dna);
        var isMutantOblicuo = this.checkRow(diagonalPrincipal);
        if (isMutantOblicuo) {
            coincidencias++;
            if (coincidencias > 1) {
                return true;
            }
        }
        for (var i = 0; i < limitFor; i++) {
            var diagonalSuperior = this.getDiagonalSup(dna, i + 1);
            var isMutantSup = this.checkRow(diagonalSuperior);
            if (isMutantSup) {
                coincidencias++;
                if (coincidencias > 1) {
                    return true;
                }
            }
            var dnaLength = --length;
            var diagonalInferior = this.getDiagonalInf(dna, i + 1, dnaLength);
            var isMutantInf = this.checkRow(diagonalInferior);
            if (isMutantInf) {
                coincidencias++;
                if (coincidencias > 1) {
                    return true;
                }
            }
        }
        return false;
    }
    getDiagonalPrincipal(array) {
        var diagonalPrincipal = [];
        var charDiagonalPrincipal = "";
        var length = array.length;
        for (var i = 0; i < length; i++) {
            var char = array[i].charAt(i);
            charDiagonalPrincipal += char;
        }
        diagonalPrincipal.push(charDiagonalPrincipal);
        return diagonalPrincipal;
    }
    getDiagonalSup(array, iteration) {
        var diagonalSuperior = [];
        var charDiagonalSuperior = "";
        var length = array.length - 1;
        for (var i = 0; i < length; i++) {
            var char = array[i].charAt(iteration);
            charDiagonalSuperior += char;
            iteration++;
        }
        diagonalSuperior.push(charDiagonalSuperior);
        return diagonalSuperior;
    }
    getDiagonalInf(array, iteracion, length) {
        var diagonalInferior = []
        var charDiagonalInferior = "";
        for (var i = 0; i < length; ++i) {
            var char = array[iteracion].charAt(i);
            charDiagonalInferior += char;
            iteracion++;

        }
        diagonalInferior.push(charDiagonalInferior);
        return diagonalInferior;
    }
    checkMutant(dnaMatrix) {
        for (var i = 0; i < dnaMatrix.length; i++) {
            // Verificar que tengan el mismo tamaño, y además que cumplan con los caracteres permitidos A T C G
            if ((dnaMatrix.length !== dnaMatrix[i].length) || !this.checkValidCharacter(dnaMatrix[i])) {
                return false;
            }
        }
        return true;
    }
    checkValidCharacter(row) {
        //permitir solo los siguiente caracteres "A" "T" "C" "G"
        return new RegExp("^[ATCG]+$").test(row);
    }
    checkLength(dnaLength) {
        if (dnaLength[0].length >= 4) {
            return true
        }
        return false
    }
}
//isMutant: isMutant,
//    checkMutant: checkMutant,
//    checkValidCharacter: checkValidCharacter,
//    checkLength: checkLength,
module.exports = {
    MutantService
};