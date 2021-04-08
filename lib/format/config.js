const { editorFeatures, execFeatures } = require('./options')

const editorHandler = (editor, feature, option) => ({
  string: () => {
    option ? editor.push(feature) : null
  },
  function: () => {
    editor.push(feature(option))
  },
})

class ClangFormatConfig {
  constructor(config) {
    this.config = config
  }
  generate() {
    return {
      editor: this.generateEditorConfig(),
      exec: this.generateExecConfig(),
    }
  }

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

  generateExecConfig() {
    const exec = {
      input: '',
      cwd: '',
    }
    Object.keys(this.config).forEach((feature) => {
      const option = this.config[feature]
      if (execFeatures.includes(feature)) {
        exec[feature] = option
      }
    })
    return exec
  }

  static supportedStyles() {
    return ['Google', 'LLVM', 'Chromium', 'Mozilla', 'WebKit']
  }
}

module.exports = ClangFormatConfig
