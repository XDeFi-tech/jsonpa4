const { JSONPatch } = require('..')

describe('FlatOperation', () => {
  it('flats array', () => {
    const patcher = new JSONPatch([{ op: 'flat', path: '/a', from: '/b' }])
    const patchedValue = patcher.apply({
      a: 1,
      b: [
        [1, 2],
        [3, 4],
      ],
    })

    expect(patchedValue.a).toStrictEqual([1, 2, 3, 4])
  })
})
