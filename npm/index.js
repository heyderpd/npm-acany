'use strict';

/*!
 * acany
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * MIT Licensed
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

var findAnyMatch = function findAnyMatch(anyneed, setList, limit) {
  if (limit <= 0) return [];

  var list = copy(setList);
  var found = {};
  var foundCount = 0;
  var ref = void 0;
  while (foundCount < limit && length(list) > 0) {
    var item = list.shift();
    if ((ref = anymatch(anyneed, item, true)) >= 0) {
      if (!hasProp(found, ref)) {
        found[ref] = [];
      }
      found[ref].push(item);
      foundCount++;
    }
  }
  return found;
};

var concatResult = function concatResult(results) {
  var found = [];
  eachVal(results, function (maths) {
    if (length(maths) > 0) {
      eachVal(maths, function (item) {
        found.push(item);
      });
    }
  });
  return found;
};

var doSearch = function doSearch(need, list, limit) {
  var anyneed = [need, searchSimple(need), searchComplex(need)];

  var found = findAnyMatch(anyneed, copy(list), limit);

  return concatResult(found);
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
var hasProp = _require.hasProp;


var anymatch = require('anymatch');

module.exports = main;
