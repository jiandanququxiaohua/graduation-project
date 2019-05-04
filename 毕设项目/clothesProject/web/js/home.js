/**
 * 首页
 */

const mockShare = [{
  id: 0,
  src: './image/img-clothes/cardigan/1.webp',
  type: 'cardigan',
  title: '开衫'
}, {
  id: 1,
  src: './image/img-clothes/coat/1.webp',
  type: 'coat',
  title: '外套'
}, {
  id: 2,
  src: './image/img-clothes/dress/1.webp',
  type: 'dress',
  title: '连衣裙'
}, {
  id: 3,
  src: './image/img-clothes/handbag/1.webp',
  type: 'handbag',
  title: '包包'
}, {
  id: 4,
  src: './image/img-clothes/overskirt/1.webp',
  type: 'overskirt',
  title: '半裙'
}, {
  id: 5,
  src: './image/img-clothes/shoes/1.webp',
  type: 'shoes',
  title: '鞋子'
}];

const mockWear =  [{
  id: 1,
  title: "穿搭一",
  chothes: [{
    id: 3,
    src: './image/img-clothes/handbag/1.webp',
    type: 'handbag',
    title: '包包'
  }, {
    id: 4,
    src: './image/img-clothes/overskirt/1.webp',
    type: 'overskirt',
    title: '半裙'
  }, {
    id: 5,
    src: './image/img-clothes/shoes/1.webp',
    type: 'shoes',
    title: '鞋子'
  }]
}];

const home = {
  init: function () {
    this.renderShare();
    this.renderWearShare();
    this.onShareItem();
  },
  render: function (shareData) {
    const shareList = shareData.map(function (item) {
      return "<li class='home-share-item' data-id='"+ item.id +"'>" + 
        "<img src='" + item.src +"' />" +
        "<div class='share-item-info'>" +
          "<dl>" + 
            "<dt>" + item.title + "</dt>" +
            "<dd>" + 
              "<span class='glyphicon glyphicon-heart share-link' title='点赞' aria-hidden='true'></span>" + 
              "<span class='glyphicon glyphicon-star share-star' title='收藏' aria-hidden='true'></span>" + 
            "</dd>" +
          "</dl>" +
        "</div>" +
      "</li>";
    }).join('');
    return shareList;
  },
  renderShare: function () {
    const shareContainer = $('#home-share');
    var shareList = this.render(mockShare);
    shareContainer.html(shareList);
  },
  renderWearShare: function () {
    const _this = this;
    const shareContainer = $('#home-wear-share');
    const shareList = mockWear.map(function (item) {
      return "<div class=''>" + 
        "<h3>" + item.title + "</h3>" + 
        "<ul class='home-share-list clear-float'>" + _this.render(item.chothes) + "</ul>"
      "</div>";
    }).join('');
    shareContainer.html(shareList);
  },
  onShareItem: function () {
    $('.home-share-list').on('click', 'li', function (ev) {
      const id = $(this).data('id');
      // console.log(ev,id);
      window.location.href = './chothDetail.html?id=' + id; 
    });
  }
}