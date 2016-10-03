'use strict';

/*!
 * acany
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * ISC Licensed
 */

var middle = function middle(word) {
  return '*' + word + '*';
};

var ___ASTERISK___ = String.fromCharCode(254);

var searchSimple = function searchSimple(word) {
  return middle(word.replace('*', '\\*').replace(/\ +/gim, '**'));
};

var searchComplex = function searchComplex(word) {
  return middle(word.replace('*', ___ASTERISK___).replace(/\ +/gim, '').split('').join('**').replace(___ASTERISK___, '\\*'));
};

var findAnyMatch = function findAnyMatch(need, setList, limit) {
  if (limit <= 0) return [];

  var list = copy(setList);
  var found = [];
  while (length(found) < limit && length(list) > 0) {
    var item = list.shift();
    if (anymatch(need, item)) found.push(item);
  }
  return found;
};

var doSearch = function doSearch(need, list, limit) {
  var needSimple = searchSimple(need);
  var needComplex = searchComplex(need);

  var found = findAnyMatch(need, copy(list), limit);

  found = found.concat(findAnyMatch(needSimple, list = arrayDiff(list, found), limit - length(found)));

  found = found.concat(findAnyMatch(needComplex, list = arrayDiff(list, found), limit - length(found)));

  return found;
};

var main = function main() {
  var setNeed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var setList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var setLimit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

  var list = isArray(setList) && length(setList) > 0 ? copy(setList) : undefined;
  if (list === undefined) throw new Error("var 'list' have a invalid value");

  var need = isString(setNeed) ? setNeed : undefined;
  if (need === undefined) throw new Error("var 'need' have a invalid value");
  if (length(need) <= 0) return setList;

  var limit = isNumber(setLimit) && setLimit > 0 ? setLimit : undefined;
  if (limit === undefined) throw new Error("var 'limit' have a invalid value");

  return doSearch(need, list, limit);
};

var _require = require('pytils');

var isNumber = _require.isNumber;
var isString = _require.isString;
var isArray = _require.isArray;
var length = _require.length;
var copy = _require.copy;
var eachVal = _require.eachVal;
var arrayDiff = _require.arrayDiff;


var anymatch = require('anymatch');

module.exports = main;
