/* This module provides all the necessary db operation 
*/

const assert = require("assert");

exports.insertDocument = (db, document, collection, callback) => {
    const call = db.collection(collection);
    return call.insert(document);
};

exports.findDocuments = (db, collection, callback) => {
    const call = db.collection(collection);
    return call.find({}).toArray();
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const call = db.collection(collection);
    return call.updateOne(document, {$set: update}, null);
};

exports.removeDocument = (db, document, collection, callback) => {
    const call = db.collection(collection);
    return call.deleteOne(document);
};