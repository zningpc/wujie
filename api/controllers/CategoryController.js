/**
 * CategoryController
 *
 * @description :: Server-side logic for managing brands
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
const path = require('path');

module.exports = {
	list: function(req, res) {
		var dir = sails.config.data + 'category';
		fs.readdir(dir, function(err, list) {
			if (err) throw(err);
			var dirlist = list || [];
			let tmp = [];
			list.forEach(function(file) {
				let info = path.parse(path.resolve(dir, file));
				let detail = JSON.parse(fs.readFileSync(sails.config.data + 'category/' + info.base));
				tmp.push(detail)
			});
			console.log(tmp)
			// res.send(tmp);
			res.view('category/list', {
				category: tmp
			});
		});
	}
};

