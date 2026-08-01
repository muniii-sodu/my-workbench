(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  var barEl = document.getElementById('chart-bar');
  if (barEl) {
    var chart = echarts.init(barEl, null, { renderer: 'svg' });
    chart.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '5%',
        bottom: '10%',
        top: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['基础概念', '设计范式', '单/多Agent', 'Workflow对比', '多Agent架构', '状态与安全', '50题补充'],
        axisLine: { lineStyle: { color: rule } },
        axisLabel: {
          color: muted,
          fontSize: 11,
          interval: 0,
          rotate: 15
        }
      },
      yAxis: {
        type: 'value',
        name: '题目数量',
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'bar',
        data: [3, 7, 3, 2, 5, 5, 4],
        barWidth: '45%',
        itemStyle: {
          color: accent,
          borderRadius: [6, 6, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: ink,
          fontSize: 13,
          fontWeight: 600
        }
      }]
    });
    window.addEventListener('resize', function() { chart.resize(); });
  }
})();
