const { JSONPatch } = require('..')

describe('ConvertOperation', () => {
  it('converts to string', () => {
    const patcher = new JSONPatch([
      { op: 'convert', path: '/a', type: 'string' },
    ])
    const patchedValue = patcher.apply({ a: 1 })

    expect(patchedValue.a).toHaveLength(1)
  })

  it('converts to number', () => {
    const patcher = new JSONPatch([
      { op: 'convert', path: '/a', type: 'number' },
    ])
    const patchedValue = patcher.apply({ a: '1' })

    expect(patchedValue.a).toBe(1)
  })

  it('converts to boolean', () => {
    const patcher = new JSONPatch([{ op: 'convert', path: '/a', type: 'bool' }])
    const patchedValue = patcher.apply({ a: '1' })

    expect(patchedValue.a).toBe(true)

    const falsePatcher = new JSONPatch([
      { op: 'convert', path: '/a', type: 'bool' },
    ])
    const falsePatchedValue = falsePatcher.apply({ a: 0 })

    expect(falsePatchedValue.a).toBe(false)
  })

  it('converts to date', () => {
    const patcher = new JSONPatch([{ op: 'convert', path: '/a', type: 'date' }])
    const patchedValue = patcher.apply({ a: '2021-09-27T15:37:54.877Z' })

    expect(patchedValue.a.constructor).toBe(Date)
  })
})
