$(function () {
    DomeWebController.init();
});


DomeWebController = {
    pool: {
        element: {}
    },
    getEle: function (k) {
        return this.pool.element[k];
    },
    setEle: function (k, v) {
        DomeWebController.pool.element[k] = v;
    },
    init: function () {
        DomeWebController.inits.element();
        DomeWebController.inits.event();

    },
    inits: {
        element: function () {
            DomeWebController.setEle("$data",$("#show_data_1"));
            $("#dome").eventModuleCraft({
                //使用的模块
                module: "bootstrapLabel",
                //生成html的输入数据
                "data": {data:
                    [
                        {"key": "a", "val": "a", "type": "default"},
                        {"key": "b", "val": "b", "type": "primary"},
                        {"key": "c", "val": "c", "type": "success"},
                        {"key": "d", "val": "d ", "type": "info"},
                        {"key": "e", "val": "e", "type": "warning"},
                        {"key": "f", "val": "f", "type": "danger"}
                    ]
                },
                //回调
                "callback": function (e, key, val) {
                    console.log(e, key, val);
                    DomeWebController.getEle("$data").html("e:"+ e+"<br/>name:"+key+"<br/>val:"+val);
                }
            });
        },
        event: function () {

        }

    }
};