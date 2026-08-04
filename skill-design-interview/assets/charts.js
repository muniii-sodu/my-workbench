/* ============================================================
 * charts.js — Skill设计面试报告图表
 * 包含：三段位能力雷达图、误区影响柱状图、评估指标权重饼图
 * ============================================================ */
(function () {
  'use strict';

  /* ---- 从 CSS 变量读取主题色 ---- */
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();     /* #4F46E5 */
  var accent2 = style.getPropertyValue('--accent2').trim();   /* #EC4899 */
  var accent3 = style.getPropertyValue('--accent3').trim();   /* #10B981 */
  var ink = style.getPropertyValue('--ink').trim();           /* #1E293B */
  var muted = style.getPropertyValue('--muted').trim();       /* #64748B */
  var muted2 = style.getPropertyValue('--muted2').trim();     /* #94A3B8 */
  var rule = style.getPropertyValue('--rule').trim();         /* #E2E8F0 */
  var bg2 = style.getPropertyValue('--bg2').trim();           /* #FFFFFF */

  /* ============================================================
   * 图表 1：Skill设计三段位能力雷达图
   * 6 个维度，3 条段位线（写对 / 写强 / 写活）
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
          { name: '指令准确性', max: 10 },
          { name: '复杂任务稳定性', max: 10 },
          { name: '信息不全适应性', max: 10 },
          { name: '边界控制能力', max: 10 },
          { name: '工具调用效率', max: 10 },
          { name: '结果可评估性', max: 10 }
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
            value: [9, 5, 3, 7, 6, 5],
            name: '写对',
            areaStyle: { color: accent + '20' },
            lineStyle: { color: accent, width: 2 },
            itemStyle: { color: accent },
            symbolSize: 6
          },
          {
            value: [8, 9, 6, 8, 9, 8],
            name: '写强',
            areaStyle: { color: accent2 + '20' },
            lineStyle: { color: accent2, width: 2 },
            itemStyle: { color: accent2 },
            symbolSize: 6
          },
          {
            value: [7, 8, 9, 7, 8, 9],
            name: '写活',
            areaStyle: { color: accent3 + '20' },
            lineStyle: { color: accent3, width: 2 },
            itemStyle: { color: accent3 },
            symbolSize: 6
          }
        ]
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ============================================================
   * 图表 2：Skill设计常见误区影响程度（柱状图）
   * ============================================================ */
  function initBarChart() {
    var el = document.getElementById('chart-bar');
    if (!el) return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    var pitfalls = [
      { name: '写成长\nPrompt', impact: 85, desc: 'Skill变成知识库，AI抓不住重点' },
      { name: '只写步骤\n不写边界', impact: 90, desc: '模糊任务时AI自行猜测，触发失控' },
      { name: 'Skill\n冲突', impact: 75, desc: '多个Skill同时触发，互相干扰' },
      { name: '工具细节\n写死', impact: 60, desc: '工具升级后Skill失效' },
      { name: '不更新', impact: 70, desc: 'Skill沉淀为历史规则，无人维护' },
      { name: '强制加载', impact: 80, desc: '不该用时也加载，浪费Token' },
      { name: '没有\nEval', impact: 88, desc: '无法量化效果，靠感觉判断' },
      { name: '安全约束\n只在Skill', impact: 95, desc: 'Skill被绕过即全线失守' }
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
          var item = pitfalls[p.dataIndex];
          return item.name.replace(/\n/g, '') + '<br/>影响程度：' + item.impact + '<br/>' + item.desc;
        }
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
        data: pitfalls.map(function (p) { return p.name; }),
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
        data: pitfalls.map(function (p, i) {
          /* 高影响（>=85）用 accent2 红粉色，中高（70-84）用 accent 紫色，其余用 accent3 绿色 */
          var color;
          if (p.impact >= 85) color = accent2;
          else if (p.impact >= 70) color = accent;
          else color = accent3;
          return {
            value: p.impact,
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
   * 图表 3：Skill评估七指标权重分配（饼图）
   * ============================================================ */
  function initPieChart() {
    var el = document.getElementById('chart-pie');
    if (!el) return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    var metrics = [
      { name: '任务成功率', value: 22 },
      { name: '命中准确率', value: 20 },
      { name: '误召回率', value: 18 },
      { name: '工具调用成功率', value: 14 },
      { name: '输出稳定性', value: 10 },
      { name: '人工修正率', value: 9 },
      { name: 'Token消耗', value: 7 }
    ];

    var palette = [
      accent,
      accent2,
      '#EF4444',
      accent3,
      '#F59E0B',
      '#8B5CF6',
      '#06B6D4'
    ];

    chart.setOption({
      backgroundColor: 'transparent',
      animation: false,
      tooltip: {
        trigger: 'item',
        appendToBody: true,
        formatter: '{b}<br/>权重：{c}%'
      },
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemWidth: 14,
        itemHeight: 8,
        itemGap: 12,
        type: 'scroll'
      },
      series: [{
        type: 'pie',
        radius: ['38%', '65%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: bg2,
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}\n{c}%',
          fontSize: 12,
          color: ink,
          fontWeight: 600
        },
        labelLine: {
          length: 12,
          length2: 10,
          lineStyle: { color: muted2 }
        },
        data: metrics.map(function (m, i) {
          return {
            name: m.name,
            value: m.value,
            itemStyle: { color: palette[i] }
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
