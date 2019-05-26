const closeRegister = {
    init: function () {
        this.onBtn();
    },
    onBtn: function () {
        $('.register-submit-btn').on('click', this.register);
    },
    register: function () {
        var formData = $('.register-form').eq(0).serialize();
        var submitBtn = $('.register-submit-btn');
        submitBtn.button('loading');

        $.ajax({
            type: 'get',
            url: 'aspx/register.aspx',
            data: formData,
            success: function (res) {
                console.log(res);
                const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                if (resJson.Code + '' == '200') {
                    alert('注册成功，请回到登录页登录');
                    //window.location.href = './login.html';
                } else {
                    //console.log(resJosn);
                    alert(resJson.Message)
                }
                submitBtn.button('reset');
               
            }
        })

        return false;
    }
}