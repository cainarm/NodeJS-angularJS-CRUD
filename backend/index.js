var mysql      = require('mysql');
var express = require('express');

var app = express();


var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'test'
});

app.use(function(req, res, next) {
  res.set('Content-Type', 'application/json');
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/', function (req, res) {
 	connection.query('SELECT * from funcionario', function(err, rows, fields) {
		  if (err) throw err;

		  res.send('{"records":'+JSON.stringify(rows)+'}');
	});
});

app.get('/insert', function (req, res) {

	var nome = req.query['nome'];

 	connection.query("insert into funcionario(nome) values('"+ nome +"')", function(err, rows, fields) {
		  if (err) throw err;

		  if(rows.affectedRows >= 1)
		  	res.send(true);
		  else 
		  	res.send(false);
	});
});

app.get('/delete', function (req, res) {

	var id = req.query['id'];

 	connection.query("delete from  funcionario where id = '"+ id+"'", function(err, rows, fields) {
		  if (err) throw err;

		  if(rows.affectedRows >= 1)
		  	res.send(true);
		  else 
		  	res.send(false);
	});
});

app.get('/update', function (req, res) {

	var id = req.query['id'];
	var nome = req.query['nome'];

 	connection.query("update funcionario set nome='"+nome+"' where id ='"+ id+"' ", function(err, rows, fields) {
		  if (err) throw err;

		  if(rows.affectedRows >= 1)
		  	res.send(true);
		  else 
		  	res.send(false);
	});
});




app.listen(3000, function () {
  console.log('Servidor rodando na porta 3000!');
});
