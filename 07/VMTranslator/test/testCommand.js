var assert = require('assert');
var CodeWriter = require('../CodeWriter');
var command = require('../command');

describe('Command Type', function() {

    it("C_ARITHMETIC", function() {
        var expected = "C_ARITHMETIC";
        var arithmeticCommands = ["add", "sub", "neg", "eq",
                                  "gt", "lt", "and", "or", "not"];
        arithmeticCommands.forEach(function( cmd ) {
            actual = command.commandType( cmd );
            assert.equal(actual, expected);
        });

    });
    it("C_PUSH", function() {
        var actual = command.commandType("push constant 10");
        var expected = "C_PUSH";
        assert.equal(actual, expected);

    });
    it("C_POP", function() {
        var actual = command.commandType("pop local 10");
        var expected = "C_POP";
        assert.equal(actual, expected);
    });
    // it("C_LABEL", function() {

    // });
    // it("C_GOTO", function() {

    // });
    // it("C_IF", function() {

    // });
    // it("C_FUNCTION", function() {

    // });
    // it("C_RETURN", function() {

    // });

});
describe('args', function() {

    describe('Push', function() {
           it("arg1 of a C_PUSH", function() {
            var expected = "constant";
            var actual = command.arg1("push constant 10");
            assert.equal(expected, actual);
        });
        it("arg2 of a C_PUSH", function() {
            var expected = "10";
            var actual = command.arg2("push constant 10");
            assert.equal(expected, actual);
        });
    });
    describe('Pop', function() {
        it("arg1 of a C_POP", function() {
            var expected = "local";
            var actual = command.arg1("pop local 0");
            assert.equal(expected, actual);
        });
        it("arg2 of a C_POP", function() {
            var expected = "0";
            var actual = command.arg2("pop local 0");
            assert.equal(expected, actual);
        });
    });
    describe('arithmetic', function() {
        it("arg1 of a add", function() {
            var expected = "add";
            var actual = command.arg1("add");
            assert.equal(expected, actual);
        });
    });
});