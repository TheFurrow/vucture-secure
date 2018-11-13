var CertsLocations = {
    Key: "",
    Cert: ""
}

var dbConnection = {
    host: 'den1.mysql6.gear.host',
    user: 'testydb',
    port: '3306',
    password: 'Kh3XUW_9-680',
    database: 'testydb'
};

var facebookAPI = {
    clientID: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails']
}

var session = { secret: 'really', expires: new Date(Date.now() + (30)) }

exports.dbConnection = dbConnection;
exports.facebookAPI = facebookAPI;
exports.session = session;