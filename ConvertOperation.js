const JSONPath = require('./JSONPath')
const Operation = require('./Operation')

/**
 * @typedef ConvertArgs
 * @property {string} [path] - JSONPathLike
 * @property {string} [type] - JSONPathLike
 */

class ConvertOperation extends Operation {
  static op = 'convert'
  static converters = {
    string: String,
    number: Number,
    bool: Boolean,
  }

  /**
   *
   * @param {ConvertArgs} args
   * @param {typeof import('./JSONPatch')} patcher
   *
   */
  constructor(args, patcher) {
    super({ op: ConvertOperation.op, ...args }, patcher)
    const { type } = args
    this.converter = ConvertOperation.getConverter(type)
  }

  /**
   *
   * @param {String} type
   */
  static getConverter(type) {
    const typeConverter = this.converters[type]
    if (!typeConverter) throw new Error(`Invalid type "${type}"`)

    return typeConverter
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
      this.converter(this.path.get(context[pathContext])),
    )

    const newContext = {
      ...context,
      [pathContext]: newValue,
    }

    return newContext
  }
}

module.exports = ConvertOperation
