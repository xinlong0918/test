/**
 * Created by fan.xinlong on 2018/1/9.
 */
/*
 *  精确获取变量 数据类型 Object Number String Boolean Undefined Null
 * */
function getRawTypeDemo() {
    var _toString = Object.prototype.toString;

    function toRawType(value) {
        return _toString.call(value)
        return _toString.call(value).slice(8, -1)
    }

    let obj = {}
    let str = "123"
    let num = 231
    let boo = true
    let undf = undefined
    let nan = NaN
    let nul = null
    /*
     [object Object] [object Object] object
     [object String] 123 string
     [object Number] 231 number
     [object Boolean] true boolean
     [object Undefined] undefined
     [object Number] NaN number
     [object Null] object
     * */
    console.log(toRawType(obj), obj.toString(), typeof obj)
    console.log(toRawType(str), str.toString(), typeof str)
    console.log(toRawType(num), num.toString(), typeof num)
    console.log(toRawType(boo), boo.toString(), typeof boo)
    console.log(toRawType(undf), typeof undf)
    console.log(toRawType(nan), nan.toString(), typeof nan)
    console.log(toRawType(nul), typeof nul)
}

/*
 *  JSON.stringify()
 * */
// stringfyDemo()
function stringfyDemo() {
    let obj = {name: 'xiao-ming', age: 12}
    console.log(JSON.stringify(obj))
    console.log(JSON.stringify(obj, ['name'])) // 字段过滤
    console.log(JSON.stringify(obj, ['name'], 9)) // 换行缩进格数
}

/*
 *  Array.prototype.every
 * */
console.log(arrEvery())
function arrEvery () {
    let arr = [1,2,3,4]
        ,arr2 = [1, 2, 3, 5]
    return arr.length===arr2.length && arr.every(function (item, index) {
        console.log(index)
        return equal(item, arr2[index])
    })
}
function equal (a, b) {
    if (a===b) {return true;}
}



























