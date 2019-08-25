const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
//Map to global Promise -  to eliminate warning
mongoose.Promise = global.Promise;
// Connect to Mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useNewUrlParser: true
})
  .then(() => { console.log('MongoDB is connected.') })
  .catch(err => { if (err) { console.log(err) } })

//Load Idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');


// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Index Route
app.get('/', (req, res) => {
  var title = 'Variable Title'
  res.render('Index', {
    title: title
  });
})

// About Route
app.get('/About', (req, res) => {
  res.render('About');
})

//Idea Index Page
app.get('/ideas',(req,res) =>{
  Idea.find({})
  .sort({date:'desc'})
    .then(ideas =>{
      res.render('ideas/index', {
        ideas: ideas
      })
    })
  
})


// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
})

// Edit Idea Form
app.get("/ideas/edit/:id", (req, res) => {
  Idea.findOne({
     _id: req.params.id
   })
     .then(function(idea){
       res.render('ideas/edit', {
         idea: idea
   });
     console.log('running');
   })
     .catch(err =>{ console.log(err)})

})

// Process Form
app.post('/ideas', (req, res) => {
  let errors = [];

  if (!req.body.title){
    errors.push[{text: 'Please add a title'}]
  };
  if (!req.body.details){
    errors.push[{text: 'Please add details'}]
  };

  if (errors.length > 0){
    res.render("ideas/add", {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    })
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    };
    new Idea(newUser)
      .save()
        .then(() =>{
          res.redirect('/ideas')
        })
  }
  
  console.log(req.body);
  
})

const port = 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})