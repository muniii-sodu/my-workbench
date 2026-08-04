// assets/charts.js
// Agent八股面试题带答案：八大技术方向深度解析 — 图表逻辑
// 包含：雷达图（知识覆盖度）、柱状图（题目分布）、环形图（考点权重）
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var bg = style.getPropertyValue('--bg').trim();

  // 公共轴样式
  var axisLabel = { color: muted, fontSize: 11 };
  var splitLine = { lineStyle: { color: rule } };
  var axisLine = { lineStyle: { color: rule } };

  // ============================================================
  // Chart 1: 雷达图 — Agent 八大技术方向知识覆盖度评估
  // 维度：理论掌握度 vs 面试重要度
  // ============================================================
  var radarEl = document.getElementById('chart-radar');
  if (radarEl) {
    var radar = echarts.init(radarEl, null, { renderer: 'svg' });
    radar.setOption({
      animation: false,
      color: [accent, accent2],
      tooltip: { appendToBody: true },
      legend: {
        data: ['理论掌握度', '面试重要度'],
        top: 0,
        textStyle: { color: ink, fontSize: 12 },
        itemGap: 24
      },
      radar: {
        indicator: [
          { name: '基础认知', max: 100 },
          { name: '架构原理', max: 100 },
          { name: 'RAG知识库', max: 100 },
          { name: '工具调用', max: 100 },
          { name: '多智能体', max: 100 },
          { name: '工程落地', max: 100 },
          { name: '性能优化', max: 100 },
          { name: '安全合规', max: 100 }
        ],
        center: ['50%', '56%'],
        radius: '64%',
        axisName: { color: ink, fontSize: 11 },
        splitArea: { areaStyle: { color: [bg2, bg] } },
        splitLine: { lineStyle: { color: rule } },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [85, 78, 80, 75, 65, 60, 55, 58],
            name: '理论掌握度',
            areaStyle: { color: accent, opacity: 0.12 },
            lineStyle: { color: accent, width: 2 },
            itemStyle: { color: accent },
            symbolSize: 5
          },
          {
            value: [90, 95, 92, 90, 85, 88, 75, 82],
            name: '面试重要度',
            areaStyle: { color: accent2, opacity: 0.10 },
            lineStyle: { color: accent2, width: 2 },
            itemStyle: { color: accent2 },
            symbolSize: 5
          }
        ]
      }]
    });
    window.addEventListener('resize', function () { radar.resize(); });
  }

  // ============================================================
  // Chart 2: 柱状图 — Agent 面试题分布统计
  // X轴：8 个技术方向；两组：基础题数 vs 进阶题数
  // ============================================================
  var barEl = document.getElementById('chart-bar');
  if (barEl) {
    var bar = echarts.init(barEl, null, { renderer: 'svg' });
    bar.setOption({
      animation: false,
      color: [accent, accent2],
      tooltip: {
        appendToBody: true,
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['基础题数', '进阶题数'],
        top: 0,
        textStyle: { color: ink, fontSize: 12 },
        itemGap: 24
      },
      grid: { top: 56, left: 48, right: 24, bottom: 72, containLabel: true },
      xAxis: {
        type: 'category',
        data: ['基础认知', '架构原理', 'RAG知识库', '工具调用', '多智能体', '工程落地', '性能优化', '安全合规'],
        axisLabel: { color: muted, fontSize: 10, interval: 0, rotate: 28 },
        axisLine: axisLine,
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        name: '题目数量',
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLabel: axisLabel,
        splitLine: splitLine,
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          name: '基础题数',
          type: 'bar',
          data: [4, 4, 4, 3, 2, 3, 3, 2],
          barMaxWidth: 26,
          itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] }
        },
        {
          name: '进阶题数',
          type: 'bar',
          data: [2, 3, 3, 3, 4, 3, 3, 4],
          barMaxWidth: 26,
          itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] }
        }
      ]
    });
    window.addEventListener('resize', function () { bar.resize(); });
  }

  // ============================================================
  // Chart 3: 环形图 — 2026 Agent 面试考点权重分布
  // ============================================================
  var pieEl = document.getElementById('chart-pie');
  if (pieEl) {
    var pie = echarts.init(pieEl, null, { renderer: 'svg' });
    pie.setOption({
      animation: false,
      color: [accent, accent2, muted, accent + 'b3', accent2 + 'b3', accent + '80', accent2 + '80', muted + '80'],
      tooltip: {
        appendToBody: true,
        trigger: 'item',
        formatter: '{b}<br/>{c}% （权重占比）'
      },
      legend: {
        orient: 'vertical',
        right: 8,
        top: 'center',
        textStyle: { color: ink, fontSize: 11 },
        itemGap: 10
      },
      series: [{
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['38%', '52%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: bg2, borderWidth: 2 },
        label: {
          show: true,
          formatter: '{d}%',
          color: ink,
          fontSize: 11,
          fontWeight: 600
        },
        labelLine: { length: 10, length2: 8, lineStyle: { color: rule } },
        data: [
          { value: 15, name: '基础概念' },
          { value: 20, name: '架构原理' },
          { value: 15, name: 'RAG知识库' },
          { value: 15, name: '工具调用' },
          { value: 10, name: '多智能体' },
          { value: 10, name: '工程落地' },
          { value: 5, name: '性能优化' },
          { value: 10, name: '安全合规' }
        ]
      }]
    });
    window.addEventListener('resize', function () { pie.resize(); });
  }
})();
