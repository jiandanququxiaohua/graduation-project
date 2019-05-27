const userFigure = {
    init: function () {
        this.onBtn();
    },
    onBtn: function () {
        $('.submit-btn').on('click', this.save);
        $('.cancel-btn').on('click', this.cancel);
    },
    save: function () {
        var formData = $('#user-form').serialize();
        var submitBtn = $('.submit-btn');
        var params = {};
        var user = clothCommon.getUser();
        formData.split('&').forEach(function (item) {
            item = item.split('=');
            params[item[0]] = item[1];
        });

        params.userId = user.id;

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