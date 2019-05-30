const closeFigure = {
    init: function () {
        this.onBtn();
        this.get();
    },
    onBtn: function () {
        $('.figure-submit').on('click', this.save);
        $('.cancel-btn').on('click', this.cancel);
    },
    setItemValue: function (id, value) {
        console.log(id, value);
        $('#' + id).val(value);
    },
    get: function () {
        var _this = this;
        var user = clothCommon.getUser();
        $.ajax({
            type: 'post',
            url: 'aspx/figure.aspx',
            data: {
                type: 1,
                userId: user.id + ''
            },
            success: function (res) {
                var resJson = typeof res == 'string' ? JSON.parse(res) : res;
                if (resJson.Code + '' == '200') {
                    var curr = resJson.Data || null;
                    closeFigure.data = curr;
                    if (!curr) return;
                    for (var key in curr) {
                        _this.setItemValue(key, curr[key]);
                    }
                    
                }
            }
        });
    },
    save: function () {
        var user = clothCommon.getUser();
        var initData = closeFigure.data;
        var formData = decodeURIComponent($('#figure-form').serialize(), true);
        var submitBtn = $('.figure-submit');
        var params = {};
        formData.split('&').forEach(function (item) {
            item = item.split('=');
            params[item[0]] = item[1];
        });

        if (initData) {
            params.type = 2;
            params.id = initData.id;
            params.userId = user.id;
        } else {
            params.type = 3;
            params.userId = user.id;
        }

        submitBtn.button('loading');
        $.ajax({
            type: 'post',
            url: 'aspx/figure.aspx',
            data: params,
            success: function (res) {
                const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                if (resJson.Code + '' == '200') {
                    clothCommon.Message('success', '保存成功');
                }
                submitBtn.button('reset');
            }
        })

        return false;
    },
    cancel: function () {
        $('#figure-form').resize();
    }
}