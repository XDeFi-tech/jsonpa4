const { JSONPatch } = require('..')

describe('FindOperation', () => {
  it('finds value', () => {
    const patcher = new JSONPatch([
      {
        op: 'find',
        from: '/a',
        localContext: 'someLocalContext',
        condition: { op: '==', path: '$someLocalContext/', value: 3 },
        path: '/b',
      },
    ])

    const patchedValue = patcher.apply({ a: [1, 2, 3, 4, 5] })

    expect(patchedValue.b).toBe(3)
  })
})
