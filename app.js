const express = require("express")
const exphbs = require("express-handlebars");
const mongoose = require('mongoose')

const app = express();
//Map to global Promise -  to eliminate warning
mongoose.Promise = global.Promise;
// Connect to Mongoose
mongoose.connect('mongodb://localhost/vidjot-dev',{
  useNewUrlParser: true
})
.then(()=> {console.log('MongoDB is connected.')})
.catch(err=> {if(err){console.log(err)}})

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// Index Route
app.get('/', (req,res) =>{
  var title = 'Variable Title'
  res.render('Index',{
    title:title
  });
})

// About Route
app.get('/About', (req,res) =>{
  res.render('About');
})

const port = 5000;

app.listen(port, ()=> {
  console.log(`server is running on port ${port}`)
})