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
        formData.split('&').forEach(function (item) {
            item = item.split('=');
            params[item[0]] = item[1];
        });

        submitBtn.button('loading');
        $.ajax({
            type: 'post',
            url: 'aspx/user.aspx',
            data: params,
            success: function (res) {
                console.log(res);
                const resJson = JSON.parse(res);
                if (resJson.Code + '' == '200') {
                    alert('保存成功');
                } else {
                    alert(resJson.Message)
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