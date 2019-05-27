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
  search: function () {
    layui.use('form', function(){
      var form = layui.form;
      
      //监听提交
      form.on('submit(formDemo)', function(data){
        layer.msg(JSON.stringify(data.field));
        return false;
      });
    });
  },
  onModal: function () {
    $('#chothespressModal').on('show.bs.modal', function (event) {
      console.log('chothespress');
    });
  }
}