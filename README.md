# JSONPa4

JSONPa4 - zero-dependency lightweight js data mapper

hello world example:

```ts
import JSONPatch from '.'

const patcher = new JSONPatch([
  {
    op: 'add',
    path: '/hello',
    value: 'world!',
  },
])

const objectToMap = {
  world: 'hello!',
}

console.log(objectToMap) // { world: 'hello!' }

const mappedObject = patcher.apply(objectToMap)

console.log(mappedObject) // { world: 'hello!', hello: 'world!' }
```

jsonpath strings:

1. default (uses result to get/modify data)

```ts
'/a/b/c/0/3/q/werty'
```

2. global path - (uses initial values to get/modify data)

```ts
'&/a/b/c/0/3/q/werty'
```

3. local path - (uses local context to get/modify data) see map operation

```ts
'$/a/b/c/0/3/q/werty'
'$someLocalContext/a/b/c/0/3/q/werty'
```

4. Evaluable path

Some paths can't be described as is, so we can use evaluable paths to get/modify data we want

For example we have such kind of object:

```ts
const obj = {
  abc: 1,
  key: 'abc',
}
```

we can access to 'abc' key in that way:

```ts
'/{/key}'
```

you can nest json path in json path

## class JSONPatch

```ts
new JSONPatch(operations)
```

operations - array of objects, where each object is one kind of operation (see all operations below)

```ts
patcher.apply(dataToMap, [initialContext, resultContext])
```

dataToMap - any data you want to modify (required)
initialContext, resultContext - are optional and used by jsonpatch in recursions, `DON'T PASS ANYTHING IF YOU DON'T KNOW HOW IT WORKS`

## All operations

### "add"

```js
{ op: 'add', path: '/a/b/c', value: 123}
```

path - jsonpath like string

value - any value

if path is absent then it will filled with object and arrays (for numerical indexes) until the end and the value will be set

if /a/b/c is array then the value will be pused to the end of the array

if /a/b/c is something eles then the value will be add to the existing value (can be used for strings concatenation or numbers summing)

### "concat"

```js
{ op: 'concat', path: '/a/b/c', from: '/c/b/a' }
```

path - jsonpath like string

from - jsonpath like string

Concat operation joins "form" array and "path" array and saves to the "path"

### "convert"

```js
{ op: 'convert', path: '/a/b/c', type: 'string'}
```

path - jsonpath like string

type - new type of the path

possible types: `'string', 'number', 'bool', 'date'`

### "copy"

```js
{ op: 'copy', path: '/a/b/c', from: '/c/b/a' }
```

path - jsonpath like string

from - jsonpath like string

Copies value from "form" path to "path"

### "flat"

```js
{ op: 'flat', path: '/a/b/c', from: '/c/b/a' }
```

path - jsonpath like string

from - jsonpath like string

Sets flattened array from "form" path to "path"

### "multiply"

```js
{ op: 'multiply', path: '/a/b/c', from: '/c/b/a', byNumber: 123 }
```

path - jsonpath like string

from - jsonpath like string

byNumber - number

multiplies value from 'from' and writes to 'path'

### "sum"

```js
{ op: 'sum', path: '/a/b/c', from: '/c/b/a' }
```

path - jsonpath like string

from - jsonpath like string

adds value from 'from' to 'path' (use for numbers and string)

### "map"

```ts
{
    op: 'map',
    path: '/a/b/c',
    localContext: 'someLocalContext',
    operations: [
        {
            op: 'add',
            path: '$someLocalContext/a/b/c/0/3/q/werty',
            value: 123
        }
    ]
}
```

path - jsonpath like string

localContext - string which'll be used in jsonpath

operations - list of JSON Patch operations which'll be applied to all of "path" array elements

### "move"

```js
{ op: 'move', path: '/a/b/c', from: '/c/b/a' }
```

path - jsonpath like string

from - jsonpath like string

Moves value from "form" path to "path"

### "remove"

```js
{ op: 'remove', path: '/a/b/c' }
```

path - jsonpath like string

Removes "path" or if "path" is array element - it'll be removed from there

### "replace"

```js
{
    op: 'replace',
    path: '/a/b/c',
    searchValue: 'someThingToFind',
    replaceValue: 'andReplaceWithIt'
}
```

path - jsonpath like string

searchValue - string to find in the "path" text

replaceValue - string
