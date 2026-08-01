(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim() || '#0089FF';
  var accent2 = style.getPropertyValue('--accent2').trim() || '#FF6B35';
  var ink = style.getPropertyValue('--ink').trim() || '#1A2332';
  var muted = style.getPropertyValue('--muted').trim() || '#5A6B7D';
  var rule = style.getPropertyValue('--rule').trim() || '#E2E8F0';
  var bg = style.getPropertyValue('--bg').trim() || '#F0F4F8';
  var bg2 = style.getPropertyValue('--bg2').trim() || '#FFFFFF';
  var round1 = style.getPropertyValue('--round1').trim() || '#0089FF';
  var round2 = style.getPropertyValue('--round2').trim() || '#7C3AED';
  var round3 = style.getPropertyValue('--round3').trim() || '#FF6B35';
  var success = style.getPropertyValue('--success').trim() || '#00B894';

  var tooltipStyle = {
    backgroundColor: 'rgba(26,35,50,0.92)',
    borderColor: 'rgba(255,255,255,0.1)',
    textStyle: { color: '#fff', fontSize: 12 },
    extraCssText: 'border-radius:12px;padding:10px 14px;'
  };

  // ===== Radar Chart: Three-round Assessment Dimensions =====
  var radarEl = document.getElementById('chart-radar');
  if (radarEl) {
    var radarChart = echarts.init(radarEl, null, { renderer: 'svg' });

    var radarOptions = {
      animation: false,
      tooltip: Object.assign({ trigger: 'item' }, tooltipStyle),
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemGap: 16,
        itemWidth: 14,
        itemHeight: 14
      },
      radar: {
        indicator: [
          { name: '项目深度', max: 10 },
          { name: '技术理解', max: 10 },
          { name: '产品Sense', max: 10 },
          { name: '业务场景', max: 10 },
          { name: '抗压能力', max: 10 },
          { name: '战略视野', max: 10 },
          { name: '沟通协作', max: 10 }
        ],
        center: ['50%', '52%'],
        radius: '65%',
        axisName: {
          color: ink,
          fontSize: 13,
          fontWeight: 600
        },
        splitLine: { lineStyle: { color: rule } },
        splitArea: {
          areaStyle: { color: [bg2, bg] }
        },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [9, 8, 7, 5, 4, 3, 6],
            name: '一面：基础能力',
            itemStyle: { color: round1 },
            lineStyle: { color: round1, width: 2 },
            areaStyle: { color: 'rgba(0,137,255,0.12)' },
            symbolSize: 6
          },
          {
            value: [6, 5, 8, 9, 8, 6, 8],
            name: '二面：综合素质',
            itemStyle: { color: round2 },
            lineStyle: { color: round2, width: 2 },
            areaStyle: { color: 'rgba(124,58,237,0.12)' },
            symbolSize: 6
          },
          {
            value: [4, 4, 6, 7, 5, 9, 7],
            name: '三面：总监面',
            itemStyle: { color: round3 },
            lineStyle: { color: round3, width: 2 },
            areaStyle: { color: 'rgba(255,107,53,0.12)' },
            symbolSize: 6
          }
        ]
      }]
    };

    setTimeout(function() {
      radarChart.setOption(radarOptions);
      radarChart.resize();
    }, 200);

    window.addEventListener('resize', function() { radarChart.resize(); });
  }

  // ===== Pie Chart: Topic Distribution =====
  var topicsEl = document.getElementById('chart-topics');
  if (topicsEl) {
    var topicsChart = echarts.init(topicsEl, null, { renderer: 'svg' });

    var topicsOptions = {
      animation: false,
      tooltip: Object.assign({
        trigger: 'item',
        formatter: '{b}: {c}题 ({d}%)'
      }, tooltipStyle),
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemGap: 10,
        itemWidth: 12,
        itemHeight: 12
      },
      series: [{
        type: 'pie',
        radius: ['38%', '68%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8,
          borderColor: bg2,
          borderWidth: 3
        },
        label: {
          show: true,
          formatter: '{b}\n{c}题',
          color: ink,
          fontSize: 12,
          fontWeight: 600
        },
        labelLine: {
          lineStyle: { color: rule }
        },
        data: [
          { value: 11, name: '项目经历深挖', itemStyle: { color: round1 } },
          { value: 8, name: 'AI技术通识', itemStyle: { color: '#4A90D9' } },
          { value: 6, name: '产品Sense', itemStyle: { color: round2 } },
          { value: 6, name: '业务策略', itemStyle: { color: round3 } },
          { value: 4, name: '压力面/价值观', itemStyle: { color: '#E84393' } },
          { value: 5, name: '宏观行业', itemStyle: { color: success } }
        ]
      }]
    };

    setTimeout(function() {
      topicsChart.setOption(topicsOptions);
      topicsChart.resize();
    }, 300);

    window.addEventListener('resize', function() { topicsChart.resize(); });
  }

  // ===== Bar Chart: Ability Model =====
  var abilityEl = document.getElementById('chart-ability');
  if (abilityEl) {
    var abilityChart = echarts.init(abilityEl, null, { renderer: 'svg' });

    var abilityOptions = {
      animation: false,
      tooltip: Object.assign({
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function(params) {
          var str = '<strong>' + params[0].name + '</strong><br/>';
          params.forEach(function(p) {
            str += p.marker + ' ' + p.seriesName + ': ' + p.value + '/10<br/>';
          });
          return str;
        }
      }, tooltipStyle),
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemGap: 16,
        itemWidth: 14,
        itemHeight: 14
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['技术理解力', '产品判断力', '落地执行力', '战略视野', '沟通协作力'],
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: ink, fontSize: 12, fontWeight: 600, interval: 0 },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        max: 10,
        splitLine: { lineStyle: { color: rule, type: 'dashed' } },
        axisLabel: { color: muted, fontSize: 11 }
      },
      series: [
        {
          name: '考察权重',
          type: 'bar',
          data: [
            { value: 9, itemStyle: { color: round1 } },
            { value: 8, itemStyle: { color: '#4A90D9' } },
            { value: 8, itemStyle: { color: round2 } },
            { value: 7, itemStyle: { color: round3 } },
            { value: 6, itemStyle: { color: success } }
          ],
          barWidth: '40%',
          itemStyle: { borderRadius: [8, 8, 0, 0] },
          label: {
            show: true,
            position: 'top',
            color: ink,
            fontSize: 13,
            fontWeight: 700,
            formatter: '{c}/10'
          }
        }
      ]
    };

    setTimeout(function() {
      abilityChart.setOption(abilityOptions);
      abilityChart.resize();
    }, 200);

    window.addEventListener('resize', function() { abilityChart.resize(); });
  }
})();
