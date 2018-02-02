
let fs = require('fs')
let path = require('path')

let filePath = process.argv[2]

readAllFile(filePath)

// 遍历所有文件
function readAllFile (dirPath) {
    fs.readdir(dirPath, (err, files)=>{
        if (err) return console.error(err)
        files.forEach(fileName => {
            let fileDir = path.join(dirPath, fileName)
            fs.stat(fileDir, (err, stats)=>{
                if (err) return console.error(err)
                if (stats.isDirectory()) { //
                    readAllFile(fileDir)
                }
                if (stats.isFile()) { //
                    deleteLog(fileDir)
                }
            })
        })
    })
}

// 处理文件
function deleteLog (filePath) {
    if (!/\.js$/.test(filePath)) return false
    fs.readFile(filePath, function (err, data) {
        if (err) {
            return console.error(err)
        }
        let content = data.toString().replace(/console\.log\(.*\)(;)?/, '')
        fs.writeFile(filePath, content, function (err) {
            if(!err) {
            }
        })
    })
}
