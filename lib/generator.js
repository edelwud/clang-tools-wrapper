const GIT_REPO = 'https://github.com/muttleyxd/clang-tools-static-binaries'
const GIT_TAG = 'releases/latest'
const UTILITY_PREFIX = 'clang'
const HASH_SUM = 'sha512sum'

class LinkGenerator {
  constructor({ platform, extension = '', arch = 'amd64', revision = 10 }) {
    this.arch = arch
    this.platform = platform
    this.revision = revision
    this.extension = extension
  }

  hashSum(utility) {
    return this.link(utility) + '.' + HASH_SUM
  }

  link(utility) {
    let result = GIT_REPO + '/'
    result += GIT_TAG + '/download/'
    result += this.filename(utility)
    return result
  }

  filename(utility) {
    let result = UTILITY_PREFIX + '-' + utility + '-'
    result += this.revision + '_' + this.platform + '-' + this.arch
    if (this.extension) result += '.' + this.extension
    return result
  }

  formatter() {
    return {
      link: this.link('format'),
      filename: this.filename('format'),
      hashSum: this.hashSum('format'),
    }
  }

  query() {
    return {
      link: this.link('query'),
      filename: this.filename('query'),
      hashSum: this.hashSum('query'),
    }
  }

  tidy() {
    return {
      link: this.link('tidy'),
      filename: this.filename('tidy'),
      hashSum: this.hashSum('tidy'),
    }
  }
}

module.exports = LinkGenerator
