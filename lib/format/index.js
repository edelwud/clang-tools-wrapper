const { join } = require('path')
const { execSync } = require('child_process')

const Environment = require('../environment')
const Generator = require('../generator')
const { exists, editorFeatures } = require('./options')
const { parseJson } = require('./parser')

class ClangFormat {
  constructor() {
    this.env = new Environment()
    this.generator = new Generator(this.env.resolve())
    this.toolname = this.generator.filename('format')
    this.toolpath = join(this.env.binDir, this.toolname)
  }

  format(content, clangFormatConfig) {
    const { exec, editor } = clangFormatConfig.generate()
    const result = this.exec(editor, { ...exec, input: content })
    if (exists(editor, editorFeatures.cursor(''))) {
      const { length, command } = parseJson(result)
      return {
        command,
        result: result.substr(length),
      }
    }

    return {
      command: null,
      result,
    }
  }

  exec(editorConfig, execConfig) {
    const stdout = execSync(`"${this.toolpath}" ${editorConfig}`, execConfig)
    return stdout.toString()
  }
}

module.exports = ClangFormat
