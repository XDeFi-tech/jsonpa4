const { JSONPatch } = require('..')

describe('FilterOperation', () => {
  it('filters array', () => {
    const patcher = new JSONPatch([
      {
        op: 'filter',
        from: '/a',
        localContext: 'someLocalContext',
        condition: { op: '!=', path: '$someLocalContext/', value: 3 },
        path: '/b',
      },
    ])

    const patchedValue = patcher.apply({ a: [1, 2, 3, 4, 5] })

    expect(patchedValue.b).toStrictEqual([1, 2, 4, 5])
  })
})
