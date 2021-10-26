const { JSONPatch } = require('..')

describe('MapOperation', () => {
  it('maps array', () => {
    const patcher = new JSONPatch([
      {
        op: 'map',
        path: '/a',
        localContext: 'someLocalContext',
        operations: [
          {
            op: 'add',
            path: '$someLocalContext/',
            value: 123,
          },
        ],
      },
    ])

    const patchedValue = patcher.apply({ a: [1, 2, 3, 4, 5] })

    expect(patchedValue.a).toStrictEqual([1, 2, 3, 4, 5].map((v) => v + 123))
  })
})
