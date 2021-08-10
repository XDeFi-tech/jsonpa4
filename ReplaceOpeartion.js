const JSONPath = require('./JSONPath')
const Operation = require('./Operation')

/**
 * @typedef ReplaceArgs
 * @property {string} [path] - JSONPathLike
 * @property {string} [searchValue] - JSONPathLike
 * @property {string} [replaceValue] - JSONPathLike
 */

class ReplaceOperation extends Operation {
  static op = 'replace'

  /**
   *
   * @param {ReplaceArgs} args
   * @param {typeof import('./JSONPatch')} patcher
   *
   */
  constructor(args, patcher) {
    super({ op: ReplaceOperation.op, ...args }, patcher)
    const { path, searchValue, replaceValue } = args
    this.searchValue = searchValue
    this.replaceValue = replaceValue
  }

  /**
   *
   * @param {String} text
   */
  replacer(text) {
    return text.replace(this.searchValue, this.replaceValue)
  }

  /**
   *
   * @param {import('./Operation').Context} context
   *
   * @returns {import('./Operation').Context}
   */
  invoke(context) {
    this.path = new JSONPath(this.arguments.path, context)

    const { context: pathContext } = this.path

    const newValue = this.path.update(
      context[pathContext],
      this.replacer(this.path.get(context[pathContext])),
    )

    const newContext = {
      ...context,
      [pathContext]: newValue,
    }

    return newContext
  }
}

module.exports = ReplaceOperation
