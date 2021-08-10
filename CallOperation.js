const JSONPath = require('./JSONPath')
const Operation = require('./Operation')

/**
 * @typedef ConvertArgs
 * @property {string} [path] - JSONPathLike
 * @property {string} [func] - JSONPathLike
 */

class CallOperation extends Operation {
    static op = 'call'
  
    /**
     *
     * @param {ConvertArgs} args
     * @param {typeof import('./JSONPatch')} patcher
     *
     */
    constructor(args, patcher) {
      super({ op: CallOperation.op, ...args }, patcher)
      const { path, func } = args
      this.path = new JSONPath(path)
      this.callFunc = func()
    }
  
    /**
     *
     * @param {import('./Operation').Context} context
     *
     * @returns {import('./Operation').Context}
     */
    invoke(context) {
      const { context: pathContext } = this.path
    
      const newValue = this.path.update(
        context[pathContext],
        this.callFunc,
      )
      const newContext = {
        ...context,
        [pathContext]: newValue,
      }
  
      return newContext
    }
  }
  
  module.exports = CallOperation
  