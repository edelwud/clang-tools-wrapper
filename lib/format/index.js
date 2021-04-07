const { join } = require('path')
const { execSync } = require('child_process')

const Environment = require('../environment')
const Generator = require('../generator')
const { configureFeatures, exists, ...features } = require('./options')
const { parseJson } = require('./parser')

class ClangFormat {
  constructor() {
    this.env = new Environment()
    this.generator = new Generator(this.env.resolve())
    this.toolname = this.generator.filename('format')
    this.toolpath = join(this.env.binDir, this.toolname)
  }

  format(editorConfig, execConfig) {
    const result = this.exec(editorConfig, execConfig)
    if (exists(editorConfig, features.cursor(''))) {
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

  help() {
    return this.exec(configureFeatures(features.help))
  }

  exec(editorConfig, execConfig) {
    const stdout = execSync(`"${this.toolpath}" ${editorConfig}`, execConfig)
    return stdout.toString()
  }
}

module.exports = ClangFormat
