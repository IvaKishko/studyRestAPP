const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://crud:Kasdbj2473@cluster0.i31kc.mongodb.net/?retryWrites=true&w=majority'
require("dotenv").config();

// Make sure you place body-parser before your CRUD handlers!
// app.use(bodyParser.urlencoded({ extended: true }))

//listening to server
// app.listen(3030, function(){
//     console.log('listening on 3030')
// })

// app.get('/', (req,res) => {
//     res.sendFile(__dirname + '/index.html')
//     console.log(__dirname)
// })

// app.post('/quotes', (req,res) => {
//     console.log(req.body)
// })

MongoClient.connect(connectionString)
  .then(client => {
    // ...
    const db = client.db('task_db')
    const quotesCollection = db.collection('tasks')

    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/public", express.static('./public/'));


    app.get('/', (req,res) => {
        db.collection('tasks').find().toArray()
        .then(results => {
            res.render('index.ejs', { task: results})
        })
        .catch(error => console.error(error))
    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })

    app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate(
        { task: 'Study' },
        {
          $set: {
            task: req.body.task,
            description: req.body.description
          }
        },
        {
          upsert: true
        }
      )
         .then(result => {
           res.json('Success')
           })
          .catch(error => console.error(error))
      })

    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne(
        { task: req.body.task }
      )
        .then(response => {
          console.log(response)
          if (response.deletedCount === 0) {
            return res.json('No quote to delete')
          }else{
            res.json(`Deleted Rest task!`)
          }
         })
        .catch(error => console.error(error))
    })


    app.listen(process.env.PORT || 3030, function(){
        console.log('listening on 3030')
    })
  })
  .catch(console.error)