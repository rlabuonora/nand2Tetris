// push constant 10
@10
D=A
@SP
A=M
M=D
@SP
M=M+1
// end push constant 10
// pop local 0
@0
D=A
@LCL
D=D+M

@addr
M=D // addr = LCL+0
@SP
M=M-1
@SP
A=M
D=M // pop into D
@addr
A=M
M=D
// end of pop local 0
// push constant 21
@21
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 22
@22
D=A
@SP
A=M
M=D
@SP
M=M+1




// pop argument 2
@2
D=A
@ARG
D=D+M
@addr
M=D  // save addr

@SP
M=M-1
@SP
A=M
D=M // pop into D

@addr
A=M
M=D
// end of pop argument 2
// pop argument 1
@1
D=A
@ARG
D=D+M
@addr
M=D  // save addr

@SP
M=M-1
@SP
A=M
D=M // pop into D

@addr
A=M
M=D
// end of pop argument 1

// push constant 36
@36
D=A
@SP
A=M
M=D
@SP
M=M+1


// pop this 6
@6
D=A
@THIS
D=D+M
@addr
M=D

@SP
M=M-1
@SP
A=M
D=M
@addr
A=M
M=D

// end of pop this 6

// push constant 42
@42
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 45
@45
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop that 5

@5
D=A
@THAT
D=D+M
@addr
M=D

@SP
M=M-1
@SP
A=M
D=M  // pop into d

@addr
A=M
M=D

// pop that 2

@2
D=A
@THAT
D=D+M
@addr
M=D

@SP
M=M-1
@SP
A=M
D=M

@addr
A=M
M=D

// push constant 510
@510
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop temp 6
@11
D=A

@addr
M=D
@SP
M=M-1
@SP
A=M
D=M // pop into d

@addr
A=M
M=D

// push local 0
@0
D=A
@LCL
A=D+M
D=M
@SP
A=M
M=D
@SP
M=M+1

// push that 5
@5
D=A
@THAT
A=D+M
D=M
@SP
A=M
M=D
@SP
M=M+1
// add
@SP
M=M-1
@SP
A=M
D=M // pop into D

@SP
M=M-1
A=M
D=D+M
@SP
A=M
M=D
@SP
M=M+1
// push argument 1
@1
D=A
@ARG
A=D+M
D=M
@SP
A=M
M=D
@SP
M=M+1




// sub
@SP
M=M-1
@SP
A=M
D=-M // pop into D

@SP
M=M-1
A=M
D=D+M
@SP
A=M
M=D
@SP
M=M+1
// end sub


// push this 6
@6
D=A
@THIS
A=D+M
D=M
@SP
A=M
M=D
@SP
M=M+1

// push this 6
@6
D=A
@THIS
A=D+M
D=M
@SP
A=M
M=D
@SP
M=M+1


// add
@SP
M=M-1
@SP
A=M
D=M // pop into D

@SP
M=M-1
A=M
D=D+M
@SP
A=M
M=D
@SP
M=M+1

// sub
@SP
M=M-1
@SP
A=M
D=-M // pop into D

@SP
M=M-1
A=M
D=D+M
@SP
A=M
M=D
@SP
M=M+1
// end sub

// push temp 6
@11
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
@SP
M=M-1
@SP
A=M
D=M // pop into D

@SP
M=M-1
A=M
D=D+M
@SP
A=M
M=D
@SP
M=M+1

// neg

@SP
M=M-1
A=M
D=-M

@SP
A=M
M=D

@SP
M=M+1
// neg
@SP
M=M-1
A=M
D=-M

@SP
A=M
M=D

@SP
M=M+1
// push constant 472
@472
D=A
@SP
A=M
M=D
@SP
M=M+1
// eq
