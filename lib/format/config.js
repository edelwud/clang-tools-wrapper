const editorFeatures = {
  WError: '--Werror',
  WnoError: (code) => `--Wno-error=${code}`,
  assumeFilename: (filename) => `--assume-filename=${filename}`,
  cursor: (cur) => `--cursor=${cur}`,
  dryOn: '--dry-on',
  dumpConfig: '--dump-config',
  fallbackStyle: (style) => `--fallback-style=${style}`,
  fErrorLimit: (limit) => `--ferror-limit=${limit}`,
  style: (supportStyle) => `--style=${supportStyle}`,
  help: '--help',
}

const editorHandler = (editor, feature, option) => ({
  string: () => {
    option ? editor.push(feature) : null
  },
  function: () => {
    editor.push(feature(option))
  },
})

const execFeatures = ['input', 'cwd']

class ClangFormatConfig {
  constructor(config) {
    this.config = config
  }
  generate() {
    const editor = []
    const exec = {
      input: '',
      cwd: '',
    }
    Object.keys(this.config).forEach((feature) => {
      const option = this.config[feature]
      if (feature in editorFeatures) {
        const handle = editorFeatures[feature]
        const handler = editorHandler(editor, handle, option)
        handler[typeof handle]()
      }
      if (execFeatures.includes(feature)) {
        exec[feature] = option
      }
    })
    return {
      editor: editor.join(' '),
      exec,
    }
  }

  static supportedStyles() {
    return ['Google', 'LLVM', 'Chromium', 'Mozilla', 'WebKit']
  }
}

module.exports = ClangFormatConfig
