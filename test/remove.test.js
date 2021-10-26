const { JSONPatch } = require('..')

describe('RemoveOpeartion', () => {
  it('removes value', () => {
    const patcher = new JSONPatch([{ op: 'remove', path: '/a' }])
    const patchedValue = patcher.apply({ a: 123 })

    expect(patchedValue.a).toBeUndefined()
  })
})
