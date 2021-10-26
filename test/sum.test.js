const { JSONPatch } = require('..')

describe('SumOperation', () => {
  const patcher = new JSONPatch([{ op: 'sum', path: '/a', from: '/b' }])
  it('adds number value', () => {
    const patchedValue = patcher.apply({ a: 321, b: 123 })

    expect(patchedValue.a).toBe(123 + 321)
  })

  it('concats strings', () => {
    const patchedValue = patcher.apply({ b: 'Hello', a: ', World!' })

    expect(patchedValue.a).toBe('Hello, World!')
  })
})
