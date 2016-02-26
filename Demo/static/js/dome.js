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
            $("#bootstrapLabel [key=dome]").eventModuleCraft({
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
                    $("#bootstrapLabel [key=data]").html("e:"+ e+"<br/>name:"+key+"<br/>val:"+val);
                }
            });
            $("#radio_label_1 [key=dome]").eventModuleCraft({
                //使用的模块
                module: "radioLabel_1",
                //生成html的输入数据
                "data": {data:
                    [
                        {"key": "a", "val": "a"},
                        {"key": "b", "val": "b"},
                        {"key": "c", "val": "c"},
                        {"key": "d", "val": "d "},
                        {"key": "e", "val": "e"},
                        {"key": "f", "val": "f"}
                    ]
                },
                //回调
                "callback": function (e, key, val) {
                    console.log(e, key, val);
                    $("#radio_label_1 [key=data]").html("e:"+ e+"<br/>name:"+key+"<br/>val:"+val);
                }
            });

            $("#bootstrapNavig [key=dome]").eventModuleCraft({
                //使用的模块
                module: "bootstrapNavig",
                //生成html的输入数据
                "data": {
                    linkage:true,
                    data:
                    [
                        {
                            "title": "一",
                            "key": "一",
                            "list": [
                                {
                                    "title": "1",
                                    "key": "一1",
                                    "url": "1"
                                },
                                {
                                    "title": "2",
                                    "key": "一2",
                                    "url": "2"
                                },
                                {
                                    "title": "3",
                                    "key": "一3",
                                    "url": "3"
                                }
                            ]
                        },
                        {
                            "title": "二",
                            "key": "二",
                            "list": [
                                {
                                    "title": "4",
                                    "key": "二1",
                                    "url": "4",
                                    "exAttr":'target="_blank"'
                                },
                                {
                                    "title": "5",
                                    "key": "二2",
                                    "url": "5"
                                },
                                {
                                    "title": "6",
                                    "key": "二3",
                                    "url": "6"
                                }
                            ]
                        }
                    ]
                }
            });
        },
        event: function () {

        }

    }
};