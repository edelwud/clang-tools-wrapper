const { createHash } = require('crypto')
const { join } = require('path')
const https = require('https')
const fs = require('fs')

const { execSync } = require('child_process')

class Downloader {
  constructor({ binDir }) {
    this.binDir = binDir
    this.createBinDir()
  }

  createBinDir() {
    if (!fs.existsSync(this.binDir)) {
      fs.mkdirSync(this.binDir)
    }
  }

  async downloadFile(link, filename) {
    const destination = join(this.binDir, filename)
    if (fs.existsSync(destination)) return

    const stream = fs.createWriteStream(destination)
    return new Promise((resolve, reject) => {
      this.download(link, (err, res) => {
        if (err) fs.unlink(destination, () => reject(err))
        res.pipe(stream)
        stream.on('finish', () => stream.close(resolve))
      })
    })
  }

  async validateSha512(filename, hashSumLink) {
    const filepath = join(this.binDir, filename)
    if (!fs.existsSync(filepath)) return

    const hash = createHash('sha512')
    const stream = fs.createReadStream(filepath)

    const hashSum = await new Promise((resolve) => {
      stream.on('readable', () => {
        const data = stream.read()
        if (data) hash.update(data)
        else resolve(hash)
      })
    })

    const resolvedHash = await new Promise((resolve, reject) => {
      this.download(hashSumLink, (err, res) => {
        const data = []
        res.on('data', (chunk) => data.push(chunk))
        res.on('end', () => resolve(data.join('').split(' ')[0]))
        res.on('error', reject)
      })
    })

    if (hashSum.digest('hex') !== resolvedHash) throw new Error('Invalid hash')
  }

  download(link, cb) {
    https
      .get(link, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return this.download(res.headers.location, cb)
        }
        cb(null, res)
      })
      .on('error', cb)
  }

  chmod(filename) {
    const destination = join(this.binDir, filename)
    execSync(`chmod +x ${destination}`)
  }

  async process({ link, filename, hashSum }) {
    await this.downloadFile(link, filename)
    await this.validateSha512(filename, hashSum)
    this.chmod(filename)
  }
}

module.exports = Downloader
