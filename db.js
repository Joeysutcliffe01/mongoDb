const { MongoClient } = require('mongodb')

let dbConnection
const uri = 'mongodb+srv://joeysutcliffe0:AaA0329AaA@cluster0.todmswk.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then(client => {
        dbConnection = client.db()
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}




// const { MongoClient } = require("mongodb")

// let dbConnection

// module.exports = {

//     // First we get the connection to the DB
//     connectToDb: (cb) => {
//         MongoClient.connect("mongodb://localhost:27017/bookstore")
//         .then((client) => {
            
//             dbConnection = client.db()
//             return cb()
//         }).catch(err => {

//             console.log(
//                 "err--------------",
//                 err, 
//                 "--------------issue inside of the conectToDb function");
                
//             return cb(err)
//         })
//     },

//     // Then we return that connection to the DB using this function
//     getDb: () => dbConnection
// }