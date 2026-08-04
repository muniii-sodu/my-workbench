/* ============================================================
 * charts.js — AI时代人才的六大核心特质 报告图表
 * 包含：雷达图、饼图、柱状图
 * ============================================================ */
(function () {
  'use strict';

  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();     /* #B85C2E */
  var accent2 = style.getPropertyValue('--accent2').trim();   /* #2C5F5D */
  var accent3 = style.getPropertyValue('--accent3').trim();   /* #C49A3F */
  var ink = style.getPropertyValue('--ink').trim();           /* #2A2018 */
  var muted = style.getPropertyValue('--muted').trim();       /* #7A6E62 */
  var rule = style.getPropertyValue('--rule').trim();         /* #E8E0D5 */

  /* ============================================================
   * 图表 1：六大特质 AI替代难度 vs 人类独占度（雷达图）
   * ============================================================ */
  function initRadarChart() {
    var el = document.getElementById('chart-radar');
    if (!el) return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    chart.setOption({
      backgroundColor: 'transparent',
      animation: false,
      tooltip: { trigger: 'item', appendToBody: true },
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemWidth: 14,
        itemHeight: 8,
        itemGap: 16
      },
      radar: {
        center: ['50%', '48%'],
        radius: '62%',
        indicator: [
          { name: '判断力', max: 10 },
          { name: '提问能力', max: 10 },
          { name: '翻译能力', max: 10 },
          { name: '跨界连接', max: 10 },
          { name: '叙事能力', max: 10 },
          { name: '建立信任', max: 10 }
        ],
        axisName: {
          color: ink,
          fontSize: 13,
          fontWeight: 600
        },
        splitLine: { lineStyle: { color: rule, width: 1 } },
        splitArea: {
          areaStyle: {
            color: [accent + '04', accent + '0a']
          }
        },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [9, 8, 7, 8, 7, 10],
            name: 'AI替代难度',
            areaStyle: { color: accent + '20' },
            lineStyle: { color: accent, width: 2 },
            itemStyle: { color: accent },
            symbolSize: 6
          },
          {
            value: [8, 9, 8, 9, 8, 10],
            name: '人类独占度',
            areaStyle: { color: accent2 + '20' },
            lineStyle: { color: accent2, width: 2 },
            itemStyle: { color: accent2 },
            symbolSize: 6
          }
        ]
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ============================================================
   * 图表 2：AI时代人才能力三层模型（饼图）
   * ============================================================ */
  function initPieChart() {
    var el = document.getElementById('chart-pie');
    if (!el) return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    chart.setOption({
      backgroundColor: 'transparent',
      animation: false,
      tooltip: {
        trigger: 'item',
        appendToBody: true,
        formatter: '{b}<br/>占比：{c}%<br/>{d}%'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: { color: muted, fontSize: 12 },
        itemWidth: 14,
        itemHeight: 8
      },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['38%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'center',
          formatter: '{b|能力三层模型}\n{c|AI时代}',
          rich: {
            b: { fontSize: 14, fontWeight: 700, color: ink, lineHeight: 24 },
            c: { fontSize: 12, color: muted, lineHeight: 20 }
          }
        },
        emphasis: {
          label: { show: true, fontSize: 16, fontWeight: 700 },
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.1)' }
        },
        labelLine: { show: false },
        data: [
          { value: 40, name: '可习得技能（AI可替代）', itemStyle: { color: accent3 } },
          { value: 35, name: '思维模式（AI难以替代）', itemStyle: { color: accent2 } },
          { value: 25, name: '人格特质（AI不可替代）', itemStyle: { color: accent } }
        ]
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ============================================================
   * 图表 3：六大特质培养难度与稀缺程度（柱状图）
   * ============================================================ */
  function initBarChart() {
    var el = document.getElementById('chart-bar');
    if (!el) return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    var qualities = ['判断力', '提问能力', '翻译能力', '跨界连接', '叙事能力', '建立信任'];

    chart.setOption({
      backgroundColor: 'transparent',
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        appendToBody: true
      },
      legend: {
        top: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemWidth: 14,
        itemHeight: 8,
        itemGap: 16
      },
      grid: {
        left: '3%',
        right: '5%',
        bottom: '8%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: qualities,
        axisLabel: {
          color: ink,
          fontSize: 12,
          fontWeight: 600
        },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        max: 10,
        name: '评分 (1-10)',
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule, type: 'dashed', opacity: 0.5 } },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          name: '培养难度',
          type: 'bar',
          data: [8, 7, 8, 9, 7, 10],
          itemStyle: {
            color: accent,
            borderRadius: [4, 4, 0, 0]
          },
          barWidth: '30%',
          label: {
            show: true,
            position: 'top',
            color: accent,
            fontSize: 11,
            fontWeight: 700
          }
        },
        {
          name: '市场稀缺度',
          type: 'bar',
          data: [9, 8, 7, 9, 8, 10],
          itemStyle: {
            color: accent2,
            borderRadius: [4, 4, 0, 0]
          },
          barWidth: '30%',
          label: {
            show: true,
            position: 'top',
            color: accent2,
            fontSize: 11,
            fontWeight: 700
          }
        }
      ]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ============================================================
   * 初始化所有图表
   * ============================================================ */
  function init() {
    initRadarChart();
    initPieChart();
    initBarChart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
