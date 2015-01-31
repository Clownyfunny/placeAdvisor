var express = require('express');
var Reviews = require ('../database/reviews');
var router = express.Router();

router.route('/')

	.get(function (req, res) {

		Reviews.find({}, null , { sort: '-stars', limit: 3 },function (err, reviews) {
			if (err) {
				res.status(500).send({'error': err});
			} else {
				res.status(200);
				var accept =req.get('Accept');
				if(accept.indexOf("html")){
					res.render('topReviewsList', { title: 'Reviews', elements: reviews });
				}
				else{
					res.send(reviews);
				}
			}
		});
	});

module.exports = router;