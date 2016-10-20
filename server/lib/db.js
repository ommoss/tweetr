"use strict";
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";
let db;
let dbMethods = {};
MongoClient.connect(MONGODB_URI, (err, db) =>{
  if(err){
    throw err;
  }

  var initialTweets =  [];
  let collection = db.collection("tweets");

  let result = collection.find().toArray((err, results) => {
    db = {tweets: results }

    dbMethods.saveTweet = (data) => {
      db.tweets.push(data);
      return true;
    }

    dbMethods.getTweets = () => {
      return db.tweets.sort(function(a, b) { return a.created_at - b.created_at });
    }

  });

});
//const initialTweets = require("./tweets");


// const dbMethods = {

//   saveTweet: (data) => {
//     db.tweets.push(data);
//     return true;
//   },

//   getTweets: () => {
//     return db.tweets.sort(function(a, b) { return a.created_at - b.created_at });
//   }

// }
module.exports = {

  connect: (onConnect) => {

    onConnect(dbMethods);

  }

}
