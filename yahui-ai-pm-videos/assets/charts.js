(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart 1: Knowledge Coverage Radar ---
  var radarEl = document.getElementById('chart-radar');
  if (radarEl) {
    var radar = echarts.init(radarEl, null, { renderer: 'svg' });
    radar.setOption({
      animation: false,
      tooltip: { appendToBody: true },
      legend: {
        data: ['Skill设计', 'Query改写', 'FDE岗位', '简历准备'],
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 }
      },
      radar: {
        indicator: [
          { name: '技术深度', max: 10 },
          { name: '实操性', max: 10 },
          { name: '面试价值', max: 10 },
          { name: '通用性', max: 10 },
          { name: '时效性', max: 10 },
          { name: '受众广度', max: 10 }
        ],
        axisName: { color: ink, fontSize: 13 },
        splitLine: { lineStyle: { color: rule } },
        splitArea: { areaStyle: { color: ['transparent', 'rgba(0,137,255,0.03)'] } },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar',
        data: [
          { value: [9, 8, 7, 6, 9, 5], name: 'Skill设计', areaStyle: { color: accent + '20' }, lineStyle: { color: accent, width: 2 }, itemStyle: { color: accent } },
          { value: [8, 7, 8, 7, 8, 6], name: 'Query改写', areaStyle: { color: accent2 + '20' }, lineStyle: { color: accent2, width: 2 }, itemStyle: { color: accent2 } },
          { value: [5, 6, 8, 5, 7, 8], name: 'FDE岗位', areaStyle: { color: '#7C3AED20' }, lineStyle: { color: '#7C3AED', width: 2 }, itemStyle: { color: '#7C3AED' } },
          { value: [3, 9, 7, 8, 6, 9], name: '简历准备', areaStyle: { color: '#00B89420' }, lineStyle: { color: '#00B894', width: 2 }, itemStyle: { color: '#00B894' } }
        ]
      }]
    });
    window.addEventListener('resize', function() { radar.resize(); });
  }

  // --- Chart 2: Video Engagement Bar ---
  var barEl = document.getElementById('chart-engagement');
  if (barEl) {
    var bar = echarts.init(barEl, null, { renderer: 'svg' });
    bar.setOption({
      animation: false,
      tooltip: { appendToBody: true, trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['点赞数'], bottom: 0, textStyle: { color: muted } },
      grid: { left: '3%', right: '4%', bottom: '10%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['第1集\nSkill设计', '第2集\nQuery改写', '第3集\nFDE求职', '第4集\n简历准备'],
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, fontSize: 12, interval: 0 }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: { color: muted },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      series: [{
        name: '点赞数',
        type: 'bar',
        data: [1125, 199, 16, 148],
        itemStyle: {
          color: function(params) {
            var colors = [accent, accent2, '#7C3AED', '#00B894'];
            return colors[params.dataIndex];
          },
          borderRadius: [8, 8, 0, 0]
        },
        barWidth: '40%',
        label: { show: true, position: 'top', color: ink, fontWeight: 700, fontSize: 14 }
      }]
    });
    window.addEventListener('resize', function() { bar.resize(); });
  }

  // --- Chart 3: FDE vs AI PM Comparison ---
  var compareEl = document.getElementById('chart-compare');
  if (compareEl) {
    var compare = echarts.init(compareEl, null, { renderer: 'svg' });
    compare.setOption({
      animation: false,
      tooltip: { appendToBody: true, trigger: 'axis' },
      legend: { data: ['AI产品经理', 'FDE工程师'], bottom: 0, textStyle: { color: muted } },
      grid: { left: '3%', right: '4%', bottom: '10%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['产品规划', '技术深度', '客户沟通', '方案落地', '效果评估', '方法论沉淀'],
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, fontSize: 12 }
      },
      yAxis: {
        type: 'value',
        max: 10,
        axisLine: { show: false },
        axisLabel: { color: muted },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      series: [
        {
          name: 'AI产品经理',
          type: 'bar',
          data: [9, 5, 7, 6, 7, 6],
          itemStyle: { color: accent, borderRadius: [6, 6, 0, 0] },
          barGap: '10%'
        },
        {
          name: 'FDE工程师',
          type: 'bar',
          data: [6, 9, 8, 9, 8, 7],
          itemStyle: { color: accent2, borderRadius: [6, 6, 0, 0] }
        }
      ]
    });
    window.addEventListener('resize', function() { compare.resize(); });
  }
})();
