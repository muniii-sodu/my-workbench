// ===== Chart 1: Candidate Level Radar =====
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
      textStyle: { color: '#64748B', fontSize: 12 },
      itemWidth: 14,
      itemHeight: 8,
      itemGap: 16
    },
    radar: {
      center: ['50%', '48%'],
      radius: '62%',
      indicator: [
        { name: '变量拆解能力', max: 10 },
        { name: '输出结构定义', max: 10 },
        { name: '约束条件设计', max: 10 },
        { name: '个性化思维', max: 10 },
        { name: '失效场景预判', max: 10 },
        { name: '交互本质理解', max: 10 },
        { name: '评估闭环设计', max: 10 }
      ],
      axisName: {
        color: '#1E293B',
        fontSize: 12,
        fontWeight: 600
      },
      splitLine: { lineStyle: { color: '#E2E8F0', width: 1 } },
      splitArea: {
        areaStyle: {
          color: ['rgba(79,70,229,0.02)', 'rgba(79,70,229,0.06)']
        }
      },
      axisLine: { lineStyle: { color: '#E2E8F0' } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [2, 1, 1, 1, 0, 1, 0],
          name: '初级：表面型',
          areaStyle: { color: 'rgba(236,72,153,0.12)' },
          lineStyle: { color: '#EC4899', width: 2 },
          itemStyle: { color: '#EC4899' },
          symbolSize: 6
        },
        {
          value: [7, 7, 5, 4, 3, 4, 3],
          name: '中级：结构型',
          areaStyle: { color: 'rgba(79,70,229,0.12)' },
          lineStyle: { color: '#4F46E5', width: 2 },
          itemStyle: { color: '#4F46E5' },
          symbolSize: 6
        },
        {
          value: [9, 9, 8, 8, 9, 9, 8],
          name: '高级：深度型',
          areaStyle: { color: 'rgba(16,185,129,0.12)' },
          lineStyle: { color: '#10B981', width: 2 },
          itemStyle: { color: '#10B981' },
          symbolSize: 6
        }
      ]
    }]
  });

  window.addEventListener('resize', function () { chart.resize(); });
}

// ===== Chart 2: AI Interaction Evolution =====
function initEvolutionChart() {
  var el = document.getElementById('chart-evolution');
  if (!el) return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  chart.setOption({
    backgroundColor: 'transparent',
    animation: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      appendToBody: true,
      textStyle: { fontSize: 12 }
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#64748B', fontSize: 12 },
      itemWidth: 14,
      itemHeight: 8,
      itemGap: 16
    },
    grid: {
      left: '8%',
      right: '8%',
      top: '8%',
      bottom: '18%'
    },
    xAxis: {
      type: 'category',
      data: ['传统GUI', 'AI LUI', 'Intent-Centric'],
      axisLine: { lineStyle: { color: '#E2E8F0' } },
      axisLabel: {
        color: '#1E293B',
        fontSize: 13,
        fontWeight: 600
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      max: 10,
      axisLine: { show: false },
      axisLabel: { color: '#94A3B8', fontSize: 11 },
      splitLine: { lineStyle: { color: '#F1F5F9' } }
    },
    series: [
      {
        name: '用户操作成本',
        type: 'bar',
        data: [8, 5, 2],
        barWidth: '18%',
        itemStyle: {
          color: '#EC4899',
          borderRadius: [6, 6, 0, 0]
        }
      },
      {
        name: '系统理解能力要求',
        type: 'bar',
        data: [2, 6, 9],
        barWidth: '18%',
        itemStyle: {
          color: '#4F46E5',
          borderRadius: [6, 6, 0, 0]
        }
      },
      {
        name: '个性化程度',
        type: 'bar',
        data: [3, 6, 9],
        barWidth: '18%',
        itemStyle: {
          color: '#10B981',
          borderRadius: [6, 6, 0, 0]
        }
      },
      {
        name: '界面透明度',
        type: 'bar',
        data: [2, 4, 8],
        barWidth: '18%',
        itemStyle: {
          color: '#FBBF24',
          borderRadius: [6, 6, 0, 0]
        }
      }
    ]
  });

  window.addEventListener('resize', function () { chart.resize(); });
}

// ===== Chart 3: Pitfalls Impact =====
function initPitfallsChart() {
  var el = document.getElementById('chart-pitfalls');
  if (!el) return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  chart.setOption({
    backgroundColor: 'transparent',
    animation: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      appendToBody: true,
      textStyle: { fontSize: 12 }
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#64748B', fontSize: 12 },
      itemWidth: 14,
      itemHeight: 8,
      itemGap: 16
    },
    grid: {
      left: '15%',
      right: '8%',
      top: '5%',
      bottom: '18%'
    },
    xAxis: {
      type: 'value',
      max: 10,
      axisLine: { show: false },
      axisLabel: { color: '#94A3B8', fontSize: 11 },
      splitLine: { lineStyle: { color: '#F1F5F9' } }
    },
    yAxis: {
      type: 'category',
      data: ['保留逃生舱', '拒绝黑盒等待', '不为AI而AI'],
      axisLine: { lineStyle: { color: '#E2E8F0' } },
      axisLabel: {
        color: '#1E293B',
        fontSize: 13,
        fontWeight: 600
      },
      axisTick: { show: false }
    },
    series: [
      {
        name: '用户体验影响',
        type: 'bar',
        data: [8, 7, 9],
        barWidth: '20%',
        itemStyle: {
          color: '#4F46E5',
          borderRadius: [0, 6, 6, 0]
        }
      },
      {
        name: '信任建立',
        type: 'bar',
        data: [9, 8, 6],
        barWidth: '20%',
        itemStyle: {
          color: '#10B981',
          borderRadius: [0, 6, 6, 0]
        }
      },
      {
        name: '面试加分概率',
        type: 'bar',
        data: [7, 6, 8],
        barWidth: '20%',
        itemStyle: {
          color: '#EC4899',
          borderRadius: [0, 6, 6, 0]
        }
      }
    ]
  });

  window.addEventListener('resize', function () { chart.resize(); });
}

// ===== Init All =====
document.addEventListener('DOMContentLoaded', function () {
  initRadarChart();
  initEvolutionChart();
  initPitfallsChart();
});
