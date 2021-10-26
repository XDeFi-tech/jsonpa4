const { JSONPatch } = require('..')

describe('MultiplyOperation', () => {
  it('multiplies numbers', () => {
    const patcher = new JSONPatch([
      { op: 'multiply', path: '/a', from: '/b', byNumber: 123 },
    ])
    const patchedValue = patcher.apply({
      a: 1,
      b: 321,
    })

    expect(patchedValue.a).toStrictEqual(321 * 123)
  })
})
