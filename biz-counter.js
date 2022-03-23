import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

const getCollection = (collection) => Mongo.Collection.get(collection);

export const incrementCounter = (collection, selector, count = 1) => {
    check(collection, String);
    check(selector, String);
    check(count, Number);

    const collec = getCollection(collection);
    const upsert = Meteor.wrapAsync(collec.update, collec);

    upsert(
        { _id: selector }, 
        { $inc: { next_val: count }},
        { upsert: true }
    );

    const result = collec.findOne({ _id: selector });
    return result?.value?.next_val || result?.next_val;
};

export const setCounter = (collection, selector, counter) => {
    check(collection, String);
    check(selector, String);
    check(counter, Number);  

    const collec = getCollection(collection);
    const update = Meteor.wrapAsync(collec.update, collec);

    update(
        { _id: selector }, 
        { $set: { next_val: counter } },
        { upsert: true }
    );
};
