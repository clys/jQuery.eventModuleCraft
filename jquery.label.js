(function ($) {
    var versions = "1.0",
        pluginName = "jQuery.label",
        pluginMethodsName = "label",
        pluginEleTagName = "label-tag",
        methods = {},
        pool = {
            defaultParam: {},
            eleMap: {}
        };

    /* private methods ------------------------------------------------------ */
    var utils = {
        pool: {
            buoyUID: 0
        },
        getUID: function () {
            return (new Date()).getMilliseconds() + utils.pool.buoyUID++;
        },
        object:{
            isNull:function(obj){
                return typeof obj === "undefined" || obj === null;
            },
            isNotNull:function(obj){
                return !utils.object.isNull(obj);
            }
        },
        string:{
            isBlank:function(str){
                return utils.object.isNull(str) || $.trim(str).length === 0;
            },
            isNotBlank:function(str){
                return !utils.string.isBlank(str);
            }
        }
    };
    function pushEleObj(ele,param){
        var uid = utils.getUID();
        $(ele).attr(pluginEleTagName,uid);
        pool.eleMap[uid] = {ele:ele,param:param}
    }
    function pullEleObj(ele){
        var uid = $(ele).attr(pluginEleTagName);
        return pool.eleMap[uid];
    }

    /* public methods ------------------------------------------------------- */
    methods = {
        init: function (options) {
            var $ele = $(this);
            var param = $.extend({}, pool.defaultParam, options);
            $ele.each(function () {

            })
        },
        ver:function(){
            return versions;
        }
    };
    $.fn[pluginMethodsName] = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("方法 " + method + "不存在于" + pluginName);
        }

    };
})(jQuery);