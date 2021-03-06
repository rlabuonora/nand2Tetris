// parses file and returns array
// of instructions (without comments or whitespace)

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
        }.bind(this)).filter(function(line) {
            return line !== "";
        });
    },

    commandType: function(str) {
        if (str[0] === '@') return "A_COMMAND";
        else if (str[0] === '(') return "L_COMMAND"
        else return "C_COMMAND";  //
    },


    symbol: function(str) {
        if (this.commandType(str)!="A_COMMAND") throw str;
        return str.substr(1, str.length-1);
    },
    parseCmd: function( str ) {
        var re = /(?:(MD|D|M|A|AM|AD|AMD)=)?([01DAM+\-&!\|]+)(?:;(JGT|JEQ|JGE|JLT|JNE|JLE|JMP|JNG))?/;
        return str.match(re);
    },
    dest: function(str) {
        if (this.commandType(str) != "C_COMMAND") throw str;
        var match = this.parseCmd( str )[1];
        if (match === undefined) return null;
        else return match;
    },
    comp: function(str) {
        if (this.commandType(str) != "C_COMMAND") throw "Error";
        var match = this.parseCmd( str )[2];
        if (match === undefined) return null;
        else return match;
    },
    jump: function(str) {
        if (this.commandType(str) != "C_COMMAND") throw "Error";
        var match = this.parseCmd( str )[3];
        if (match === undefined) return null;
        else return match;
    }
};

module.exports = parser;
