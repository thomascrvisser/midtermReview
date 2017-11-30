var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
  title:String,
  price:String,
  upvotes:{type: Number, default: 0},
  URL:URL
 });

CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Comment', CommentSchema);


