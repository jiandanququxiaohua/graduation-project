const closeFigure = {
    init: function () {
        this.onBtn();
    },
    onBtn: function () {
        $('.figure-submit').on('click', this.save);
        $('.cancel-btn').on('click', this.cancel);
    },
    save: function () {
        var formData = $('#figure-form').serialize();
        var submitBtn = $('.figure-submit');
        submitBtn.button('loading');

        $.ajax({
            type: 'get',
            url: 'aspx/figure.aspx',
            data: formData,
            success: function (res) {
                console.log(res);
                const resJson = JSON.parse(res);
                if (resJson.Code + '' == '200') {
                    alert('保存成功');
                    //window.location.href = './login.html';
                } else {
                    //console.log(resJosn);
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