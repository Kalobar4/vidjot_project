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

// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
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
    res.send('passed');
  }

  
  console.log(req.body);
  res.send('ok');
})

const port = 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})