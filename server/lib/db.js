"use strict";
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";
let db;
let dbMethods = {};

MongoClient.connect(MONGODB_URI, (err, db) =>{
  if(err){
    throw err;
  }

  let collection = db.collection("tweets");


  let result = collection.find().toArray((err, results) => {
    db = {tweets: results }

    dbMethods.getTweets = () => {
      let result = collection.find().toArray((err, results) => {
      db = {tweets: results }
      });
      let tweet = db.tweets.sort(function(a, b) { return b.created_at - a.created_at });

      return tweet;
    };

    dbMethods.saveTweet = (data) => {
      collection.insertOne(data, function(err, r) {});
       return true;
    };
  })
});

module.exports = {

  connect: (onConnect) => {

    onConnect(dbMethods);

  }

}
