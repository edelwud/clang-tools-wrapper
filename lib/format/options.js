const supportedStyles = ['Google', 'LLVM', 'Chromium', 'Mozilla', 'WebKit']

const features = {
  Werror: '--Werror',
  WnoError: code => `--Wno-error=${code}`,
  assumeFilename: filename => `--assume-filename=${filename}`,
  cursor: cur => `--cursor=${cur}`,
  dryOn: '--dry-on',
  dumpConfig: '--dump-config',
  fallbackStyle: style => `--fallback-style=${style}`,
  ferrorLimit: limit => `--ferror-limit=${limit}`,
  style: supportStyle => `--style=${supportStyle}`,
  help: '--help',
}

const configureFeatures = (...args) => {
  return args.join(' ')
}

module.exports = {
  ...features,
  configureFeatures,
  supportedStyles,

  exists(config, feature) {
    return config.indexOf(feature) !== -1 ? true : false
  },

  generateEditorConfig(filepath, cursor, style, fallbackStyle) {
    return configureFeatures(
      features.assumeFilename(filepath),
      features.style(style),
      features.cursor(cursor),
      features.fallbackStyle(fallbackStyle),
    )
  },

  generateExecConfig(content, filedir) {
    return {
      input: content,
      cwd: filedir,
    }
  },
}
