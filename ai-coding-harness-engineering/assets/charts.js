/* ============================================================
 * charts.js — Harness Engineering 报告图表
 * 包含：雷达图、柱状图、阶梯折线图
 * ============================================================ */
(function () {
  'use strict';

  /* ---- 从 CSS 变量读取主题色 ---- */
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();     /* #38BDF8 */
  var accent2 = style.getPropertyValue('--accent2').trim();   /* #818CF8 */
  var accent3 = style.getPropertyValue('--accent3').trim();   /* #FBBF24 */
  var ink = style.getPropertyValue('--ink').trim();           /* #E2E8F0 */
  var muted = style.getPropertyValue('--muted').trim();       /* #94A3B8 */
  var rule = style.getPropertyValue('--rule').trim();         /* #334155 */
  var bg2 = style.getPropertyValue('--bg2').trim();           /* #1E293B */

  /* 多色调色板（从 CSS 变量派生，含透明度变体） */
  var palette = [
    accent,
    accent2,
    accent3,
    muted,
    accent + 'bb',
    accent2 + 'bb'
  ];

  /* ============================================================
   * 图表 1：六大支柱能力维度评估（雷达图）
   * 6 个维度，6 条支柱线
   * ============================================================ */
  function initRadarChart() {
    var el = document.getElementById('chart-radar');
    if (!el) return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    var dimensions = ['技术深度', '实操性', '面试频率', '工程价值', '安全性', '可扩展性'];

    var pillarData = [
      { name: '上下文管理',   values: [9, 8, 9, 9, 5, 8] },
      { name: '工具系统',     values: [8, 9, 8, 9, 6, 9] },
      { name: '执行编排',     values: [8, 7, 7, 9, 5, 8] },
      { name: '状态与记忆',   values: [7, 7, 8, 8, 4, 7] },
      { name: '评估与观测',   values: [7, 8, 8, 9, 7, 7] },
      { name: '约束与恢复',   values: [8, 7, 7, 8, 10, 7] }
    ];

    chart.setOption({
      backgroundColor: 'transparent',
      animation: false,
      color: palette,
      tooltip: {
        trigger: 'item',
        appendToBody: true,
        backgroundColor: bg2,
        borderColor: rule,
        textStyle: { color: ink, fontFamily: 'WorkSans' }
      },
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 11, fontFamily: 'WorkSans' },
        itemWidth: 14,
        itemHeight: 8,
        itemGap: 12,
        type: 'scroll'
      },
      radar: {
        center: ['50%', '48%'],
        radius: '62%',
        indicator: dimensions.map(function (d) {
          return { name: d, max: 10 };
        }),
        axisName: {
          color: ink,
          fontSize: 12,
          fontFamily: 'WorkSans',
          fontWeight: 600
        },
        splitLine: { lineStyle: { color: rule, width: 1 } },
        splitArea: {
          areaStyle: {
            color: [accent + '05', accent + '0d']
          }
        },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar',
        data: pillarData.map(function (p) {
          return {
            name: p.name,
            value: p.values,
            areaStyle: { opacity: 0.06 },
            lineStyle: { width: 2 },
            symbolSize: 5
          };
        })
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ============================================================
   * 图表 2：腾讯 AI Coding 效能提升指标（柱状图）
   * ============================================================ */
  function initBarChart() {
    var el = document.getElementById('chart-bar');
    if (!el) return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    /* 原始数据：百分比直接取值，倍率×10 映射到同一坐标轴 */
    var metrics = [
      { name: 'AI代码\n采纳率',   raw: '54%',   value: 54 },
      { name: '测试\n覆盖率',     raw: '90%+',  value: 90 },
      { name: '单测\n效率',       raw: '10x',   value: 100 },
      { name: '代码\n评审',       raw: '10x',   value: 100 },
      { name: '需求\n分析',       raw: '3-5x',  value: 40 },
      { name: '技术\n方案',       raw: '1-3x',  value: 20 },
      { name: 'E2E\n测试',        raw: '10x',   value: 100 }
    ];

    chart.setOption({
      backgroundColor: 'transparent',
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        appendToBody: true,
        backgroundColor: bg2,
        borderColor: rule,
        textStyle: { color: ink, fontFamily: 'WorkSans' },
        formatter: function (params) {
          var p = params[0];
          return p.name.replace(/\n/g, '') + '：' + metrics[p.dataIndex].raw;
        }
      },
      grid: {
        left: '3%',
        right: '5%',
        bottom: '8%',
        top: '12%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: metrics.map(function (m) { return m.name; }),
        axisLabel: {
          color: muted,
          fontSize: 11,
          fontFamily: 'WorkSans',
          lineHeight: 14
        },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        max: 110,
        axisLabel: {
          color: muted,
          fontSize: 11,
          fontFamily: 'WorkSans',
          formatter: function (v) {
            if (v === 100) return '100';
            return v;
          }
        },
        splitLine: { lineStyle: { color: rule, type: 'dashed', opacity: 0.5 } },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [{
        type: 'bar',
        data: metrics.map(function (m, i) {
          var isPercent = i < 2;
          return {
            value: m.value,
            itemStyle: {
              color: isPercent ? accent : accent2,
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
          fontFamily: 'WorkSans',
          formatter: function (params) {
            return metrics[params.dataIndex].raw;
          }
        }
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ============================================================
   * 图表 3：从 Prompt 到 World Model 六层演化（阶梯折线图）
   * ============================================================ */
  function initLineChart() {
    var el = document.getElementById('chart-line');
    if (!el) return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    var layers = [
      'Prompt\nEngineering',
      'Context\nEngineering',
      'Harness\nEngineering',
      'Loop\nEngineering',
      'Agent\nEngineering',
      'World Model\nEngineering'
    ];

    var focusShift = [20, 40, 60, 75, 88, 95];
    var trainingTarget = [15, 35, 55, 70, 82, 92];

    chart.setOption({
      backgroundColor: 'transparent',
      animation: false,
      color: [accent, accent2],
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
        backgroundColor: bg2,
        borderColor: rule,
        textStyle: { color: ink, fontFamily: 'WorkSans' }
      },
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 11, fontFamily: 'WorkSans' },
        data: ['工程重心迁移', '后训练对象演进'],
        itemWidth: 18,
        itemHeight: 8
      },
      grid: {
        left: '3%',
        right: '5%',
        bottom: '14%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: layers,
        axisLabel: {
          color: muted,
          fontSize: 10,
          fontFamily: 'WorkSans',
          lineHeight: 13,
          interval: 0
        },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        max: 100,
        min: 0,
        name: '训练复杂度',
        nameTextStyle: {
          color: muted,
          fontSize: 11,
          fontFamily: 'WorkSans',
          padding: [0, 0, 0, 30]
        },
        axisLabel: {
          color: muted,
          fontSize: 11,
          fontFamily: 'WorkSans'
        },
        splitLine: { lineStyle: { color: rule, type: 'dashed', opacity: 0.5 } },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          name: '工程重心迁移',
          type: 'line',
          step: 'middle',
          data: focusShift,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { width: 3, color: accent },
          itemStyle: { color: accent, borderColor: bg2, borderWidth: 2 },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: accent + '33' },
                { offset: 1, color: accent + '05' }
              ]
            }
          },
          label: {
            show: true,
            color: ink,
            fontSize: 11,
            fontFamily: 'WorkSans',
            fontWeight: 600,
            position: 'top'
          }
        },
        {
          name: '后训练对象演进',
          type: 'line',
          step: 'middle',
          data: trainingTarget,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { width: 3, color: accent2, type: 'dashed' },
          itemStyle: { color: accent2, borderColor: bg2, borderWidth: 2 },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: accent2 + '26' },
                { offset: 1, color: accent2 + '03' }
              ]
            }
          },
          label: {
            show: true,
            color: muted,
            fontSize: 11,
            fontFamily: 'WorkSans',
            fontWeight: 600,
            position: 'bottom'
          }
        }
      ]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ---- 初始化所有图表 ---- */
  function initAll() {
    initRadarChart();
    initBarChart();
    initLineChart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
