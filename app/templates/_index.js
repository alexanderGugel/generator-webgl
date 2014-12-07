var fs = require('fs');
var insertCss = require('insert-css');

insertCss(require('normalize-css'));
insertCss(fs.readFileSync(__dirname + '/index.css'));
