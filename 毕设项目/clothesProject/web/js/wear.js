/**
 * 我的穿搭
 */

const wear = {
  init: function () {
    wear.on();
    wear.onModal();
  },
  on: function () {
    // 添加按钮
    $('#wear-add').on('click', function () {
      $('#wearModal').modal('show');
    });
  },
  onModal: function () {
    $('#wearModal').on('show.bs.modal', function (event) {
      console.log('wear');
    });
  }
}