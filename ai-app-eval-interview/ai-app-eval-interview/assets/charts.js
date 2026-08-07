// AI应用评测产品 - 面试题深度解析 配套图表
// ECharts 可视化

document.addEventListener('DOMContentLoaded', function () {
  initStrategyChart();
  initRadarChart();
  initBarChart();
  initPieChart();
});

// ===== 1. AI评测五维策略地图（桑基图/关系图） =====
function initStrategyChart() {
  var el = document.getElementById('chart-strategy');
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
          name: '测什么\n评测方案设计',
          value: 30,
          itemStyle: { color: '#4F46E5' },
          children: [
            { name: '产品阶段过滤', value: 10, itemStyle: { color: '#6366F1' } },
            { name: '场景过滤', value: 10, itemStyle: { color: '#818CF8' } },
            { name: '致命维度过滤', value: 10, itemStyle: { color: '#A5B4FC' } }
          ]
        },
        {
          name: '用什么维度测\n维度拆解',
          value: 25,
          itemStyle: { color: '#EC4899' },
          children: [
            { name: '正确性(自动)', value: 8, itemStyle: { color: '#F472B6' } },
            { name: '流畅度(人工)', value: 7, itemStyle: { color: '#F9A8D4' } },
            { name: '专业性(专家)', value: 5, itemStyle: { color: '#FBCFE8' } },
            { name: '安全性(规则)', value: 5, itemStyle: { color: '#FCE7F3' } }
          ]
        },
        {
          name: '谁来测\n角色分工',
          value: 15,
          itemStyle: { color: '#10B981' },
          children: [
            { name: '自动化工具', value: 5, itemStyle: { color: '#34D399' } },
            { name: '普通用户', value: 5, itemStyle: { color: '#6EE7B7' } },
            { name: '领域专家', value: 3, itemStyle: { color: '#A7F3D0' } },
            { name: '合规团队', value: 2, itemStyle: { color: '#D1FAE5' } }
          ]
        },
        {
          name: '测出什么结论\n结果解读',
          value: 15,
          itemStyle: { color: '#F59E0B' },
          children: [
            { name: '区分达标', value: 5, itemStyle: { color: '#FBBF24' } },
            { name: '定位根因', value: 5, itemStyle: { color: '#FCD34D' } },
            { name: '给出方向', value: 5, itemStyle: { color: '#FDE68A' } }
          ]
        },
        {
          name: '还要怎么测\n例行化运营',
          value: 15,
          itemStyle: { color: '#6366F1' },
          children: [
            { name: '快速验证(1-2周)', value: 5, itemStyle: { color: '#818CF8' } },
            { name: '回归验证(1-2月)', value: 5, itemStyle: { color: '#A5B4FC' } },
            { name: '例行化(持续)', value: 5, itemStyle: { color: '#C7D2FE' } }
          ]
        }
      ]
    }]
  });

  window.addEventListener('resize', function () { chart.resize(); });
}

// ===== 2. AI评测四层架构雷达图 =====
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
      data: ['冷启动阶段', '增长阶段', '成熟阶段']
    },
    radar: {
      indicator: [
        { name: '技术层\n模型性能', max: 100 },
        { name: '交互层\n用户体验', max: 100 },
        { name: '结果层\n业务价值', max: 100 },
        { name: '迭代层\n长期能力', max: 100 },
        { name: '安全性\n合规', max: 100 }
      ],
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: '#475569',
        fontSize: 12,
        fontWeight: 600
      },
      splitLine: {
        lineStyle: { color: '#E2E8F0' }
      },
      splitArea: {
        areaStyle: {
          color: ['#F8FAFC', '#F1F5F9', '#F8FAFC', '#F1F5F9', '#F8FAFC']
        }
      },
      axisLine: {
        lineStyle: { color: '#E2E8F0' }
      }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [80, 50, 30, 20, 40],
          name: '冷启动阶段',
          itemStyle: { color: '#4F46E5' },
          areaStyle: { color: 'rgba(79,70,229,0.15)' },
          lineStyle: { width: 2 }
        },
        {
          value: [85, 75, 70, 60, 60],
          name: '增长阶段',
          itemStyle: { color: '#EC4899' },
          areaStyle: { color: 'rgba(236,72,153,0.12)' },
          lineStyle: { width: 2 }
        },
        {
          value: [90, 85, 90, 85, 95],
          name: '成熟阶段',
          itemStyle: { color: '#10B981' },
          areaStyle: { color: 'rgba(16,185,129,0.12)' },
          lineStyle: { width: 2 }
        }
      ]
    }]
  });

  window.addEventListener('resize', function () { chart.resize(); });
}

// ===== 3. 五维评估框架能力分布（柱状图） =====
function initBarChart() {
  var el = document.getElementById('chart-bar');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  chart.setOption({
    backgroundColor: 'transparent',
    animation: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#64748B', fontSize: 12 }
    },
    grid: {
      left: '8%',
      right: '5%',
      top: 30,
      bottom: 60
    },
    xAxis: {
      type: 'category',
      data: ['质量', '性能', '成本', '公平性', '鲁棒性'],
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#475569', fontSize: 13, fontWeight: 600 }
    },
    yAxis: {
      type: 'value',
      name: '重要度',
      max: 100,
      axisLine: { show: false },
      axisLabel: { color: '#94A3B8', fontSize: 11 },
      splitLine: { lineStyle: { color: '#F1F5F9' } }
    },
    series: [
      {
        name: '对话助手',
        type: 'bar',
        data: [95, 80, 70, 60, 75],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#6366F1' },
              { offset: 1, color: '#4F46E5' }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        },
        barGap: '20%'
      },
      {
        name: 'RAG问答',
        type: 'bar',
        data: [90, 75, 65, 70, 80],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#F472B6' },
              { offset: 1, color: '#EC4899' }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        }
      },
      {
        name: 'Agent系统',
        type: 'bar',
        data: [85, 85, 75, 65, 90],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#34D399' },
              { offset: 1, color: '#10B981' }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  });

  window.addEventListener('resize', function () { chart.resize(); });
}

// ===== 4. 15道面试题考点分布（饼图） =====
function initPieChart() {
  var el = document.getElementById('chart-pie');
  if (!el || typeof echarts === 'undefined') return;

  var chart = echarts.init(el, null, { renderer: 'svg' });

  chart.setOption({
    backgroundColor: 'transparent',
    animation: false,
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}道 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: '#64748B', fontSize: 12 }
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['40%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 3
      },
      label: {
        show: true,
        formatter: '{b}\n{c}道',
        fontSize: 13,
        fontWeight: 600,
        color: '#475569'
      },
      emphasis: {
        label: { fontSize: 15, fontWeight: 700 }
      },
      data: [
        { value: 3, name: '离线线上一致性', itemStyle: { color: '#4F46E5' } },
        { value: 4, name: '分层指标体系', itemStyle: { color: '#EC4899' } },
        { value: 3, name: '评测集构建', itemStyle: { color: '#10B981' } },
        { value: 2, name: 'LLM-as-a-Judge', itemStyle: { color: '#F59E0B' } },
        { value: 2, name: '问题归因体系', itemStyle: { color: '#6366F1' } },
        { value: 1, name: '内容生态评估', itemStyle: { color: '#14B8A6' } }
      ]
    }]
  });

  window.addEventListener('resize', function () { chart.resize(); });
}
