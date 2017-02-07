var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');

// App config
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose model config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);


// Rest Routes
//INDEX
app.get('/blogs', function(req,res){
	Blog.find({}, function(err,blogs) {
		if(err) {
			console.log("error");
		} else {
			res.render('index', {blogs:blogs});
		}
	});
});
// CREATE
app.post('/blogs', function(req,res) {
	Blog.create(req.body.blog, function(err,newPost) {
		if (err) {
			res.render('new')
		} else {
			res.redirect('/blogs');
		}
	});
});


//NEW
app.get('/blogs/new', function(req,res) {
	res.render('new');
});
//SHOW
app.get('/blogs/:id', function(req,res) {
	Blog.findById(req.params.id, function(err,found) {
		if(err) {
			res.redirect('/blogs');
		} else {
			res.render('show', {blog: found});
		}
	});
});
//REDIRECTING TO INDEX
app.get('/', function(req,res) {
	res.redirect('/blogs');
});




// Listen
app.listen(3000,function() {
	console.log("running");
});