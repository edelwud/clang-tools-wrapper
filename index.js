const { ClangFormat, options, environment } = require('./lib')

const { join } = require('path')
const fs = require('fs')

const filedir = join(process.cwd(), 'tests')
const filepath = join(filedir, 'sample.cpp')
const content = fs.readFileSync(filepath)

const editorConfig = options.generateEditorConfig(filepath, 0, 'LLVM', 'Google')
const execConfig = options.generateExecConfig(content, filedir)

const clangFormat = new ClangFormat(environment)

console.log(clangFormat.format(editorConfig, execConfig))
