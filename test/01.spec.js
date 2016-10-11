// requided's

const assert = require('assert')
const fs = require('fs')

const acany = require('../npm/index')


// start test

describe('acany', function() {
  it('coffee', function() {
    const list = [ 'hot coffee', 'chocolate', 'hot coffee with chocolate', 'coffee' ]

    assert.deepEqual(
      acany('coffee', list),
      [ 'coffee', 'hot coffee', 'hot coffee with chocolate' ])

    assert.deepEqual(
      acany('hot coffee', list),
      [ 'hot coffee', 'hot coffee with chocolate' ])

    assert.deepEqual(
      acany('hot chocolate', list),
      [ 'hot coffee with chocolate' ])
  })

  it('basic', function() {
    const list = ['aaa', 'yxuu', 'abb', 'xbbc', 'xc', 'xx cc', 'bbc', 'ccc', 'xccc']

    assert.deepEqual(
      acany('xc', list),
      [ 'xc', 'xccc', 'xbbc', 'xx cc' ])

    assert.deepEqual(
      acany('x c', list),
      [ 'xbbc', 'xc', 'xx cc', 'xccc' ])

    assert.deepEqual(
      acany('x c', list, 2),
      [ 'xbbc', 'xc' ])
  })
})
