const env = require('../environment')
const Generator = require('../generator')
const Downloader = require('./downloader')

const generator = new Generator(env)
const downloader = new Downloader(env)

downloader.process(generator.formatter())
downloader.process(generator.query())
downloader.process(generator.tidy())
