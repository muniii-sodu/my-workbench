// 信息提纯：职场八项核心能力 - 配套图表
// ECharts 可视化

document.addEventListener('DOMContentLoaded', function () {
  initOverviewChart();
  initRadarChart();
  initPyramidChart();
  initSelfChart();
});

// ===== 1. 八项核心能力四层架构（矩形树图） =====
function initOverviewChart() {
  var el = document.getElementById('chart-overview');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  chart.setOption({
    backgroundColor: 'transparent',
    animation: false,
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return params.data.name + ': ' + params.data.value;
      }
    },
    series: [{
      type: 'treemap',
      roam: false,
      nodeClick: false,
      breadcrumb: { show: false },
      label: {
        show: true,
        formatter: '{b}',
        fontSize: 14,
        fontWeight: 600,
        color: '#fff'
      },
      upperLabel: { show: false },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 3,
        gapWidth: 2
      },
      data: [
        {
          name: '对事层\n入场券+信任基石',
          value: 30,
          itemStyle: { color: '#4F46E5' },
          children: [
            { name: '专业能力\n岗位JD能干得来', value: 15, itemStyle: { color: '#6366F1' } },
            { name: '闭环能力\n件件事有着落', value: 15, itemStyle: { color: '#818CF8' } }
          ]
        },
        {
          name: '对人层\n价值放大+协作润滑',
          value: 35,
          itemStyle: { color: '#EC4899' },
          children: [
            { name: '向上翻译\n结果翻译成利益', value: 12, itemStyle: { color: '#F472B6' } },
            { name: '主动呈现\n确认节点有条不紊', value: 12, itemStyle: { color: '#F9A8D4' } },
            { name: '横向沟通\n跨部门合作丝滑', value: 11, itemStyle: { color: '#FBCFE8' } }
          ]
        },
        {
          name: '对自我层\n稳定输出',
          value: 15,
          itemStyle: { color: '#F59E0B' },
          children: [
            { name: '情绪剥离\n机器人式工作', value: 15, itemStyle: { color: '#FBBF24' } }
          ]
        },
        {
          name: '对组织层\n价值杠杆+效率扩展',
          value: 20,
          itemStyle: { color: '#10B981' },
          children: [
            { name: '借事成事\n战略模块放大价值', value: 10, itemStyle: { color: '#34D399' } },
            { name: '复制能力\n生成SOP流程丝滑', value: 10, itemStyle: { color: '#6EE7B7' } }
          ]
        }
      ]
    }]
  });

  window.addEventListener('resize', function () { chart.resize(); });
}

// ===== 2. 四维竞争力 vs 八项能力 雷达图 =====
function initRadarChart() {
  var el = document.getElementById('chart-radar');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  chart.setOption({
    backgroundColor: 'transparent',
    animation: false,
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 0,
      textStyle: { color: '#64748B', fontSize: 12 },
      data: ['初级职场人', '高级职场人', '操盘手']
    },
    radar: {
      indicator: [
        { name: '产品能力\n(专业+闭环)', max: 100 },
        { name: '媒体能力\n(向上翻译+呈现)', max: 100 },
        { name: '运营能力\n(横向沟通+情绪)', max: 100 },
        { name: '战略能力\n(借事+复制)', max: 100 }
      ],
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: '#475569',
        fontSize: 12,
        fontWeight: 600
      },
      splitLine: { lineStyle: { color: '#E2E8F0' } },
      splitArea: {
        areaStyle: {
          color: ['#F8FAFC', '#F1F5F9', '#F8FAFC', '#F1F5F9', '#F8FAFC']
        }
      },
      axisLine: { lineStyle: { color: '#E2E8F0' } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [75, 40, 45, 25],
          name: '初级职场人',
          itemStyle: { color: '#94A3B8' },
          areaStyle: { color: 'rgba(148,163,184,0.12)' },
          lineStyle: { width: 2 }
        },
        {
          value: [85, 75, 70, 60],
          name: '高级职场人',
          itemStyle: { color: '#4F46E5' },
          areaStyle: { color: 'rgba(79,70,229,0.12)' },
          lineStyle: { width: 2 }
        },
        {
          value: [90, 88, 85, 90],
          name: '操盘手',
          itemStyle: { color: '#10B981' },
          areaStyle: { color: 'rgba(16,185,129,0.12)' },
          lineStyle: { width: 2 }
        }
      ]
    }]
  });

  window.addEventListener('resize', function () { chart.resize(); });
}

// ===== 3. 四层能力金字塔（漏斗图） =====
function initPyramidChart() {
  var el = document.getElementById('chart-pyramid');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  chart.setOption({
    backgroundColor: 'transparent',
    animation: false,
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },
    series: [{
      type: 'funnel',
      left: '15%',
      top: 40,
      bottom: 40,
      width: '70%',
      minSize: '30%',
      maxSize: '100%',
      sort: 'descending',
      gap: 4,
      label: {
        show: true,
        position: 'inside',
        formatter: '{b}',
        fontSize: 14,
        fontWeight: 600,
        color: '#fff'
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      data: [
        { value: 100, name: 'L1 思维决策层\n问题拆解·信息筛选·数据思维', itemStyle: { color: '#4F46E5' } },
        { value: 75, name: 'L2 影响力沟通层\n结构化表达·向上管理·跨部门协同', itemStyle: { color: '#EC4899' } },
        { value: 50, name: 'L3 业务商业层\n业务翻译·项目管理·流程再造', itemStyle: { color: '#10B981' } },
        { value: 30, name: 'L4 心性认知层\n情绪管理·反脆弱·知识资产化', itemStyle: { color: '#F59E0B' } }
      ]
    }]
  });

  window.addEventListener('resize', function () { chart.resize(); });
}

// ===== 4. 八项能力自评雷达图 =====
function initSelfChart() {
  var el = document.getElementById('chart-self');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  chart.setOption({
    backgroundColor: 'transparent',
    animation: false,
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 0,
      textStyle: { color: '#64748B', fontSize: 12 },
      data: ['当前水平', '目标水平']
    },
    radar: {
      indicator: [
        { name: '专业能力', max: 10 },
        { name: '闭环能力', max: 10 },
        { name: '向上翻译', max: 10 },
        { name: '主动呈现', max: 10 },
        { name: '横向沟通', max: 10 },
        { name: '情绪剥离', max: 10 },
        { name: '借事成事', max: 10 },
        { name: '复制能力', max: 10 }
      ],
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: '#475569',
        fontSize: 12,
        fontWeight: 600
      },
      splitLine: { lineStyle: { color: '#E2E8F0' } },
      splitArea: {
        areaStyle: {
          color: ['#F8FAFC', '#F1F5F9', '#F8FAFC', '#F1F5F9', '#F8FAFC']
        }
      },
      axisLine: { lineStyle: { color: '#E2E8F0' } },
      center: ['50%', '48%'],
      radius: '65%'
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [8, 7, 5, 6, 6, 5, 4, 5],
          name: '当前水平',
          itemStyle: { color: '#4F46E5' },
          areaStyle: { color: 'rgba(79,70,229,0.12)' },
          lineStyle: { width: 2 }
        },
        {
          value: [9, 9, 8, 8, 8, 8, 8, 8],
          name: '目标水平',
          itemStyle: { color: '#10B981' },
          areaStyle: { color: 'rgba(16,185,129,0.08)' },
          lineStyle: { width: 2, type: 'dashed' }
        }
      ]
    }]
  });

  window.addEventListener('resize', function () { chart.resize(); });
}
