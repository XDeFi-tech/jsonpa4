const ConditionOperation = require('./ConditionOperation')
const JSONPath = require('./JSONPath')

class NotEqualOperation extends ConditionOperation {
  /**
   *
   * @param {import("./Operation").Context} context
   *
   * @returns {boolean}
   */
  invoke(context) {
    this.path = new JSONPath(this.arguments.path, context)

    return this.path.get(context[this.path.context]) !== this.arguments.value
  }
}

NotEqualOperation.op = '!='

module.exports = NotEqualOperation
