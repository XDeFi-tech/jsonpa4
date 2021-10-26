const { JSONPatch } = require('..')

describe('ConcatOperation', () => {
  it('joins arrays', () => {
    const patcher = new JSONPatch([{ op: 'concat', path: '/a', from: '/b' }])
    const patchedValue = patcher.apply({ a: [1, 2], b: [3, 4] })

    expect(patchedValue.a).toStrictEqual([3, 4, 1, 2])
  })
})
