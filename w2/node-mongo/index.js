// import mongo driver to work with mongo db

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOperations = require("./operation");

// conFusion is our mongoserver(database)
const url = 'mongodb://localhost:27017/conFusion';

// getting connection to mongodb
MongoClient.connect(url).then((client) => {
    // Checking if successfully connected to server
    console.log("Connected successfully to conFusion");

    const conFusionDb = client.db('conFusion');

    dbOperations.insertDocument(conFusionDb, {'name':'panipuri', 'description': 'really good'},
        "dishes")
        .then((result) => {
            console.log("Inserted document:\n " , result.ops);
            return dbOperations.findDocuments(conFusionDb, "dishes");
        })       
        .then((docs) => {
            console.log("Found documents:\n " , docs); 
            return dbOperations.updateDocument(conFusionDb, {'name':'panipuri'},{'description': 'five stars'},"dishes");
        })       
        .then((result) => {
            console.log("Documents updated:\n" , result.result);
            return dbOperations.findDocuments(conFusionDb, "dishes"); 
        })               
        .then((docs)=> {
            console.log("Found updated documents:\n " , docs);
            dbOperations.removeDocument(conFusionDb,{'name':'panipuri'},"dishes");
        })                         
        .then((result) => {
            console.log("Deleted the document\n");
            return conFusionDb.dropCollection("dishes");
        })          
        .then((result)=> {
            console.log("Dropped collection: \n", result);
            client.close();
        })
        .catch((err) =>{
            console.log("Error: "+err);
        })
})
.catch((err) => {console.log("Error:" + err)});


