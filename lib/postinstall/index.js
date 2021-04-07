const Environment = require('../environment')
const Generator = require('../generator')
const Downloader = require('./downloader')

const env = new Environment()
const generator = new Generator(env.resolve())
const downloader = new Downloader(env.resolve())

downloader.process(generator.formatter())
downloader.process(generator.query())
downloader.process(generator.tidy())
