const https = require('https')
const Environment = require('../lib/environment')
const Generator = require('../lib/generator')

const getHttpCode = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        resolve(res.statusCode)
      })
      .on('error', reject)
  })
}

describe('clang-tools-extra availability test', () => {
  const env = new Environment()
  const generator = new Generator(env.resolve())

  test('clang-format availability', async () => {
    const { link } = generator.formatter()
    const code = await getHttpCode(link)
    expect(code).not.toBe(404)
  })

  test('clang-query availability', async () => {
    const { link } = generator.query()
    const code = await getHttpCode(link)
    expect(code).not.toBe(404)
  })

  test('clang-tidy availability', async () => {
    const { link } = generator.tidy()
    const code = await getHttpCode(link)
    expect(code).not.toBe(404)
  })
})
