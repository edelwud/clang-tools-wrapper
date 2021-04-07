const { join } = require('path')

class Environment {
  constructor(binDir = '.bin', revision = 10) {
    this.binDir = join(__dirname, '..', binDir)
    this.revision = revision
  }

  isWin() {
    return process.platform === 'win32'
  }

  getArch() {
    if (process.arch === 'x64') {
      return 'amd64'
    }
    if (process.arch === 'x32') {
      return 'i386'
    }
    return process.arch
  }

  getPlatform() {
    return this.isWin() ? 'windows' : process.platform
  }

  getExtension() {
    return this.isWin() ? 'exe' : ''
  }

  resolve() {
    return {
      platform: this.getPlatform(),
      extension: this.getExtension(),
      arch: this.getArch(),
      binDir: this.binDir,
      revision: this.revision,
    }
  }
}

module.exports = Environment
