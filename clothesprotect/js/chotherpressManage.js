/**
 * 我的衣橱
 */

const chotherpressManage = {
    init: function () {
        this.getData();
    },
    getData: function () {
        var _this = this;
        var user = clothCommon.getUser();

        clothCommon.getClothType(function (data) {
            _this.clothType = data;
            $.ajax({
                type: 'post',
                url: 'aspx/clothespress.aspx',
                data: {
                    type: 1,
                    userId: user.id + ''
                },
                success: function (res) {
                    var resJson = typeof res == 'string' ? JSON.parse(res) : res;
                    if (resJson.Code + '' == '200') {
                        var data = resJson.Data || [];
                        _this.renderBarChart(data);
                        _this.renderPieChart(data);
                    }
                }
            })
        });
    },
    renderBarChart: function (data) {
        var _this = this;
        var xData = _this.clothType.map(function (item) { return item.type });
        var dataNum = xData.map((item) => {
            return data.reduce((a, b) => {
                if (b.type == item) {
                    a ++
                }
                return a;
            }, 0)
        });

        var option = {
            title: {
                text: '衣物分类数量柱状分析图'
            },
            xAxis: {
                type: 'category',
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: dataNum,
                type: 'bar'
            }]
        };
        var container = $("#bar-chart")[0];
        const myChart = echarts.init(container);
        myChart.clear();
        myChart.setOption(option);
    },
    renderPieChart: function (data) {
        var _this = this;
        var xData = _this.clothType.map(function (item) { return item.type });
        var dataNum = xData.map((item) => {
            var value = data.reduce((a, b) => {
                if (b.type == item) {
                    a++
                }
                return a;
            }, 0);

            return {
                name: item,
                value
            }
        });
        var option = {
            title: {
                text: '衣物分类数量占比图'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: xData
            },
            series: [
                {
                    name: '衣物数量占比',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: dataNum,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        var container = $("#pie-chart")[0];
        const myChart = echarts.init(container);
        myChart.clear();
        myChart.setOption(option);
    }
}