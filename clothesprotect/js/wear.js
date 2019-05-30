/**
 * 我的穿搭
 */



const wear = {
    init: function () {
        this.getData();
    },
    on: function () {

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
                    <ul class="wear-list-imgs"></ul>
                </div>
              </div>
            `
        }).join('');

        wearBody.html(content);
        _this.collapse();
        if (data.length) {
            _this.getCloths(data[0]['clothIds']);
        }
    },
    collapse: function () {
        var _this = this;
        layui.use('element', function () {
            var element = layui.element;

            element.on('collapse(filter)', function (data) {
                var head = data.title;
                if (data.show) {
                    var ids = $(head).data('ids');
                    _this.getCloths(ids);
                }
            });
        });
    }
}