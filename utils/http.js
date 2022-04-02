var e = require("es6-promise.js")

module.exports.send_request = function(n, type, d, i) {
    return new e(function(e, i) {
        let header={
            "content-type": "application/json"
        }
        if(wx.getStorageSync("cookieKey")){
            header["Cookie"]=wx.getStorageSync("cookieKey");
        }
        if(wx.getStorageSync("accessToken")){
            header["ACSSESS-TOKEN"]=wx.getStorageSync("accessToken");
        }
        if(d.is_from && d.is_from==1){
            header["content-type"]="application/x-www-form-urlencoded";
        }
    // console.log(wx.getStorageSync("cookieKey"))

        wx.request({
            url: n,
            data: d,
            method: type,
            header: header,
            success: function(a) {
                //console.log(a.header["Set-Cookie"])
                if(!wx.getStorageSync("cookieKey")){
                    wx.setStorageSync("cookieKey", a.header["Set-Cookie"])
                }
                if(a.data.code=='0000' || a.data.code=='5000'){
                    e(a.data.data)
                }else if(a.data.code=='5342'){
                    e(a.data.msg)
                }else if(a.data.code=='00010' || a.data.code=='00011' || a.data.code=='00012' || a.data.code=='00013' || a.data.code=='00014' || a.data.code=='00015'){
                    wx.removeStorageSync("user_id");
                    wx.removeStorageSync("token");
                    wx.removeStorageSync("refreshToken");
                    wx.navigateTo({
                        //登录
                        url: "/pages/login/index"
                    })
                }else{
                    let error_msg='';
                    if(a.data.msg){
                        error_msg=a.data.msg
                    }else{
                        error_msg="接口系统错误"
                    }
                    wx.showToast({
                        title: error_msg,
                        icon: "none",
                        duration: 1500
                    }), setTimeout(function() {
                        //e(null);
                    }, 1500);
                }
            },
            fail: function() {
                wx.showToast({
                    title: "服务器错误",
                    icon: "none",
                    duration: 2e3
                });
            },
            complete: function() {}
        });
    });
};