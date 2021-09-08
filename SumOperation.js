const JSONPath = require('./JSONPath')
const Operation = require('./Operation')

/**
 * @typedef SumArgs
 * @property {string} [from] - JSONPathLike
 * @property {string} [path] - JSONPathLike
 */

class SumOperation extends Operation {
  /**
   *
   * @param {SumArgs} args
   * @param {typeof import('./JSONPatch')} patcher
   */
  constructor(args, patcher) {
    super({ op: SumOperation.op, ...args }, patcher)
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
      this.fromPath.get(context[fromPathContext]) +
        this.toPath.get(context[toPathContext]),
    )

    const newContext = {
      ...context,
      [toPathContext]: newValue,
    }

    return newContext
  }
}

SumOperation.op = 'sum'

module.exports = SumOperation
