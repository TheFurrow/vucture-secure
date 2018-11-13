'use strict';

var Database = require('./Database.js').Database;

class Users extends Database {

    IsOwnerOfWebsite(object, callback) {
        console.log(object);
        this.connection.query('SELECT id, name, email FROM admin WHERE id=' + JSON.stringify(object.id) + 'AND name=' + JSON.stringify(object.name) + 'AND email=' + JSON.stringify(object.email) + ';', function (err, rows) {
            if (rows) {
                if (rows.length > 0) {
                    console.log('true');
                    return callback(true, rows);
                }
                else { console.log('false, no result'); return callback(false, 'DB: No result'); }
            }
            else { console.log('false'); return callback(false, err); }
        });

        this.connection.end();
    }

    FindUserById(id, callback) {
        this.connection.query('SELECT * FROM adminusers WHERE id=' + id + ';', function (err, rows) {
            if (rows) {
                if (rows.length > 0) {
                    return callback(true, rows[0]);
                }
                else  return callback(false, 'No result');
            }
            return callback(false, err);

        });
        this.connection.end();
       
    }

    FindAndCreateVisitor(object, callback) {
        this.connection.query('SELECT id FROM povisitors WHERE id=' + object.id + ';', function (err, rows) {
            if (rows) {
                if (rows.length > 0) {
                    return callback(true, rows[0]);
                }
                else return callback(false, "No result");
            }
            else return callback(false, err);
        });
        this.connection.end();
    }

    Start(id, callback) {
        console.log(Date() + ' // Seeking for admin user information');
        var userRow, permissionRow;

        this.FindUserByIdGetPermissions(id, function (rowId, row) {
            if (rowId >= 0) {
                if (rowId == 1) userRow = row;
                else permissionRow = row;

                if (userRow && permissionRow) {
                    userRow.permissions = permissionRow;
                    
                    return callback(true, userRow);


                }
            }

            else {
                this.connection.end();
                return callback(false, userRow);
            }
            
        });

        this.connection.end();
    }
    
    FindUserByIdGetPermissions(id, innerCallback) {
        this.connection.query('SELECT * FROM adminusers WHERE id=' + id + ';', function (err, userRows) {
            if (userRows) {
                if (userRows.length > 0) {

                    userRows = JSON.parse(JSON.stringify(userRows[0]));

                    innerCallback(1, userRows);
                }
                else return innerCallback(false, 'No result');
            }
            return innerCallback(false, err);



        });

        this.connection.query('SELECT editAdmins, editNews, editPages, editUsers, createNews, createEvents FROM adminpermissions WHERE adminpermissions.adminId = ' + JSON.stringify(id) + ';',
            function (err, rows) {
                
                if (rows) {

                    rows = JSON.parse(JSON.stringify(rows[0]));

                    innerCallback(0, rows);
                }
                else return innerCallback(false, err);
            });
    }


    CompareUser(user, callback) {
        this.connection.query('SELECT * FROM adminusers WHERE username=' + JSON.stringify(user.username) + 'AND password=' + JSON.stringify(user.password) + ';',
        function (err, rows) {
            //Magic
            if (rows) {
                if (rows.length > 0 && rows.length < 2) {
                    return callback(true, JSON.parse(JSON.stringify(rows[0])));
                }
                else return callback(false, 'No result');
            }

            return callback(false, err);


        });

        this.connection.end();
       
    }

    GetAllUsers(callback) {
        this.connection.query('SELECT * FROM adminusers', function (err, rows) {
            if (rows) {
                if (rows.length > 0) {
                    return callback(true, rows);
                }
                else {
                    return callback(false, 'No results');
                }
            }
            else {
                return callback(false, err);
            }

        });
        this.connection.end();
        

    }

    /** INSERT **/

    CreateNewAdminUser(user, callback) {
        this.connection.query('INSERT INTO adminusers(username, password) VALUES(' + JSON.stringify(user.username) + ',' + JSON.stringify(user.password) + ');',
            function (err, rows) {
                if (rows) {
                    return callback(true, rows);
                }
                else return callback(false, err);
            });

        this.connection.end();
    }

    DeleteAdminUser(user, callback) {
        this.connection.query('DELETE FROM adminusers WHERE id = ' + JSON.stringify(user.id) + ' AND username = ' + JSON.stringify(user.username) + ';',
            function (err, rows) {
                if (rows) {
                    return callback(true, rows);
                }
                else return callback(false, err);
            });

        this.connection.end();
    }

    ChangeAdminPassword(user, callback) {
        this.connection.query('UPDATE adminusers SET password = ' + JSON.stringify(user.password) + ' WHERE id = ' + JSON.stringify(user.id)+';',
            function (err, rows) {
                if (rows) {
                    return callback(true, rows);
                }
                else return callback(false, err);
            });

        this.connection.end();
    }

    GetAdminPermissions(user, callback) {
        console.log(user);
        this.connection.query('SELECT editAdmins, editNews, editPages, editUsers, createNews, createEvents FROM adminpermissions WHERE adminpermissions.adminId = ' + JSON.stringify(user) + ';',
            function (err, rows) {
                console.log('PERMS ROW:', rows,err);
                if (rows) {
                    return callback(true, JSON.parse(JSON.stringify(rows[0])));
                }
                else return callback(false, err);
            });

        this.connection.end();

    }
}

module.exports.Users = Users;
