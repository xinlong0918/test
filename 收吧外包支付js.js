

    var payData, aid, billNo;

    $(function () {
        var parmError = "";
        if (parmError.toLowerCase() == "true") {
            $(".errorMsg").text("");
            $(".errorMsg").css("display", "block");
            return;
        }
        var urlType = parseInt("");
        if (!isNaN(urlType) && urlType == 2) {
            //$("#txtPayAmt").attr("max", 50000);
            //$("#txtPayAmt").attr("min", 0.01);
            //$("#txtPayAmt").attr("placeholder", "最大50000，最小0.01，金额（元）");
        }
        $("#divContext").show();
        if (location.host.toLowerCase() != "order.pay.jyall.com") {
            $(".icon-logo").css("display", "block");
        } else {
            $("#jyDesc").css("display", "block");
        }

        if ("" && "5") {
                $("#hidIntrType").val("5");
                $("#hidPayAmt").val(localStorage["submit-pay-amt"]);
                $("#txtPayAmt").val(localStorage["submit-pay-amt"]);
                submitPay();
            }
        });

        function submitWeixinPay() {
            WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            payData,//josn串
             function (res) {
                 //回调
                 if (res.err_msg == "get_brand_wcpay_request:ok") {
                     localStorage.removeItem("submit-pay-amt");
                     //支付成功
                     window.location.href = "/Heemoney/JSPayResult?aid=" + aid + "&billNo=" + billNo + "&amt=" + $("#txtPayAmt").val();
             }
             else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                 //用户取消支付,可再次拉起
             }
             else if (res.err_msg == "get_brand_wcpay_request:fail") {
                 //支付失败
                 window.location.href = "/Heemoney/JSPayResult?aid=" + aid + "&billNo=" + billNo + "&amt=" + $("#txtPayAmt").val();
             }
         }
         );
    }

    function submitPay() {
        /// <summary>确认支付</summary>

        $("#imgWaring").hide();
        $("#pErrorMessage").hide();

        if (!checkInput()) {
            $("#txtPayAmt").val("");
            setPayBtnStyle();
            $("#imgWaring").show();
            $("#pErrorMessage").css("display", "inline-block");
            return;
        }
        $("#hidPayAmt").val($("#txtPayAmt").val());
       localStorage["submit-pay-amt"] = $("#hidPayAmt").val();
        hm.form.submit("formSubmitPay", function (data) {
            if (data.HasError) {
                $("#pErrorMessage").text(data.Message, '支付失败');

                $("#imgWaring").show();
                $("#pErrorMessage").css("display", "inline-block");
                return;
            }
            if ("") {//JS拉起微信
                payData = JSON.parse(data.ComData.PayData);
                aid = data.ComData.AccountId;
                billNo = data.ComData.BillNo;
                //调用微信JS api 支付

                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', submitWeixinPay, false);
                    }
                    else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', submitWeixinPay);
                        document.attachEvent('onWeixinJSBridgeReady', submitWeixinPay);
                    }
                }
                else {
                    submitWeixinPay();
                }
            } else if (data.ComData && data.ComData.redirectUrl) {
                window.location.href = data.ComData.redirectUrl;
                return;
            } else if (data.ComData) {
                window.location.href = data.ComData;
                return;
            }

        });
    }
    function checkInput() {
        /// <summary>验证输入</summary>
        var txtPayAmt = $("#txtPayAmt"),
            payAmt = txtPayAmt.val(),
            maxAmt = 50000,
            minAmt = 0.01;
        if (!payAmt) {
            $("#pErrorMessage").text("请输入正确金额,最大" + maxAmt + "，最小" + minAmt);
            $("#txtPayAmt").val("");
            $("#txtPayAmt").focus();
            return false;
        }
        if (isNaN(payAmt)) {
            $("#pErrorMessage").text("请输入正确金额,最大" + maxAmt + "，最小" + minAmt);
            $("#txtPayAmt").val("");
            $("#txtPayAmt").focus();
            return false;
        }
        var reg = /^\d{1,5}.?\d{0,2}$/;
        if (!reg.test(payAmt)) {
            $("#pErrorMessage").text("请输入正确金额,最大" + maxAmt + "，最小" + minAmt);
            $("#txtPayAmt").val("");
            $("#txtPayAmt").focus();
            return false;
        }
        if (parseFloat(payAmt) > maxAmt) {
            $("#pErrorMessage").text("请输入正确金额,最大" + maxAmt);
            $("#txtPayAmt").focus();
            return false;
        }
        if (parseFloat(payAmt) < minAmt) {
            $("#pErrorMessage").text("请输入正确金额，最小" + minAmt);
            $("#txtPayAmt").focus();
            return false;
        }
        return true;
    }

    function inputNum(nav) {
        /// <summary>输入数字</summary>
        /// <param name="nav" type="Object">点击对象</param>
        var num = $(nav).text();
        var oldAmt = $("#txtPayAmt").val();
        if (oldAmt.split(".").length > 1 && oldAmt.split(".")[1].length > 1) {
            return;
        }
        if (oldAmt == "0" && num == "0") {
            return;
        }
        if (oldAmt == "" || oldAmt == "0" && parseFloat(num) >= 0) {
            $("#txtPayAmt").val(parseFloat(num));
            $("#txtPayAmt").attr("class", "hide-placeholder");
        } else {
            if (parseFloat(oldAmt + num) <= 50000) {
                if ((oldAmt + num).split(".").length < 2 || ((oldAmt + num).split(".").length == 2 && (oldAmt + num).split(".")[1].length < 3)) {
                    $("#txtPayAmt").val(oldAmt + num);
                }
            }
        }
    }

    function deleteNum() {
        /// <summary>删除最后数字</summary>
        var oldAmt = $("#txtPayAmt").val();
        if (oldAmt.length > 0 && oldAmt != "") {
            $("#txtPayAmt").val(oldAmt.substr(0, oldAmt.length - 1));

        }
        setPayBtnStyle();
    }

    function inputPoint() {
        /// <summary>输入小数点</summary>

        var oldAmt = $("#txtPayAmt").val();
        if (oldAmt.indexOf(".") > 0 || oldAmt == "") {
            return;
        }
        $("#txtPayAmt").val(oldAmt + ".");
    }

    function cleanMum() {
        /// <summary>清除金额</summary>
        $("#txtPayAmt").val("");

        setPayBtnStyle();
    }


    function setPayBtnStyle() {
        /// <summary>设置支付及相关样式</summary>
        var oldAmt = $("#txtPayAmt").val();
        if (oldAmt == "") {
            $("#txtPayAmt").attr("class", "amt-placeholder")
            $("#btnPay").attr("class", "btn-pay-disable");
            $("#imgDelete").hide();
            $(".tip").removeClass("tip-enable");
        } else {
            $("#txtPayAmt").attr("class", "hide-placeholder");
            $("#imgDelete").show();
            $(".tip").addClass("tip-enable");
            $("#btnPay").attr("class", "btn-pay-enable");
        }
        $("#imgWaring").hide();
        $("#pErrorMessage").hide();
    }

    function openKeyboard() {
        /// <summary>打开键盘</summary>
        $("#ownKeyboard").hide();
        $("#txtPayAmt").attr("type", "number").removeAttr("disabled").focus();
        $("#imgWaring").hide();
        $("#pErrorMessage").hide();
    }

    function closeKeyboard() {
        /// <summary>关闭原生键盘</summary>
        $("#ownKeyboard").show();
        $("#txtPayAmt").attr("type", "text").attr("disabled", "disabled");

        setPayBtnStyle();
    }
    function goBack() {
        hm.callAPP({ cmd: "onFinish", param: {} });
    }
    