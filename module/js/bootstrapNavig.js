//$("").eventModuleCraft({
//    //使用的模块
//    module: "bootstrapNavig",
//    //生成html的输入数据
//    "data": {
//                "data": [
//                    {
//                        "title": "显示文本",
//                        "key": "键",
//                        "url": "链接",
//                        "exAttr": "给标签其他属性",
//                        "open": 是否展开true/false,
//                        "list": [
//                            {
//                                "title": "显示文本",
//                                "key": "键",
//                                "url": "链接",
//                                "exAttr": "给标签其他属性"
//                            }
//                        ]
//                    }
//                ],
//                    "linkage": 菜单是否联动(手风琴) true/false
//                }
//});

jQueryEventModuleCraftConfig = typeof jQueryEventModuleCraftConfig === "undefined" ? {} : jQueryEventModuleCraftConfig;
jQueryEventModuleCraftConfig = $.extend(jQueryEventModuleCraftConfig, {
    bootstrapNavig: {
        tpl:'\
            {%for (var i = 0, len = data.length, aData, list; i < len; i++) {%}\
                {%aData = data[i];%}\
                {%list = aData[\'list\'];%}\
                    <div class="panel panel-default">\
                        <div class="panel-heading" data-toggle="collapse" href="[data-navig-id=\'collapse{%=i%}\']">\
                            <h4 class="panel-title">\
                                <a data-key="{%=aData[\'key\']%}" class="collapsed" {%=aData[\'exAttr\']?aData[\'exAttr\']:\'\'%}>\
                                    {%=aData[\'title\']%}\
                                </a>\
                            </h4>\
                        </div>\
                        <div data-navig-id="collapse{%=i%}" class="panel-collapse collapse{%=aData[\'open\'] == true ?\' in\':\'\'%}">\
                            <div class="panel-body">\
                                <div class="content-cta list-group" style="margin: -15px">\
                {%for (var k = 0, leng = list.length, item; k < leng; k++) {%}\
                    {%item = list[k];%}\
                                    <a data-key="{%=item[\'key\']%}" href="{%=item[\'url\']%}" class="list-group-item" {%=item[\'exAttr\']?item[\'exAttr\']:\'\'%}>{%=item[\'title\']%}</a>\
                {%}%}\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
            {%}%}'
        ,
        callbackEvent: "click",
        callbackSelector: "a",
        keyAttrName: "data-key",
        valAttrName: "href",
        callbackBefore: function (e, key, val,pool) {
        },
        callbackAfter: function (e, key, val,pool) {
        },
        buildBefore: function (param,pool) {
        },
        buildAfter: function (param,pool) {
            var $ele = $(this),
                tag = $ele.attr(pool.pluginEleTagName);
            $ele.addClass('panel-group');
            if(param.data.linkage == true) $ele.find('[data-toggle="collapse"]').attr('data-parent','['+pool.pluginEleTagName+'=\''+tag+'\']');
        },
        disable: function (status,pool) {
        }
    }
});