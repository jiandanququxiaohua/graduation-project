/**
 * 我的衣橱
 */

const chothespress = {
    init: function () {
        this.on();
        this.onModal();
        this.getClothType();
        this.initGetData();
    },
    initGetData: function () {
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
                _this.shareList = resJson.Data || [];
                _this.getData({});
            }
        })
    },
    on: function () {
        // 添加按钮
        $('#chothespress-add').on('click', function () {
            $('#chothespressModal').modal('show');
        });
        $('.share-row').on('click', function () {
            var record = $(this).data('info');
        });
        $('.edit-row').on('click', function () {
            var record = $(this).data('info');
        });
        $('.delete-row').on('click', function () {
            var record = $(this).data('info');
        });
    },
    getClothType: function () {
        clothCommon.getClothType(function (data) {
            var options = data.map(item => {
                return `<option value="${item.id}">${item.type}</option>`;
            }).join("");
            $('clothTypeSelect').html(options);
        }
    },
    search: function () {
        var _this = this;
        layui.use('form', function () {
            var form = layui.form;

            //监听提交
            form.on('submit(formDemo)', function (data) {
                _this.getData(data.field);
                return false;
            });
        });
    },
    getData: function (params = {}) {
        var _this = this;
        var user = clothCommon.getUser();
        var newParams = $.extend({}, params);
        newParams.type = 1;
        newParams.userId = user.id;

        $.ajax({
            type: 'POST',
            url: 'aspx/clothespress.aspx',
            data: newParams,
            success: function (res) {
                const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                var list = resJson.Data || [];
                var newList = list.map(item => {
                    var node = _this.shareList.find(a => a.clothId == item.id);
                    item.isShare = false;
                    if (node) {
                        item.isShare = true;
                    }
                    return item;
                })
                _this.renderTable(newList);
            }
        })
    },
    onModal: function () {
        $('#chothespressModal').on('show.bs.modal', function (event) {
            console.log('chothespress');
        });
    },
    renderTable: function (data) {
        layui.use('table', function () {
            var table = layui.table;
            //第一个实例
            table.render({
                elem: '#cloth-table',
                height: 400,
                data: data, //数据接口
                page: true, //开启分页
                cols: [[ //表头
                    { field: 'imgUrl', title: '图片', width: 100, template: '#cloth-img' },
                    { field: 'id', title: 'ID', width: 80, sort: true, fixed: 'left' },
                    { field: 'clothName', title: '衣物名称' },
                    { field: 'clothTypeName', title: '衣物类别', sort: true },
                    { field: 'price', title: '价格', },
                    { field: 'brand', title: '品牌' },
                    { field: 'fabric', title: '衣料' },
                    { field: 'season', title: '适应季节' },
                    { field: 'size', title: '尺码' },
                    { field: 'color', title: '颜色' },
                    { field: 'createTime', title: '创建时间' },
                    { field: 'isShare', title: '是否分享', template: '#cloth-share-template' },
                    { field: 'action', title: '操作', template: '#cloth-table-template' }
                ]]
            });
        });
    },
}