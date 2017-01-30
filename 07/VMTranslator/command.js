var command = {
    commandType: function( str ) {
        var arithmeticCommands = ["add", "sub", "neg", "eq",
                                  "gt", "lt", "and", "or", "not"];

        if (arithmeticCommands.indexOf(str) >= 0) {
            return "C_ARITHMETIC";
        } else {
            var first = str.split(" ")[0];
            if (first === "push") return "C_PUSH";
            else if (first === "pop") return "C_POP";
        }
    },
    arg1: function( str ) {
        // throw error y C_RETURN
        var type = this.commandType(str);
        if ( type === "C_RETURN") throw Error;
        else if (type === "C_ARITHMETIC") return str;
        else {
            return str.split(" ")[1];
        }
    },
    arg2: function( str ) {
        var type = this.commandType(str);
        if (!(type === "C_PUSH" || type === "C_POP" ||
              type === "C_FUNCTION" || type === "C_POP")) throw Error;
        else {
            return str.split(" ")[2];
        }
    }
};


module.exports = command;