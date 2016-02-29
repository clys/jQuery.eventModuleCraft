(function ($) {
    var pool = {
        versions: "1.0",
        pluginMethodsName: "eventModuleCraft",
        pluginName: "jQuery.eventModuleCraft",
        pluginEleTagName: "event-module-craft-tag",
        methods: {},
        defaultParam: {
            disabled: false
        },
        eleMap: {},
        utils: {
            pool: {
                buoyUID: 0
            },
            getUID: function () {
                return (new Date()).getMilliseconds() + pool.utils.pool.buoyUID++;
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
                    return pool.utils.object.isNull(str) || $.trim(str).length === 0;
                },
                isNotBlank: function (str) {
                    return !this.isBlank(str);
                },
                isEmpty: function (str) {
                    return pool.utils.object.isNull(str) || str.length === 0;
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
                        if (pool.utils.string.isEmpty(str)) {
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
        }
    };
    $.fn[pool.pluginMethodsName] = function (method) {
        // Method calling logic
        if (pool.methods[method]) {
            return pool.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return pool.methods.init.apply(this, arguments);
        } else {
            $.error("方法 " + method + "不存在于" + pool.pluginName);
        }
    };
    /* private methods ------------------------------------------------------ */

    function pushEleObj(ele, param) {
        var $ele = $(ele);
        if (pool.utils.object.isNotNull(pullEleObj($ele))) {
            return false;
        }
        var parameter = $.extend({}, pool.defaultParam, param);
        var uid = pool.utils.getUID();
        $ele.attr(pool.pluginEleTagName, uid);
        var eleObj = {ele: $ele, param: parameter};
        pool.eleMap[uid] = eleObj;
        return eleObj;
    }

    function pullEleObj(ele) {
        var uid = getAttrVal(ele, pool.pluginEleTagName);
        if (pool.utils.string.isEmpty(uid)) {
            return null;
        }
        return pool.eleMap[uid];
    }

    function updateEleObj(eleObj) {
        var uid = getAttrVal(eleObj.ele, pool.pluginEleTagName);
        pool.eleMap[uid] = eleObj;
        return updateEleObj;
    }

    function removeEleObj(eleObj) {
        var uid = getAttrVal(eleObj.ele, pool.pluginEleTagName);
        delete pool.eleMap[uid];
        return removeEleObj;
    }

    function getAttrVal(ele, attrName) {
        var $ele = $(ele);
        return $ele.attr(attrName) || $ele.parents('[' + attrName + ']:first').attr(attrName);
    }

    function getConfig(moduleName) {
        var config = jQueryEventModuleCraftConfig[moduleName];
        if (pool.utils.object.isNull(config)) {
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
        if (config['callbackBefore']) config['callbackBefore'].apply(this, [e, key, val,pool]);
        if (eleObj.param.callback) eleObj.param.callback.apply(this, [e, key, val,pool]);
        if (config['callbackAfter']) config['callbackAfter'].apply(this, [e, key, val,pool]);
    }

    /* public methods ------------------------------------------------------- */
    pool.methods = {
        init: function (options) {
            var $ele = $(this);
            $ele.each(function () {
                var $currentEle = $(this),
                    eleObj = pushEleObj($currentEle, options),
                    param = eleObj.param;
                if (!eleObj) return true;
                var config = getConfig(eleObj.param['module']);
                if (pool.utils.object.isNull(config)) return true;
                if (config['buildBefore']) param = config['buildBefore'].apply(this, [param,pool]) || param;
                $currentEle.html(pool.utils.string.buildTpl(config['tpl'], param.data));
                if (pool.utils.string.isNotEmpty(config['callbackEvent'])) $currentEle.on(config['callbackEvent'], config['callbackSelector'], callback);
                if (config['buildAfter']) config['buildAfter'].apply(this, [param,pool]);
            });
            return this;
        },
        disable: function (status) {
            var $ele = $(this);
            $ele.each(function () {
                var $currentEle = $(this),
                    eleObj = pullEleObj($currentEle);
                if (pool.utils.object.isNull(eleObj)) return true;
                var config = getConfig(eleObj.param['module']);
                if (pool.utils.object.isNull(config)) return true;
                eleObj.param.disabled = typeof status === "boolean" ? status : !eleObj.param.disabled;
                if (config['disable']) config['disable'].apply(this, [eleObj.param.disabled,pool]);
            });
            return this;
        },
        trigger: function (key) {
            var $ele = $(this);
            $ele.each(function () {
                var $currentEle = $(this),
                    eleObj = pullEleObj($currentEle);
                if (pool.utils.object.isNull(eleObj)) return true;
                var config = getConfig(eleObj.param['module']);
                if (pool.utils.object.isNull(config)) return true;
                var $targetEle = $currentEle.find('[' + config['keyAttrName'] + '=' + key + ']:first');
                if ($targetEle.size() === 1) {
                    callback.apply($targetEle, ['code.trigger']);
                }

            });
            return this;
        },
        ver: function () {
            return pool.versions;
        }
    };
})(jQuery);