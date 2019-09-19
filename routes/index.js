var data = require("../controllers/data");

var listener = [
	{
		method:		'get_data',
		actions:	[data.get],
	},
];

module.exports = function(app) {
	for(let i=0; i<listener.length; i++) {
		let row = listener[i];
		app.post(
			'/'+row.method,
			(req,res,next) => {
				console.log('Запрос','/'+row.method);

				res.set('Access-Control-Allow-Origin','*');
				res.set('Content-Type','application/json');
				next();
			},
			row.actions
		);
	}
}
