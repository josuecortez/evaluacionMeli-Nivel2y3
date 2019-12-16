# Evaluación Meli- Nivel 2 y Nivel 3

## Intructions to run 
1. Clone or download the project
2. Open and run in the terminal the comand `npm install --save`
3. Runs the program with the following command `node server` or `nodemon server`

## Intructions to run test
1. In the terminal run `npm run test`
2. To observe the covered code run `npm run cover` or the command to view the report `npm run report`

## HTTP's Request
### 1. /mutant
1. 1 Make a http **POST** in the following link http://localhost:3000/mutant
----
#### Data to send
Example: the data must be in json format
````
{
	"dna": ["AAAA","CCAA","CCCC","ACAG"]
}
````
1. 2 The database shows the following result
````
{
"_id":{"$oid":"5df6a9ee4490e225d040a0a0"},
"dna":["AAAA","CCAA","CCCC","ACAG"],
"mutant":true
}
````
### 2. /stats
2. 1 Make a http **GET** in the following link http://localhost:3000/stats

## Host
 The api is hosted in the following link https://evaluacion-meli.josuecortez92.now.sh
 ### Instruction for run url in the host
 1. Following the next link https://evaluacion-meli.josuecortez92.now.sh/stats to observe the statistics
 2. Following the next link https://evaluacion-meli.josuecortez92.now.sh/mutant and send a data in json format to add DNA
 ````
 {
 "count_mutant_dna":17,
 "count_human_dna":8,
 "ratio":2.125
 }
 ````