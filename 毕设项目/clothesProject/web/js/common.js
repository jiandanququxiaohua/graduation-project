/**
 * 项目通用js
 * Header
 * Navs
 */

const MENUS = [
  {
    title: '我的衣橱',
    key: 'chothespress',
    href: './chothespress.html'
  }, {
    title: '我的穿搭',
    key: 'wear',
    href: './wear.html'
  }, {
    title: '衣橱管理',
    key: 'chotherpressManage',
    href: './chotherpressManage.html'
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

const clothCommon = {
  init: function () {
    $('.logout').eq(0).on('click', function () {
      clothCommon.logout();
    })
  },
  getUser: function () {

  },
  logout: function () {
    window.location = './login.html';
  },
  navs: function (select='#navs', active) {
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
  }
}