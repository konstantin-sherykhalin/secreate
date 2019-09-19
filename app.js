// Подключаем все необходимые модули
var express		= require('express');
var bodyParser	= require('body-parser');
var path		= require('path');

// Настройки
var config = require("./config");

// Создаем приложение
var app = express();

// Обработка json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.use(express.json({
// 	type: ['application/json','text/plain'],
// }));

// На служебный запрос отправляем заголовки
app.options('*',(req,res) => {
	// console.log(req.method,req.originalUrl);
	res.set('Access-Control-Allow-Origin','*');
	res.set('Access-Control-Allow-Credentials',true);
	res.set('Access-Control-Max-Age',86400);
	res.set('Access-Control-Allow-Methods','POST,OPTIONS');
	res.set('Access-Control-Allow-Headers','Origin,Content-Type,X-Auth-Token,Authorization');
	res.status(200).end();
});

// По корневому пути будем выдавать файлы из папки client
app.use(express.static(path.join(__dirname,'client')));

// Передаем обработку запросов указанным маршрутам
require('./routes')(app);

// Сервер слушает по установленному порту
app.listen(config.server.port,_ => console.log('Сервер запущен на порте '+config.server.port));
