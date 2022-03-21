import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const getCollection = (collection) => Mongo.Collection.get(collection);

export const incrementCounter = (collection, selector, count = 1) => {
    const collec = getCollection(collection);
    const upsert = Meteor.wrapAsync(collec.update, collec);
    upsert({ _id: selector }, { $inc: { next_val: count } }, { upsert: true });

    const result = collec.findOne({ _id: selector });
    return result?.value?.next_val || result?.next_val;
};

export const setCounter = (collection, selector, counter) => {
    const collec = getCollection(collection);
    const update = Meteor.wrapAsync(collec.update, collec);

    update({ _id: selector }, { $set: { next_val: counter } });
};
