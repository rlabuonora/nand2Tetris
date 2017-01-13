var assert = require('assert');
var assembler = require('../assembler.js');


describe('Regular expression', function() {

    describe('removing comments', function() {

        var re = /\/\/.*\r/;

        it('full line comment', function() {
            var str = "// this is a comment\r";
            assert.equal(str.replace(re, ""), "");
        });
        it('a comment after an instruction', function() {
            var str = "ADD 1 + 2 // this is a comment\r";
            assert.equal(str.replace(re, ""), "ADD 1 + 2 ");
        });
    });
});


describe('Removing whitespace', function() {

    it('blank line', function() {
        var str = "      \r";
        assert.equal(str.trim(), "");
    });

    it('Leading whitespace', function() {
        var str = "   ADD 1 + 2\r";
        assert.equal(str.trim(), "ADD 1 + 2");
    });

    it('Trailing whitespace', function() {
        var str = "ADD 1 + 2    \r";
        assert.equal(str.trim(), "ADD 1 + 2");
    });

    it('Leading & trailing whitespace', function() {
        var str = "   ADD 1 + 2    \r";
        assert.equal(str.trim(), "ADD 1 + 2");
    });

    it('line with carriage return', function() {
        var str = "   ADD 1 + 2\r";
        assert.equal(str.trim(), "ADD 1 + 2");
    });
});


describe('Removing whitespace and comments', function() {

    it('an empty line', function() {
        var str = "\r";
        assert.equal(assembler.preprocessLine(str), "");
    });

    it('a blank line', function() {
        var str = "      \r";
        assert.equal(assembler.preprocessLine(str), "");
    });

    it('an instruction ', function() {
        var str = "ADD 1 + 2\r";
        assert.equal(assembler.preprocessLine(str), "ADD 1 + 2");
    });


    it('an instruction with a comment', function() {
        var str = "ADD 1 + 2  // This is a comment\r";
        assert.equal(assembler.preprocessLine(str), "ADD 1 + 2");
    });

    it('a comment', function() {
        var str = "// This is a comment\r";
        assert.equal(assembler.preprocessLine(str), "");
    });
});


describe("Reading a file", function() {
    it('reads the file', function() {
        var lines = assembler.readFile('../add/Add.asm');
        var first = "// This file is part of www.nand2tetris.org\r"
        assert.equal(lines.length, 13);
        assert.equal(lines[0], first);
    });
});


describe("A collection of lines", function() {
    it("preprocess", function() {
        var path = '../max/Max.asm';
        var lines = assembler.preprocessFile(path);
        assert.equal(lines[0], "");
        assert.equal(lines[7], "@R0");
        assert.equal(lines[8], "D=M");
        
    });
});
