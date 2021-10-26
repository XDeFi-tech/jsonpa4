const { JSONPatch } = require('..')

describe('CopyOperation', () => {
  it('copies value', () => {
    const patcher = new JSONPatch([{ op: 'copy', path: '/a', from: '/b' }])
    const patchedValue = patcher.apply({ a: 1, b: 2 })

    expect(patchedValue.a).toBe(2)
    expect(patchedValue.a).not.toBe(1)
  })
})
