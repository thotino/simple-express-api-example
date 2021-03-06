const { getDatabase } = require("./mongo");
const { ObjectID } = require("mongodb");

const collectionName = "ads";

const insertAd = function(ad) {
    return getDatabase()
        .then((database) => { 
            return database.collection(collectionName).insertOne(ad); 
        })
        .then((insertedData) => {
            return getAd(insertedData.insertedId);
            // return database.collection(collectionName).findOne({_id : insertedData.insertedId});           
            // const result = Object.assign(ad, {_id : insertedData.insertedId});
            // return result;
        }).catch((error) => {
            throw error;
        });
};

const getAd = function(id) {
    return getDatabase()
        .then((database) => { 
            return database.collection(collectionName).findOne({ _id: id });
        }).then((data) => {
            // console.log(data); 
            return data;
        });
};

const getAds = function() {
    return getDatabase()
        .then((database) => { 
            return database.collection(collectionName).find({}).toArray(); 
        }).then((data) => {
            // console.log(data); 
            return data;
        });
};

const deleteAd = function(id) {
    return getDatabase()
        .then((database) => { 
            return database.collection(collectionName).findOneAndDelete({ _id : new ObjectID(id), }); 
        }).then((data) => {
            // console.log(data); 
            return data;
        });
};

const updateAd = function(id, ad) {
    return getDatabase()
        .then((database) => {
            return database.collection(collectionName).findOneAndUpdate({
                _id : new ObjectID(id),
            }, {
                $set: { ...ad, },
            }, { returnOriginal: false });
        }).then((result) => {
            // console.log(result);
            return getAd(id);
        });
};

module.exports = {
    insertAd,
    getAds,
    updateAd,
    deleteAd,
};