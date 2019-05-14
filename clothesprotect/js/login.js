/**
 * login 登录
 */

const closeLogin = {
    init: function () {
        this.onBtn();
    },
    onBtn: function () {
        $('.login-submit-btn').on('click', this.login);
    },
  login: function () {
        var formData = $('#login-form').serialize();
        var submitBtn = $('.login-submit-btn').eq(0);
        submitBtn.button('loading');

        $.ajax({
            type: 'get',
            url: 'aspx/login.aspx',
            data: formData,
            success: function (res) {
                if (res.code + '' == '200') {
                    submitBtn.button('reset');
                    window.location.href = './home,html';
                } else {
                    alert(res.Messge)
                }
            }
        })

      return false;
  }
}