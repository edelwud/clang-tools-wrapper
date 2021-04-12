const { join } = require('path')
const { execSync } = require('child_process')

const Environment = require('../environment')
const Generator = require('../generator')
const { exists, editorFeatures } = require('./options')
const { parseJson } = require('./parser')

/**
 * Clang formatter class
 *
 * @class
 * @property {string} toolname
 * @property {Environment} env
 * @property {Generator} generator
 * @property {string} toolpath
 */
class ClangFormat {
  /**
   * @constructor
   */
  constructor() {
    this.env = new Environment()
    this.generator = new Generator(this.env.resolve())
    this.toolname = this.generator.filename('format')
    this.toolpath = join(this.env.binDir, this.toolname)
  }

  /**
   * Formatting function
   *
   * @public
   * @param {string} content
   * @param {ClangFormatConfig} clangFormatConfig
   * @typedef {{Cursor: number, IncompleteFormat: boolean}} FormatterCommand
   * @typedef {{command: FormatterCommand, result: string}} FormatterResponse
   * @returns {{result: string, command: FormatterResponse|null}}
   */
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

  /**
   * Exec clang-format
   *
   * @private
   * @param {editorFeatures} editorConfig
   * @param {execFeatures} execConfig
   * @returns {string}
   */
  exec(editorConfig, execConfig) {
    const stdout = execSync(`"${this.toolpath}" ${editorConfig}`, execConfig)
    return stdout.toString()
  }
}

module.exports = ClangFormat
