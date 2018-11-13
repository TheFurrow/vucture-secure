var CertsLocations = {
    Key: "",
    Cert: ""
}

var dbConnection = {
    host: '',
    user: '',
    port: '3306',
    password: '',
    database: ''
};

var facebookAPI = {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
    profileFields: ['id', 'displayName', 'emails']
}

var session = { secret: 'really', expires: new Date(Date.now() + (30)) }

exports.dbConnection = dbConnection;
exports.facebookAPI = facebookAPI;
exports.session = session;