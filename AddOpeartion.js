const JSONPath = require('./JSONPath')
const Operation = require('./Operation')

/**
 * @typedef AddArgs
 * @property {string} [path] - JSONPathLike
 * @property {any} [value] - JSONPathLike
 */

class AddOperation extends Operation {
  static op = 'add'

  /**
   *
   * @param {AddArgs} args
   * @param {typeof import('./JSONPatch')} patcher
   */
  constructor(args, patcher) {
    super({ op: AddOperation.op, ...args }, patcher)
    const { value } = args
    this.valueToAdd = value
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

    const newValue = this.path.add(context[pathContext], this.valueToAdd)

    const newContext = {
      ...context,
      [pathContext]: newValue,
    }

    return newContext
  }
}

module.exports = AddOperation
