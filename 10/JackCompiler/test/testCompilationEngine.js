var assert = require('assert');
const execSync = require('child_process').execSync;
var chai = require('chai');
chai.use(require('chai-string'));
var fs = require('fs');
var JackTokenizer = require('../JackTokenizer');
var CompilationEngine = require('../CompilationEngine');
var chai = require('chai');
chai.use(require('chai-string'));

describe('statement', function() {

    var tokenizer = new JackTokenizer();
    var engine = new CompilationEngine();
    
    xit('Main.jack', function() {
        var prog = fs.readFileSync('../ExpressionlessSquare/Main.jack', 'utf-8');
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileClass();
        var expected = fs.readFileSync('../ExpressionlessSquare/Main.xml', 'utf-8');
        chai.assert.equalIgnoreSpaces(actual, expected);

    });

    xit('ArrayTest', function() {
        var prog = fs.readFileSync('../ArrayTest/Main.jack', 'utf-8');
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileClass();
        var expected = fs.readFileSync('../ArrayTest/Main.xml', 'utf-8');
        chai.assert.equalIgnoreSpaces(actual, expected);

    });

    it('Square.jack', function() {
        var prog = fs.readFileSync('../ExpressionlessSquare/Square.jack', 'utf-8');
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileClass();
        var expected = fs.readFileSync('../ExpressionlessSquare/Square.xml', 'utf-8');
        chai.assert.equalIgnoreSpaces(actual, expected);

    });

    describe('compiling classes', function() {
        it('With multiple subs', function() {
            var prog = fs.readFileSync('./test/support/simpleClass.jack', 'utf-8');
            engine.tokens = tokenizer.tokenize(prog);
            var actual = engine.compileClass();
            var expected = fs.readFileSync('./test/support/simpleClass.xml', 'utf-8');
            chai.assert.equalIgnoreSpaces(actual, expected);

        });

        it('multiple var decs', function() {
            var prog = "class Main { \n" +
                    "  field int x, y;\n" +
                    " field Square square;\n" +
                    " function void main() {\n" +
                    " return; } \n" +
                    "};";

            engine.tokens = tokenizer.tokenize(prog);
            var actual = engine.compileClass();


            var expected = "<class><keyword> class </keyword>\n" +
                    "<identifier> Main </identifier>\n" +
                    " <symbol> { </symbol>\n" +
                    "<classVarDec>\n" +
                    "<keyword> field </keyword>\n" +
                    "<keyword> int </keyword>\n" +
                    "<identifier> x </identifier>\n" +
                    "<symbol> , </symbol>\n" +
                    "<identifier> y </identifier>\n" +
                    "<symbol> ; </symbol>\n" +
                    "</classVarDec>\n" +
                    "<classVarDec>\n" +
                    "<keyword> field </keyword>\n" +
                    "<identifier> Square </identifier>\n" +
                    "<identifier> square </identifier>\n" +
                    "<symbol> ; </symbol>\n" +
                    "</classVarDec>\n" +
                    "<subroutineDec>\n" +
                    "<keyword> function </keyword>\n" +
                    "<keyword> void </keyword>\n" +
                    "<identifier> main </identifier>\n" +
                    "<symbol> ( </symbol>\n" +
                    "<parameterList>\n" +
                    "</parameterList>\n" +
                    "<symbol> ) </symbol>\n" +
                    "<subroutineBody>\n" +
                    "<symbol> { </symbol>\n" +
                    "<statements>\n" +
                    "<returnStatement>\n" +
                    "<keyword> return </keyword>\n" +
                    "<symbol> ; </symbol>\n" +
                    "</returnStatement>\n" +
                    "</statements>\n" +
                    "<symbol> } </symbol>\n" +
                    "</subroutineBody>\n" +
                    "</subroutineDec>\n" +
                    "<symbol> } </symbol>\n" +
                    "</class>\n";
            chai.assert.equalIgnoreSpaces(actual, expected);
        });

        it('one var dec', function() {
            var prog = "class Main { field int x, y; field Square square; static int z; function void main() { return; } };";
            var expected = "<class><keyword> class </keyword>\n" +
                    "<identifier> Main </identifier>\n" +
                    " <symbol> { </symbol>\n" +
                    "<classVarDec>\n" +
                    "<keyword> field </keyword>\n" +
                    "<keyword> int </keyword>\n" +
                    "<identifier> x </identifier>\n" +
                    "<symbol> , </symbol>\n" +
                    "<identifier> y </identifier>\n" +
                    "<symbol> ; </symbol>\n" +
                    "</classVarDec>\n" +
                    "<classVarDec>\n" +
                    "<keyword> field </keyword>\n" +
                    "<identifier> Square </identifier>\n" +
                    "<identifier> square </identifier>\n" +
                    "<symbol> ; </symbol>\n" +
                    "</classVarDec>\n" +
                    "<classVarDec>\n" +
                    "<keyword> static </keyword>\n" +
                    "<identifier> int </identifier>\n" +
                    "<identifier> z </identifier>\n" +
                    "<symbol> ; </symbol>\n" +
                    "</classVarDec>\n" +
                    "<subroutineDec>\n" +
                    "<keyword> function </keyword>\n" +
                    "<keyword> void </keyword>\n" +
                    "<identifier> main </identifier>\n" +
                    "<symbol> ( </symbol>\n" +
                    "<parameterList>\n" +
                    "</parameterList>\n" +
                    "<symbol> ) </symbol>\n" +
                    "<subroutineBody>\n" +
                    "<symbol> { </symbol>\n" +
                    "<statements>\n" +
                    "<returnStatement>\n" +
                    "<keyword> return </keyword>\n" +
                    "<symbol> ; </symbol>\n" +
                    "</returnStatement>\n" +
                    "</statements>\n" +
                    "<symbol> } </symbol>\n" +
                    "</subroutineBody>\n" +
                    "</subroutineDec>\n" +
                    "<symbol> } </symbol>\n" +
                    "</class>\n";


        });
    });
    describe('let', function() {
        it('simple', function() {
            engine.tokens = tokenizer.tokenize('let x = x;');
            var actual = engine.compileLet();
            var expected =
                    "<letStatement>\n" +
                    "  <keyword> let </keyword>\n" +
                    "  <identifier> x </identifier>\n" +
                    "  <symbol> = </symbol>\n" +
                    "  <expression>\n" +
                    "    <term>\n" +
                    "      <identifier> x </identifier>\n" +
                    "    </term>\n" +
                    "  </expression>\n" +
                    "  <symbol> ; </symbol>\n" +
                    "</letStatement>";
            chai.assert.equalIgnoreSpaces(actual, expected );
        });
        xit('with expression', function() {
            engine.tokens = tokenizer.tokenize('let length = Keyboard.readInt("HOW MANY NUMBERS? "');
            var actual = engine.compileLet();
            
            var expected =
                    "<letStatement>\n" + 
                    "<keyword> let </keyword>\n" + 
                    "<identifier> length </identifier>\n" + 
                    "<symbol> = </symbol>\n" + 
                    "<expression>\n" + 
                    "<term>\n" + 
                    "<identifier> Keyboard </identifier>\n" + 
                    "<symbol> . </symbol>\n" + 
                    "<identifier> readInt </identifier>\n" + 
                    "<symbol> ( </symbol>\n" + 
                    "<expressionList>\n" + 
                    "<expression>\n" + 
                    "<term>\n" + 
                    "<stringConstant> HOW MANY NUMBERS?  </stringConstant>\n" + 
                    "</term>\n" +
                    "</expression>\n" +
                    "</expressionList>\n"
                    "<symbol> ) </symbol>\n" + 
                    "</term>\n" + 
                    "</expression>\n" +
                    "<symbol> ; </symbol>\n" + 
                    "</letStatement>\n"
            chai.assert.equalIgnoreSpaces(actual, expected );
        });
    });

    it('if', function() {
        var prog =  "if (key) { let exit = exit;}";
        engine.tokens = tokenizer.tokenize( prog );
        var actual = engine.compileIf();
        var expected =
                "<ifStatement>\n" +
                "  <keyword> if </keyword>\n" +
                "  <symbol> ( </symbol>\n" +
                "  <expression>\n" +
                "    <term>\n" +
                "      <identifier> key </identifier>\n" +
                "    </term>\n" +
                "  </expression>\n" +
                "  <symbol> ) </symbol>\n" +
                "  <symbol> { </symbol>\n" +
                "  <statements>\n" +
                "    <letStatement>\n" +
                "      <keyword> let </keyword>\n" +
                "      <identifier> exit </identifier>\n" +
                "      <symbol> = </symbol>\n" +
                "      <expression>\n" +
                "        <term>\n" +
                "          <identifier> exit </identifier>\n" +
                "        </term>\n" +
                "      </expression>\n" +
                "      <symbol> ; </symbol>\n" +
                "    </letStatement>\n" +
                "  </statements>\n" +
                "  <symbol> } </symbol>\n" +
                "</ifStatement>";
        chai.assert.equalIgnoreSpaces(actual, expected);
    });

    describe('return', function() {
        it('without expresion', function() {
            var prog = "return;"
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileReturn();
            var expected =
                    "<returnStatement>\n" +
                    "  <keyword> return </keyword>\n" +
                    "  <symbol> ; </symbol>\n" +
                    "</returnStatement>\n";
            chai.assert.equalIgnoreSpaces(actual, expected);
        });
        it('with expresion', function() {
            var prog = "return x;"

            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileReturn();
            var expected =
                    "<returnStatement>" +
                    "  <keyword> return </keyword>\n" +
                    "  <expression>\n" +
                    "    <term>\n"  +
                    "      <identifier> x </identifier>\n" +
                    "    </term>\n" +
                    "  </expression>\n" +
                    "  <symbol> ; </symbol>\n" +
                    "</returnStatement>\n"
            engine.tokens = tokenizer.tokenize( prog );
            chai.assert.equalIgnoreSpaces(actual, expected);
        });
    });
    it('while', function() {

        var prog =
                "while (key) {\n" +
                "    let key = key;\n" +
                "    do moveSquare();\n" +
                "}";
        engine.tokens = tokenizer.tokenize( prog );
        var actual = engine.compileWhile();
        var expected =
                "<whileStatement>\n" +
                "  <keyword> while </keyword>\n" +
                "  <symbol> ( </symbol>\n" +
                "  <expression>\n" +
                "    <term>\n" +
                "      <identifier> key </identifier>\n" +
                "    </term>\n" +
                "  </expression>\n" +
                "  <symbol> ) </symbol>\n" +
                "  <symbol> { </symbol>\n" +
                "  <statements>\n" +
                "    <letStatement>\n" +
                "      <keyword> let </keyword>\n" +
                "      <identifier> key </identifier>\n" +
                "      <symbol> = </symbol>\n" +
                "      <expression>\n" +
                "        <term>\n" +
                "          <identifier> key </identifier>\n" +
                "        </term>\n" +
                "      </expression>\n" +
                "      <symbol> ; </symbol>\n" +
                "    </letStatement>\n" +
                "    <doStatement>\n" +
                "      <keyword> do </keyword>\n" +
                "      <identifier> moveSquare </identifier>\n" +
                "      <symbol> ( </symbol>\n" +
                "      <expressionList>\n" +
                "      </expressionList>\n" +
                "      <symbol> ) </symbol>\n" +
                "      <symbol> ; </symbol>\n" +
                "    </doStatement>\n" +
                "  </statements>\n" +
                "  <symbol> } </symbol>\n" +
                "</whileStatement>"
        chai.assert.equalIgnoreSpaces(actual, expected);
    });
    it('while with only one statement', function() {

        var prog =
                "while (key) {\n" +
                "    let key = key;\n" +
                "}";
        engine.tokens = tokenizer.tokenize( prog );
        var actual = engine.compileWhile();
        var expected =
                "<whileStatement>\n" +
                "  <keyword> while </keyword>\n" +
                "  <symbol> ( </symbol>\n" +
                "  <expression>\n" +
                "    <term>\n" +
                "      <identifier> key </identifier>\n" +
                "    </term>\n" +
                "  </expression>\n" +
                "  <symbol> ) </symbol>\n" +
                "  <symbol> { </symbol>\n" +
                "  <statements>\n" +
                "    <letStatement>\n" +
                "      <keyword> let </keyword>\n" +
                "      <identifier> key </identifier>\n" +
                "      <symbol> = </symbol>\n" +
                "      <expression>\n" +
                "        <term>\n" +
                "          <identifier> key </identifier>\n" +
                "        </term>\n" +
                "      </expression>\n" +
                "      <symbol> ; </symbol>\n" +
                "    </letStatement>\n" +
                "  </statements>\n" +
                "  <symbol> } </symbol>\n" +
                "</whileStatement>"
        chai.assert.equalIgnoreSpaces(actual, expected);
    });
    it('statements', function() {

        engine.tokens = tokenizer.tokenize('let x = x;\n do move();');
        var actual = engine.compileStatements();
        var expected =
                "<statements>\n" +
                "  <letStatement>\n" +
                "    <keyword> let </keyword>\n" +
                "    <identifier> x </identifier>\n" +
                "    <symbol> = </symbol>\n" +
                "      <expression>\n" +
                "        <term>\n" +
                "          <identifier> x </identifier>\n" +
                "        </term>\n" +
                "      </expression>\n" +
                "    <symbol> ; </symbol>" +
                "  </letStatement>" +
                "  <doStatement>\n" +
                "    <keyword> do </keyword>\n" +
                "    <identifier> move </identifier>\n" +
                "    <symbol> ( </symbol>\n" +
                "    <expressionList>\n" +
                "    </expressionList>\n" +
                "    <symbol> ) </symbol>\n" +
                "    <symbol> ; </symbol>\n" +
                "  </doStatement>\n" +
                "</statements>";
        chai.assert.equalIgnoreSpaces(actual, expected );

    });
    it('statements', function() {

        engine.tokens = tokenizer.tokenize('let x = x;\n do move(); return;');
        var actual = engine.compileStatements();
        var expected =
                "<statements>\n" +
                "  <letStatement>\n" +
                "    <keyword> let </keyword>\n" +
                "    <identifier> x </identifier>\n" +
                "    <symbol> = </symbol>\n" +
                "      <expression>\n" +
                "        <term>\n" +
                "          <identifier> x </identifier>\n" +
                "        </term>\n" +
                "      </expression>\n" +
                "    <symbol> ; </symbol>" +
                "  </letStatement>" +
                "  <doStatement>\n" +
                "    <keyword> do </keyword>\n" +
                "    <identifier> move </identifier>\n" +
                "    <symbol> ( </symbol>\n" +
                "    <expressionList>\n" +
                "    </expressionList>\n" +
                "    <symbol> ) </symbol>\n" +
                "    <symbol> ; </symbol>\n" +
                "  </doStatement>\n" +
                "  <returnStatement>\n" +
                "    <keyword> return </keyword>\n" +
                "    <symbol> ; </symbol>\n" +
                "  </returnStatement>\n" +
                "</statements>";
        chai.assert.equalIgnoreSpaces(actual, expected );

    });

    describe('expression list', function() {
        it('one expression', function() {
            var prog = "x)";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileExpressionList();
            var expected =
                    "<expressionList>\n" +
                    "   <expression>\n" +
                    "     <term>\n" +
                    "       <identifier> x </identifier>\n" +
                    "     </term>\n" +
                    "   </expression>" +
                    "</expressionList>";
            assert.equal(engine.tokens.length, 1);
            chai.assert.equalIgnoreSpaces(actual, expected);
        });
        it('empty expression', function() {

            var prog = ")";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileExpressionList();
            var expected =
                    "<expressionList>\n" +
                    "</expressionList>";

            assert.equal(engine.tokens.length, 1);
            chai.assert.equalIgnoreSpaces(actual, expected);
        });
        it('two expressions', function() {

            var prog = "x, y)";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileExpressionList();
            var expected =
                    "<expressionList>\n" +
                    "   <expression>\n" +
                    "     <term>\n" +
                    "       <identifier> x </identifier>\n" +
                    "     </term>\n" +
                    "   </expression>\n" +
                    "   <symbol> , </symbol>\n" +
                    "   <expression>\n" +
                    "     <term>\n" +
                    "       <identifier> y </identifier>\n" +
                    "     </term>\n" +
                    "   </expression>" +
                    "</expressionList>";
            assert.equal(engine.tokens.length, 1);
            chai.assert.equalIgnoreSpaces(actual, expected);

        });
        it('expressions with keywords', function() {

            var prog = ");";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileExpressionList();
            var expected =
                    "<expressionList>\n" +
                    "</expressionList>";
            chai.assert.equalIgnoreSpaces(actual, expected);
            assert.equal(engine.tokens.length, 2);
        });
    });
    describe('subroutine declaration', function() {

        describe('subroutine body', function() {
            it('local variable declaration', function() {

                var prog = "var int x;";
                engine.tokens = tokenizer.tokenize( prog );
                var actual = engine.compileLocalVarDec();

                var expected =   "    <varDec>\n" +
                        "<keyword> var </keyword>\n" +
                        "<keyword> int </keyword>\n" +
                        "<identifier> x </identifier>\n" +
                        "<symbol> ; </symbol>\n" +
                        "</varDec>\n";
                chai.assert.equalIgnoreSpaces(actual, expected);
            });

            it('local variable declaration', function() {
                var prog = "var int x, y, z;";
                engine.tokens = tokenizer.tokenize( prog );
                var actual = engine.compileLocalVarDec();
                var expected =   "    <varDec>\n" +
                        "<keyword> var </keyword>\n" +
                        "<keyword> int </keyword>\n" +
                        "<identifier> x </identifier>\n" +
                        "<symbol> , </symbol>\n" +
                        "<identifier> y </identifier>\n" +
                        "<symbol> , </symbol>\n" +
                        "<identifier> z </identifier>\n" +
                        "<symbol> ; </symbol>\n" +
                        "</varDec>\n";
                chai.assert.equalIgnoreSpaces(actual, expected);

            });
            it('with local variables', function() {
                var prog =   "{\n" +
                        "  var int x;\n" +
                        "  return;\n" +
                        "}\n" ;
                engine.tokens = tokenizer.tokenize( prog );
                var actual = engine.compileSubroutineBody();
                var expected =
                        "<subroutineBody>\n" +
                        "  <symbol> { </symbol>\n" +
                        "  <varDec>\n" +
                        "    <keyword> var </keyword>\n" +
                        "    <keyword> int </keyword>\n" +
                        "    <identifier> x </identifier>\n" +
                        "    <symbol> ; </symbol>\n" +
                        "  </varDec>\n" +
                        "  <statements>\n" +
                        "   <returnStatement>\n" +
                        "     <keyword> return </keyword>\n" +
                        "     <symbol> ; </symbol>\n" +
                        "    </returnStatement>\n" +
                        "  </statements>\n" +
                        "  <symbol> } </symbol>\n" +
                        "</subroutineBody>\n";
                chai.assert.equalIgnoreSpaces(actual, expected);
            });
            it('no local variables', function() {
                var prog =   "{\n" +
                        "  do Memory.deAlloc(x);\n" +
                        "  return;\n" +
                        "}\n" ;
                engine.tokens = tokenizer.tokenize( prog );
                var actual = engine.compileSubroutineBody();
                var expected =
                        "<subroutineBody>\n" +
                        "<symbol> { </symbol>\n" +
                        "<statements>\n" +
                        "<doStatement>\n" +
                        "<keyword> do </keyword>\n" +
                        "<identifier> Memory </identifier>\n" +
                        "<symbol> . </symbol>\n" +
                        "<identifier> deAlloc </identifier>\n" +
                        "<symbol> ( </symbol>\n" +
                        "<expressionList>\n" +
                        "<expression>\n" +
                        "<term>\n" +
                        "<identifier> x </identifier>\n" +
                        "</term>\n" +
                        "</expression>\n" +
                        "</expressionList>\n" +
                        "<symbol> ) </symbol>\n" +
                        "<symbol> ; </symbol>\n" +
                        "</doStatement>\n" +
                        "<returnStatement>\n" +
                        "<keyword> return </keyword>\n" +
                        "<symbol> ; </symbol>\n" +
                        "</returnStatement>\n" +
                        "</statements>\n" +
                        "<symbol> } </symbol>\n" +
                        "</subroutineBody>\n";
                chai.assert.equalIgnoreSpaces(actual, expected);
            });
        });


        it('with no args', function() {
            var prog = "method void dispose() {\n" +
                    "  do Memory.deAlloc(x);\n" +
                    "  return;\n" +
                    "}";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileSubroutineDec();
            var expected =    "<subroutineDec>\n" +
                    "<keyword> method </keyword>\n" +
                    "<keyword> void </keyword>\n" +
                    "<identifier> dispose </identifier>\n" +
                    "<symbol> ( </symbol>\n" +
                    "<parameterList>\n" +
                    "</parameterList>\n" +
                    "<symbol> ) </symbol>\n" +
                    "<subroutineBody>\n" +
                    "<symbol> { </symbol>\n" +
                    "<statements>\n" +
                    "<doStatement>\n" +
                    "<keyword> do </keyword>\n" +
                    "<identifier> Memory </identifier>\n" +
                    "<symbol> . </symbol>\n" +
                    "<identifier> deAlloc </identifier>\n" +
                    "<symbol> ( </symbol>\n" +
                    "<expressionList>\n" +
                    "<expression>\n" +
                    "<term>\n" +
                    "<identifier> x </identifier>\n" +
                    "</term>\n" +
                    "</expression>\n" +
                    "</expressionList>\n" +
                    "<symbol> ) </symbol>\n" +
                    "<symbol> ; </symbol>\n" +
                    "</doStatement>\n" +
                    "<returnStatement>\n" +
                    "<keyword> return </keyword>\n" +
                    "<symbol> ; </symbol>\n" +
                    "</returnStatement>\n" +
                    "</statements>\n" +
                    "<symbol> } </symbol>\n" +
                    "</subroutineBody>\n" +
                    "</subroutineDec>\n";
            chai.assert.equalIgnoreSpaces(actual, expected);
        });
    });


    describe('parameter list', function() {
        it('empty', function() {
            var expected = "<parameterList>\n" +
                    "</parameterList>\n";
            engine.tokens = [];
            var actual = engine.compileParameterList( );
            chai.assert.equalIgnoreSpaces(actual, expected);
        });
        it('one param', function() {
            var expected = "<parameterList>\n" +
                    "<keyword> int </keyword>\n" +
                    "<identifier> Ax </identifier>\n" +
                    "</parameterList>\n";
            var prog = "int Ax";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileParameterList( prog );
            chai.assert.equalIgnoreSpaces(actual, expected);
        });
        it('3 params', function() {
            var prog = "int Ax, int Ay, int Asize";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileParameterList( );
            var expected = "<parameterList>\n" +
                    "<keyword> int </keyword>\n" +
                    "<identifier> Ax </identifier>\n" +
                    "<symbol> , </symbol>\n" +
                    "<keyword> int </keyword>\n" +
                    "<identifier> Ay </identifier>\n" +
                    "<symbol> , </symbol>\n" +
                    "<keyword> int </keyword>\n" +
                    "<identifier> Asize </identifier>\n" +
                    "</parameterList>\n";
            chai.assert.equalIgnoreSpaces(actual, expected);
        });
    });
    describe('class var declarations', function() {
        it('two vars ', function() {
            var prog = "field int x, y;";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileClassVarDec();
            var expected =
                    "<classVarDec>\n" +
                    "  <keyword> field </keyword>\n" +
                    "  <keyword> int </keyword>\n" +
                    "  <identifier> x </identifier>\n" +
                    "  <symbol> , </symbol>\n" +
                    "  <identifier> y </identifier>\n" +
                    "  <symbol> ; </symbol>\n" +
                    "</classVarDec>\n";
            chai.assert.equalIgnoreSpaces(actual, expected);
        });

        it('a single var', function() {
            var prog = "field int x;";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileClassVarDec()
            var expected =
                    "<classVarDec>\n" +
                    "  <keyword> field </keyword>\n" +
                    "  <keyword> int </keyword>\n" +
                    "  <identifier> x </identifier>\n" +
                    "  <symbol> ; </symbol>\n" +
                    "</classVarDec>\n";
            chai.assert.equalIgnoreSpaces(actual, expected);
        });
    });

    describe('do statements', function() {
        it('do', function() {
            var prog = "do moveSquare();";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileDo();
            var expected =  "<doStatement>\n" +
                    "  <keyword> do </keyword>\n" +
                    "  <identifier> moveSquare </identifier>\n" +
                    "  <symbol> ( </symbol>\n" +
                    "  <expressionList>\n" +
                    "  </expressionList>\n" +
                    "  <symbol> ) </symbol>\n" +
                    "  <symbol> ; </symbol>\n" +
                    "</doStatement>";
            chai.assert.equalIgnoreSpaces(actual, expected);

        });
        it('do square.move();', function() {
            var prog = "do square.move();";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileDo();
            var expected =  "<doStatement>\n" +
                    "  <keyword> do </keyword>\n" +
                    "  <identifier> square </identifier>\n" +
                    "  <symbol> . </symbol>\n" +
                    "  <identifier> move </identifier>\n" +
                    "  <symbol> ( </symbol>\n" +
                    "  <expressionList>\n" +
                    "  </expressionList>\n" +
                    "  <symbol> ) </symbol>\n" +
                    "  <symbol> ; </symbol>\n" +
                    "</doStatement>";
            chai.assert.equalIgnoreSpaces(actual, expected);

        });
        it('do with one arg', function() {
            var prog = "do Memory.deAlloc(x);";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileDo();
            var expected =
                    "<doStatement>\n" +
                    "<keyword> do </keyword>\n" +
                    "<identifier> Memory </identifier>\n" +
                    "<symbol> . </symbol>\n" +
                    "<identifier> deAlloc </identifier>\n" +
                    "<symbol> ( </symbol>\n" +
                    "<expressionList>\n" +
                    "<expression>\n" +
                    "<term>\n" +
                    "<identifier> x </identifier>\n" +
                    "</term>\n" +
                    "</expression>\n" +
                    "</expressionList>\n" +
                    "<symbol> ) </symbol>\n" +
                    "<symbol> ; </symbol>\n" +
                    "</doStatement>";
            chai.assert.equalIgnoreSpaces(actual, expected);
        });

        it('subrountine calls', function() {
            var prog = "Memory.deAlloc(x);";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileSubroutineCall();
            var expected = "    <identifier> Memory </identifier>\n" +
                    "<symbol> . </symbol>\n" +
                    "<identifier> deAlloc </identifier>\n" +
                    "<symbol> ( </symbol>\n" +
                    "<expressionList>\n" +
                    "<expression>\n" +
                    "<term>\n" +
                    "<identifier> x </identifier>\n" +
                    "</term>\n" +
                    "</expression>\n" +
                    "</expressionList>\n" +
                    "<symbol> ) </symbol>";
            chai.assert.equalIgnoreSpaces(actual, expected);
            assert.equal(engine.tokens.length, 1);
        });

        it('do with two expressions', function() {
            var prog = "do Memory.deAlloc(x, y);";
            engine.tokens = tokenizer.tokenize( prog );
            var actual = engine.compileDo();
            var expected =
                    "<doStatement>\n" +
                    "<keyword> do </keyword>\n" +
                    "<identifier> Memory </identifier>\n" +
                    "<symbol> . </symbol>\n" +
                    "<identifier> deAlloc </identifier>\n" +
                    "<symbol> ( </symbol>\n" +
                    "<expressionList>\n" +
                    "<expression>\n" +
                    "<term>\n" +
                    "<identifier> x </identifier>\n" +
                    "</term>\n" +
                    "</expression>\n" +
                    "<symbol> , </symbol>\n" +
                    "<expression>\n" +
                    "<term>\n" +
                    "<identifier> y </identifier>\n" +
                    "</term>\n" +
                    "</expression>\n" +
                    "</expressionList>\n" +
                    "<symbol> ) </symbol>\n" +
                    "<symbol> ; </symbol>\n" +
                    "</doStatement>";
            chai.assert.equalIgnoreSpaces(actual, expected);
        });
    });
});