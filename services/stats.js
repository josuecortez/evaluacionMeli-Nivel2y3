const Model = require('../utils/schema/mutant');

class StatsServices {
    async getStats(){
        const total = await Model.find({}).countDocuments();
        const mutants = await Model.find({mutant: true}).countDocuments();
        const human = total - mutants;
        const ratio = mutants/ human;
        const result = {
                "count_mutant_dna": mutants,
                "count_human_dna": human,
                "ratio": ratio
        }
        return result;
    }
}
module.exports = StatsServices;