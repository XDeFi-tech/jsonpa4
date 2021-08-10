const JSONPath = require('./JSONPath')
const Operation = require('./Operation')

/**
 * @typedef CopyArgs
 * @property {string} [from] - JSONPathLike
 * @property {string} [path] - JSONPathLike
 */

class CopyOperation extends Operation {
  static op = 'copy'

  /**
   *
   * @param {CopyArgs} args
   * @param {typeof import('./JSONPatch')} patcher
   */
  constructor(args, patcher) {
    super({ op: CopyOperation.op, ...args }, patcher)
    const { from, path } = args
  }

  /**
   *
   * @param {import('./Operation').Context} context
   *
   * @returns {import('./Operation').Context}
   */
  invoke(context) {
    this.fromPath = new JSONPath(this.arguments.from, context)
    this.toPath = new JSONPath(this.arguments.path, context)

    const { context: toPathContext } = this.toPath
    const { context: fromPathContext } = this.fromPath

    const newValue = this.toPath.update(
      context[toPathContext],
      this.fromPath.get(context[fromPathContext]),
    )

    const newContext = {
      ...context,
      [toPathContext]: newValue,
    }

    return newContext
  }
}

module.exports = CopyOperation
