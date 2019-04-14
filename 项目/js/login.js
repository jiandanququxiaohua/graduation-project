/**
 * login 登录
 */

const closeLogin = {
  login: function () {
    var formData = $('.login-form').eq(0).serialize();
    var submitBtn = $('.login-submit-btn').eq(0);
    // 暂时使用定时器，模拟loading效果
    submitBtn.button('loading');

    setTimeout(function () {

      submitBtn.button('reset');
    } ,1000)

  },
  register: function () {
    var formData = $('.register-form').eq(0).serialize();
    var submitBtn = $('.register-submit-btn').eq(0);
    // 暂时使用定时器，模拟loading效果
    submitBtn.button('loading');

    setTimeout(function () {
      
      submitBtn.button('reset');
    } ,1000)
  }
}