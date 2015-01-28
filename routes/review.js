var express = require('express');
var router = express.Router();

var reviews = [
{
	name: 'MacDo',
	placeType: 'Fastfood',
	stars: 3
}, {
	name: 'Quick',
	placeType: 'Fastfood',
	stars: 5
}];

router.get('/', function(req, res, next) {
	res.send(reviews);
});

router.get('/:index', function(req, res, next){
	res.send(reviews[req.params.index]);
});

router.post('/new', function(req, res, next){
	var newReview = req.query;
	reviews.push(newReview);
	res.json({message: 'review added'});
});

router.put('/edit/:index', function(req, res){
	if(reviews[req.params.index] == undefined ){
		console.log('Error this is not found');
	}
	else{
		reviews[req.params.index] = req.query;
		res.json ({message: 'review updated'});
	}
});

router.delete('/delete', function(req, res, next){
	reviews = [];
	res.json({message: 'all reviews deleted'});
});

router.delete('/delete/:index', function(req, res, next){
	reviews.splice(req.params.index, 1);
	res.json({message: 'review deleted'});
});

module.exports = router;