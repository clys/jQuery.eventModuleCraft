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