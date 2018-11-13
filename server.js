var express = require('express');
var app = express();
var cookieparser = require('cookie-parser');
var expressSession = require('express-session');
var fs = require('file-system');
var bodyParser = require('body-parser');
var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;
var dbHandler = require('./DatabaseQueryHandler.js');
var serverConfig = require('./Conf/ServerConfig');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './views/Style/imgs/portfolio/');
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        cb(null, file.originalname);
    }
})

var upload = multer({ storage: storage })




passport.use(new FacebookStrategy(serverConfig.facebookAPI,
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        dbHandler.IsOwnerOfWebsite(profile._json, function (status, rows) {
            if (status && rows) {
                return cb(null, rows);
            }
            else {
                dbHandler.FindAndCreateVisitor(profile._json, function (status, rows) {
                    //For now nothing for visitors
                    return cb(null);
                });
            }
        });
 
        
    }
));

app.use(cookieparser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb',
    parameterLimit: 1000000
}));
app.use(expressSession(serverConfig.session));
app.use(passport.initialize());
app.use(passport.session(serverConfig.session));
app.disable('view cache');
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
        done(null, user);
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use("/", express.static('views'));

var theWords = ['revolutes', 'conquers', 'evolutes', 'changes', 'infects', 'shapes', 'apocalypts', 'mutates'];
function GetRandomWord(callback) {
    var rand = 0;
    for (var i = 0; i <= theWords.length; i++) {
        rand = Math.round(Math.random() * 10);

        if (rand <= (theWords.length - 1)) {
            return callback(theWords[rand]);
        }

        if (i == (theWords.length - 1)) {
            return callback(theWords[0]);
        }
    }
}

function GetCurrentSite(name) {
    switch (name) {
        case 'index': { return 'index' }
        case 'portfolio': { return 'portfolio' }
    }
}

app.get('/', function (req, res) {
    GetRandomWord(function (word) {
        var logged = (req.user) ? true : false;
        var pageName = GetCurrentSite('index');
        dbHandler.GetFirstFiveEntries(function (status, rows) {
            if (status) {
                res.render('index', { currentSite: pageName, randomWord: word, logged: logged, entries: rows });
            }
            else {
                res.render('status-page', { status: false, msg: rows });
            }
          
        })

  
    })
 
});

app.get('/portfolio', function (req, res) {
    dbHandler.GetPublishedEntries(function (status, rows) {
        if (status) {
            console.log(rows);
            var logged = (req.user) ? true : false;
            var pageName = GetCurrentSite('portfolio');
            res.render('portfolio', { currentSite: pageName, entries: rows, logged: logged });
        }
        else {
            res.render('status-page', { status: false, msg: "Something went wrong while fetching information from database. Please contact website master." });
        }
    });
});

app.get('/portfolio/entries', function (req, res) {
    var id = (req.query.id) ? req.query.id : 1;

    dbHandler.AddViewToEntry(id, function (status, rows) {

    });

    dbHandler.GetSinglePublishedEntry(id, function (status, rows) {
        if (status && rows.length > 0) {
            var pageName = GetCurrentSite('portfolio');
            var logged = (req.user) ? true : false;
            res.render('portfolio_singleEntry', { entries: rows, currentSite: pageName, logged:logged  });
        }
        else {
            res.render('404');
        }
    });
});

app.get('/login-fail', function (req, res) {
        res.render('login_fail');
});

app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login-fail' }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log('SUCCESSFUL LOGIN');
        res.send('SUCCESS LOGIN');
    });

//Control panel

//For authorization required sites
function IsAuthorized(req, res, next) {
    if (req.user) { next(); }
    else { res.render('404'); }
}

app.get('/cp', IsAuthorized, function (req, res) {
    res.render('controlpanel_index');
})

app.get('/cp/new-entry', IsAuthorized, function (req, res) {
    res.render('./cp/cp_newEntry');
})

app.get('/cp/modify', IsAuthorized, function (req, res) {

    dbHandler.GetMinimalAllEntries(function (status, rows) {
        if (status) {
            res.render('./cp/cp_browseEntries', {entries: rows});
        }
        else {
            res.status(400).send('Something went wrong while fetching entries');
        }
    })
})

app.get('/cp/modify/sel', IsAuthorized, function (req, res) {
    var id = (req.query.id) ? req.query.id : 1;
    dbHandler.GetSingleSavedEntry(id, function (status, rows) {
        if (status) {
            res.render('./cp/cp_editEntry', { entry: rows });
        }
        else {
            res.status(400).send('Something went wrong while fetching entry');
        }
    })
})

app.post('/post-new-entry', IsAuthorized, upload.single('bannerImage'), function (req, res) {

    var data = JSON.parse(req.body.entry);

    var bannerFile = (req.file) ?  ('/Style/imgs/portfolio/' + req.file.originalname) : '';
    
    var modifiedObject = {
        heading: data.heading,
        content: data.text,
        author: req.user[0].name,
        date: new Date(),
        publish: data.publish,
        banner: bannerFile
    }
 
    dbHandler.NewEntry(modifiedObject, function (status, rows) {
        if (status) {
            res.status(200).send("OK");
        }
        else {
            res.status(403).send("FALSE");
        }
    });
  
})

app.post('/post-update-entry', IsAuthorized, function (req, res) {
    var modifiedObject = {
        id: req.body.id,
        heading: req.body.heading,
        content: req.body.text,
        author: req.user[0].name,
        date: new Date(),
        publish: req.body.publish
    }

    dbHandler.UpdateEntry(modifiedObject, function (status, rows) {
        if (status) {
            res.status(200).send("OK");
        }
        else {
            res.status(403).send("FALSE");
        }
    })

})

app.get('/most-watched-entry', IsAuthorized, function (req, res) {
    dbHandler.GetMostWatchedEntry(function (status, rows) {
        if (status) {
            res.json({ row: rows });
        }
        else {
            res.json({ row: 'no' });
        }
    })
})



//IMAGE API
app.post('/post-entry-image', IsAuthorized, upload.single('entryImage'), function (req, res, next) {
    if (req.file) {
        console.log(req.file)

        var modified = req.file;
        modified.webPath = '/Style/imgs/portfolio/' + modified.originalname;

        dbHandler.SaveNewImage(modified.webPath);

        res.status(200).send(modified);
    }
    else res.status(400).send('Image not received or corrupted');

})

app.post('/post-get-all-images', IsAuthorized, function (req, res) {
    console.log("Need to get images.");

    dbHandler.GetAllUploadedImages(function (status, data) {
        if (data) {
            res.status(200).send(data);
        }
        else res.status(400).send(data);
    })


})

//404
app.get('*', function (req, res) {
    res.render('404');
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Running server');
});
