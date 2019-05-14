const closeRegister = {
    init: function () {
        this.onBtn();
    },
    onBtn: function () {
        $('.login-submit-btn').on('click', this.register);
    },
    register: function () {
        var formData = $('.register-form').eq(0).serialize();
        var submitBtn = $('.register-submit-btn').eq(0);
        submitBtn.button('loading');

        $.ajax({
            type: 'get',
            url: 'aspx/register.aspx',
            data: formData,
            success: function (res) {
                if (res.code + '' == '200') {
                    submitBtn.button('reset');
                    window.location.href = './login,html';
                } else {
                    alert(res.Messge)
                }
               
            }
        })

        return false;
    }
}