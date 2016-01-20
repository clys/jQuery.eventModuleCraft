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