# Clang Tools Wrapper

## Installation

`npm i clang-tools-wrapper`

## Description

Wrapper `clang-tools-extra` package for JavaScript

### Clang Format

Utility for formatting C/C++, JavaScript, TypeScript code

| Platform | Architecture | Status        |
| -------- | :----------: | ------------- |
| Windows  |     x32      | **Completed** |
| Windows  |     x64      | **Completed** |
| Linux    |     x32      | **Completed** |
| Linux    |     x64      | **Completed** |
| MacOs    |     x32      | **Completed** |
| MacOs    |     x64      | **Completed** |

### Clang Query

Utility for inspecting the Clang AST and assist in the construction of AST Matcher expressions.

| Platform | Architecture | Status        |
| -------- | :----------: | ------------- |
| Windows  |     x32      | _In progress_ |
| Windows  |     x64      | _In progress_ |
| Linux    |     x32      | _In progress_ |
| Linux    |     x64      | _In progress_ |
| MacOs    |     x32      | _In progress_ |
| MacOs    |     x64      | _In progress_ |

### Clang Tidy

Utility for static analysis of source code and recognition of program bottlenecks

| Platform | Architecture | Status        |
| -------- | :----------: | ------------- |
| Windows  |     x32      | _In progress_ |
| Windows  |     x64      | _In progress_ |
| Linux    |     x32      | _In progress_ |
| Linux    |     x64      | _In progress_ |
| MacOs    |     x32      | _In progress_ |
| MacOs    |     x64      | _In progress_ |

## Usage

Examples of usage `clang-tools-wrapper` library

### Clang Format

```javascript
const { ClangFormat, options, environment } = require('clang-tools-wrapper')

const { join } = require('path')
const fs = require('fs')

const filedir = join(process.cwd(), 'tests')
const filepath = join(filedir, 'sample.cpp')
const content = fs.readFileSync(filepath)

const editorConfig = options.generateEditorConfig(filepath, 0, 'LLVM', 'Google')
const execConfig = options.generateExecConfig(content, filedir)

const clangFormat = new ClangFormat(environment)

console.log(clangFormat.format(editorConfig, execConfig))
```
