const { JSONPatch } = require('..')

describe('AddOperation', () => {
  it('sets value', () => {
    const patcher = new JSONPatch([{ op: 'add', path: '/a', value: 123 }])
    const patchedValue = patcher.apply({})

    expect(patchedValue.a).toBe(123)
  })

  it('adds number value', () => {
    const patcher = new JSONPatch([{ op: 'add', path: '/a', value: 123 }])
    const patchedValue = patcher.apply({ a: 321 })

    expect(patchedValue.a).toBe(123 + 321)
  })

  it('concats strings', () => {
    const patcher = new JSONPatch([
      { op: 'add', path: '/a', value: ', World!' },
    ])
    const patchedValue = patcher.apply({ a: 'Hello' })

    expect(patchedValue.a).toBe('Hello, World!')
  })

  it('pushes to array', () => {
    const patcher = new JSONPatch([{ op: 'add', path: '/a', value: 4 }])
    const patchedValue = patcher.apply({ a: [1, 2, 3] })

    expect(patchedValue.a).toStrictEqual([1, 2, 3, 4])
  })
})
