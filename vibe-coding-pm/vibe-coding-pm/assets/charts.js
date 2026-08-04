/* ============================================================
 * charts.js — Vibe Coding PM报告图表
 * 包含：三大特性影响雷达图、六大优势柱状图、八大工具能力对比图
 * ============================================================ */
(function () {
  'use strict';

  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();     /* #EA580C */
  var accent2 = style.getPropertyValue('--accent2').trim();   /* #7C3AED */
  var accent3 = style.getPropertyValue('--accent3').trim();   /* #0891B2 */
  var accent4 = style.getPropertyValue('--accent4').trim();   /* #DC2626 */
  var ink = style.getPropertyValue('--ink').trim();           /* #1A1A2E */
  var muted = style.getPropertyValue('--muted').trim();       /* #6B7280 */
  var muted2 = style.getPropertyValue('--muted2').trim();     /* #9CA3AF */
  var rule = style.getPropertyValue('--rule').trim();         /* #E5E7EB */
  var bg2 = style.getPropertyValue('--bg2').trim();           /* #FFFFFF */

  /* ============================================================
   * 图表 1：AI PM三大特性影响程度（雷达图）
   * ============================================================ */
  function initRadarChart() {
    var el = document.getElementById('chart-radar');
    if (!el) return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    chart.setOption({
      backgroundColor: 'transparent',
      animation: false,
      tooltip: { trigger: 'item', appendToBody: true },
      radar: {
        center: ['50%', '52%'],
        radius: '65%',
        indicator: [
          { name: 'PRD不可预测性', max: 10 },
          { name: '试错频率需求', max: 10 },
          { name: '迭代速度要求', max: 10 },
          { name: '竞争窗口紧迫', max: 10 },
          { name: '模型行为依赖', max: 10 },
          { name: '工程协作复杂度', max: 10 }
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
            value: [9, 9, 10, 9, 8, 7],
            name: 'AI PM需求特性',
            areaStyle: { color: accent + '20' },
            lineStyle: { color: accent, width: 2 },
            itemStyle: { color: accent },
            symbolSize: 6
          },
          {
            value: [4, 3, 4, 5, 2, 5],
            name: '传统PM需求特性',
            areaStyle: { color: accent3 + '20' },
            lineStyle: { color: accent3, width: 2 },
            itemStyle: { color: accent3 },
            symbolSize: 6
          }
        ]
      }],
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemWidth: 14,
        itemHeight: 8,
        itemGap: 16
      }
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ============================================================
   * 图表 2：六大优势对AI PM工作场景影响程度（柱状图）
   * ============================================================ */
  function initBarChart() {
    var el = document.getElementById('chart-bar');
    if (!el) return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    var advantages = [
      { name: 'PRD前\n先跑原型', impact: 92, desc: '文档质量换段位，评审从2小时变40分钟' },
      { name: '跟工程师\n讨论有底气', impact: 85, desc: '从"做不了"到"五天能做"，有参考实现' },
      { name: '用户访谈\n当场给原型', impact: 88, desc: '假设→验证周期从三周缩到两天' },
      { name: '自己搭\n内部工具', impact: 90, desc: '一年积累十几个工具，形成工具军团' },
      { name: '评估第三方\n技术方案', impact: 78, desc: '省下几十万年费，不再被忽悠' },
      { name: '招聘管人\n判断力升级', impact: 75, desc: '知道什么是30分钟和3周的工作量' }
    ];

    chart.setOption({
      backgroundColor: 'transparent',
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        appendToBody: true,
        formatter: function (params) {
          var p = params[0];
          var item = advantages[p.dataIndex];
          return item.name.replace(/\n/g, '') + '<br/>影响程度：' + item.impact + '<br/>' + item.desc;
        }
      },
      grid: {
        left: '3%',
        right: '5%',
        bottom: '8%',
        top: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: advantages.map(function (a) { return a.name; }),
        axisLabel: {
          color: muted,
          fontSize: 11,
          lineHeight: 14,
          interval: 0
        },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        max: 100,
        name: '影响程度',
        nameTextStyle: {
          color: muted,
          fontSize: 11,
          padding: [0, 0, 0, 30]
        },
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule, type: 'dashed', opacity: 0.5 } },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [{
        type: 'bar',
        data: advantages.map(function (a, i) {
          var color;
          if (a.impact >= 90) color = accent;
          else if (a.impact >= 80) color = accent2;
          else color = accent3;
          return {
            value: a.impact,
            itemStyle: {
              color: color,
              borderRadius: [4, 4, 0, 0]
            }
          };
        }),
        barWidth: '52%',
        label: {
          show: true,
          position: 'top',
          color: ink,
          fontSize: 12,
          fontWeight: 700,
          formatter: '{c}'
        }
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ============================================================
   * 图表 3：八大Vibe Coding工具能力维度对比（雷达图）
   * ============================================================ */
  function initPieChart() {
    var el = document.getElementById('chart-pie');
    if (!el) return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    /* 八大工具在五个维度上的评分 */
    var dimensions = ['易用性', '功能深度', '全栈能力', '部署便捷', '协作支持'];

    var tools = [
      { name: 'Cursor', values: [7, 10, 8, 5, 8], color: accent },
      { name: 'Claude Code', values: [5, 10, 7, 4, 7], color: accent2 },
      { name: 'Windsurf', values: [7, 8, 7, 5, 7], color: accent3 },
      { name: 'Cline/Codex', values: [4, 9, 6, 4, 6], color: '#F59E0B' },
      { name: 'v0', values: [10, 5, 4, 8, 5], color: '#8B5CF6' },
      { name: 'Bolt.new', values: [9, 7, 9, 9, 6], color: '#06B6D4' },
      { name: 'Lovable', values: [10, 6, 7, 8, 5], color: '#EC4899' },
      { name: 'Replit Agent', values: [8, 8, 9, 9, 7], color: '#10B981' }
    ];

    chart.setOption({
      backgroundColor: 'transparent',
      animation: false,
      tooltip: { trigger: 'item', appendToBody: true },
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 11 },
        itemWidth: 12,
        itemHeight: 8,
        itemGap: 10,
        type: 'scroll'
      },
      radar: {
        center: ['50%', '48%'],
        radius: '60%',
        indicator: dimensions.map(function (d) {
          return { name: d, max: 10 };
        }),
        axisName: {
          color: ink,
          fontSize: 13,
          fontWeight: 600
        },
        splitLine: { lineStyle: { color: rule, width: 1 } },
        splitArea: {
          areaStyle: {
            color: [accent + '03', accent + '08']
          }
        },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar',
        data: tools.map(function (t) {
          return {
            name: t.name,
            value: t.values,
            lineStyle: { color: t.color, width: 2 },
            itemStyle: { color: t.color },
            symbolSize: 5,
            areaStyle: { opacity: 0.03 }
          };
        })
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ---- 初始化 ---- */
  function init() {
    initRadarChart();
    initBarChart();
    initPieChart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
