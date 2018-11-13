'use strict';
var dbConnection = require('../Conf/ServerConfig.js').dbConnection;
var mysql = require('mysql');

//Mysql connection
class Database {
  constructor() {
   // var mysql = require('mysql');
        this.connection = mysql.createConnection({
          host:dbConnection.host,
          user:dbConnection.user,
          password:dbConnection.password,
          database:dbConnection.database
        });

        this.connection.connect(function (err) {
            if (err)
            {
                console.log(Date() + ' // Error came up while connecting to database.\n'+err);
                return;
            }
            else {
                console.log(Date() + ' // Connected to the database.');
            }
        });
  }
}

module.exports.Database = Database;
