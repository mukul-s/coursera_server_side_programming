const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url, {
    useMongoClient: true
});

connect.then((db) => {
    console.log("Connected to the server");

    var newDish = Dishes.create({
        name : 'dabeli6',
        description: 'very similar to a burger'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {description: 'i liked it better though'}
        }, {
            new: true
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'i am pulling an all nighter',
            author: 'Mukul'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        return db.collection('dishes').drop();
    })
    .then(() => {
        return db.close();
    })
    .catch((err) => {
        console.log(err);
    });
});
