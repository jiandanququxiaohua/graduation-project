/**
 * 我的穿搭
 */

const WEARS = [
  {
    id: '1',
    name: '搭配一',
    describe: '描述',
    clothes: [
      {
        id: '1',
        name: 'sda',
        size: '23',
        price: '54',
        imgUrl: ''
      }
    ]
  },
  {
    id: '2',
    name: '搭配二',
    describe: '搭配二',
    clothes: [

    ]
  }
];

const wear = {
  init: function () {
    this.on();
    this.onModal();
    this.ajaxData(1);
    this.initAccordion();
  },
  on: function () {
    // 添加按钮
    $('#wear-add').on('click', function () {
      $('#wearModal').modal('show');
    });

    $('.wear-edit-icon').on('click', function (e) {
      e.stopPropagetion();
      $('#wearModal').modal('show');
    })

    $('.wear-delete-icon').on('click', function (e) {
      e.stopPropagetion();
      mear.ajaxData(3);
    })
  },
  ajaxData: function (type) {
    var method = type == '1' ? 'GET' : 'POST';
    // $.ajax({
    //   type: method,
    //   url: '',
    //   success: function () {

    //   }
    // })
  },
  initAccordion: function () {
    function clothrender (clothes) {
      return clothes.map(function (item, i) {
        return `
          <li>
            <img src="${item.imgUrl}" />
            <dl>
              <dt>${item.name}</dt>
              <dd>${item.price}</dd>
            </dl>
          </li>
        `;
      })
    }
    var listHtml = WEARS.map(function (item, i) {
      return `<h3 class="wear-list-title">${item.name}
          <div class="icons-list right">
            <i class="glyphicon glyphicon-pencil wear-edit-icon" title="编辑" data-id="${item.id}"></i>
            <i class="glyphicon glyphicon-trash wear-delete-icon" title="删除" data-id="${item.id}"></i>
          </div>
        </h3>
        <div class="wear-list-info">
          <p>风格：${item.style}</p>
          <p>描述：${item.describe}</p>
          <ul class="clear-float">
            ${clothrender(item.clothes)}
          </ul>
        </div>
      `;
    }).join('');
    $('#wear-accordion').html(listHtml);
    $('#wear-accordion').accordion({
      collapsible: true
    });
  },
  onModal: function () {
    $('#wearModal').on('show.bs.modal', function (event) {
      console.log('wear');
    });
  }
}