var express = require('express');
var Reviews = require ('../database/reviews')
var router = express.Router();

router.route('/')

.get(function (req, res) {
	Reviews.find({}, function (err, reviews) {
		if (err) {
			res.status(500).send({'error': err});
		} else {
			res.send(reviews);
		}
	});
});

router.get('/:index', function(req, res, next){
	Reviews.findOne({_id: req.params.index}, function (err, reviews) {
		if (err) {
			res.status(500).send({'error': err});
		} else {
			res.send(reviews);
		}
	});
});

router.post('/new', function(req, res, next){
	if(!req.body.name || !req.body.placeType || !req.body.stars){
		res.status(400).send({ 'error' : 'Paramètres manquants'});
	}
	else{
		var review = {
			name: req.body.name,
			placeType : req.body.placeType,
			stars: req.body.stars,
		};
		Reviews.create(review, function(err, review){
			if(err){
				res.status(500).send({'error' : err});
			}
			else{
				res.status(201).send(review);
			}
		});
	}	

});

router.put('/edit/:index', function(req, res){
	Reviews.findOneAndUpdate({_id: req.params.index}, req.body , function (err, reviews) {
		if (err) {
			res.status(404).send({'error': err});
		} else {
			res.send(reviews);
		}
	});
});

router.delete('/delete', function(req, res, next){
	Reviews.remove({}, function(err, resp){
		if(err){
			res.status(404).send({'error' : err});
		}
		else{
			res.status(204);
		}
	});
});

router.delete('/delete/:index', function(req, res, next){
	Reviews.remove({_id: req.params.index}, function(err, resp){
		if(err){
			res.status(404).send({'error' : err});
		}
		else{
			res.status(204);
		}
	});
});

module.exports = router;