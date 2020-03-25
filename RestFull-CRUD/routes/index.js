var express = require('express');
var router = express.Router();

const sql = require('mssql')
var createError = require('http-errors');

const config = {
  user: '4DD_22',  //Vostro user name
  password: 'xxx123##', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: '4DD_22', //(Nome del DB)
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/insert', function(req, res, next) {
  res.render('insert', { title: 'Express' });
});

router.get('/elenco', function(req, res, next) {
    let sqlQuery = "select * from dbo.[cr-unit-attributes]";
    executeQuery('elenco', 'Elenco Unità:', true, res, sqlQuery, next);
});

router.get('/search/:name', function (req, res, next) {
    let sqlQuery = `select * from dbo.[cr-unit-attributes] where Unit = '${req.params.name}'`;
    executeQuery('elenco', 'Dettaglio Unità:', false, res, sqlQuery, next);
});

router.post('/inserisci', function (req, res, next) {
    let unit = req.body;
    if (!unit) { 
        res.status(500).json({success: false, message:'Error while connecting database', error:err});
        return;
    }
    let sqlInsert = `INSERT INTO dbo.[cr-unit-attributes] (Unit,Cost,Hit_Speed) 
                        VALUES ('${unit.Unit}','${unit.Cost}','${unit.Hit_Speed}')`;
    executeQuery('', '', false, res, sqlInsert, next);
    res.render('elenco', { title: 'Nuova Unità inserita con successo:', 
        result: [{Unit: unit.Unit, Cost: unit.Cost, Hit_Speed: unit.Hit_Speed}], 
        link: false
    });
});

let executeQuery = function (tipo, titolo, link, res, query, next) {
    sql.connect(config, function (err) {
        if (err) { 
            console.logconsole.log("Error while connecting database :- " + err);
            res.status(500).json({success: false, message:'Error while connecting database', error:err});
            return;
        }

        var request = new sql.Request(); 
        request.query(query, function (err, result) {
            if (err) {
                console.log("Error while querying database :- " + err);
                res.status(500).json({success: false, message:'Error while querying database', error:err});
                sql.close();
                return;
            }

            if (tipo != ''){
                res.render(tipo, { title: titolo, result: result.recordset, link: link})
            }
            sql.close();
        });
    });
}

module.exports = router;

