const supportedEditorStyles = ['Google', 'LLVM', 'Chromium', 'Mozilla', 'WebKit']

const editorFeatures = {
  Werror: '--Werror',
  WnoError: (code) => `--Wno-error=${code}`,
  assumeFilename: (filename) => `--assume-filename=${filename}`,
  cursor: (cur) => `--cursor=${cur}`,
  dryOn: '--dry-on',
  dumpConfig: '--dump-config',
  fallbackStyle: (style) => `--fallback-style=${style}`,
  ferrorLimit: (limit) => `--ferror-limit=${limit}`,
  style: (supportStyle) => `--style=${supportStyle}`,
  help: '--help',
}

const execFeatures = ['input', 'cwd']

module.exports = {
  execFeatures,
  editorFeatures,
  supportedEditorStyles,

  exists(editorConfig, feature) {
    return editorConfig.indexOf(feature) !== -1
  },
}
