const JSONPath = require('./JSONPath')
const Operation = require('./Operation')

/**
 * @typedef MultiplyArgs
 * @property {string} [from] - JSONPathLike
 * @property {string} [path] - JSONPathLike
 * @property {number} [byNumber] - JSONPathLike
 */

class MultiplyOperation extends Operation {

  /**
   *
   * @param {MultiplyArgs} args
   * @param {typeof import('./JSONPatch')} patcher
   */
  constructor(args, patcher) {
    super({ op: MultiplyOperation.op, ...args }, patcher)
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
      this.fromPath.get(context[fromPathContext]) * this.arguments.byNumber,
    )

    const newContext = {
      ...context,
      [toPathContext]: newValue,
    }

    return newContext
  }
}

MultiplyOperation.op = 'multiply'

module.exports = MultiplyOperation
