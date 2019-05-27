/*衣物详情*/

const chothDetail = {
    init: function () {
        this.getData();
    },
    getData: function () {
        var _this = this;
        var id = getQueryString('id');
        var user = clothCommon.getUser();
        if (!id) return;

        $.ajax({
            type: 'post',
            url: 'aspx/clothespress.aspx',
            data: {
                type: 1,
                id: id
            },
            success: function (res) {
                const resJson = typeof res == 'string' ? JSON.parse(res) : res;
                const clothData = resJson.Data || [];
                _this.renderCloth(clothData[0] || null);
            }
        })
    },
    renderCloth: function (clothData) {
        if (!clothData) return;
        var { imgUrl, ...props } = clothData;
        var infoList = `
            <li><span class="cloth-title">名称：</span>${props.clothName}</li>
            <li><span class="cloth-title">类型名称：</span>${props.clothTypeName}</li>
            <li><span class="cloth-title">颜色：</span>${props.color}</li>
            <li><span class="cloth-title">品牌：</span>${props.brand}</li>
            <li><span class="cloth-title">尺码：</span>${props.size}</li>
            <li><span class="cloth-title">衣料：</span>${props.fabric}</li>
            <li><span class="cloth-title text-danger">价格：</span>${props.price}</li>
            <li><span class="cloth-title">适应季节：</span>${props.season}</li>
        `;
        $('#imgsrc').attr('src', imgUrl);
        $('#choth-info').html(infoList);
    }
};