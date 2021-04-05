const { ClangFormat, options, environment } = require('../lib')

const { join } = require('path')
const fs = require('fs')

const clangFormat = new ClangFormat(environment)

const sourceDir = join(__dirname, 'sources')
const resultDir = join(__dirname, 'results')

fs.readdir(sourceDir, (err, sources) => {
  sources.forEach(source => {
    const sourcePath = join(sourceDir, source)
    const content = fs.readFileSync(sourcePath)

    options.supportedStyles.forEach(style => {
      const editorConfig = options.generateEditorConfig(sourcePath, 0, style, 'Google')
      const execConfig = options.generateExecConfig(content, sourceDir)
      const { result } = clangFormat.format(editorConfig, execConfig)

      const filename = source.split('.')[0]
      const extension = source.split('.')[1]
      const resultFile = join(resultDir, `format_${filename}_${style}.${extension}`)
      fs.writeFileSync(resultFile, result)
    })
  })
})
