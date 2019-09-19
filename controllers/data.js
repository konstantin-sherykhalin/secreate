var fetch = require('node-fetch');

var model = require("../models/currency");

exports.get = async (req,res) => {
	var data = req.body;

	if(!('list' in data) || !(data.list instanceof Array)) return res.send({error:'parameter list is not defined'});

	try {
		var pair = await model.get_pairs();

		let ruble_price = data.list.reduce((s,c) => {
			if(c.currency != 'RUB') c.price *= pair[c.currency].Value;
			return c.quantity*c.price + s;
		},0);

		res.send({response:{
			RUB: Math.round(ruble_price*100)/100,
			USD: Math.round(ruble_price/pair.USD.Value*100)/100,
			EUR: Math.round(ruble_price/pair.EUR.Value*100)/100,
		}});
	} catch (err) {
		console.log(err);
		res.status(500).send({error:'internal_error'});
	}
}
