var expect = require('chai').expect;
var mysql = require('mysql');
var request = require('request');
var httpMocks = require('node-mocks-http');

var app = require('../../server');
var schema = require('../config.js');
var port = 4568;

/************************************************************/
// Mocha doesn't have a way to designate pending before blocks.
// Mimic the behavior of xit and xdescribe with xbeforeEach.
// Remove the 'x' from beforeEach block when working on
// authentication tests. THIS IS FROM SHORTLY EXPRESS
/************************************************************/
var beforeEach = function() {};
/************************************************************/


describe('', function() {
  var db;
  var server;

  var clearDB = function(connection, tablenames, done) {
    var count = 0;
    tablenames.forEach(function(tablename) {
      connection.query('DROP TABLE IF EXISTS ' + tablename, function() {
        count++;
        if (count === tablenames.length) {
          return schema(db).then(done);
        }
      });
    });
  };

  xbeforeEach(function(done) {

  //LOCAL DATABASE TESTS ONLY FOR GETTING STARTED
    db = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'trade'
    });


    var tablenames = ['stocks', 'users', 'sessions']; //MYSQL TABLES YOU USE

    db.connect(function(err) {
      if (err) { return done(err); }
      //EMPTYS LOCAL MYSQL DATABASE AFTER EACH TEST
      clearDB(db, tablenames, function() {
        server = app.listen(port, done);
      });
    });

    afterEach(function() { server.close(); });
  });

  describe('Database Schema:', function() {
    it('contains a stocks table', function(done) {
      var queryString = 'SELECT * FROM STOCKS';
      db.query(queryString, function(err, results) {
        if (err) { return done(err); }

        expect(results).to.deep.equal([]);
        done();
      });
    });

    it('contains id, name, find, and price columns', function(done) {
      var newStock = {
        name: 'MSFT',
        find: 9,
        price: 99.99
      };
      db.query('INSERT INTO stocks SET ?', newStock, function(err, results) {
        db.query('SELECT * FROM users WHERE username = ?', newStock.name, function(err, results) {
          var stock = results[0];
          expect(stock.name).to.exist;
          expect(stock.find).to.exist;
          expect(stock.price).to.exist;
          expect(stock.id).to.exist;
          done();
        });
      });
    });
  });

  xdescribe('API call:', function() {

    it('alphavantage API request returns data', function(done) {
      var options = {
        'method': 'GET',
        'uri': 'https://www.alphavantage.co/query',
        'json': {
          function: 'TIME_SERIES_INTRADAY',
          symbol: symbol,
          interval: '1min',
          datatype: 'json',
          apikey: ''//get your own key at alphavantage.com
        }
      };
      //SEE RESPONSE EXAMPLE AT https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo
      // request(options, function(error, res, body) {
      //     expect(res.body['META DATA']['symbol']).to.exist;
      //
      //     done();
      //   });
      // });

      //Use POSTMAN to test api requests
    });


});
