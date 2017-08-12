/**
 * BrandsController
 *
 * @description :: Server-side logic for managing brands
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
const path = require('path');

module.exports = {
	list: function(req, res) {
		// var filepath = path + "/data/test.json";
		// var filepath = sails.config.data + "test.json";
		// var result=JSON.parse(fs.readFileSync(filepath));
		var dir = sails.config.data + 'brand';

		fs.readdir(dir, function(err, list) {
			if (err) throw(err);
			var dirlist = list || [];
			let tmp = [];
			list.forEach(function(file) {
				let info = path.parse(path.resolve(dir, file));
				let detail = JSON.parse(fs.readFileSync(sails.config.data + 'brand/' + info.base));
				let sku = JSON.parse(fs.readFileSync(sails.config.data + 'sku/brand/' + info.base));
				detail.sku = sku || [];
				tmp.push(detail)
			});
			// console.log(tmp)
			res.view('brand/list', {
				brands: tmp
			});
		});
	},
	detail: function(req, res) {
		var brand_id = req.param('brand');
		let detail = JSON.parse(fs.readFileSync(sails.config.data + 'brand/' + brand_id + '.json'));
		res.send(detail);
	}
};

