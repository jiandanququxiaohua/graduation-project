/**
 * 分享与收藏
 */

const share = {
    init: function () {
        share.tabs();
    },
    tabs: function () {
        var _this = this;
        $('.share-tabs li').removeClass('active');
        $('.share-table').hide('slow');
        $('.share-tabs li').eq(0).addClass('active');
        $('.share-table').eq(0).show('slow');

        $('.share-tabs li').on('click', function () {
            var index = $(".share-tabs li").index(this);
            if (index) {
                _this.getCollection();
            } else {
                _this.getShare();
            }
            $('.share-tabs li').removeClass('active');
            $('.share-table').hide('slow');
            $('.share-tabs li').eq(index).addClass('active');
            $('.share-table').eq(index).show('slow');
        });
    },
    getShare: function () {
        var user = clothCommon.getUser();
        $.ajax({
            type: 'POST',
            url: 'apsx/share.aspx',
            data: {
                type: 1,
                userId: user.id
            },
            success: function (res) {
                const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                if (resJson.Code + '' == '200') {
                    var data = resJson.Data || [];

                }
            }
        });
    },
    getCollection: function () {
        var user = clothCommon.getUser();
        $.ajax({
            type: 'POST',
            url: 'apsx/share.aspx',
            data: {
                type: 1,
                userId: user.id
            },
            success: function (res) {
                const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                if (resJson.Code + '' == '200') {
                    var data = resJson.Data || [];

                }
            }
        });
    }
}
