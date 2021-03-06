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
        var submitBtn = $('.login-submit-btn');
        submitBtn.button('loading');

        $.ajax({
            type: 'get',
            url: 'aspx/login.aspx',
            data: formData,
            success: function (res) {
                const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                if (resJson.Code + '' == '200') {
                    clothCommon.setUser(resJson.Data && resJson.Data[0]);
                    window.location.href = './home.html';
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