var Database = require('./Database.js').Database;

'use strict';

class News extends Database {

    CreateNews(object, callback) {
        this.connection.query('INSERT INTO news(date, header, content, author, headingWithImage, imagePath, publish) VALUES(' +
            JSON.stringify(object.date) + ',' +
            JSON.stringify(object.header) + ',' +
            JSON.stringify(object.content) + ',' +
            JSON.stringify(object.author) + ',' +
            JSON.stringify(object.headingWithImage) + ',' +
            JSON.stringify(object.imagePath) + ',' +
            JSON.stringify(object.publish) +
            ');',
            function (err, rows) {
            if (rows) {
                return callback(true, rows);
            }
            else {
                console.log(err);
                return callback(false, err);
            }
        });

        this.connection.end();
    }

    EditNews(object, callback) {
        this.connection.query('UPDATE news SET date = ' +JSON.stringify(object.date) + ',' +
            'header = ' + JSON.stringify(object.header) + ',' +
            'content = ' + JSON.stringify(object.content) + ',' +
            'author = ' + JSON.stringify(object.author) + ',' +
            'headingWithImage = ' + JSON.stringify(object.headingWithImage) + ',' +
            'publish = ' + JSON.stringify(object.publish) +
            'WHERE id = ' + object.id +');',
            function (err, rows) {
                if (rows) {
                    return callback(true, rows);
                }
                else {
                    console.log(err);
                    return callback(false, err);
                }
            });

        this.connection.end();
    }

    FindNewestNews(callback) {
        this.connection.query('SELECT news.id, news.date, news.header, news.content, news.imagePath, news.headingWithImage, adminusers.name FROM jnssoft.news INNER JOIN adminusers ON news.author = adminusers.id WHERE news.publish = true LIMIT 5;', function (err, rows) {
            if (rows) {
                return callback(true, JSON.parse(JSON.stringify(rows)));
            }
            else {
                return callback(false, JSON.parse(JSON.stringify(err)));
            }
        });

        this.connection.end();
    }


    FindSavedNews(callback) {
        this.connection.query('SELECT news.id, news.date, news.header, news.content, news.imagePath, news.headingWithImage, adminusers.name FROM jnssoft.news INNER JOIN adminusers ON news.author = adminusers.id WHERE news.publish = false;', function (err, rows) {
            if (rows) {
                return callback(true, JSON.parse(JSON.stringify(rows)));
            }
            else {
                return callback(false, JSON.parse(JSON.stringify(err)));
            }
        });

        this.connection.end();
    }

    FindNewsWithId(object, callback) {
        this.connection.query('SELECT news.id, news.date, news.header, news.content, news.imagePath, news.headingWithImage FROM jnssoft.news WHERE news.id = ' + JSON.stringify(object) +';', function (err, rows) {
            if (rows) {
                return callback(true, JSON.parse(JSON.stringify(rows)));
            }
            else {
                return callback(false, JSON.parse(JSON.stringify(err)));
            }
        });

        this.connection.end();
    }

}

module.exports.News = News;
