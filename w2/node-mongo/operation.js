/* This module provides all the necessary db operation 
*/

const assert = require("assert");

exports.insertDocument = (db, document, collection, callback) => {
    const call = db.collection(collection);

    call.insert(document, (err, result) => {
        assert.equal(err, null);
        console.log("inserted "+result.result.n+" documents into the collection "+collection);
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
    const call = db.collection(collection);
    
    call.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        
        callback(docs);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const call = db.collection(collection);

    call.updateOne(document, {$set: update}, null, (err, result) => {
        assert.equal(err, null);

        // update here is a javascript object so '+' is not used
        console.log("update ", update);
        callback(result);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const call = db.collection(collection);
    call.deleteOne(document, (err, result) => {

        assert.equal(err, null);
        console.log("Removed the document ", document);
        callback(result);        
    });
};