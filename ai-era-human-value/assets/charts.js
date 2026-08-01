(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart 1: Five barriers weight distribution (bar) ---
  var barriersEl = document.getElementById('chart-barriers');
  if (barriersEl) {
    var chart1 = echarts.init(barriersEl, null, { renderer: 'svg' });
    chart1.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
        axisPointer: { type: 'shadow' },
        formatter: function(params) {
          var data = params[0];
          var descs = [
            'AI能写一百个版本，但不知道哪个对——审美是混乱的、私人的、不可量化的',
            'AI能生成方案，但把方案变成现实需要穿越无数摩擦——在混乱现实中把事做成',
            '答案越便宜，提问越珍贵——能问出好问题的人，能激发AI的潜力',
            '能不能从第一性原理做分析判断——做AI产出的"终审法官"',
            '你的人生轨迹、失败教训、行业洞察——AI学不到的个人训练数据'
          ];
          return data.name + '<br>权重: ' + data.value + '%<br><span style="color:' + muted + ';font-size:12px">' + descs[data.dataIndex] + '</span>';
        }
      },
      grid: {
        left: '3%',
        right: '12%',
        bottom: '8%',
        top: '6%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        max: 30,
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' },
        splitLine: { lineStyle: { color: rule } }
      },
      yAxis: {
        type: 'category',
        data: ['批判性思维', '提问能力', '执行力', '审美与品味', '独特阅历'],
        axisLine: { lineStyle: { color: rule } },
        axisLabel: {
          color: ink,
          fontSize: 13,
          fontWeight: 600
        }
      },
      series: [{
        type: 'bar',
        data: [
          { value: 15, itemStyle: { color: accent3 } },
          { value: 18, itemStyle: { color: accent3 } },
          { value: 20, itemStyle: { color: accent2 } },
          { value: 22, itemStyle: { color: accent2 } },
          { value: 25, itemStyle: { color: accent } }
        ],
        barWidth: '50%',
        itemStyle: { borderRadius: [0, 6, 6, 0] },
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
    window.addEventListener('resize', function() { chart1.resize(); });
  }

  // --- Chart 2: Industrial era vs AI era capability radar ---
  var radarEl = document.getElementById('chart-radar');
  if (radarEl) {
    var chart2 = echarts.init(radarEl, null, { renderer: 'svg' });
    chart2.setOption({
      animation: false,
      tooltip: {
        trigger: 'item',
        appendToBody: true
      },
      legend: {
        data: ['工业时代（螺丝钉思维）', 'AI时代（企业家思维）'],
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemGap: 16
      },
      radar: {
        indicator: [
          { name: '执行力', max: 10 },
          { name: '专业深度', max: 10 },
          { name: '判断力', max: 10 },
          { name: '审美品味', max: 10 },
          { name: '提问能力', max: 10 },
          { name: '批判性思维', max: 10 },
          { name: '创造力', max: 10 }
        ],
        center: ['50%', '48%'],
        radius: '60%',
        axisName: {
          color: ink,
          fontSize: 12,
          fontWeight: 600
        },
        splitLine: { lineStyle: { color: rule } },
        splitArea: {
          areaStyle: {
            color: [bg2, '#FAFBF7']
          }
        },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [9, 9, 5, 4, 3, 4, 4],
            name: '工业时代（螺丝钉思维）',
            itemStyle: { color: muted },
            areaStyle: { color: muted + '20' },
            lineStyle: { color: muted, width: 2, type: 'dashed' }
          },
          {
            value: [5, 4, 9, 8, 9, 9, 9],
            name: 'AI时代（企业家思维）',
            itemStyle: { color: accent },
            areaStyle: { color: accent + '25' },
            lineStyle: { color: accent, width: 2.5 }
          }
        ]
      }]
    });
    window.addEventListener('resize', function() { chart2.resize(); });
  }

  // --- Chart 3: Human-AI collaboration model (pie) ---
  var collabEl = document.getElementById('chart-collab');
  if (collabEl) {
    var chart3 = echarts.init(collabEl, null, { renderer: 'svg' });
    chart3.setOption({
      animation: false,
      tooltip: {
        trigger: 'item',
        appendToBody: true,
        formatter: '{b}: {c}%'
      },
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemGap: 12
      },
      series: [{
        type: 'pie',
        radius: ['35%', '65%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: bg2,
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}\n{c}%',
          color: ink,
          fontSize: 13,
          fontWeight: 600
        },
        labelLine: {
          lineStyle: { color: rule }
        },
        data: [
          { value: 60, name: 'AI执行', itemStyle: { color: accent3 } },
          { value: 25, name: '人做判断', itemStyle: { color: accent } },
          { value: 15, name: '人做决策', itemStyle: { color: accent2 } }
        ]
      }]
    });
    window.addEventListener('resize', function() { chart3.resize(); });
  }
})();
