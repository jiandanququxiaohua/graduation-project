/**
 * 我的衣橱
 */

const chothespress = {
  init: function () {
    chothespress.on();
    chothespress.onModal();
  },
  on: function () {
    // 添加按钮
    $('#chothespress-add').on('click', function () {
      $('#chothespressModal').modal('show');
    });
  },
  onModal: function () {
    $('#chothespressModal').on('show.bs.modal', function (event) {
      console.log('chothespress');
    });
  }
}