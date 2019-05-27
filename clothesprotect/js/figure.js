const closeFigure = {
    init: function () {
        this.onBtn();
    },
    onBtn: function () {
        $('.figure-submit').on('click', this.save);
        $('.cancel-btn').on('click', this.cancel);
    },
    setItemValue: function (id, value) {
        $(id).val(value);
    },
    get: function () {
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
                    var data = resJson.Data || null;
                    closeFigure.data = data;
                    if (!data) return;
                    for (var key in data) {
                        closeFigure.setItemValue(key, data[key]);
                    }
                    
                }
            }
        });
    },
    save: function () {
        var initData = closeFigure.data;
        var formData = $('#figure-form').serialize();
        var submitBtn = $('.figure-submit');
        var params = {};
        formData.split('&').forEach(function (item) {
            item = item.split('=');
            params[item[0]] = item[1];
        });

        if (initData) {
            params.type = 2;
            params.id = initData.id;
            params.userId = initData.userId;
        } else {
            params.type = 3;
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