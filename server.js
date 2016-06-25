var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app = express();
var prt = 3000;
var mongoUri = '';
var Book = require('./app/models/book');

//Setup parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Setup connection
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

//Router setup
var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something');
  next(); //Go to next route
});

// Routes ending in /books
router.get('/', function(req, res) {
  res.json({message: 'welcome it works'});
});


router.route('/books') //Post and get book list

  .post(function(req, res) {

    var book = new Book();
    book.title = req.body.title;
    book.author = req.body.author;
    book.currentPage = req.body.currentPage;
    book.totalPages = req.body.totalPages;

    book.save((err) => {
        if(err) {
            res.send(err);
        }
        res.json({message: 'Book added'});
        console.log('Book added');
    });
})

  .get((req, res) => {
    Book.find((err, books) => {
        if(err) { 
            res.send(err);
        }
        res.json(books);
    });
});


// Routes ending in /books/:book_id
router.route('/books/:book_id')
    
  .get((req, res) => { //Get book based on id
    Book.findById(req.params.book_id, (err, book) => {
        if(err) {
            res.send(err);
        }
        res.json(book);
    });
})

  .delete((req, res) => { //Delete book
    Book.remove({
        _id: req.params.book_id
    }, (err, book) => {
        if(err) res.send(err);
         res.json({ message: 'Deleted book'});
    });
})

  .put((req, res) => { //Edit book information
    Book.findById(req.params.book_id, (err, book) => {
        if(err) {
            res.send(err);
        }

        book.title = req.body.title;
        book.author = req.body.author;
        book.currentPage = req.body.currentPage;
        book.totalPages = req.body.totalPages;

        book.save((err) => {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Updated book'});
        });
    });
});

app.use('/api', router);

app.listen(prt);
console.log('listening: '+ prt);