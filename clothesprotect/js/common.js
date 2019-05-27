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
    },
    {
        title: '我的衣橱',
        key: 'chothespress',
        href: './chothespress.html'
    }, {
        title: '我的穿搭',
        key: 'wear',
        href: './wear.html'
    }, {
        title: '我的身材',
        key: 'figure',
        href: './figure.html'
    }, {
        title: '收藏与分享',
        key: 'share',
        href: './share.html'
    }
];

const USER_KEY = 'USER_KEY';

console.log('df')

const clothCommon = {
    init: function () {
        $('.logout').eq(0).on('click', function () {
            clothCommon.logout();
        })
        this.testAjax();
    },
    testAjax: function () {
        $.ajax({
            type: 'POST',
            url: 'http://172.16.20.108:19999/auth/oauth/token',
            data: {
                username: 'admin',
                password: '123456',
                'grant_type': 'password',
                scope: 'server'
            },
            headers: {'Authorization': 'Basic cGlnOnBpZw=='},
            success: res => {
                console.log(res);
            },
            error: err => {
                console.log(err);
            }
        })
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
    },
    getClothType: function () {
        $.ajax({
            type: 'GET',
            url: 'aspx/clothType.aspx',
            success: function(res) {

            }
        });
    }
}

console.log('clothCommon')