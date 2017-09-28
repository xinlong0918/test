/**
 * Created by fan.xinlong on 2017/8/9.
 */

/***
 *支付
 */
function trade(amount, couponId, couponAmount, openId, tradeInfo, payType, domainUrl) {
    var obj = {
        "amount": amount,
        "tradeInfo": tradeInfo,
        "openId": openId,
        "couponId": couponId,
        "couponAmount": couponAmount
    };
    param = JSON.stringify(obj);
    // loading(true);
    $.ajax({
        url: domainUrl + "/pay",
        type: "POST",
        data: param,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function (request) {
            request.setRequestHeader("partner", "JYALL");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest)
            console.log(textStatus)
            console.log(errorThrown)
            toast("出了点小问题，请稍后再试");
            loading(false);
            return;
        },
        success: function (res) {
            console.log(res)
            console.log(res.data)
            if (res.code != 200) {
                toast("出了点小问题，请稍后再试");
                loading(false)
                return;
            }
            if (res.data.payInfo == null) {
                toast(res.data);
                loading(false)
                return;
            }
            var str = res.data.payInfo;
            if ("WX" == payType) {
                //prepayId=wx20170408175303f35f8e9d220283404818|timeStamp=1491645183471|nonceStr=c0h6kpqy4oto3amalegbsafg19pp7pif|paySign=CDD47A34758FCC520E504FAFB9F2AC4B|appId=wx2b0ad640ef47938b
                var arr = str.split("|"),
                    prepayId = arr[0].split("=")[1],
                    timeStamp = arr[1].split("=")[1],
                    nonceStr = arr[2].split("=")[1],
                    paySign = arr[3].split("=")[1],
                    appId = arr[4].split("=")[1];
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": appId,     //公众号名称，由商户传入
                        "paySign": paySign,         //微信签名
                        "timeStamp": timeStamp, //时间戳，自1970年以来的秒数
                        "nonceStr": nonceStr, //随机串
                        "package": "prepay_id=" + prepayId,  //预支付交易会话标识
                        "signType": "MD5"     //微信签名方式
                    },
                    function (res) {
                        console.log("WeixinJSBridge", res)
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            window.location.href = "/qrpay/paysuccess?tradeInfo=" + tradeInfo;
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            loading(false)
                            if (couponId != null && couponId != "") {
                                var unionId = $("#unionId").val();
                                couponUnLock(unionId, couponId, domainUrl, function () {

                                });
                            }
                        }
                    }
                )
            } else {
                window.location.href = str;
            }
        }
    });
}

/*
 *   toast提示
 * */
var toastTimeout = null;
function toast(str) {
    if (toastTimeout){
        return;
    }
    var oToast = $(".toast");
    if (oToast.length == 0) {
        var oToast = $("<div></div>");
        oToast.addClass("toast");
        $("body").append(oToast);
    } else {
        oToast = oToast.eq(0);
    }
    clearTimeout(toastTimeout);
    oToast.text(str).fadeIn(400);
    toastTimeout = setTimeout(function () {
        oToast.fadeOut(400);
        toastTimeout = null;
    }, 2000)
}
function formatDateTime(timeStamp) {
    var date = new Date();
    date.setTime(timeStamp);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d;
    // return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
};

var getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";
};
//关闭webview

function closeWindow() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        WeixinJSBridge.call('closeWindow');//微信
    } else if (ua.indexOf("alipay") != -1) {
        AlipayJSBridge.call('closeWebview'); //支付宝
    } else if (ua.indexOf("baidu") != -1) {
        BLightApp.closeWindow();//百度钱包
    }
}
/*
 *   加载中。。。。。
 * */
function loadingDonghuaShow() {
    var oDiv = $("<div>");
    oDiv.attr("class", "loading-animation");
    oDiv.append("<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5ZmEzZWYxMC1jMTc0LTQxOWQtYjM0MC1hYzA0MWJkZTAxMjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDE1QTMzQ0E3RjY0MTFFNzlBOTRCQTJFMjUwMTYzMkYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDE1QTMzQzk3RjY0MTFFNzlBOTRCQTJFMjUwMTYzMkYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowODk5OGQ5Yy1mMDQ0LTRhMjEtOTEwMC0zYzdhMTA4MTk5NTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OWZhM2VmMTAtYzE3NC00MTlkLWIzNDAtYWMwNDFiZGUwMTIw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'>")
    oDiv.appendTo($("body"))
}
function loadingDonghuaHide() {
    $(".loading-animation").remove();
}
function loadingDonghuaShow2() {
    var oDiv = $("<div>");
    oDiv.attr("class", "loading-animation loading-animation2");
    oDiv.append("<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5ZmEzZWYxMC1jMTc0LTQxOWQtYjM0MC1hYzA0MWJkZTAxMjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDE1QTMzQ0E3RjY0MTFFNzlBOTRCQTJFMjUwMTYzMkYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDE1QTMzQzk3RjY0MTFFNzlBOTRCQTJFMjUwMTYzMkYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowODk5OGQ5Yy1mMDQ0LTRhMjEtOTEwMC0zYzdhMTA4MTk5NTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OWZhM2VmMTAtYzE3NC00MTlkLWIzNDAtYWMwNDFiZGUwMTIw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'>")
    oDiv.appendTo($("body"))
}
function loadingDonghuaHide2() {
    $(".loading-animation").remove();
}


/*
 *   判断ios版本 是否大于9
 * */

function checkIosVersion() {
    //获取固件版本
    var getOsv = function () {
        var reg = /OS ((\d+_?){2,3})\s/;
        if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
            var osv = reg.exec(navigator.userAgent);
            if (osv.length > 0) {
                return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.');
            }
        }
        return '';
    };
    var osv = getOsv();
    if (osv == '') {
        return true;
    }
    var osvArr = osv.split('.');
    //初始化显示ios9引导
    if (osvArr && osvArr.length > 0) {

        if (parseInt(osvArr[0]) >= 10) {
            return true
        }
    }
    return false
}
