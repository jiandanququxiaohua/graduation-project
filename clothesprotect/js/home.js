/**
 * 首页
 */

const mockShare = [{
    src: './image/img-clothes/cardigan/1.webp',
    type: 'cardigan',
    title: '开衫'
}, {
    src: './image/img-clothes/coat/1.webp',
    type: 'coat',
    title: '外套'
}, {
    src: './image/img-clothes/dress/1.webp',
    type: 'dress',
    title: '连衣裙'
}, {
    src: './image/img-clothes/handbag/1.webp',
    type: 'handbag',
    title: '包包'
}, {
    src: './image/img-clothes/overskirt/1.webp',
    type: 'overskirt',
    title: '半裙'
}, {
    src: './image/img-clothes/shoes/1.webp',
    type: 'shoes',
    title: '鞋子'
}];

const home = {
    init: function () {
        this.getData();
    },
    getData: function () {
        var _this = this;
        //获取所有分享
        $.ajax({
            type: 'post',
            url: 'aspx/share.aspx',
            data: {
                type: 1,
            },
            success: function (res) {
                _this.mockShare = res.Data || mockShare || [];
                _this.renderShare();
            }
        });
    },
    renderShare: function () {
        const shareContainer = $('#home-share');
        const shareList = this.mockShare.map(function (item) {
            return "<li>" +
                "<img src='" + item.src + "' />" +
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
        shareContainer.html(shareList);
    }
}