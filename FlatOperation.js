const JSONPath = require('./JSONPath')
const Operation = require('./Operation')

/**
 * @typedef FlatArgs
 * @property {string} [from] - JSONPathLike
 * @property {string} [path] - JSONPathLike
 */

class FlatOperation extends Operation {

  /**
   *
   * @param {FlatArgs} args
   * @param {typeof import('./JSONPatch')} patcher
   */
  constructor(args, patcher) {
    super({ op: FlatOperation.op, ...args }, patcher)
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
      this.fromPath.get(context[fromPathContext]).flat(),
    )

    const newContext = {
      ...context,
      [toPathContext]: newValue,
    }

    return newContext
  }
}

FlatOperation.op = 'flat'

module.exports = FlatOperation

if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth) {
    return [].concat.apply([], this)
  }
}
