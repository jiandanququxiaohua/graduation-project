/**
 * 我的衣橱
 */

const chotherpressManage = {
  init: function () {
    this.renderChart();
  },
  renderChart: function () {
    var option = {
      xAxis: {
          type: 'category',
          data: ['半裙', '包包', '开衫', '裤子', '内衣', '上装', '外套']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
      }]
    };
    var container = $("#type-chart")[0];
    const myChart = echarts.init(container);
    myChart.clear();
    myChart.setOption(option);
  }
}