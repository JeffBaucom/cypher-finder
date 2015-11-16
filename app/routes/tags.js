var Tag = require('../models/tag');
var mongoose = require('mongoose');

module.exports = function(app, express) {
	var tagsRouter = express.Router();
	
	tagsRouter.route('/styles')
		.post(function(req, res) {
			if (!req.body) return res.sendStatus(400);
			
			var tag = new Tag();
			
			tag.category = "style";
			tag.text = req.body.text;
			
			//save and check for errors
			tag.save(function(err) {
				if (err) {
					console.log('error');
					if (err.code == 11000) {
						return res.json({ success: false, message: 'already exists'});
					} else {
						return res.send(err);
					}
				} else {
					console.log('success');
				}
			});
		})
		
		.get(function(req, res) {
			Tag.find({category: 'style'}, function(err, tags) {
				if(err) res.send(err);
				
				res.json(tags)
			});
		});
		
	tagsRouter.route('/kinds')
		.post(function(req, res) {
			if (!req.body) return res.sendStatus(400);
			
			var tag = new Tag();
			
			tag.category = "kind";
			tag.text = req.body.text;
			
			//save and check for errors
			tag.save(function(err) {
				if (err) {
					console.log('error');
					if (err.code == 11000) {
						return res.json({ success: false, message: 'already exists'});
					} else {
						return res.send(err);
					}
				} else {
					console.log('success');
				}
			});
		})
		
		.get(function(req, res) {
			Tag.find({category: 'kind'}, function(err, tags) {
				if(err) res.send(err);
				
				res.json(tags)
			});
		});
		
}