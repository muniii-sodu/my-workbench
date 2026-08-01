(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var warn = style.getPropertyValue('--warn').trim();

  // --- Chart 1: Three-level comparison radar ---
  var radarEl = document.getElementById('chart-radar');
  if (radarEl) {
    var chart1 = echarts.init(radarEl, null, { renderer: 'svg' });
    chart1.setOption({
      animation: false,
      tooltip: {
        trigger: 'item',
        appendToBody: true
      },
      legend: {
        data: ['L1 感知型', 'L2 指标拆解型', 'L3 体系化构建型'],
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemGap: 16
      },
      radar: {
        indicator: [
          { name: '维度定义', max: 5 },
          { name: '评测集构建', max: 5 },
          { name: '评分标准', max: 5 },
          { name: '落地分工', max: 5 },
          { name: 'Bad Case回流', max: 5 },
          { name: '持续机制', max: 5 }
        ],
        center: ['50%', '48%'],
        radius: '62%',
        axisName: {
          color: ink,
          fontSize: 13,
          fontWeight: 600
        },
        splitLine: { lineStyle: { color: rule } },
        splitArea: {
          areaStyle: {
            color: [bg2, '#F8F9FA']
          }
        },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [2, 1, 1, 1, 1, 1],
            name: 'L1 感知型',
            itemStyle: { color: accent3 },
            areaStyle: { color: accent3 + '20' },
            lineStyle: { color: accent3, width: 2 }
          },
          {
            value: [4, 2, 2, 2, 1, 1],
            name: 'L2 指标拆解型',
            itemStyle: { color: accent2 },
            areaStyle: { color: accent2 + '20' },
            lineStyle: { color: accent2, width: 2 }
          },
          {
            value: [5, 5, 5, 4, 5, 5],
            name: 'L3 体系化构建型',
            itemStyle: { color: accent },
            areaStyle: { color: accent + '25' },
            lineStyle: { color: accent, width: 2.5 }
          }
        ]
      }]
    });
    window.addEventListener('resize', function() { chart1.resize(); });
  }

  // --- Chart 2: Golden Set sample distribution pie ---
  var pieEl = document.getElementById('chart-pie');
  if (pieEl) {
    var chart2 = echarts.init(pieEl, null, { renderer: 'svg' });
    chart2.setOption({
      animation: false,
      tooltip: {
        trigger: 'item',
        appendToBody: true,
        formatter: '{b}: {c}% ({d}%)'
      },
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemGap: 12
      },
      series: [{
        type: 'pie',
        radius: ['38%', '65%'],
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
          { value: 30, name: '高频简单问', itemStyle: { color: accent } },
          { value: 40, name: '中等业务场景', itemStyle: { color: accent2 } },
          { value: 20, name: '多轮复杂场景', itemStyle: { color: accent3 } },
          { value: 10, name: '故意刁难', itemStyle: { color: warn } }
        ]
      }]
    });
    window.addEventListener('resize', function() { chart2.resize(); });
  }

  // --- Chart 3: Bad Case five-bucket classification bar ---
  var badcaseEl = document.getElementById('chart-badcase');
  if (badcaseEl) {
    var chart3 = echarts.init(badcaseEl, null, { renderer: 'svg' });
    chart3.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
        axisPointer: { type: 'shadow' },
        formatter: function(params) {
          var data = params[0];
          var actions = [
            '走数据治理 / 优化召回<br>绝对不能SFT',
            'SFT训练（业务侧改写）<br>50~100对样本',
            'DPO训练（偏好对）<br>200对风格偏好',
            '收敛需求 / 加兜底<br>产品侧调整',
            '修代码 / 调链路<br>工程侧修复'
          ];
          return data.name + '<br><span style="color:' + data.color + '">●</span> 处理方式: ' + actions[data.dataIndex];
        }
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '8%',
        top: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        max: 5,
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule } }
      },
      yAxis: {
        type: 'category',
        data: ['产品边界问题', 'Agent链路问题', '风格偏好问题', '行为模式问题', '知识库问题'],
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
          { value: 3, itemStyle: { color: warn } },
          { value: 3, itemStyle: { color: accent3 } },
          { value: 4, itemStyle: { color: accent2 } },
          { value: 4, itemStyle: { color: accent } },
          { value: 5, itemStyle: { color: accent } }
        ],
        barWidth: '50%',
        itemStyle: { borderRadius: [0, 6, 6, 0] },
        label: {
          show: true,
          position: 'right',
          color: ink,
          fontSize: 12,
          fontWeight: 600,
          formatter: function(params) {
            var labels = ['收敛需求', '修代码/调链路', 'DPO训练', 'SFT训练', '数据治理'];
            return labels[params.dataIndex];
          }
        }
      }]
    });
    window.addEventListener('resize', function() { chart3.resize(); });
  }
})();
