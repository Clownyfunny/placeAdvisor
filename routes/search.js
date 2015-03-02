var express = require('express');
var Reviews = require ('../database/reviews');
var router = express.Router();

router.route('/')

	.get(function (req, res) {
		if(req.query.name || req.query.placeType || req.query.stars){
			if(req.query.stars == ''){
				req.query.stars = {$gt: '0'};
			}
			Reviews.find({'name' : {$regex: req.query.name, $options: 'i'}, 'placeType' : {$regex: req.query.placeType, $options: 'i'}, 'stars' : req.query.stars}, function (err, reviews) {
				if (err) {
					res.status(500).send({'error': err});
				} else {
					res.status(200);
					var accept =req.get('Accept');
					if(accept.indexOf("html")){
						res.render('resultSearchLayout', { title: 'Reviews', elements: reviews });
					}
					else{
						res.send(reviews);
					}
				}
			});
		}
		else{
			res.status(200);
			var accept =req.get('Accept');
			if(accept.indexOf("html")){
				res.render('searchLayout', { title: 'Search'});
			}
			else{
				res.send('Add parameters for launch your search request');
			}
		}
	})

	;

module.exports = router;