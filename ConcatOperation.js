const JSONPath = require('./JSONPath')
const Operation = require('./Operation')

/**
 * @typedef ConcatArgs
 * @property {string} [from] - JSONPathLike
 * @property {string} [path] - JSONPathLike
 */

class ConcatOperation extends Operation {
  

  /**
   *
   * @param {ConcatArgs} args
   * @param {typeof import('./JSONPatch')} patcher
   */
  constructor(args, patcher) {
    super({ op: ConcatOperation.op, ...args }, patcher)
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
      this.fromPath
        .get(context[fromPathContext])
        .concat(this.toPath.get(context[toPathContext])),
    )

    const newContext = {
      ...context,
      [toPathContext]: newValue,
    }

    return newContext
  }
}
ConcatOperation.op = 'concat'
module.exports = ConcatOperation
