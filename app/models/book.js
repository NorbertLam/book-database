var mongoose=require('mongoose');
var schema=mongoose.Schema;

var bookSchema=new schema({
	title: String,
	author: String,
	currentPage: Number,
	totalPages: Number,
	status: String,
	rating: String
});

module.exports=mongoose.model('Book', bookSchema);