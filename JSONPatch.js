/**
 * @typedef {Object.<string, any>} PartialOperation
 * @property {string} op
 *
 */

const FlatOperation = require('./FlatOperation')
const AddOperation = require('./AddOpeartion')
const CopyOperation = require('./CopyOperation')
const MoveOperation = require('./MoveOpeartion')
const RemoveOperation = require('./RemoveOpeartion')
const ConvertOperation = require('./ConvertOperation')
const Operation = require('./Operation')
const ReplaceOperation = require('./ReplaceOpeartion')
const MapOperation = require('./MapOperation')
const ConcatOperation = require('./ConcatOperation')
const CallOperation = require('./CallOperation')
const MultiplyOperation = require('./MutiplyOperation')
const SumOperation = require('./SumOperation')

/**
 * @type {typeof Operation[]}
 */
const allOperations = [
  CopyOperation,
  RemoveOperation,
  MoveOperation,
  AddOperation,
  ConvertOperation,
  ReplaceOperation,
  MapOperation,
  FlatOperation,
  CallOperation,
  ConcatOperation,
  MultiplyOperation,
  SumOperation,
]

class JSONPatch {
  /**
   *
   * @param {PartialOperation[]} operations
   */
  constructor(operations) {
    this.operations = operations.map(({ op, ...rest }) => {
      const OperationConstructor = allOperations.find(
        (operationCall) => operationCall.op === op,
      )
      const operation = new OperationConstructor(rest, JSONPatch)

      return operation
    })
  }

  /**
   *
   * @param {any} obj
   * @param {import('./Operation').Context} [initialContext]
   * @returns {any}
   */
  apply(
    obj,
    initialContext = { global: obj, result: JSON.parse(JSON.stringify(obj)) },
    returnContext = 'result',
  ) {
    if (this.operations.length === 0) return obj

    const resultContext = this.operations.reduce(
      (context, operation) => operation.invoke(context),
      initialContext,
    )

    return resultContext[returnContext]
  }
}

module.exports = JSONPatch
