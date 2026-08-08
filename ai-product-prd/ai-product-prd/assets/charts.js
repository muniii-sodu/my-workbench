document.addEventListener('DOMContentLoaded', function () {

  // Chart 1: 传统PRD vs AI PRD 结构对比
  function initCompareChart() {
    var el = document.getElementById('chart-compare');
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
          fontSize: 13,
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
            name: '传统PRD\n描述确定的系统',
            value: 50,
            itemStyle: { color: '#64748B' },
            children: [
              { name: '需求背景\n用户画像', value: 8, itemStyle: { color: '#94A3B8' } },
              { name: '用户故事\n用户旅程', value: 12, itemStyle: { color: '#94A3B8' } },
              { name: '功能清单\n接口字段', value: 12, itemStyle: { color: '#94A3B8' } },
              { name: '流程图\n（线性）', value: 8, itemStyle: { color: '#94A3B8' } },
              { name: '验收标准\n（功能完成）', value: 10, itemStyle: { color: '#94A3B8' } }
            ]
          },
          {
            name: 'AI产品PRD\n管理不确定性的机制',
            value: 50,
            itemStyle: { color: '#4F46E5' },
            children: [
              { name: '价值阐述\n为什么用AI', value: 6, itemStyle: { color: '#6366F1' } },
              { name: 'Agent Story\nITTO模型', value: 10, itemStyle: { color: '#818CF8' } },
              { name: 'Agent工作流\nDAG/状态机', value: 8, itemStyle: { color: '#A5B4FC' } },
              { name: '模型选型\n六维评估', value: 6, itemStyle: { color: '#818CF8' } },
              { name: 'Prompt工程\n五段式模板', value: 8, itemStyle: { color: '#6366F1' } },
              { name: '训练数据集\n理想态定义', value: 5, itemStyle: { color: '#818CF8' } },
              { name: '评测体系\n三层评测', value: 7, itemStyle: { color: '#6366F1' } }
            ]
          }
        ]
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  // Chart 2: AI产品PRD九大模块全景
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
          var s = params.data.name;
          if (params.data.desc) s += '\n' + params.data.desc;
          return s;
        }
      },
      series: [{
        type: 'sunburst',
        radius: ['15%', '90%'],
        sort: null,
        emphasis: {
          focus: 'ancestor'
        },
        label: {
          rotate: 'radial',
          fontSize: 12,
          fontWeight: 600,
          color: '#fff'
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2
        },
        data: [
          {
            name: '价值层',
            value: 15,
            itemStyle: { color: '#4F46E5' },
            children: [
              { name: '价值阐述', value: 8, desc: '为什么用AI？现有瓶颈？AI多创造什么价值？', itemStyle: { color: '#6366F1' } },
              { name: '需求描述', value: 7, desc: 'Agent Story (ITTO模型)', itemStyle: { color: '#818CF8' } }
            ]
          },
          {
            name: '设计层',
            value: 30,
            itemStyle: { color: '#EC4899' },
            children: [
              { name: '业务流程', value: 10, desc: '网状工作流 DAG/状态机 + HITL三节点', itemStyle: { color: '#F472B6' } },
              { name: '模型选型', value: 8, desc: '六维评估：性能/适配/扩展/稳定/成本/合规', itemStyle: { color: '#F9A8D4' } },
              { name: 'Prompt工程', value: 7, desc: '五段式：角色-挑战-策略-提示词-输出控制', itemStyle: { color: '#FBCFE8' } },
              { name: '训练数据集', value: 5, desc: '理想态定义，非平庸历史数据', itemStyle: { color: '#F9A8D4' } }
            ]
          },
          {
            name: '保障层',
            value: 25,
            itemStyle: { color: '#10B981' },
            children: [
              { name: '评测体系', value: 12, desc: '三层评测：代码自动评+人工评+业务评', itemStyle: { color: '#34D399' } },
              { name: '效果保障', value: 8, desc: '三层边界：自动执行/推荐+确认/禁止触碰', itemStyle: { color: '#6EE7B7' } },
              { name: '稳定性策略', value: 5, desc: '异常兜底+数据飞轮迭代闭环', itemStyle: { color: '#A7F3D0' } }
            ]
          },
          {
            name: '呈现层',
            value: 15,
            itemStyle: { color: '#F59E0B' },
            children: [
              { name: '原型图', value: 8, desc: 'Chat+GUI，预留思考中状态', itemStyle: { color: '#FBBF24' } },
              { name: '其他内容', value: 7, desc: '非功能需求/上线计划/迭代发现', itemStyle: { color: '#FCD34D' } }
            ]
          }
        ]
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  // Chart 3: 嵌入型 vs Agent型 九大模块权重雷达图
  function initRadarChart() {
    var el = document.getElementById('chart-radar');
    if (!el || typeof echarts === 'undefined') return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    chart.setOption({
      backgroundColor: 'transparent',
      animation: false,
      tooltip: { trigger: 'item' },
      legend: {
        data: ['嵌入型AI产品', 'Agent型AI产品'],
        bottom: 0,
        textStyle: { color: '#64748B', fontSize: 12 },
        itemWidth: 16,
        itemHeight: 10
      },
      radar: {
        indicator: [
          { name: '价值阐述', max: 10 },
          { name: 'Agent Story', max: 10 },
          { name: '业务/系统流程', max: 10 },
          { name: '模型选型', max: 10 },
          { name: 'Prompt工程', max: 10 },
          { name: '训练数据集', max: 10 },
          { name: '评测体系', max: 10 },
          { name: '效果保障', max: 10 },
          { name: '原型图', max: 10 }
        ],
        center: ['50%', '48%'],
        radius: '65%',
        axisName: { color: '#64748B', fontSize: 12 },
        splitArea: {
          areaStyle: { color: ['#F8F9FB', '#F1F5F9'] }
        },
        splitLine: { lineStyle: { color: '#E2E8F0' } },
        axisLine: { lineStyle: { color: '#E2E8F0' } }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [7, 3, 5, 4, 8, 5, 6, 5, 7],
            name: '嵌入型AI产品',
            areaStyle: { color: 'rgba(100, 116, 139, 0.12)' },
            lineStyle: { color: '#64748B', width: 2 },
            itemStyle: { color: '#64748B' }
          },
          {
            value: [8, 10, 10, 8, 9, 8, 10, 9, 8],
            name: 'Agent型AI产品',
            areaStyle: { color: 'rgba(79, 70, 229, 0.15)' },
            lineStyle: { color: '#4F46E5', width: 2 },
            itemStyle: { color: '#4F46E5' }
          }
        ]
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  // Initialize all charts
  initCompareChart();
  initOverviewChart();
  initRadarChart();
});
