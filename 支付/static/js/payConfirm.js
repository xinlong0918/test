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
    var unclickable = false;
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
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: appId, // 必填，公众号的唯一标识
						timestamp: timeStamp, // 必填，生成签名的时间戳
						nonceStr: nonceStr, // 必填，生成签名的随机串
						signature: 'MD5',// 必填，签名，见附录1
						jsApiList: [
							"chooseWXPay"
						] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
					wx.ready(function(){
						wx.chooseWXPay({
							timestamp:  timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
							nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
							package: "prepay_id="+prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
							signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
							paySign: paySign, // 支付签名
							success: function (res) {
							   window.location.href = "/qrpay/paysuccess?tradeInfo="+tradeInfo;
							},
                            cancel: function (res) {
                                loading(false)
                            }
						});
					});
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
