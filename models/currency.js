var fetch = require('node-fetch');

module.exports = {
	async get_pairs() {
		try {
			let res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
			if(res.status == 200) {
				let data = await res.json();
				return data.Valute;
			} else if(res.status == 500) {
				return {error:{code:res.status,message:'Сервер с курсами валют не доступен'}};
			} else {
				console.log(res);
				return {error:{code:res.status,message:'Проблемы со связью'}};
			}
        } catch (e) {
			console.log(e);
			return {error:{message:'Не удалось совершить запрос'}};
		}
	}
};
