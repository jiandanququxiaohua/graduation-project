/**
 * 我的穿搭
 */



const wear = {
    init: function () {
        this.getData();
        this.getStyle();
        this.on();
        this.layui();
    },
    layui: function () {
        var _this = this;

        _this.element = layui.element;
        _this.transfer = layui.transfer

        //consoe.log(_this.transfer, 1);
        _this.element.init();
        _this.element.on('collapse(wear-list)', function (data) {
            var head = data.title;
            if (data.show) {
                var ids = $(head).data('ids');
                _this.getCloths(ids);
            }
        });
        
    },
    on: function () {
        var _this = this;
        $('.wear-list-imgs').on('click', '.cloth-img', function () {
            var id = $(this).data('id');
            window.location.href = '/chothDetail.html?id=' + id;
        })
        $('#wear-collapse').on('click', '.wear-edit', function () {
            var id = $(this).data('id');
            var record = _this.wearData.find(item => item.id + '' == id);
            $('#wearModal').modal('show');
            clothCommon.resetForm("wear-form-modal");

            _this.getAllCloths(record.clothIds);

            $('#style-select').val(record.styleId);
            $('#name-input').val(record.name);
            $('#describe-textarea').val(record.describe);

            _this.editData = record || {};
            
        })
        $('#wear-collapse').on('click', '.wear-delete', function () {
            var id = $(this).data('id');
            _this.delete(id);
        })
        $('#wear-add').on('click', function () {
            var id = $(this).data('id');
            $('#wearModal').modal('show');
            clothCommon.resetForm("wear-form-modal");
            _this.getAllCloths('');
        })
        $('.modal-cancel').on('click', function () {
            clothCommon.resetForm("wear-form-modal");
        });
        $('.modal-ok').on('click', function () {
            var formData = decodeURIComponent($('#wear-form-modal').serialize(), true);
            var params = {};
            var user = clothCommon.getUser();
            formData.split('&').forEach(function (item) {
                item = item.split('=');
                params[item[0]] = item[1] + '';
            });
            params.userId = user.id + '';
            params.createTime = new Date().toLocaleString();
            params.clothIds = _this.selectCloths;

            if (_this.editData) {
                params.id = _this.editData.id + '';
                params.type = 3;
            } else {
                params.type = 2;
            }

            $.ajax({
                type: 'POST',
                url: 'aspx/wear.aspx',
                data: params,
                success: function (res) {
                    const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                    if (resJson.Code + '' == '200') {
                        clothCommon.Message('success', '保存成功！');
                        $('#wearModal').modal('hide');
                        $('#wear-name-input').val('')
                        _this.getData();
                    }
                }
            })

        });
    },
    getStyle: function () {
        $.ajax({
            type: 'POST',
            url: 'aspx/style.aspx',
            data: {
                type: 1
            },
            success: function (res) {
                if (res.Code + '' == '200') {
                    var data = res.Data || [];
                    const defaultoption = "<option value=''>全部</option>";
                    var options = data.map(item => {
                        return `<option value="${item.id}">${item.sName}</option>`;
                    }).join("");
                    $('.style-select').html(defaultoption + options);
                }
            }
        })
    },
    delete: function (id) {
        var _this = this;
        var params = {};
        params.id = id;
        params.type = 4;

        $.ajax({
            type: 'post',
            url: 'aspx/wear.aspx',
            data: params,
            success: function (res) {
                if (res.Code + '' == '200') {
                    clothCommon.Message('success', '删除成功');
                    $('#wear-name-input').val('')
                    _this.getData();
                }
            }
        })
    },
    getData() {
        var _this = this;
        var name = $('#wear-name-input').val();
        var user = clothCommon.getUser();
        var params = {};
        params.userId = user.id;
        params.name = name;
        params.type = 1;

        $.ajax({
            type: 'POST',
            url: 'aspx/wear.aspx',
            data: params,
            success: function (res) {
                var data = res.Data || [];
                _this.wearData = data;
                _this.render(data);
            }
        })
    },
    getCloths: function (ids) {
        $.ajax({
            type: 'POST',
            url: 'aspx/clothespress.aspx',
            data: {
                type: 5,
                ids: ids
            },
            success: function (res) {
                const data = res.Data || [];
                var imgList = data.map(item => {
                    return (`
                        <li>
                            <img src="${item.imgUrl}" data-id="${item.id}" class="cloth-img img-circle" alt="图片" title="点击查看衣物详情">
                        </li>
                     `)
                }).join('');
                $('.layui-show .wear-list-imgs').html(imgList);
            }
        })
    },
    getAllCloths: function (ids) {
        var _this = this;
        var user = clothCommon.getUser();
        $.ajax({
            type: 'POST',
            url: 'aspx/clothespress.aspx',
            data: {
                type: 1,
                userId: user.id
            },
            success: function (res) {
                if (res.Code + '' == '200') {
                    var data = res.Data || [];
                    var formatData = data.map(item => {
                        var obj = {};
                        obj.value = item.id;
                        obj.title = item.clothName;
                        obj.disabled = false;
                        return obj;
                    })
                    var values = ids ? ids.split(','): [];
                    _this.renderTrans(formatData, values);
                }
            }
        })
    },
    onModal: function () {
        $('#wearModal').on('show.bs.modal', function (event) {
        });
    },
    renderTrans: function (data, value) {
        var _this = this;
        _this.selectCloths = value.join(',');
        _this.transfer.render({
            elem: '#transfer-box',
            title: ['衣物', '搭配'],  //自定义标题
            showSearch: true,
            data: data,
            value: value,
            onchange: function (arr) {
                _this.selectCloths = arr.map(item => item.value).join(',');
            }
        })
    },
    render(data) {
        var _this = this;
        var wearBody = $('#wear-collapse');
        var content = data.map((item, i) => {
            return `
              <div class="layui-colla-item">
                <h2 class="layui-colla-title" data-ids="${item.clothIds}">${item.name}</h2>
                <div class="layui-colla-content ${!i ? 'layui-show' : ''}">
                    <div class="row">
                        <div class="col-md-4">风格：${item.sName}</div>
                        <div class="col-md-4">描述：${item.describe}</div>
                        <div class="col-md-4 btns-margin">
                            <button type="button" class="btn btn-primary wear-edit" data-id="${item.id}">编辑</button>
                            <button type="button" class="btn wear-delete" data-id="${item.id}">删除</button>
                        </div>
                    </div>
                    <ul class="wear-list-imgs clear-float"></ul>
                </div>
              </div>
            `
        }).join('');

        wearBody.html(content);
        _this.element.render('collapse');
        if (data.length) {
            _this.getCloths(data[0]['clothIds']);
        }
    }
}