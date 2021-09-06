const JSONPath = require('./JSONPath')
const Operation = require('./Operation')

/**
 * @typedef ConvertArgs
 * @property {string} [path] - JSONPathLike
 * @property {string} [func] - JSONPathLike
 */

class CallOperation extends Operation {
  
    /**
     *
     * @param {ConvertArgs} args
     * @param {typeof import('./JSONPatch')} patcher
     *
     */
    constructor(args, patcher) {
      super({ op: CallOperation.op, ...args }, patcher)
      const { path, func } = args
      // @ts-ignore
      this.path = new JSONPath(path)
      // @ts-ignore
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

  CallOperation.op = 'call'
  
  module.exports = CallOperation
  