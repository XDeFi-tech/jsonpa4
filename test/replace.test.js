const { JSONPatch } = require('..')

describe('ReplaceOpeartion', () => {
  it('replaces substring', () => {
    const patcher = new JSONPatch([
      {
        op: 'replace',
        path: '/a',
        searchValue: 'someThingToFind',
        replaceValue: 'andReplaceWithIt',
      },
    ])
    const patchedValue = patcher.apply({ a: 'someThingToFind' })

    expect(patchedValue.a).toBe('andReplaceWithIt')
  })
})
