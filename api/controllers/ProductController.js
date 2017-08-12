/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
const path = require('path');

module.exports = {
	list: function(req, res) {
		var limit = req.param('limit') || 10;
		var num = req.param('num') || 0;
		var start = num * 10;
		var end = start + 10;

		var dir = sails.config.data + 'brand';
		var brand_id = req.param('brands') || '';
		var category_id = req.param('category') || '';
		if (brand_id != '') {
			let brand = JSON.parse(fs.readFileSync(sails.config.data + 'brand/' + brand_id + '.json'));
			let sku = JSON.parse(fs.readFileSync(sails.config.data + 'sku/brand/' + brand_id + '.json'));
			let tmp = [];
			sku.forEach(function(item){
				let sku_tmp = JSON.parse(fs.readFileSync(sails.config.data + 'product/' + item.id + '.json'));
				item.brand = brand;
				tmp.push(sku_tmp);
			});
			// res.send(tmp)
			res.view('product/list_brand', {
				brand: brand,
				sku: tmp || [],
			});
		} else if (category_id != '') {
			let category = JSON.parse(fs.readFileSync(sails.config.data + 'category/' + category_id + '.json'));
			let sku = JSON.parse(fs.readFileSync(sails.config.data + 'sku/category/' + category_id + '.json'));
			let tmp = [];
			sku.forEach(function(item){
				item.category = category;
				tmp.push(item);
			});
			res.view('product/list', {
				sku: tmp || [],
			});
		} else {
			var dir = sails.config.data + 'product';
			fs.readdir(dir, function(err, list) {
				if (err) throw(err);
				var dirlist = list || [];
				let tmp = [];
				let product = [];
				if (dirlist.length > limit) {
					tmp = dirlist.slice(start, end);
				} else {
					tmp = dirlist;
				}
				tmp.forEach(function(file) {
					let info = path.parse(path.resolve(dir, file));
					let detail = JSON.parse(fs.readFileSync(sails.config.data + 'product/' + info.base));
					product.push(detail)
				});
				// res.send(product)
				res.view('product/list', {
					sku: product,
					brand: '',
				});
			});
		}
	},
	pageList: function(req, res) {
		var limit = req.param('limit') || 10;
		var num = req.param('num') || 0;
		var start = num * 10;
		var end = start + 10;
		var dir = sails.config.data + 'product';
		fs.readdir(dir, function(err, list) {
			if (err) throw(err);
			var dirlist = list || [];
			let tmp = [];
			let product = [];
			if (dirlist.length > limit) {
				tmp = dirlist.slice(start, end);
			} else {
				tmp = dirlist;
			}
			tmp.forEach(function(file) {
				let info = path.parse(path.resolve(dir, file));
				let detail = JSON.parse(fs.readFileSync(sails.config.data + 'product/' + info.base));
				product.push(detail)
			});
			res.view('product/block', {
				sku: product,
			});
		});
	},
	detail: function(req, res) {
		var product_id = req.param('product') || '';
		let sku = JSON.parse(fs.readFileSync(sails.config.data + 'product/' + product_id + '.json'));
		res.view('product/detail', {
			sku: sku,
		});
		// res.send(sku)
	}
};

