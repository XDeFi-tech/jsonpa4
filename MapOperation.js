const JSONPath = require('./JSONPath')
const JSONPatchError = require('./JSONPatchError')
const Operation = require('./Operation')

/**
 * @typedef MapArgs
 * @property {string} [path] - JSONPathLike
 * @property {string} [localContext] - string
 * @property {import('./JSONPatch').PartialOperation[]} operations
 */

class MapOperation extends Operation {
  /**
   *
   * @param {MapArgs} args
   * @param {typeof import('./JSONPatch')} patcher
   */
  constructor(args, patcher) {
    super({ op: MapOperation.op, ...args }, patcher)
    const { path, operations, localContext } = args
    this.localContext = localContext || 'local'
    this.mapPatcher = new this.patcher(operations)
  }

  /**
   *
   * @param {import('./Operation').Context} context
   *
   * @returns {import('./Operation').Context}
   */
  invoke(context) {
    this.path = new JSONPath(this.arguments.path, context)

    const { path, context: pathContext } = this.path

    const array = this.path.get(context[pathContext])

    if (!Array.isArray(array))
      throw new JSONPatchError(`${path} is not an array`)

    const newValue = this.path.update(
      context[pathContext],
      array.map((element) =>
        this.mapPatcher.apply(
          element,
          {
            ...context,
            [this.localContext]: element,
          },
          this.localContext,
        ),
      ),
    )

    const newContext = {
      ...context,
      [pathContext]: newValue,
    }

    return newContext
  }
}

MapOperation.op = 'map'

module.exports = MapOperation
