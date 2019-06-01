/**
 * 我的衣橱
 */

const chothespress = {
    init: function () {
        this.on();
        this.onModal();
        this.getClothType();
        this.initGetData();
        this.upload();
        this.search();
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
        var _this = this;
        // 添加按钮
        $('#chothespress-add').on('click', function () {
            $('#chothespressModal').modal('show');
            clothCommon.resetForm("cloth-form-modal");
        });
        $('.choth-espress-table').on('click', '.share-row', function () {
            var id = $(this).data('id');
            var record = _this.data.find(item => item.id + '' == id);
            var params = {};
            var user = clothCommon.getUser();

            if (!record.isShare) {
                params.userId = user.id;
                params.clothId = record.id;
                params.date = new Date().toLocaleString();
                params.describe = `分享衣物：${record.clothName}`;
                params.type = 2;
                $.ajax({
                    type: 'POST',
                    url: 'aspx/share.aspx',
                    data: params,
                    success: function (res) {
                        clothCommon.Message('success', '分享成功！');
                        _this.initGetData();
                    }
                });
            } else {
                var node = _this.shareList.find(a => a.clothId == record.id);
                params.type = 4;
                params.id = node.id;
                $.ajax({
                    type: 'POST',
                    url: 'aspx/share.aspx',
                    data: params,
                    success: function () {
                        clothCommon.Message('success', '已取消分享！');
                        _this.initGetData();
                    }
                });
            }

        });
        $('.choth-espress-table').on('click', '.edit-row', function () {
            var id = $(this).data('id');
            var record = _this.data.find(item => item.id + '' == id);
            console.log(record);
            $('#chothespressModal').modal('show');
            clothCommon.resetForm("cloth-form-modal");

            $('#clothTypeSelect').val(record.clothTypeId);
            $('#clothName-input').val(record.clothName);
            $('#price-input').val(record.price);
            $('#brand-input').val(record.brand);
            $('#fabric-input').val(record.fabric);
            $('#season-input').val(record.season);
            $('#size-input').val(record.size);
            $('#color-input').val(record.color);
            $('#preview').attr('src', record.imgUrl);
            _this.editData = record || {};
            _this.imgUrl = record.imgUrl;
            //console.log(record.imgUrl);
        });
        $('.choth-espress-table').on('click', '.delete-row', function () {
            var id = $(this).data('id');
            var record = _this.data.find(item => item.id + '' == id);
            $.ajax({
                type: 'POST',
                url: 'aspx/clothespress.aspx',
                data: {
                    id: record.id,
                    type: 4
                },
                success: function (res) {
                    const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                    if (resJson.Code + '' == '200') {
                        clothCommon.Message('success', '删除成功！');
                        _this.getData(_this.params);
                    }
                }
            })
        });
        $('.modal-ok').on('click', function () {
            var formData = decodeURIComponent($('#cloth-form-modal').serialize(), true);
            var params = {};
            var user = clothCommon.getUser();
            formData.split('&').forEach(function (item) {
                item = item.split('=');
                params[item[0]] = item[1];
            });
            params.imgUrl = _this.imgUrl;
            params.userId = user.id;
            params.createTime = new Date().toLocaleString();

            if (_this.editData) {
                params.id = _this.editData.id;
                params.type = 3;
            } else {
                params.type = 2;
            }

            $.ajax({
                type: 'POST',
                url: 'aspx/clothespress.aspx',
                data: params,
                success: function (res) {
                    const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                    if (resJson.Code + '' == '200') {
                        clothCommon.Message('success', '保存成功！');
                        $('#chothespressModal').modal('hide');
                        _this.getData(_this.params);
                    }
                }
            })

        });
        $('.modal-cancel').on('click', function () {
            clothCommon.resetForm("cloth-form-modal");
            _this.imgUrl = '';
        });
    },
    getClothType: function () {
        clothCommon.getClothType(function (data) {
            const defaultoption = "<option value=''>全部</option>";
            var options = data.map(item => {
                return `<option value="${item.id}">${item.type}</option>`;
            }).join("");
            $('.clothTypeSelect').html(defaultoption + options);
        })
    },
    search: function () {
        var _this = this;
        layui.use('form', function () {
            var form = layui.form;

            //监听提交
            form.on('submit(formDemo)', function (data) {
                console.log(data.field);
                _this.params = data.field;
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
                _this.data = newList;
                _this.renderTable(newList);
            }
        })
    },
    onModal: function () {
        $('#chothespressModal').on('show.bs.modal', function (event) {
        });
    },
    upload: function () {
        var _this = this;
        layui.use('upload', function () {
            var upload = layui.upload;

            //执行实例
            var uploadInst = upload.render({
                elem: '#uploadImg', //绑定元素
                accept: 'file',
                auto: false, //选择文件后不自动上传
                choose: function (obj) {
                    //将每次选择的文件追加到文件队列
                    var files = obj.pushFile();
                    //console.log(obj);
                    //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                    obj.preview(function (index, file, result) {
                        console.log(file); //得到文件对象
                        _this.imgUrl = clothCommon.absImgUrl + file.name;
                        $('#preview').attr('src', _this.imgUrl);
                    });
                }
            });
        });
    },
    renderTable: function (data) {
        layui.use('table', function () {
            var table = layui.table;
            //第一个实例
            table.render({
                elem: '#cloth-table',
                height: 500,
                data: data, //数据接口
                page: true, //开启分页
                cols: [[ //表头
                    { field: 'imgUrl', title: '图片', width: 100, templet: '#cloth-img' },
                    { field: 'id', title: 'ID', width: 80, sort: true },
                    { field: 'clothName', title: '衣物名称' },
                    { field: 'type', title: '衣物类别', sort: true },
                    { field: 'price', title: '价格', },
                    { field: 'brand', title: '品牌' },
                    { field: 'fabric', title: '衣料' },
                    { field: 'season', title: '适应季节' },
                    { field: 'size', title: '尺码' },
                    { field: 'color', title: '颜色' },
                    { field: 'createTime', title: '创建时间' },
                    {
                        field: 'isShare', title: '是否分享', templet: d => {
                            return `<span class="${d.isShare ? 'text-success' : "text-primary"}">${d.isShare ? '已分享' : "未分享"}</span>`;
                        }
                    },
                    {
                        field: 'action', title: '操作', width: 200, templet: d => {
                            return `<div class="table-actions">
                                <a href="javascript:;" class="share-row" data-id="${d.id}">${d.isShare ? '取消分享' : "分享"}</a>
                                <a href="javascript:;" class="edit-row" data-id="${d.id}">编辑</a>
                                <a href="javascript:;" class="delete-row" data-id="${d.id}">删除</a>
                            </div>`;
                        }
                    }
                ]]
            });
        });
    },
}