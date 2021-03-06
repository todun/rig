/*jslint nomen: true */
var handlebars = require('handlebars'),
    fs         = require('fs'),
    cache,
    stripSpaceInHTML = function (html) {
        'use strict';
        // return html.replace(/[\s\n]*(<.+>)[\s\n]*(<.+>)[\s\n]*/gm, function (match, match1, match2) {
        //     return match1 + match2;
        // });
    };

module.exports = function () {
    'use strict';

    /**
     * A caching, Express.js template engine glue for handlebars.
     * @name hb_adapter
     * @function
     * @param  {String}   path the path of the template file to render
     * @param  {Object}   templateData the data to inject into the template
     * @param  {Function(Error, String)} callback called upon completion
     */
    return function hb_adapter(path, templateData, callback) {
        if (!cache) {
            cache = {};
        }
        console.log('path:', path);
        if (!cache[path]) {
            fs.readFile(path, function (err, data) {
                if (err) {
                    callback(err);
                }
                data = data.toString();
                // if (req.context.environment === 'prod') {
                //     data = stripSpaceInHTML(data);
                // }
                cache[path] = handlebars.compile(data);
                callback(null, cache[path](templateData));
            });
        } else {
            callback(null, cache[path](templateData));
        }
    };
};
