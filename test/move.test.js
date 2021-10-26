const { JSONPatch } = require('..')

describe('MoveOperation', () => {
  it('moves value', () => {
    const patcher = new JSONPatch([{ op: 'move', path: '/a', from: '/b' }])
    const patchedValue = patcher.apply({ b: 123 })

    expect(patchedValue.a).toBe(123)
    expect(patchedValue.b).toBeUndefined()
  })
})
