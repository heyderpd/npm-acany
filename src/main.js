
/*!
 * acany
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * MIT Licensed
 */

const middle = word => '*' + word + '*'

const ___ASTERISK___ = String.fromCharCode(254)

const searchSimple = word =>
  middle(
    word
      .replace('*', '\\*')
      .replace(/\ +/gim, '**'))

const searchComplex = word =>
  middle(
    word
      .replace('*', ___ASTERISK___)
      .replace(/\ +/gim, '')
      .split('')
      .join('**')
      .replace(___ASTERISK___, '\\*'))

const findAnyMatch = (anyneed, setList, limit) => {
  if (limit <= 0)
    return []

  const list = copy(setList)
  const found = {}
  let foundCount = 0
  let ref
  while ( foundCount < limit && length(list) > 0 ) {
    let item = list.shift()
    if ( (ref = anymatch(anyneed, item, true)) >= 0 ) {
      if ( !hasProp(found, ref) ) {
        found[ref] = []
      }
      found[ref].push( item )
      foundCount++
    }
  }
  return found
}

const concatResult = (results) => {
  const found = []
  eachVal(results, maths => {
    if (length(maths) > 0) {
      eachVal(maths, item => {
        found.push( item )
      })
    }
  })
  return found
}

const doSearch = (need, list, limit) => {
  const anyneed = [
    need,
    searchSimple(need),
    searchComplex(need)
  ]

  const found = findAnyMatch(
    anyneed,
    copy(list),
    limit)

  return concatResult(found)
}

const main = (setNeed = undefined, setList = [], setLimit = 10) => {
  const list = isArray(setList) && length(setList) > 0
    ? copy(setList)
    : undefined
  if (list === undefined)
    throw new Error("var 'list' have a invalid value")

  const need = isString(setNeed)
    ? setNeed
    : undefined
  if (need === undefined)
    throw new Error("var 'need' have a invalid value")
  if (length(need) <= 0)
    return setList

  const limit = isNumber(setLimit) && setLimit > 0
    ? setLimit
    : undefined
  if (limit === undefined)
    throw new Error("var 'limit' have a invalid value")

  return doSearch(
    need,
    list,
    limit)
}

const {
  isNumber,
  isString,
  isArray,
  length,
  copy,
  eachVal,
  arrayDiff,
  hasProp } = require('pytils')

const anymatch = require('anymatch')

module.exports = main
