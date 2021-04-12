module.exports = {
  /**
   * Parse clang-format stdout
   *
   * @param {string} stdout
   * @returns {{length: number, command: FormatterCommand}}
   */
  parseJson(stdout) {
    const length = stdout.indexOf('}') + 1
    return { length: length + 1, command: JSON.parse(stdout.substr(0, length)) }
  },
}
