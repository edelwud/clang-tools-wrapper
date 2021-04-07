# Clang Tools Wrapper

## Installation

`npm i @edelwud/clang-tools-wrapper`

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
const { ClangFormat, ClangFormatConfig } = require('clang-tools-wrapper')

const { join } = require('path')
const fs = require('fs')

const filedir = join(process.cwd(), 'path', 'to', 'file')
const filepath = join(filedir, 'file.cpp')
const content = fs.readFileSync(filepath)

const clangFormat = new ClangFormat()
const config = new ClangFormatConfig({
  style: 'LLVM',
  cursor: 12,
  input: content,
  cwd: filedir,
  assumeFilename: filepath,
})

console.log(clangFormat.format(config))
```
