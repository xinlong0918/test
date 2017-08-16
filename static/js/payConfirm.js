$(document).ready(function(){
	var keyboard = $(".keyboard")
		,spans = keyboard.find("span")
		,oInput = $("#payAccount");
	/*
		横竖屏切换
	*/
	isHorizontal();
	function isHorizontal(){
		if(window.orientation == 90 || window.orientation == -90){
			spans.addClass("vertical")
			$(".pay_confirm").addClass("vertical2")
			$(".content").addClass("content_ver")
			$(".main").addClass("main_ver")
			$(".toast").addClass("toast_ver")
		}else{
			spans.removeClass("vertical")
			$(".pay_confirm").removeClass("vertical2")
			$(".content").removeClass("content_ver")
			$(".main").removeClass("main_ver")
			$(".toast").removeClass("toast_ver")
		}
	}
	$(window).on("orientationchange",function(e){
		isHorizontal();
	});
    /*
    	点击键盘
    */
    keyboard[0].addEventListener('touchstart', function(e){
    	e = e || window.event;
		e.stopPropagation();
		// 阻止长按默认行为；touchend正常触发
		e.preventDefault();
		// 不处理确认支付
		if(unclickable) return;
		if(e.target.className == "pay_confirm") return;
    	if(oInput.text() == "请输入消费金额"){
            oInput.addClass("in").text("");
        }
        // 样式
        spans.removeClass("choose");
        $(e.target).addClass("choose");
        var value = $(e.target).text();
        // 删除
        if(value == "删除"){
			oInput.text(oInput.text().substring(0,oInput.text().length-1));
			if(oInput.text() == ''){
				$(".pay_account").removeClass("bor")
				oInput.removeClass("in").text("请输入消费金额")
			}
			return;
		}
		var currentValue = oInput.text();
		var showValue = "";
		if(currentValue.length >= 12){
			return;
		}
		if(currentValue.length == 0 && value == "00") {
			showValue="0";
		}else{
			if(currentValue.length == 0 && value == ".") return;
			if(currentValue=="0" && value !== ".") return;
			if(currentValue.indexOf(".") !== -1 && value == ".") return;
			if(/\.\d{2}$/.test(currentValue)) return;
			if(/\.\d$/.test(currentValue) && value == "00") return;
			showValue = currentValue + value;
		}
		oInput.text(showValue);
		if(showValue != ''){
			$(".pay_account").addClass("bor")
		}
    });
    keyboard[0].addEventListener('touchend',function(){
    	spans.removeClass("choose"); 
    });
    // 确认支付
    var unclickable = false, time = 0;
	$(".pay_confirm").on("touchstart",function(e){
		e = e || window.event;
		e.stopPropagation();
		if(unclickable) return;
		var amount = parseInt(oInput.text()*100);
		if(isNaN(amount) || amount == 0 || /\d{1}\.$/.test(oInput.text())){
			toast("请输入金额");
			loading(false);
			return;
		}
		if(!navigator.onLine){
			toast("网络连接失败，请稍后再试");
			loading(false);
			return;
		}
		// var ticket=$("#ticket").val();
		var tradeInfo=$("#tradeInfo").val();
        var opendId=$("#openId").val();
        var payType=$("#payType").val();
        var domainUrl=$("#domainUrl").val();
		var obj = {
			"amount": amount,
			// "ticket": ticket,
			"tradeInfo": tradeInfo,
			"opendId": opendId
		};
		param = JSON.stringify(obj);
        loading(true);
        time = new Date()
        $.ajax({
		    url: domainUrl+"/pay",
			type: "POST",
			data: param,
			dataType:"json",
			contentType: "application/json",
			beforeSend: function(request) {
                request.setRequestHeader("partner", "JYALL");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
            	toast("出了点小问题，请稍后再试");
            	loading(false);
            	return;
            },
			success: function(res){
            	alert('下单时间：' + (new Date() - time))
				if(res.code != 200){
					toast("出了点小问题，请稍后再试");
                    loading(false)
					return;
				}
				var str = res.data.payInfo;
				if("ZFB"==payType||"QQ"==payType||"BD"==payType||"JD"==payType){
					window.location.href=str;
				}
				if("WX"==payType){
					//prepayId=wx20170408175303f35f8e9d220283404818|timeStamp=1491645183471|nonceStr=c0h6kpqy4oto3amalegbsafg19pp7pif|paySign=CDD47A34758FCC520E504FAFB9F2AC4B|appId=wx2b0ad640ef47938b
					var arr = str.split("|"),
						prepayId = arr[0].split("=")[1],
						timeStamp = arr[1].split("=")[1],
						nonceStr = arr[2].split("=")[1],
						paySign = arr[3].split("=")[1],
						appId = arr[4].split("=")[1];
					alert('开始调起微信支付...')
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": appId,     //公众号名称，由商户传入
                            "paySign": paySign,         //微信签名
                            "timeStamp": timeStamp, //时间戳，自1970年以来的秒数
                            "nonceStr": nonceStr , //随机串
                            "package": "prepay_id="+prepayId,  //预支付交易会话标识
                            "signType": "MD5"     //微信签名方式
                        },
                        function(res){
                            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                window.location.href = "/qrpay/paysuccess?tradeInfo="+tradeInfo;
                            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                                loading(false)
                            }else if(res.err_msg == "get_brand_wcpay_request:fail" ){
                                toast('支付失败');
                            }
                        }
                    );
				}
			}
		});
	});
	// 全部删除
	$(".delicon").on("touchstart",function(){
		$(".pay_account").removeClass("bor")
		oInput.removeClass("in").text("请输入消费金额")
	});

	function loading(bool){
		unclickable=bool;
		!unclickable?$(".pay_confirm").html("<span>确认<br>支付</span>").removeClass("pay_confirm_ver"):$(".pay_confirm").html("<span>支付<br>中</span>").addClass("pay_confirm_ver");
	}
	// toast提示
	var t = '';
	function toast(str){
		$(".toast").text(str).fadeIn(400);
		t = setTimeout(function(){
			$(".toast").fadeOut(400);
			clearTimeout(t);
		},2000)
	}
});
