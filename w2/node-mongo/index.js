// import mongo driver to work with mongo db

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOperations = require("./operation");

// conFusion is our mongoserver(database)
const url = 'mongodb://localhost:27017/conFusion';

// getting connection to mongodb
MongoClient.connect(url, (err, client) => {
    // Checking if successfully connected to server
    assert.equal(err, null);
    console.log("Connected successfully to conFusion");

    /******* From stackoverflow, i was getting db.collection is not a method error
    /In version 2.x of the MongoDB native NodeJS driver you would get the database object as an argument to the connect callback:

    MongoClient.connect('mongodb://localhost:27017/mytestingdb', (err, db) => {
      // Database returned
    });
    According to the changelog for 3.0 you now get a client object containing the database object instead:
    
    MongoClient.connect('mongodb://localhost:27017', (err, client) => {
      // Client returned
      var db = client.db('mytestingdb');
    });
     */
    const conFusionDb = client.db('conFusion');

    dbOperations.insertDocument(conFusionDb, {'name':'panipuri', 'description': 'really good'},
            "dishes", (result) => {
        console.log("Inserted document:\n " , result.ops);

        dbOperations.findDocuments(conFusionDb, "dishes", (docs) => {
            console.log("Found documents:\n " , docs); 
               
            dbOperations.updateDocument(conFusionDb, {'name':'panipuri'}, {'description': 'five stars'},"dishes",
                   (result) => {
                console.log("Documents updated:\n" , result.result); 

                dbOperations.findDocuments(conFusionDb, "dishes", (docs) => {
                    console.log("Found updated documents:\n " , docs); 
                        
                    dbOperations.removeDocument(conFusionDb,{'name':'panipuri'},
                     "dishes", (result) => {
                        console.log("Deleted the document\n", result);

                        conFusionDb.dropCollection("dishes", (result) => {
                            console.log("Dropped collection: \n", result);
                            client.close();
                        });
                    });
                });
            });
        });
    });
});


