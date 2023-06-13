const express = require('express')
const { getDb, connectToDb } = require('./db')
const { ObjectId } = require('mongodb');

// -------------------------------------------------------------- init app & middleware
const app = express()

//-- This will pars any json coming in from a request so that we can use it in our handerler function below
app.use(express.json())

// -------------------------------------------------------------- db connection
let db

connectToDb((err) => {
  if(!err){
    app.listen('3000', () => {
      console.log('app listening on port 3000')
    })
    db = getDb()
  }
})

// -------------------------------------------------------------- routes

// -------------------- Pagination---- Searching for all documents but we only wont to see a certin amount per page

// -------- Pagination

// app.get('/books', (req, res) => {

//   // The current page
//   const page = req.query.page || 0
//   const booksPerPage = 3

//   let books = []

//   db.collection('books')
//     .find()
//     .sort({author: 1})
//     .skip(page * booksPerPage)
//     .limit(booksPerPage)
//     .forEach(book => books.push(book))
//     .then(() => {
//       res.status(200).json(books)
//     })
//     .catch(() => {
//       res.status(500).json({error: 'Could not fetch the documents'})
//     })
// })

// -------- Pagination

// -------------------- Searching for all documents
app.get('/books', (req, res) => {
  let books = []

  db.collection('books')
    .find()
    .sort({author: 1})
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch the documents'})
    })
})

// -------------------- Searching for a single documents using the title

// app.get('/books/:title', (req, res) => {
  
  //     db.collection('books')
  //       .findOne({title: req.params.title})
  //       .then(doc => {
    //         res.status(200).json(doc)
    //       })
    //       .catch(err => {
      //         res.status(500).json({error: 'Could not fetch the document'})
      //       })
      // })
      
      
  // -------------------- Searching for a single documents using the _id
app.get('/books/:id', (req, res) => {

  // First we should check that the id we getting is valid
  if (ObjectId.isValid(req.params.id)) {

    db.collection('books')
      .findOne({_id: new ObjectId(req.params.id)})
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not fetch the document'})
      })
      
  } else {
    res.status(500).json({error: 'Could not fetch the document, try to search using the title:'})
  }

})

// -------------------- Pusing a new document
app.post("/books", (req, res) => {
  const book = req.body

  db.collection("books")
  .insertOne(book)
  .then(result => {
    res.status(201).json(result)
  })
  .catch(err => {
    res.status(500).json({err:"Could not create a new document"})
  })
})


// -------------------- Deliting a document
app.delete('/books/:id', (req, res) => {

    // First we should check that the id we getting is valid
  if (ObjectId.isValid(req.params.id)) {

    db.collection('books')
      .deleteOne({_id: new ObjectId(req.params.id)})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not delete the document'})
      })
      
  } else {
    res.status(500).json({error: 'This is not a valid id'})
  }

})

// -------------------- Updating a document
app.patch("/books/:id", (req, res) => {
  const updates = req.body

      // First we should check that the id we getting is valid
  if (ObjectId.isValid(req.params.id)) {

    db.collection('books')
      .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not update the document'})
      })
      
  } else {
    res.status(500).json({error: 'This is not a valid id'})
  }

})