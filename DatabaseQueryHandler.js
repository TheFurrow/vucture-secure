var dbUsers = require('./Database/Users.js');
var dbNews = require('./Database/News.js');
var dbEntries = require('./Database/Entry.js');
var dbImages = require('./Database/Images.js');

/////// USERS
module.exports.GetAllUsers = function (callback) {
    var getAll = new dbUsers.Users();
    getAll.GetAllUsers(callback);

}

module.exports.NewAdminUser = function(objects, callback) {
    var newAdmin = new dbUsers.Users();
    newAdmin.CreateNewAdminUser(objects, callback);

}

module.exports.DeleteAdminUser = function (objects, callback) {
    var delUser = new dbUsers.Users();
    delUser.DeleteAdminUser(objects, callback);

}

module.exports.ChangeAdminPassword = function (objects, callback) {
    var delUser = new dbUsers.Users();
    delUser.ChangeAdminPassword(objects, callback);

}

module.exports.GetAdminPermissions = function (objects, callback) {
    var adminPerms = new dbUsers.Users();
    adminPerms.GetAdminPermissions(objects, callback);

}

module.exports.FindUserByIdWithPerms = function (objects, callback) {
    var permsid = new dbUsers.Users();

    permsid.Start(objects, callback);

}

module.exports.FindAndCreateVisitor = function (objects, callback) {
    var visid = new dbUsers.Users();

    visid.FindAndCreateVisitor(objects, callback);
}

module.exports.IsOwnerOfWebsite = function (objects, callback) {
    var db = new dbUsers.Users();

    db.IsOwnerOfWebsite(objects, callback);
}

//// ENTRIES

module.exports.NewEntry = function (objects, callback) {
    var ne = new dbEntries.Entry();

    ne.CreateEntry(objects, callback);
}

module.exports.UpdateEntry = function (objects, callback) {
    var ne = new dbEntries.Entry();

    ne.UpdateEntry(objects, callback);
}

module.exports.GetPublishedEntries = function (callback) {
    var pe = new dbEntries.Entry();

    pe.GetPublishedEntries(callback);
}

module.exports.GetMinimalAllEntries = function (callback) {
    var pe = new dbEntries.Entry();

    pe.GetMinimalAllEntries(callback);
}

module.exports.GetSinglePublishedEntry = function (object, callback) {
    var pe = new dbEntries.Entry();

    pe.GetSinglePublishedEntry(object, callback);
}

module.exports.GetSingleSavedEntry = function (object, callback) {
    var pe = new dbEntries.Entry();

    pe.GetSingleSavedEntry(object, callback);
}


module.exports.AddViewToEntry = function (object, callback) {
    var adv = new dbEntries.Entry();

    adv.AddViewToEntry(object, callback);
}

module.exports.GetFirstFiveEntries = function (callback) {
    var fstf = new dbEntries.Entry();

    fstf.GetFirstFiveEntries(callback);
}

module.exports.GetMostWatchedEntry = function (callback) {
    var mostwatched = new dbEntries.Entry();

    mostwatched.GetMostWatchedEntry(callback);
}

//// API

module.exports.SaveNewImage = function (object) {
    var db = new dbImages.Images();

    db.SaveNewImage(object);
}

module.exports.GetAllUploadedImages = function (callback) {
    var db = new dbImages.Images();

    db.GetAllUploadedImages(callback);
}

//// NEWS
module.exports.NewNews = function (object, callback) {
    var createNews = new dbNews.News();

    createNews.CreateNews(object, callback);

}

module.exports.EditNews = function (object, callback) {
    var editNews = new dbNews.News();

    editNews.EditNews(object, callback);

}

module.exports.FindAllNews = function (object, callback) {
    var allNews = new dbNews.News();

    allNews.FindNewestNews(object, callback);
}

module.exports.FindSavedNews = function (callback) {
    var savedNews = new dbNews.News();

    savedNews.FindSavedNews(callback);
}

module.exports.FindNewsWithId = function (object, callback) {
    var newsId = new dbNews.News();

    newsId.FindNewsWithId(object, callback);
}