/**
 * Created by fan.xinlong on 2017/7/5.
 */
const JYCsv = {
    _isIE11 () {
        let iev = 0
        const ieold = (/MSIE (\d+\.\d+)/.test(navigator.userAgent))
        const trident = !!navigator.userAgent.match(/Trident\/7.0/)
        const rv = navigator.userAgent.indexOf('rv:11.0')

        if (ieold) {
            iev = Number(RegExp.$1)
        }
        if (navigator.appVersion.indexOf('MSIE 10') !== -1) {
            iev = 10
        }
        if (trident && rv !== -1) {
            iev = 11
        }

        return iev === 11
    },

    _isEdge: function () {
        return /Edge/.test(navigator.userAgent)
    },

    _getDownloadUrl: function (text) {
        // console.log(211, text)
        const BOM = '\uFEFF'
        // Add BOM to text for open in excel correctly
        if (window.Blob && window.URL && window.URL.createObjectURL && !has('Safari')) {
            const csvData = new Blob([BOM + text], { type: 'text/csv' })
            return URL.createObjectURL(csvData)
        } else {
            return 'data:attachment/csv;charset=utf-8,' + BOM + encodeURIComponent(text)
        }
    },

    download: function (filename, text) {
        if (has('ie') && has('ie') < 10) {
            // has module unable identify ie11 and Edge
            const oWin = window.top.open('about:blank', '_blank')
            oWin.document.charset = 'utf-8'
            oWin.document.write(text)
            oWin.document.close()
            oWin.document.execCommand('SaveAs', filename)
            oWin.close()
        } else if (has('ie') === 10 || this._isIE11() || this._isEdge()) {
            const BOM = '\uFEFF'
            const csvData = new Blob([BOM + text], { type: 'text/csv' })
            navigator.msSaveBlob(csvData, filename)
        } else {
            const link = document.createElement('a')
            link.download = filename
            link.href = this._getDownloadUrl(text)
            link.target = '_blank'
            document.body.appendChild(link)
            if (has('safari')){
                var click_ev = document.createEvent("MouseEvents")
                click_ev.initEvent("click", true , true)
                link.dispatchEvent(click_ev)
            } else {
                link.click()
            }

            document.body.removeChild(link)
        }
    }
}
function JYExportCsv (params) {
    if (params.filename) {
        if (params.filename.indexOf('.csv') === -1) {
            params.filename += '.csv'
        }
    } else {
        let time = Date.parse(new Date()) / 1000
        let todayDate = new Date();
        let date = todayDate.getDate();
        let month= todayDate.getMonth() +1;
        if (date<10) {
            date = '0' + date
        }
        if (month<10) {
            date = '0' + date
        }
        params.filename = month + '-' + date + ' ' + time + '.csv'
        alert(params.filename)
    }

    let columns = []
    let datas = []
    if (params.columns && params.data) {
        columns = params.columns
        datas = params.data
    }

    let noHeader = false
    if ('noHeader' in params) noHeader = params.noHeader

    const data = csv(columns, datas, ',', noHeader)
    JYCsv.download(params.filename, data)
}
function csv (columns, datas, separator = ',', noHeader = false) {
    let columnOrder
    const content = []
    const column = []

    if (columns) {
        columnOrder = columns.map(v => {
            if (typeof v === 'string') {
                return v
            }
            if (!noHeader) {
                column.push((typeof v.title !== 'undefined') ? v.title : v.key)
            }
            return v.key
        })
        if (column.length > 0) {
            content.push(column.join(separator))
        }
    } else {
        columnOrder = []
        datas.forEach(v => {
            if (!Array.isArray(v)) {
                columnOrder = columnOrder.concat(Object.keys(v))
            }
        })
        if (columnOrder.length > 0) {
            columnOrder = columnOrder.filter((value, index, self) => self.indexOf(value) === index)

            if (!noHeader) {
                content.push(columnOrder.join(separator))
            }
        }
    }

    if (Array.isArray(datas)) {
        datas.map(v => {
            if (Array.isArray(v)) {
                return v
            }
            return columnOrder.map(k => {
                if (typeof v[k] !== 'undefined') {
                    return v[k]
                }
                return ''
            })
        }).forEach(v => {
            content.push(v.join(separator))
        })
    }
    return content.join('\r\n')
}
function has (browser) {
    const ua = navigator.userAgent
    if (browser === 'ie') {
        const isIE = ua.indexOf('compatible') > -1 && ua.indexOf('MSIE') > -1
        if (isIE) {
            const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
            reIE.test(ua)
            return parseFloat(RegExp['$1'])
        } else {
            return false
        }
    } else {
        return ua.indexOf(browser) > -1
    }
}
