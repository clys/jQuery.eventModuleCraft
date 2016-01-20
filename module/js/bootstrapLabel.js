//$("").eventModuleCraft({
//    //使用的模块
//    module: "bootstrapLabel",
//    //生成html的输入数据
//    "data": {data:
//        [
//            {"key": "a", "val": "a", "type": "default"},
//            {"key": "b", "val": "b", "type": "primary"},
//            {"key": "c", "val": "c", "type": "success"},
//            {"key": "d", "val": "d ", "type": "info"},
//            {"key": "e", "val": "e", "type": "warning"},
//            {"key": "f", "val": "f", "type": "danger"}
//        ]
//    },
//    //回调
//    "callback": function (e, key, val) {
//        console.log(e, key, val);
//    }
//});

jQueryEventModuleCraftConfig = typeof jQueryEventModuleCraftConfig === "undefined" ? {} : jQueryEventModuleCraftConfig;
jQueryEventModuleCraftConfig = $.extend(jQueryEventModuleCraftConfig, {
    bootstrapLabel: {
        tpl: '<div class="clearfix"> \
        {%var aData;%} \
        {%if(data && data.length > 0){%}\
        {%for(var i = 0 ,len = data.length; i < len ; i ++ ){%}\
        {%aData = data[i];%}\
        <button data-key="{%=aData[\'key\']%}" data-val="{%=aData[\'val\']%}" class="pull-left btn label label-{%=aData[\'type\']||\'default\'%}" style="margin: 5px;font-size: 12px;">{%=aData[\'key\']%}</button>\
        {%}}%}\
        </div>',
        callbackEvent: "click",
        callbackSelector: "button",
        keyAttrName: "data-key",
        valAttrName: "data-val",
        callbackBefore: function (e, key, val) {
        },
        callbackAfter: function (e, key, val) {
        },
        buildBefore: function (param) {
        },
        buildAfter: function (param) {
        },
        disable: function (status) {
            $(this).find(jQueryEventModuleCraftConfig.bootstrapLabel.callbackSelector).attr("disabled", status);
        }
    }
});