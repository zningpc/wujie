var fs = require('fs');
const path = require('path');
module.exports = {
	index: function(req, res) {
		var brand_dir = sails.config.data + 'brand';
		var category_dir = sails.config.data + 'category';
		var dist = {};
		fs.readdir(brand_dir, function(err, list) {
			if (err) throw(err);
			let tmp = [];
			list.forEach(function(file) {
				let info = path.parse(path.resolve(brand_dir, file));
				let detail = JSON.parse(fs.readFileSync(sails.config.data + 'brand/' + info.base));
				if (detail) tmp.push(detail);
			});
			dist.brand = tmp;
			fs.readdir(category_dir, function(err, list) {
				if (err) throw(err);
				let tmp = [];
				list.forEach(function(file) {
					let info = path.parse(path.resolve(category_dir, file));
					let detail = JSON.parse(fs.readFileSync(sails.config.data + 'category/' + info.base));
					if (detail) tmp.push(detail);
				});
				dist.category = tmp;
				// console.log(tmp)
				res.view('homepage', dist);
				// res.send(dist);
			});
		});
	}
};

