import unittest, os, sys
sys.path.append(os.path.abspath('../JackCompiler2/jackCompiler2'))
from JackCompiler import JackCompiler
import unittest


def read_program(source):
    with open(source, 'r') as myfile:
        data=myfile.read()
    return  data

def remove_whitespace(str):
    return str.replace(" ", "").replace("\n", "")


class TestCompileVarDec(unittest.TestCase):
    def test_single_var_dec(self):
        prog = "field int x;";
        expected = """
<classVarDec>
  <keyword> field </keyword>
  <keyword> int </keyword>
  <identifier> x </identifier>
  <symbol> ; </symbol>
</classVarDec>
"""
        actual = JackCompiler(prog).compile_class_var_dec()
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
        
    def test_class_var_decs(self):
        prog = "field int x, y;";
        expected = """
<classVarDec>
  <keyword> field </keyword>
  <keyword> int </keyword>
  <identifier> x </identifier>
  <symbol> , </symbol>
  <identifier> y </identifier>
  <symbol> ; </symbol>
</classVarDec>
"""
        actual = JackCompiler(prog).compile_class_var_dec()
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

class TestCompileClass(unittest.TestCase):
    def test_simple_class(self):
        prog = read_program('./test/support/simpleClass.jack')
        actual = JackCompiler(prog).compile_class()
        expected = read_program('./test/support/simpleClass.xml')
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

    def test_multiple_var_decs(self):
        prog = read_program('./test/support/multipleVarDecs.jack')
        actual = JackCompiler(prog).compile_class()
        expected = read_program('./test/support/multipleVarDecs.xml')
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

    def test_one_var_decs(self):
        prog = read_program('./test/support/oneVarDecs.jack')
        actual = JackCompiler(prog).compile_class()
        expected = read_program('./test/support/oneVarDecs.xml')
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))        


if __name__ == '__main__':
    unittest.main()
