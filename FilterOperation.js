const JSONPath = require('./JSONPath')
const JSONPatchError = require('./JSONPatchError')
const Operation = require('./Operation')
const allConditions = require('./allConditions')

/**
 * @typedef FindArgs
 * @property {string} [from] - JSONPathLike
 * @property {string} [path] - JSONPathLike
 * @property {string} [localContext] - string
 * @property {import('./JSONPatch').PartialOperation} condition
 */

class FilterOperation extends Operation {
  /**
   *
   * @param {FindArgs} args
   * @param {typeof import('./JSONPatch')} patcher
   */
  constructor(args, patcher) {
    super({ op: FilterOperation.op, ...args }, patcher)
    /** @type {any} */ const { path, condition, localContext } = args
    this.localContext = localContext || 'local'
    const ConditionOperation = allConditions.find(
      ({ op }) => op === condition.op,
    )
    this.condition = new ConditionOperation(condition)
  }

  /**
   *
   * @param {import('./Operation').Context} context
   *
   * @returns {import('./Operation').Context}
   */
  invoke(context) {
    this.path = new JSONPath(this.arguments.path, context)
    this.from = new JSONPath(this.arguments.from, context)

    const { context: pathContext } = this.path
    const { path, context: fromPathContext } = this.from

    const array = this.from.get(context[fromPathContext])

    if (!Array.isArray(array))
      throw new JSONPatchError(`${path} is not an array`)

    const newValue = this.path.update(
      context[pathContext],
      array.filter((element) =>
        this.condition.invoke({
          ...context,
          [this.localContext]: element,
        }),
      ),
    )

    const newContext = {
      ...context,
      [pathContext]: newValue,
    }

    return newContext
  }
}

FilterOperation.op = 'filter'

module.exports = FilterOperation
