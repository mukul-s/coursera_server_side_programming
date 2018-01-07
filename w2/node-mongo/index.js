// import mongo driver to work with mongo db

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

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
    const dishCollection = conFusionDb.collection('dishes');

    dishCollection.insertOne({"name":"kheech", "description":"Really tasty"},
        (err, result) => {
        assert.equal(err, null);
        console.log("Succssfully inserted");
        console.log(result.ops);

        dishCollection.find({}).toArray((err, docs) => {
            assert.equal(err, null);
            console.log("Found :");
            console.log(docs);

            conFusionDb.dropCollection("dishes", (err, result) => {
                assert.equal(err, null);
                client.close();
            })
        });
        
    });
});


