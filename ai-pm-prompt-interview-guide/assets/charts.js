(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var accent4 = style.getPropertyValue('--accent4').trim();
  var accent5 = style.getPropertyValue('--accent5').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // ===== Radar Chart: Five Core Competencies =====
  var radarEl = document.getElementById('chart-radar');
  if (radarEl) {
    var radarChart = echarts.init(radarEl, null, { renderer: 'svg' });

    radarChart.setOption({
      animation: false,
      tooltip: {
        trigger: 'item',
        appendToBody: true,
        backgroundColor: 'rgba(28,33,40,0.92)',
        borderColor: 'rgba(255,255,255,0.1)',
        textStyle: { color: '#fff', fontSize: 12 },
        extraCssText: 'border-radius:8px;padding:10px 14px;'
      },
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemGap: 16,
        itemWidth: 14,
        itemHeight: 14
      },
      radar: {
        center: ['50%', '48%'],
        radius: '62%',
        indicator: [
          { name: '结构化思维', max: 10 },
          { name: '产品化认知', max: 10 },
          { name: '用户视角', max: 10 },
          { name: '迭代意识', max: 10 },
          { name: '风险意识', max: 10 }
        ],
        axisName: {
          color: ink,
          fontSize: 12,
          fontWeight: 600
        },
        splitLine: { lineStyle: { color: rule } },
        splitArea: { areaStyle: { color: ['transparent', 'rgba(45,164,78,0.03)'] } },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [9, 8, 8, 7, 8],
            name: '高分回答',
            itemStyle: { color: accent },
            lineStyle: { color: accent, width: 2 },
            areaStyle: { color: accent, opacity: 0.15 },
            symbolSize: 6
          },
          {
            value: [5, 3, 4, 2, 3],
            name: '普通回答',
            itemStyle: { color: accent5 },
            lineStyle: { color: accent5, width: 2, type: 'dashed' },
            areaStyle: { color: accent5, opacity: 0.08 },
            symbolSize: 6
          }
        ]
      }]
    });

    window.addEventListener('resize', function() { radarChart.resize(); });
  }

  // ===== Bar Chart: Framework Comparison =====
  var fwEl = document.getElementById('chart-framework');
  if (fwEl) {
    var fwChart = echarts.init(fwEl, null, { renderer: 'svg' });

    fwChart.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        appendToBody: true,
        backgroundColor: 'rgba(28,33,40,0.92)',
        borderColor: 'rgba(255,255,255,0.1)',
        textStyle: { color: '#fff', fontSize: 12 },
        extraCssText: 'border-radius:8px;padding:10px 14px;'
      },
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemGap: 14,
        itemWidth: 12,
        itemHeight: 12
      },
      grid: { left: '8%', right: '8%', top: '8%', bottom: '18%' },
      xAxis: {
        type: 'category',
        data: ['分层框架', 'RISEN', 'CRISPE', 'RTGO'],
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: ink, fontSize: 13, fontWeight: 600 }
      },
      yAxis: {
        type: 'value',
        max: 10,
        axisLine: { show: false },
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule } }
      },
      series: [
        {
          name: '结构化程度',
          type: 'bar',
          data: [9, 8, 10, 6],
          itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] },
          barGap: '20%'
        },
        {
          name: '上手容易度',
          type: 'bar',
          data: [6, 8, 4, 9],
          itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] }
        },
        {
          name: '适用复杂度',
          type: 'bar',
          data: [9, 7, 10, 5],
          itemStyle: { color: accent4, borderRadius: [4, 4, 0, 0] }
        }
      ]
    });

    window.addEventListener('resize', function() { fwChart.resize(); });
  }

  // ===== Bar Chart: Interview Assessment Dimensions =====
  var barEl = document.getElementById('chart-bar');
  if (barEl) {
    var barChart = echarts.init(barEl, null, { renderer: 'svg' });

    barChart.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        appendToBody: true,
        backgroundColor: 'rgba(28,33,40,0.92)',
        borderColor: 'rgba(255,255,255,0.1)',
        textStyle: { color: '#fff', fontSize: 12 },
        extraCssText: 'border-radius:8px;padding:10px 14px;',
        formatter: function(params) {
          return params[0].name + '<br/>权重占比：' + params[0].value + '%';
        }
      },
      grid: { left: '20%', right: '8%', top: '5%', bottom: '8%' },
      xAxis: {
        type: 'value',
        max: 30,
        axisLine: { show: false },
        axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' },
        splitLine: { lineStyle: { color: rule } }
      },
      yAxis: {
        type: 'category',
        data: ['具体实战经历', '结构化思维', '技术理解深度', '产品化认知', '风险与成本意识'],
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: ink, fontSize: 12, fontWeight: 600 }
      },
      series: [{
        type: 'bar',
        data: [
          { value: 28, itemStyle: { color: accent } },
          { value: 22, itemStyle: { color: accent2 } },
          { value: 20, itemStyle: { color: accent4 } },
          { value: 18, itemStyle: { color: accent3 } },
          { value: 12, itemStyle: { color: accent5 } }
        ],
        barWidth: '50%',
        itemStyle: { borderRadius: [0, 4, 4, 0] },
        label: {
          show: true,
          position: 'right',
          color: ink,
          fontSize: 12,
          fontWeight: 600,
          formatter: '{c}%'
        }
      }]
    });

    window.addEventListener('resize', function() { barChart.resize(); });
  }
})();
