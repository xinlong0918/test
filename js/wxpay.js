/**
 * Created by fan.xinlong on 2017/6/27.
 */


    if("WX"==payType){
        //prepayId=wx20170408175303f35f8e9d220283404818|timeStamp=1491645183471|nonceStr=c0h6kpqy4oto3amalegbsafg19pp7pif|paySign=CDD47A34758FCC520E504FAFB9F2AC4B|appId=wx2b0ad640ef47938b
        var arr = str.split("|");
        function onBridgeReady(arr){
            var prepayId = arr[0].split("=")[1],
                timeStamp = arr[1].split("=")[1],
                nonceStr = arr[2].split("=")[1],
                paySign = arr[3].split("=")[1],
                appId = arr[4].split("=")[1];
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId":appId,     //公众号名称，由商户传入
                    "timeStamp":timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr":nonceStr, //随机串
                    "package":"prepay_id="+prepayId,
                    "signType":"MD5",         //微信签名方式：
                    "paySign":paySign //微信签名
                },
                function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                        toast("支付成功")
                    }
                    if(res.err_msg == "get_brand_wcpay_request:cancel" ) {
                        toast("支付取消")
                    }
                }
            );
        }
        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }else{
            onBridgeReady();
        }
    }


