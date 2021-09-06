const JSONPath = require('./JSONPath')
const Operation = require('./Operation')

/**
 * @typedef RemoveArgs
 * @property {string} [path] - JSONPathLike
 */

class RemoveOperation extends Operation {
  
  /**
   *
   * @param {RemoveArgs} args
   * @param {typeof import('./JSONPatch')} patcher
   */
  constructor(args, patcher) {
    super({ op: RemoveOperation.op, ...args }, patcher)
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

    const newValue = this.path.delete(context[pathContext])

    const newContext = {
      ...context,
      [pathContext]: newValue,
    }

    return newContext
  }
}

RemoveOperation.op = 'remove'

module.exports = RemoveOperation
