/**
 *  比较两个变量是否相等
 * @param a
 * @param b
 * @returns {*}
 * @private
 */
function _equals (a, b) {
    if (a === b) { return true }
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
        try {
            var isArrayA = Array.isArray(a);
            var isArrayB = Array.isArray(b);
            if (isArrayA && isArrayB) {
                return a.length === b.length && a.every(function (e, i) {
                        return _equals(e, b[i])
                    })
            } else if (!isArrayA && !isArrayB) {
                var keysA = Object.keys(a);
                var keysB = Object.keys(b);
                return keysA.length === keysB.length && keysA.every(function (key) {
                        console.log(key)

                        return _equals(a[key], b[key])
                    })
            } else {
                /* istanbul ignore next */
                return false
            }
        } catch (e) {
            /* istanbul ignore next */
            return false
        }
    } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b)
    } else {
        return false
    }
}
function isObject(o) {
    return o !== null && typeof o === 'object'
}
let result = _equals({a: '1'}, {a: 1})
console.log(result)