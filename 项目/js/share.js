/**
 * 分享与收藏
 */

const share = {
  init: function () {
    share.tabs();
  },
  tabs: function () {
    $('.share-tabs li').removeClass('active');
    $('.share-table').hide('slow');
    $('.share-tabs li').eq(0).addClass('active');
    $('.share-table').eq(0).show('slow');

    $('.share-tabs li').on('click', function() {
      var index = $(".share-tabs li").index(this);
      $('.share-tabs li').removeClass('active');
      $('.share-table').hide('slow');
      $('.share-tabs li').eq(index).addClass('active');
      $('.share-table').eq(index).show('slow');
    });
  }
}
