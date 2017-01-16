var parser = {
    preprocessLine:  function(str) {
        var re = /\/\/.*\r/;
        var newLine = str.replace(re, "").trim();
        return newLine;
    },

    readFile: function(file) {
        // return an array with the lines of the file
        var fs = require('fs');
        return fs.readFileSync(file).toString().split("\n").slice(0, -1); // remove last blank line
    },

    preprocessFile:  function(file) {
        var arr = this.readFile(file);
        return arr.map(function(line) {
            return this.preprocessLine(line)
        }.bind(this));
    }
};

module.exports = parser;
