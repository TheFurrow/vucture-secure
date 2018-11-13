var Database = require('./Database.js').Database;

'use strict';

class Entry extends Database {
    CreateEntry(object, callback) {
        this.connection.query('INSERT INTO entries(date, header, content, author, publish, banner) VALUES(' +
            this.connection.escape(object.date) + ',' +
            JSON.stringify(object.heading) + ',' +
            JSON.stringify(object.content) + ',' +
            JSON.stringify(object.author) + ',' +
            JSON.stringify(object.publish) + ',' +
            JSON.stringify(object.banner) +
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

    UpdateEntry(object, callback) {
        this.connection.query('UPDATE entries SET ' +
            'date = ' + this.connection.escape(object.date) + ',' +
            'header = ' + JSON.stringify(object.heading) + ',' +
            'content = ' + JSON.stringify(object.content) + ',' +
            'author = ' + JSON.stringify(object.author) + ',' +
            'publish = ' + JSON.stringify(object.publish) +
            ' WHERE id = ' + JSON.stringify(object.id) + ';',
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

    GetPublishedEntries(callback) {
        this.connection.query('SELECT id, header, author, date, banner FROM entries WHERE publish="true" OR publish="1";',
            function (err, rows) {
            if (rows) {
                return callback(true, rows);
            }
            else {
                console.log(err);
                return callback(false, err);
            }
        this.connection.end();
        });
    }

    GetSinglePublishedEntry(object, callback) {
        this.connection.query('SELECT id, header, author, date, content, banner FROM entries WHERE id='+JSON.stringify(object)+' AND (publish = "true" OR publish = "1");',
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

    GetSingleSavedEntry(object, callback) {
        this.connection.query('SELECT id, header, author, date, content, banner FROM entries WHERE id=' + JSON.stringify(object) + ';',
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


    GetMinimalAllEntries(callback) {
        this.connection.query('SELECT id, header, date FROM entries;',
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


    GetFirstFiveEntries(callback) {
        this.connection.query('SELECT id, header, banner FROM entries WHERE publish="true" OR publish="1" LIMIT 4;',
            function (err, rows) {
                if (rows) {
                    return callback(true, rows);
                }
                else {
                    return callback(false, err);
                }

            });

        this.connection.end();
    }

    GetMostWatchedEntry(callback) {
        this.connection.query('SELECT MAX(views), entryid FROM entryviews;',
            function (err, rows) {
                if (rows) {
                    return callback(true, rows);
                }
                else {
                    return callback(false, err);
                }

            });

        this.connection.end();
    }


    AddViewToEntry(id, callback) {
        this.connection.query('UPDATE entryviews SET views=views + 1 WHERE entryid = ' + id + ';', function (err, rows) {
            if (rows) return callback(true, rows.affectedRows);
            else return callback(false, err);
        });

        this.connection.end();
    }
}

module.exports.Entry = Entry;