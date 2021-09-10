class ConditionOperation {
  constructor({ op, ...args }) {
    this.name = op
    this.arguments = args
  }
  /**
   *
   * @param {import('./Operation').Context} context
   *
   * @returns {boolean}
   */
  invoke(context) {
    return false
  }
}

module.exports = ConditionOperation
