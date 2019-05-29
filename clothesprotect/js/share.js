/**
 * 分享与收藏
 */

const share = {
    init: function () {
        this.tabs();
        this.onEvent();
        this.getShare();
        this.getCollection();
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
                _this.collectionTable.reload('collection');
            } else {
                _this.shareTable.reload('share');
            }
            $('.share-tabs li').removeClass('active');
            $('.share-table').hide('slow');
            $('.share-tabs li').eq(index).addClass('active');
            $('.share-table').eq(index).show('slow');
        });
    },
    onEvent: function () {
        var _this = this;
        $('.share-table').on('click', '.share-action', function () {
            const id = $(this).data('id');
            $.ajax({
                type: 'POST',
                url: 'aspx/share.aspx',
                data: { id: id, type: 4 },
                success: function (res) {
                    if (res.Code + '' == '200') {
                        _this.getShare();
                    }
                }
            })
        });
        $('.share-table').on('click', '.collection-action', function () {
            const id = $(this).data('id');
            $.ajax({
                type: 'POST',
                url: 'aspx/collection.aspx',
                data: { id: id, type: 4 },
                success: function (res) {
                    if (res.Code + '' == '200') {
                        _this.getCollection();
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
            url: 'aspx/share.aspx',
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
            url: 'aspx/collection.aspx',
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
        var _this = this;
        layui.use('table', function () {
            _this.shareTable = layui.table;
            //第一个实例
            _this.shareTable .render({
                elem: '#share-table',
                height: 500,
                data: data, //数据接口
                page: true, //开启分页
                cols: [[ //表头
                    { field: 'clothImgUrl', title: '图片', templet: '#cloth-img' },
                    { field: 'id', title: 'ID', sort: true },
                    { field: 'clothName', title: '衣物名称' },
                    { field: 'date', title: '分享时间', sort: true },
                    { field: 'belong', title: '所属搭配方案', },
                    { field: 'describe', title: '描述' },
                    { field: 'action', title: '操作', templet: '#share-table-template' }
                ]]
            });
        });
    },
    renderCollection: function (data) {
        var _this = this;
        layui.use('table', function () {
            _this.collectionTable = layui.table;
            //第一个实例
            _this.collectionTable .render({
                elem: '#collection-table',
                height: 500,
                data: data, //数据接口
                page: true, //开启分页
                cols: [[ //表头
                    { field: 'clothImgUrl', title: '图片', templet: '#cloth-img' },
                    { field: 'id', title: 'ID', sort: true },
                    { field: 'clothName', title: '衣物名称' },
                    { field: 'startTime', title: '开始时间', sort: true },
                    { field: 'endTime', title: '结束时间', sort: true },
                    { field: 'action', title: '操作', templet: '#collection-table-template' }
                ]]
            });
        });
    }
}
