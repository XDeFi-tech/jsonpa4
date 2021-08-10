/**
 * @typedef Context
 * @property {any} [local]
 * @property {any} result
 * @property {any} global
 */
class Operation {
  static op = ''
  /**
   *
   * @param {*} params
   * @param {typeof import('./JSONPatch')} patcher
   */
  constructor({ op, ...args }, patcher) {
    this.name = op
    this.arguments = args
    this.patcher = patcher
  }

  /**
   *
   * @param {Context} context
   * @returns {Context}
   */
  invoke(context) {
    return { global: {}, result: {} }
  }
}

module.exports = Operation
