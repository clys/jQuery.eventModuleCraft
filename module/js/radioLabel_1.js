//$("").eventModuleCraft({
//    //使用的模块
//    module: "radioLabel_1",
//    //生成html的输入数据
//    "data": {data:
//        [
//            {"key": "a", "val": "a"},
//            {"key": "b", "val": "b"},
//            {"key": "c", "val": "c"},
//            {"key": "d", "val": "d "},
//            {"key": "e", "val": "e"},
//            {"key": "f", "val": "f"}
//        ]
//    },
//    //回调
//    "callback": function (e, key, val) {
//        console.log(e, key, val);
//    }
//});
jQueryEventModuleCraftConfig = typeof jQueryEventModuleCraftConfig === "undefined" ? {} : jQueryEventModuleCraftConfig;
jQueryEventModuleCraftConfig = $.extend(jQueryEventModuleCraftConfig, {
    radioLabel_1: {
        tpl: '\
        {%var aData;%} \
        {%if(data && data.length > 0){%}\
        {%for(var i = 0 ,len = data.length; i < len ; i ++ ){%}\
        {%aData = data[i];%}\
        <a data-key="{%=aData[\'key\']%}" data-val="{%=aData[\'val\']%}">{%=aData[\'key\']%}</a>\
        {%}}%}',
        callbackEvent: "click",
        callbackSelector: "a",
        keyAttrName: "data-key",
        valAttrName: "data-val",
        callbackBefore: function (e, key, val) {
            $(this).addClass("current").siblings().removeClass("current");
        },
        callbackAfter: function (e, key, val) {

        },
        buildBefore: function (param) {

        },
        buildAfter: function (param) {
            $(this).addClass("radio-label_1 clearfix");
        },
        disable: function (status) {
            $(this).find(jQueryEventModuleCraftConfig.radioLabel_1.callbackSelector).attr("disabled", status);
        }
    }
});