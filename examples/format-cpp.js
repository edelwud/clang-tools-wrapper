const { ClangFormat, ClangFormatConfig } = require('../lib')

const { join } = require('path')
const fs = require('fs')

const clangFormat = new ClangFormat()

const sourceDir = join(__dirname, 'sources')
const resultDir = join(__dirname, 'results')

fs.readdir(sourceDir, (err, sources) => {
  sources.forEach((source) => {
    const sourcePath = join(sourceDir, source)
    const content = fs.readFileSync(sourcePath)

    ClangFormatConfig.supportedStyles().forEach((style) => {
      const config = new ClangFormatConfig({
        style,
        cursor: 12,
        cwd: sourceDir,
        assumeFilename: sourcePath,
      })
      const { result } = clangFormat.format(content, config)

      const filename = source.split('.')[0]
      const extension = source.split('.')[1]
      const resultFile = join(resultDir, `format_${filename}_${style}.${extension}`)
      fs.writeFileSync(resultFile, result)
    })
  })
})
