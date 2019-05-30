const clothUser = {
    init: function () {
        this.onBtn();
        this.get();
    },
    onBtn: function () {
        $('.submit-btn').on('click', this.save);
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
            url: 'aspx/user.aspx',
            data: {
                userId: user.id,
                type: 1
            },
            success: function (res) {
                var resJson = typeof res == 'string' ? JSON.parse(res) : res;
                if (resJson.Code + '' == '200') {
                    var curr = resJson.Data ? resJson.Data[0] : null;
                    clothUser.data = curr;
                    if (!curr) return;
                    for (var key in curr) {
                        _this.setItemValue(key, curr[key]);
                    }

                }
            }
        })
    },
    save: function () {
        var formData = decodeURIComponent($('#user-form').serialize());
        var submitBtn = $('.submit-btn');
        var params = {};
        var user = clothCommon.getUser();
        formData.split('&').forEach(function (item) {
            item = item.split('=');
            params[item[0]] = item[1];
        });

        params.userId = user.id;
        params.type = 2;

        submitBtn.button('loading');
        $.ajax({
            type: 'post',
            url: 'aspx/user.aspx',
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
        $('#user-form').resize();
    }
}