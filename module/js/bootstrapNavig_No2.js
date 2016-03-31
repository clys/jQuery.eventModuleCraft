//$("").eventModuleCraft({
//    //使用的模块
//    module: "bootstrapNavig_No2",
//    //生成html的输入数据
//    "data": {
//                "data": [
//                    {
//                        "title": "显示文本",
//                        "key": "键",
//                        "url": "链接",
//                        "exAttr": "给标签其他属性 给予disabled可以禁用动态样式",
//                        "active": 是否活动true/false,
//                        "list": [
//                            {
//                                "title": "显示文本",
//                                "key": "键",
//                                "url": "链接",
//                                "active": 是否活动true/false,
//                                "exAttr": "给标签其他属性 给予disabled可以禁用动态样式"
//                            }
//                        ]
//                    }
//                ],
//                    "linkage": 菜单是否联动(手风琴) true/false
//                }
//});

jQueryEventModuleCraftConfig = typeof jQueryEventModuleCraftConfig === "undefined" ? {} : jQueryEventModuleCraftConfig;
jQueryEventModuleCraftConfig = $.extend(jQueryEventModuleCraftConfig, {
    bootstrapNavig_No2: {
        tpl: '\
            <ul class="yt-nav">\
            {%for (var i = 0, len = data.length, aData, list, leng; i < len; i++) {%}\
                {%aData = data[i];%}\
                {%list = aData[\'list\'];%}\
                {%leng = list?list.length:0;%}\
                    <li{%=aData[\'active\'] == true ?\' class="active"\':\'\'%}>\
                        <a data-key="{%=aData[\'key\']%}"{%=typeof aData[\'url\'] !== \'undefined\'?\'href="\'+aData[\'url\']+\'"\':\'\'%} {%=aData[\'exAttr\']?aData[\'exAttr\']:\'\'%}>\
                            {%=aData[\'title\']%}\
                            {%if(leng > 0){%}\
                            <span class="pull-right">\
                            <i class="glyphicon glyphicon-triangle-right"></i>\
                            <i class="glyphicon glyphicon-triangle-bottom"></i>\
                            </span>\
                            {%}%}\
                        </a>\
                        {%if(leng > 0){%}\
                        <ul>\
                            {%for (var k = 0, item; k < leng; k++) {%}\
                            {%item = list[k];%}\
                            <li{%=item[\'active\'] == true ?\' class="active"\':\'\'%}>\
                            <a data-key="{%=item[\'key\']%}" href="{%=item[\'url\']%}" {%=item[\'exAttr\']?item[\'exAttr\']:\'\'%}>{%=item[\'title\']%}</a>\
                            </li>\
                            {%}%}\
                        </ul>\
                        {%}%}\
                    </li>\
            {%}%}\
            </ul>'
        ,
        callbackEvent: "click",
        callbackSelector: "a",
        keyAttrName: "data-key",
        valAttrName: "href",
        callbackBefore: function (e, key, val, param, pool) {
            var $e = $(this)
                , $ul = $e.siblings('ul')
                , $li = $e.parents('li:eq(0)')
                , disabled = $e.attr('disabled');
            if (disabled == "disabled" || disabled + '' == "true" || disabled == "") {
                return;
            }
            if ($ul.size() > 0) {
                if ($li.hasClass('active')) {
                    $ul.slideUp('fast', function () {
                        $li.removeClass('active');
                    });
                } else {
                    $ul.slideDown('fast', function () {
                        $li.addClass('active');
                    });
                    if (param.data['linkage'] == true) {
                        var $lisi = $li.siblings('.active');
                        $lisi.find('>ul').slideUp('fast', function () {
                            $(this).parents('li:eq(0)').removeClass('active');
                        });
                    }
                }
            } else {
                var $pli = $li.parents('li:eq(0)');
                if ($pli.size() == 0) return;
                $li.addClass('active').siblings().removeClass('active');
                if (!$pli.hasClass('active')) {
                    jQueryEventModuleCraftConfig.bootstrapNavig_No2.callbackBefore.apply($pli.find('>a'), [e, key, val, param, pool])
                }
            }
        },
        callbackAfter: function (e, key, val, param, pool) {
        },
        buildBefore: function (param, pool) {
        },
        buildAfter: function (param, pool) {
            pool.methods['active'] = function (key) {
                var $e = $(this)
                    , $a = $e.find('[data-key="' + key + '"]');
                if ($a.size() > 0) {
                    jQueryEventModuleCraftConfig.bootstrapNavig_No2.callbackBefore.apply($a, [null, key, null, param, pool])
                }
            }

        },
        disable: function (status, pool) {
        }
    }
});