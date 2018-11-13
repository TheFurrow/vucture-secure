var Database = require('./Database.js').Database;

'use strict';

class Images extends Database {
    SaveNewImage(object) {
        this.connection.query('INSERT INTO images(path) VALUES('+JSON.stringify(object)+');',
            function (err, rows) {
                if (err) {
                    console.log(err);
                }


            });
        this.connection.end();
    }

    GetAllUploadedImages(callback) {
        this.connection.query('SELECT * FROM images;', function (err, rows) {
            if (rows) {
                return callback(true,rows);
            }
            else return callback(false, err);
        })

        this.connection.end();
    }
}

module.exports.Images = Images;