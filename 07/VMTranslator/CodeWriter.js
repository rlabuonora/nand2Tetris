var command = require('./command');

function CodeWriter() {
    this.fileName = "";
    this.labelCount = {};
    this.segmentCodes = { "local": "LCL", "argument": "ARG",
                          "this": "THIS", "that": "THAT" };

    this.getLabel = function( str ) {

        var count = this.labelCount[str] === undefined ? 0
                : this.labelCount[str];
        this.labelCount[str] = count+1;
        return {aCommand: "@" + str + "_" +
                (count), label: "(" + str + "_" + (count) + ")" };
    };




    this.writeArithmetic = function( vmCommand ) {
        var arg1 = command.arg1( vmCommand);
        if (arg1 === "add" || arg1 === "sub") {
            return this.addOrSub( arg1 );
        }
        else if (arg1 === "and" || arg1 === "or" ) {
            return this.andOrOr( arg1 );
        }
        else if (arg1 === "lt" || arg1 === "gt" ) {
            return this.ltGt( arg1 );
        }
        else if (arg1 === "not") {
            return this.not();
        }
        else if (arg1 === "neg") {
            return this.neg();
        }
        else if (arg1 === "eq") {
            return this.eq();
        }
    };

    this.popStaticOrPointer = function( segment, offset ) {
        var base = ["@SP", "M=M-1",
                    "A=M", "D=M",
                    "@THAT", "M=D" ];
        if (segment === "static") {
            base[4] = "@"  + this.fileName + "." + offset;
        }
        else if ( segment === "pointer" && offset === "0") {
            base[4] = "@THIS";
        }
        return base;
    };


    this.popSegment = function(segment, offset) {
        if (segment === "temp") {
            var newOffset = 5 + parseInt(offset);
            var firstPart = ["@" + newOffset, "D=A"];
        } else {
            var segmentCode = this.segmentCodes[segment];
            var firstPart = ["@" + offset, "D=A", "@" + segmentCode, "D=D+M"];
        }
        var secondPart =  [ "@addr", "M=D",
                            "@SP", "M=M-1", "@SP",
                            "A=M", "D=M", "@addr",
                            "A=M", "M=D"];

        return firstPart.concat(secondPart);
    };

    this.pushConstant = function( constant) {
        return ["@" + constant, "D=A", "@SP", "A=M", "M=D", "@SP", "M=M+1"];
    };

    this.pushSegment = function( segment, offset) {

        var firstPart;
        if (segment === "temp") {
            firstPart = ["@" + (5+parseInt(offset))];

        }
        else if (segment == "static" ) {
            firstPart = ["@" + this.fileName + "." + offset];
        }
        else if (segment === "pointer" ) {
            if (offset === "1") {
                firstPart = ["@THAT"];
            } else if ( offset === "0" ) {
                firstPart = ["@THIS"];
            }

        }
        else {
            var segment = this.segmentCodes[segment];
            firstPart =  ["@" + offset, "D=A", "@" + segment, "A=D+M"]
        }
        var secondPart = ["D=M", "@SP", "A=M", "M=D", "@SP", "M=M+1"];
        return  firstPart.concat(secondPart);
    };

    this.writeAssembly = function( vmCommand ) {
        // translates a single command from
        // vm code to an array of assembler commands
        var result = ["// " + vmCommand];
        var type = command.commandType( vmCommand );
        if (type === "C_PUSH" || type === "C_POP") {
            result = result.concat(this.writePushPop( vmCommand ));
        }
        else if (type === "C_ARITHMETIC") {
            result = result.concat(this.writeArithmetic( vmCommand ));
        }
        return result;
    };

    this.writePushPop = function( vmCommand ) {
        var type = command.commandType( vmCommand );
        if (type === "C_PUSH") {
            var segment = command.arg1( vmCommand);
            if (segment === "constant") {
                var constant = command.arg2( vmCommand );
                return this.pushConstant( constant  );
            } else {
                var segment = command.arg1( vmCommand );
                var offset = command.arg2( vmCommand );
                return this.pushSegment(segment, offset);
            }
        }
        else if (type === "C_POP") {
            var segment = command.arg1( vmCommand);
            var offset = command.arg2( vmCommand );
            if (segment === "static" || segment === "pointer") {
                return this.popStaticOrPointer(segment, offset);
            } else {
                return this.popSegment( segment, offset );
            }
        }
    };
}

module.exports = CodeWriter;
