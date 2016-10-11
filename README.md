# acany : simple support to autocomplete. receve a list and a word
# return a list math in sort of less diff, but this not sort your initial list

## I will help if you have any difficulty =)
Contact me by [github:heyderpd](https://github.com/heyderpd). I'll be glad to help you.

## Thanks for [npm~lucasmreis](https://www.npmjs.com/~lucasmreis)
```javascript
npm install --save acany
```

## Example:
```javascript
const acany = require('acany')

const list = [ 'hot coffee', 'chocolate', 'hot coffee with chocolate', 'coffee' ]

found = acany('coffee', list)
// found = [ 'coffee', 'hot coffee', 'hot coffee with chocolate' ]

found = acany('hot coffee', list)
// found = [ 'hot coffee', 'hot coffee with chocolate' ]

found = acany('hot chocolate', list)
// found = [ 'hot coffee with chocolate' ]
```

## Full Example:
```javascript
// acany(_NEED_, _LIST_, _LIMIT_)

const list = ['aaa', 'yxuu', 'abb', 'xbbc', 'xc', 'xx cc', 'bbc', 'ccc', 'xccc']

found = acany('xc', list)
// found = [ 'xc', 'xccc', 'xbbc', 'xx cc' ]

found = acany('x c', list)
// found = [ 'xbbc', 'xc', 'xx cc', 'xccc' ]

found = acany('x c', list, 2)
// found = [ 'xbbc', 'xc' ]
```
