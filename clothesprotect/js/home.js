/**
 * 首页
 */

const home = {
    init: function () {
        this.getData();
        this.onEvent();
    },
    onEvent: function () {
        var _this = this;
        var user = clothCommon.getUser();
        $('#home-share').on('click', '.share-item', function () {
            const id = $(this).data('id');
            window.location.href = '/chothDetail.html?id=' + id;
        });
        $('#home-share').on('click', '.share-link', function () {
            var id = $(this).data('id');
            var hasOk = $(this).hasClass('share-link-ok');
            var params = {};
            if (hasOk) {
                var curr = _this.linkList.find(item => item.clothId == id && item.userId == (user.id + ''));
                params.type = 4;
                params.id = curr.id;
            } else {
                params.type = 2;
                params.userId = user ? user.id + '' : '';
                params.clothId = id;
            }

            $.ajax({
                type: 'POST',
                url: 'aspx/link.aspx',
                data: params,
                success: function () {
                    if (user) {
                        _this.getLinks(user.id + '', () => {
                            _this.renderShare();
                        });
                    }
                }
            })
        });
        $('#home-share').on('click', '.share-star', function () {
            if (!user) {
                clothCommon.Message('warning', '登录后才能收藏');
                return;
            }
            var id = $(this).data('id');
            var hasOk = $(this).hasClass('share-star-ok');
            var params = {};
            if (hasOk) {
                var curr = _this.collectionList.find(item => item.clothId == id && item.userId == (user.id + ''));
                params.type = 4;
                params.id = curr.id;
            } else {
                params.type = 2;
                params.userId = user.id + '';
                params.clothId = id;
                params.startTime = Date.now() + '';
            }

            $.ajax({
                type: 'POST',
                url: 'aspx/collection.aspx',
                data: params,
                success: function () {
                    if (user) {
                        _this.getCollections(user.id + '', () => {
                            _this.renderShare();
                        });
                    }
                }
            })
        });
    },
    getLinks: function (userId, fn) {
        var _this = this;
        $.ajax({
            type: 'post',
            url: 'aspx/link.aspx',
            data: {
                type: 1,
                userId: userId
            },
            success: function (res) {
                const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                _this.linkList = resJson.Data || [];
                fn & fn();
            }
        });
    },
    getCollections: function (userId, fn) {
        var _this = this;
        $.ajax({
            type: 'post',
            url: 'aspx/collection.aspx',
            data: {
                type: 1,
                userId: userId
            },
            success: function (res) {
                const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                _this.collectionList = resJson.Data || [];
                fn & fn();
            }
        });
    },
    getUserInfo: function (fn) {
        var _this = this;
        // 获取当前用户点赞衣物、收藏
        var user = clothCommon.getUser();
        var userId = user.id + '';
        if (user) {
            _this.getLinks(userId, () => {
                _this.getCollections(userId, () => {
                    fn && fn();
                });
            })            
        } else {
            _this.shareList = [];
            _this.collectionList = [];
            fn && fn();
        }
        
    },
    getData: function () {
        var _this = this;
        var user = clothCommon.getUser();
        const userId = user ? user.id + '' : '';
        //获取所有分享
        this.getUserInfo(function () {
            $.ajax({
                type: 'post',
                url: 'aspx/share.aspx',
                data: {
                    type: 1,
                },
                success: function (res) {
                    const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                    var shareList = resJson.Data || mockShare || [];
                   
                    _this.mockShare = shareList;
                    _this.renderShare();
                }
            });
        });        
    },
    renderShare: function () {
        var _this = this;
        const shareContainer = $('#home-share');
        var shareList = this.mockShare.map(item => {
            const isCollection = _this.collectionList.find(l => l.clothId == item.clothId);
            const isLink = _this.linkList.find(l => l.clothId == item.clothId);
            item.isCollection = !!isCollection;
            item.isLink = !!isLink;
            return item;
        })
        const shareHtml = shareList.map(function (item) {
            const addLinkClass = item.isLink ? 'share-link-ok' : '';
            const addCollClass = item.isCollection ? 'share-star-ok' : '';

            return "<li>" +
                "<img class='share-item' src='" + item.clothImgUrl + "' data-id='" + item.clothId + "'/>" +
                "<div class='share-item-info'>" +
                "<dl>" +
                "<dt>" + item.clothName + "</dt>" +
                "<dd>" +
                "<span class='glyphicon glyphicon-heart share-link " + addLinkClass + "' title='点赞' aria-hidden='true' data-id='" + item.clothId + "'></span>" +
                "<span class='glyphicon glyphicon-star share-star " + addCollClass + "' title='收藏' aria-hidden='true' data-id='" + item.clothId + "'></span>" +
                "</dd>" +
                "</dl>" +
                "</div>" +
                "</li>";
        }).join('');
        shareContainer.html(shareHtml);
    }
}