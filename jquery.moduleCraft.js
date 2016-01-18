(function ($) {
    var versions = "1.0",
        pluginName = "jQuery.moduleCraft",
        pluginMethodsName = "moduleCraft",
        pluginEleTagName = "module-craft-tag",
        methods = {},
        pool = {
            defaultParam: {
                disabled: false
            },
            eleMap: {}
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
    /* private methods ------------------------------------------------------ */
    var utils = {
        pool: {
            buoyUID: 0
        },
        getUID: function () {
            return (new Date()).getMilliseconds() + utils.pool.buoyUID++;
        },
        object: {
            isNull: function (obj) {
                return typeof obj === "undefined" || obj === null;
            },
            isNotNull: function (obj) {
                return !this.isNull(obj);
            }
        },
        string: {
            isBlank: function (str) {
                return utils.object.isNull(str) || $.trim(str).length === 0;
            },
            isNotBlank: function (str) {
                return !this.isBlank(str);
            },
            isEmpty: function (str) {
                return utils.object.isNull(str) || str.length === 0;
            },
            isNotEmpty: function (str) {
                return !this.isEmpty(str)
            },
            buildTpl: function (tpl, data) {
                var re = /\{%=?((?!%}).)*%}/g,
                    code = "var r = [];",
                    cursor = 0,
                    match;

                function add(str, mode) {
                    if (utils.string.isEmpty(str)) {
                        return add;
                    }

                    if (mode === 1) {
                        code += str;
                    } else if (mode === 2) {
                        code += "r.push(" + str + ");"
                    } else {
                        code += "r.push('" + str.replace(/'/g, "\\'") + "');"
                    }
                    return add;
                }

                while (match = re.exec(tpl)) {
                    add(tpl.slice(cursor, match.index))(match[0].replace(/(^\{%=|^\{%|%}$)/g, ""), /^(\t| )*\{%=/g.test(match[0]) ? 2 : 1);
                    cursor = match.index + match[0].length;
                }
                add(tpl.substr(cursor));
                code += 'return r.join("");';
                var keys = [], param = [];
                for (var key in data) {
                    if (typeof data[key] === "function") {
                        continue;
                    }
                    keys.push(key);
                    param.push(data[key]);
                }
                return (new Function(keys.join(","), code.replace(/[\r\t\n]/g, ''))).apply(null, param);
            }
        }
    };

    function pushEleObj(ele, param) {
        var $ele = $(ele);
        if (utils.object.isNotNull(pullEleObj($ele))) {
            return false;
        }
        var parameter = $.extend({}, pool.defaultParam, param);
        var uid = utils.getUID();
        $ele.attr(pluginEleTagName, uid);
        var eleObj = {ele: $ele, param: parameter};
        pool.eleMap[uid] = eleObj;
        return eleObj;
    }

    function pullEleObj(ele) {
        var uid = getAttrVal(ele, pluginEleTagName);
        if (utils.string.isEmpty(uid)) {
            return null;
        }
        return pool.eleMap[uid];
    }

    function updateEleObj(eleObj) {
        var uid = getAttrVal(eleObj.ele, pluginEleTagName);
        pool.eleMap[uid] = eleObj;
        return updateEleObj;
    }

    function removeEleObj(eleObj) {
        var uid = getAttrVal(eleObj.ele, pluginEleTagName);
        delete pool.eleMap[uid];
        return removeEleObj;
    }

    function getAttrVal(ele, attrName) {
        var $ele = $(ele);
        return $ele.attr(attrName) || $ele.parents('[' + attrName + ']:first').attr(attrName);
    }

    function getConfig(moduleName) {
        var config = jQueryModuleCraftConfig[moduleName];
        if (utils.object.isNull(config)) {
            return null;
        }
        return config;
    }

    function callback(e) {
        var eleObj = pullEleObj(this),
            config = getConfig(eleObj.param['module']),
            key = getAttrVal(this, config['keyAttrName']),
            val = getAttrVal(this, config['valAttrName']);
        if (eleObj.param.disabled) return;
        if (config['callbackBefore']) config['callbackBefore'].apply(this, [e, key, val]);
        if (eleObj.param.callback) eleObj.param.callback.apply(this, [e, key, val]);
        if (config['callbackAfter']) config['callbackAfter'].apply(this, [e, key, val]);
    }

    /* public methods ------------------------------------------------------- */
    methods = {
        init: function (options) {
            var $ele = $(this);
            $ele.each(function () {
                var $currentEle = $(this),
                    eleObj = pushEleObj($currentEle, options),
                    param = eleObj.param;
                if (!eleObj) return true;
                var config = getConfig(eleObj.param['module']);
                if (utils.object.isNull(config)) return true;
                if (config['buildBefore']) param = config['buildBefore'].apply(this, [param]) || param;
                $currentEle.html(utils.string.buildTpl(config['tpl'], param.data)).on(config['callbackEvent'], config['callbackSelector'], callback);
                if (config['buildAfter']) config['buildAfter'].apply(this, [param]);
            })
        },
        disable: function (status) {
            var $ele = $(this);
            $ele.each(function () {
                var $currentEle = $(this),
                    eleObj = pullEleObj($currentEle);
                if (utils.object.isNull(eleObj)) return true;
                var config = getConfig(eleObj.param['module']);
                if (utils.object.isNull(config)) return true;
                eleObj.param.disabled = typeof status === "boolean" ? status : !eleObj.param.disabled;
                if (config['disable']) config['disable'].apply(this, [eleObj.param.disabled]);
            })
        },
        trigger: function (key) {
            var $ele = $(this);
            $ele.each(function () {
                var $currentEle = $(this),
                    eleObj = pullEleObj($currentEle);
                if (utils.object.isNull(eleObj)) return true;
                var config = getConfig(eleObj.param['module']);
                if (utils.object.isNull(config)) return true;
                var $targetEle = $currentEle.find('[' + config['keyAttrName'] + '=' + key + ']:first');
                if ($targetEle.size() === 1) {
                    callback.apply($targetEle, ['code.trigger']);
                }

            })
        },
        ver: function () {
            return versions;
        }
    };
})(jQuery);