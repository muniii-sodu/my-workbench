(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart: Radar - Interview Knowledge Dimensions ---
  var radarEl = document.getElementById('chart-radar');
  if (radarEl) {
    var chart = echarts.init(radarEl, null, { renderer: 'svg' });
    chart.setOption({
      animation: false,
      tooltip: {
        trigger: 'item',
        appendToBody: true
      },
      radar: {
        indicator: [
          { name: '自我介绍与JD匹配', max: 10 },
          { name: '项目经历(STAR)', max: 10 },
          { name: 'AI内容质量判断', max: 10 },
          { name: 'Rubric规则设计', max: 10 },
          { name: '大模型基础知识', max: 10 },
          { name: '语音标注实操', max: 10 },
          { name: '大规模项目管理', max: 10 },
          { name: '差异化优势表达', max: 10 }
        ],
        radius: '65%',
        center: ['50%', '52%'],
        axisName: {
          color: ink,
          fontSize: 12,
          fontWeight: 600
        },
        splitLine: {
          lineStyle: {
            color: rule
          }
        },
        splitArea: {
          areaStyle: {
            color: [bg2, '#F5F5F0']
          }
        },
        axisLine: {
          lineStyle: {
            color: rule
          }
        }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [7, 7, 5, 3, 4, 2, 2, 3],
            name: '候选人表现评估',
            areaStyle: {
              color: accent + '33'
            },
            lineStyle: {
              color: accent,
              width: 2
            },
            itemStyle: {
              color: accent
            },
            symbolSize: 6
          },
          {
            value: [9, 9, 8, 8, 8, 8, 8, 9],
            name: '岗位期望水平',
            areaStyle: {
              color: accent2 + '15'
            },
            lineStyle: {
              color: accent2,
              width: 2,
              type: 'dashed'
            },
            itemStyle: {
              color: accent2
            },
            symbolSize: 6
          }
        ]
      }],
      legend: {
        data: ['候选人表现评估', '岗位期望水平'],
        bottom: 10,
        textStyle: {
          color: muted,
          fontSize: 12
        },
        itemWidth: 16,
        itemHeight: 10
      }
    });
    window.addEventListener('resize', function() { chart.resize(); });
  }
})();
