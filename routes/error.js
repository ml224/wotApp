'use strict';

let utils = require('./../utils/utils');

module.exports = function (app) {

    app.use(function (err, req, res, next) {
        if (res.statusCode !== 403) {
            return next(err);
        }
        let message = err.message || "Operation not allowed";
        req.result = JSON.stringify({
            status: res.statusCode,
            url: utils.formatUrl(req),
            error: "Forbidden",
            message: message
        });
        next();
    });

    app.use(function (err, req, res, next) {
        if (res.statusCode !== 404) {
            return next(err);
        }
        let message = err.message || "the resource does not exist";
        req.result = JSON.stringify({
            url: utils.formatUrl(req),
            status: res.statusCode,
            error: "Not Found",
            message: message
        });
        next();
    });

    
    app.use(function (err, req, res, next) {
        res.statusCode = 500;
        req.result = JSON.stringify({
            url: utils.formatUrl(req),
            error: err.title,
            message: err.message,
            status: res.statusCode
        });
        next();
    });
}