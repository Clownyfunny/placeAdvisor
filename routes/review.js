var express = require('express');
var Reviews = require ('../database/reviews')
var router = express.Router();

router.route('/')

	.get(function (req, res) {

		Reviews.find({}, function (err, reviews) {
			if (err) {
				res.status(500).send({'error': err});
			} else {
				res.status(200);
				var accept =req.get('Accept');
				if(accept.indexOf("html")){
					res.render('reviewsList', { title: 'Reviews', elements: reviews });
				}
				else{
					res.send(reviews);
				}
			}
		});
	})

	.post(function(req, res){
		if(!req.body.name || !req.body.placeType || !req.body.stars){
			res.status(400).send({ 'error' : 'Missing parameters'});
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
					res.status(201);
					var accept =req.get('Accept');
					if(accept.indexOf("html")){
						res.render('reviewSelected', { title: review.name, element: review });
					}
					else{
						res.send(review);
					}
				}
			});
		}	

	});

router.route('/:index')
	.get(function(req, res, next){
		if (!req.params.index) {
            res.status(400).send({'error': 'Invalid operation'});
        } 
        else{
        	Reviews.findOne({_id: req.params.index}, function (err, review) {
			if (err) {
				res.status(500).send({'error': err});
			} else {
				if(!review){
					res.status(404).send({'error' : 'Not found this review'})
				}
				else{
					res.status(200);
					var accept =req.get('Accept');
					if(accept.indexOf("html")){
						res.render('reviewSelected', { title: review.name, element: review });
					}
					else{
						res.send(review);
					}
				}
			}
		});
        }
	})

	.put(function(req, res){
		if (!req.params.index) {
            res.status(400).send({'error': 'Missing parameters'});
        }
        else{
        	Reviews.findOneAndUpdate({_id: req.params.index}, req.body , function (err, reviews) {
			if (err) {
				res.status(404).send({'error': err});
			} else {
				res.status(200).send(reviews);
			}
		});
        }
	})

	.delete(function(req, res, next){
		if (!req.params.index) {
            res.status(400).send({'error': 'Missing parameters'});
        }
        else{
        	Reviews.remove({_id: req.params.index}, function(err, resp){
				if(err){
					res.status(500).send({'error' : err});
				}
				else{
					res.status(204).send();
				}
			});
        }
	});

module.exports = router;