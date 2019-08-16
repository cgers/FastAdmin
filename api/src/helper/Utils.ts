/**
 * @param items An array of items.
 * @param fn A function that accepts an item from the array and returns a promise.
 * @returns {Promise}
 */
export async function forEachPromise(items, fn) {
  return items.reduce(function(promise, item) {
    return promise.then(function() {
      return fn(item)
    })
  }, Promise.resolve())
}

/**
 * leftPad("foo",5,"!") returns "!!foo"
 * @param str A string to left pad e.g. "foo"
 * @param len The total length of the padded string, must be larger than string length e.g. 5 in the case of "foo"
 * @param ch The character to pad the string with e.g. "*"
 */
export function leftPad(str: string, len: number, ch: string): string {
  len = len - str.length + 1
  return len > 0 ? new Array(len).join(ch) + str : str
}

/**
 * rightPad("foo",5,"!") returns "foo!!"
 * @param str A string to right pad e.g. "foo"
 * @param len The total length of the padded string, must be larger than string length e.g. 5 in the case of "foo"
 * @param ch The character to pad the string with e.g. "*"
 */
export function rightPad(str: string, len: number, ch: string): string {
  len = len - str.length + 1
  return len > 0 ? str + new Array(len).join(ch) : str
}

/**
 *
 * @param array An array of objects
 * @param callback
 * Example from : https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
 */
export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
