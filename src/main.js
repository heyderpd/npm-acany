
/*!
 * acany
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * ISC Licensed
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

const findAnyMatch = (need, setList, limit) => {
  if (limit <= 0)
    return []

  const list = copy(setList)
  let found = []
  while ( length(found) < limit && length(list) > 0 ) {
    let item = list.shift()
    if ( anymatch(need, item) )
      found.push( item )
  }
  return found
}

const doSearch = (need, list, limit) => {
  const needSimple = searchSimple(need)
  const needComplex = searchComplex(need)

  let found = findAnyMatch(
    need,
    copy(list),
    limit)

  found = found.concat(
    findAnyMatch(
      needSimple,
      list = arrayDiff(list, found),
      limit - length(found)))

  found = found.concat(
    findAnyMatch(
      needComplex,
      list = arrayDiff(list, found),
      limit - length(found)))

  return found
}

const main = (setNeed = undefined, setList = [], setLimit = 10) => {
  const need = isString(setNeed)
    ? setNeed
    : undefined
  if (need === undefined)
    throw new Error("var 'need' have a invalid value")  
  if (length(need) <= 0)
    return []

  const list = isArray(setList) && length(setList) > 0
    ? copy(setList)
    : undefined
  if (need === undefined)
    throw new Error("var 'list' have a invalid value")

  const limit = isNumber(setLimit) && setLimit > 0
    ? setLimit
    : undefined
  if (need === undefined)
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
  arrayDiff } = require('pytils')

console.log('arrayDiff', arrayDiff)

const anymatch = require('anymatch')

module.exports = main
