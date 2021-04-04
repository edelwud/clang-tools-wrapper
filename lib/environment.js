const { join } = require('path')

const BINDIR = '.bin'

const isWin = () => process.platform === 'win32'
const getArch = () => {
  if (process.arch === 'x64') {
    return 'amd64'
  }
  if (process.arch === 'x32') {
    return 'i386'
  }
  return process.arch
}

const platform = isWin() ? 'windows' : process.platform
const extension = isWin() ? 'exe' : ''

module.exports = {
  platform,
  extension,
  binDir: join(__dirname, '..', BINDIR),
  arch: getArch(),
}
