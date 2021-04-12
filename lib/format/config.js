const { editorFeatures, execFeatures } = require('./options')

const editorHandler = (editor, feature, option) => ({
  string: () => {
    option ? editor.push(feature) : null
  },
  function: () => {
    editor.push(feature(option))
  },
})

/**
 * Clang formatting configuration setup
 *
 * @class
 * @typedef {(editorFeatures & execFeatures)} Features
 * @property {Features} config
 */
class ClangFormatConfig {
  /**
   * @constructor
   * @param {Features} config
   */
  constructor(config) {
    this.config = config
  }

  /**
   * Generates Clang Format config
   *
   * @public
   * @returns {{editor: string, exec: {cwd: string}}}
   */
  generate() {
    return {
      editor: this.generateEditorConfig(),
      exec: this.generateExecConfig(),
    }
  }

  /**
   * Generates Clang Format editor config
   *
   * @private
   * @returns {string}
   */
  generateEditorConfig() {
    const editor = []
    Object.keys(this.config).forEach((feature) => {
      const option = this.config[feature]
      if (feature in editorFeatures) {
        const handle = editorFeatures[feature]
        const handler = editorHandler(editor, handle, option)
        handler[typeof handle]()
      }
    })
    return editor.join(' ')
  }

  /**
   * Generates Clang Format exec config
   *
   * @private
   * @returns {{cwd: string}}
   */
  generateExecConfig() {
    const exec = {
      cwd: __dirname,
    }
    Object.keys(this.config).forEach((feature) => {
      const option = this.config[feature]
      if (execFeatures.includes(feature)) {
        exec[feature] = option
      }
    })
    return exec
  }

  /**
   * Gives supported styles
   *
   * @public
   * @static
   * @returns {string[]}
   */
  static supportedStyles() {
    return ['Google', 'LLVM', 'Chromium', 'Mozilla', 'WebKit']
  }
}

module.exports = ClangFormatConfig
