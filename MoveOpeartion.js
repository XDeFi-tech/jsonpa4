const CopyOperation = require('./CopyOperation')
const Operation = require('./Operation')
const RemoveOperation = require('./RemoveOpeartion')

/**
 * @typedef MoveArgs
 * @property {string} [from] - JSONPathLike
 * @property {string} [path] - JSONPathLike
 */

class MoveOperation extends Operation {
  static op = 'move'

  /**
   *
   * @param {MoveArgs} args
   * @param {typeof import('./JSONPatch')} patcher
   */
  constructor(args, patcher) {
    super({ op: MoveOperation.op, ...args }, patcher)
    const { from } = args
    this.copyOpeartion = new CopyOperation(args, patcher)
    this.removeOpeartion = new RemoveOperation({ path: from }, patcher)
  }

  /**
   *
   * @param {import('./Operation').Context} context
   *
   * @returns {import('./Operation').Context}
   */
  invoke(context) {
    return this.removeOpeartion.invoke(this.copyOpeartion.invoke(context))
  }
}

module.exports = MoveOperation
