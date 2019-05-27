/**
 * 分享与收藏
 */

const share = {
    init: function () {
        share.tabs();
        this.onEvent();
    },
    tabs: function () {
        var _this = this;
        $('.share-tabs li').removeClass('active');
        $('.share-table').hide('slow');
        $('.share-tabs li').eq(0).addClass('active');
        $('.share-table').eq(0).show('slow');

        $('.share-tabs li').on('click', function () {
            var index = $(".share-tabs li").index(this);
            if (index) {
                _this.getCollection();
            } else {
                _this.getShare();
            }
            $('.share-tabs li').removeClass('active');
            $('.share-table').hide('slow');
            $('.share-tabs li').eq(index).addClass('active');
            $('.share-table').eq(index).show('slow');
        });
    },
    onEvent: function () {
        $('.share-action').on('click', function () {
            const id = $(this).data('id');
            $.ajax({
                type: 'POST',
                url: 'aspx/share.aspx',
                data: {id: id},
                success: function (res) {
                    if (res.Code + '' == '200') {
                        this.getShare();
                    }
                }
            })
        });
        $('.collection-action').on('click', function () {
            const id = $(this).data('id');
            $.ajax({
                type: 'POST',
                url: 'aspx/collectoin.aspx',
                data: {id: id},
                success: function (res) {
                    if (res.Code + '' == '200') {
                        this.getCollection();
                    }
                }
            })
        });
    },
    getShare: function () {
        var _this = this;
        var user = clothCommon.getUser();
        $.ajax({
            type: 'POST',
            url: 'apsx/share.aspx',
            data: {
                type: 1,
                userId: user.id
            },
            success: function (res) {
                const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                if (resJson.Code + '' == '200') {
                    var data = resJson.Data || [];
                    _this.renderShare(data);
                }
            }
        });
    },
    getCollection: function () {
        var _this = this;
        var user = clothCommon.getUser();
        $.ajax({
            type: 'POST',
            url: 'apsx/collection.aspx',
            data: {
                type: 1,
                userId: user.id
            },
            success: function (res) {
                const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                if (resJson.Code + '' == '200') {
                    var data = resJson.Data || [];
                    _this.renderCollection(data);
                }
            }
        });
    },
    renderShare: function (data) {
        layui.use('table', function(){
            var table = layui.table;
            //第一个实例
            table.render({
              elem: '#share-table',
              height: 400,
              data: data, //数据接口
              page: true, //开启分页
              cols: [[ //表头
                {field: 'clothImgUrl', title: '图片', width: 100, template: '#cloth-img'},
                {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'},
                {field: 'clothName', title: '衣物名称'},
                {field: 'date', title: '分享时间', sort: true},
                {field: 'belong', title: '所属搭配方案',},
                {field: 'describe', title: '描述'},
                {field: 'action', title: '操作', template: '#share-table-template'}
              ]]
            });
        });
    },
    renderCollection: function (data) {
        layui.use('table', function(){
            var table = layui.table;
            //第一个实例
            table.render({
              elem: '#collection-table',
              height: 400,
              data: data, //数据接口
              page: true, //开启分页
              cols: [[ //表头
                {field: 'clothImgUrl', title: '图片', width: 100, template: '#cloth-img'},
                {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'},
                {field: 'clothName', title: '衣物名称'},
                {field: 'startTime', title: '开始时间', sort: true},
                {field: 'endTime', title: '结束时间', sort: true},
                {field: 'action', title: '操作', template: '#collection-table-template'}
              ]]
            });
        });
    }
}
