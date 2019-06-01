/**
 * 项目通用js
 * Header
 * Navs
 */

const MENUS = [
    {
        title: '衣橱概览',
        key: 'chotherpressManage',
        href: './chotherpressManage.html'
    }, {
        title: '我的衣橱',
        key: 'chothespress',
        href: './chothespress.html'
    }, {
        title: '我的穿搭',
        key: 'wear',
        href: './wear.html'
    }, {
        title: '收藏与分享',
        key: 'share',
        href: './share.html'
    }, {
        title: '我的身材',
        key: 'figure',
        href: './figure.html'
    }, {
        title: '个人信息',
        key: 'user',
        href: './user.html'
    }
];

const USER_KEY = 'USER_KEY';

// 全局ajax配置
$.ajaxSetup({
    dataType: "json",
    error: function (jqXHR, textStatus, errorThrown) {
        switch (jqXHR.status) {
            case (500):
                clothCommon.Message('danger', '服务错误');
                break;
            case (401):
                clothCommon.Message('danger', '未登录');
                break;
            case (403):
                clothCommon.Message('danger', '无权限执行此操作');
                break;
            case (408):
                clothCommon.Message('danger', '请求超时');
                break;
            default:
                clothCommon.Message('danger', '未知错误,请联系管理员');
        }
    },
    complete: function (xhr) {
        const res = xhr.responseJSON || {};
        const status = xhr.status;
        if (status == 200) {
            if (res.Code + '' !== '200') {
                clothCommon.Message('danger', '接口调用错误');
            }
        }

    },
    cache: false
});

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
const noUser = ['/login.html', '/register.html', '/Default.aspx', '/'] 

const clothCommon = {
    absImgUrl: '/image/img-clothes/',
    init: function () {
        var user = this.getUser();
        var path = window.location.pathname;
        //console.log(path, user);
        if (!user && (path != '/' && path != '/Default.aspx' && (path.indexOf('/chothDetail.html') < 0))) {
            this.logout();
        }
        if (noUser.indexOf(path) > -1) {
            this.destory();
        }
        $('.logout').on('click', function () {
            clothCommon.logout();
        })
    },
    Message: function (type = 'success', message = 'success') {
        var len = $('.global-message').length;

        var messageEle = `
        <div class="alert alert-${type} alert-dismissible global-message" role="alert" data-num="${len}" style="display: none;">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          ${message}
        </div>
        `
        $('body').append(messageEle);
        $('.global-message').eq(len).fadeIn();
        setTimeout(function () {
            $('.global-message').eq(len).fadeOut();
        }, 2000);
    },
    getUser: function () {
        var user = localStorage.getItem(USER_KEY);
        return JSON.parse(user);
    },
    setUser: function (data) {
        localStorage.setItem(USER_KEY, JSON.stringify(data));
    },
    destory: function (data) {
        localStorage.removeItem(USER_KEY);
    },
    logout: function () {
        this.destory();
        window.location = './login.html';
    },
    navs: function (select = '#navs', active) {
        const navsBox = $(select);
        const navMenus = MENUS.map((item) => {
            var isActive = item.key == active ? 'active-nav' : '';
            const nav = "<li class=" + isActive + ">" +
                "<a href=" + item.href + " target='_self'>" + item.title + "</a>" +
                "</li>";
            return nav;
        }).join('');

        const navsContent = "<ul class='nav-menus'>" + navMenus + "</ul>"
        navsBox.html(navsContent);
    },
    user: function () {
        var user = this.getUser();
        $('.header-user').html(user ? user.userName : '');
        $('.logout').html(user ? '登出' : '登录');
    },
    getClothType: function (fn) {
        $.ajax({
            type: 'GET',
            url: 'aspx/clothType.aspx',
            data: {
                type: 1
            },
            success: function (res) {
                var resJson = typeof res == 'string' ? JSON.parse(res) : res;
                if (resJson.Code + '' == '200') {
                    var data = resJson.Data || [];
                    fn && fn(data);
                }
            }
        });
    },
    resetForm: function (id) {
        document.getElementById(id).reset();
    }
}
