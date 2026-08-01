(function() {
  var style = getComputedStyle(document.documentElement);
  var primary = style.getPropertyValue('--primary').trim() || '#5BB5B3';
  var primaryLight = style.getPropertyValue('--primary-light').trim() || '#A8DADC';
  var primaryBg = style.getPropertyValue('--primary-bg').trim() || '#E8F7F6';
  var ink = style.getPropertyValue('--ink').trim() || '#2D3748';
  var muted = style.getPropertyValue('--muted').trim() || '#718096';
  var border = style.getPropertyValue('--border').trim() || '#E2E8F0';
  var surface = style.getPropertyValue('--surface').trim() || '#FFFFFF';
  var bg = style.getPropertyValue('--bg').trim() || '#F5FAFB';
  var catKnowledge = style.getPropertyValue('--cat-knowledge').trim() || '#5BB5B3';
  var catExperience = style.getPropertyValue('--cat-experience').trim() || '#7C9CBF';
  var catThink = style.getPropertyValue('--cat-think').trim() || '#B8A1D4';
  var catTool = style.getPropertyValue('--cat-tool').trim() || '#F0A868';

  // ===== Knowledge Map (Graph) =====
  var mapEl = document.getElementById('chart-knowledge-map');
  if (mapEl) {
    var mapChart = echarts.init(mapEl, null, { renderer: 'svg' });
    window.knowledgeMapChart = mapChart;

    var nodes = [
      { name: 'RAG面试题', category: 0, symbolSize: 60, moduleId: 'rag',
        label: { show: true, fontSize: 12, fontWeight: 600, color: '#fff' },
        itemStyle: { color: catKnowledge } },
      { name: 'AI Agent面试', category: 0, symbolSize: 60, moduleId: 'agent',
        label: { show: true, fontSize: 12, fontWeight: 600, color: '#fff' },
        itemStyle: { color: catKnowledge } },
      { name: 'AI评测方法论', category: 0, symbolSize: 58, moduleId: 'eval',
        label: { show: true, fontSize: 12, fontWeight: 600, color: '#fff' },
        itemStyle: { color: catKnowledge } },
      { name: 'AI PM评测', category: 0, symbolSize: 55, moduleId: 'pm-eval',
        label: { show: true, fontSize: 11, fontWeight: 600, color: '#fff' },
        itemStyle: { color: catKnowledge } },
      { name: 'Prompt设计', category: 0, symbolSize: 58, moduleId: 'prompt',
        label: { show: true, fontSize: 12, fontWeight: 600, color: '#fff' },
        itemStyle: { color: catKnowledge } },
      { name: '阿里面经', category: 1, symbolSize: 55, moduleId: 'alibaba',
        label: { show: true, fontSize: 11, fontWeight: 600, color: '#fff' },
        itemStyle: { color: catExperience } },
      { name: 'AI时代人的价值', category: 2, symbolSize: 60, moduleId: 'value',
        label: { show: true, fontSize: 12, fontWeight: 600, color: '#fff' },
        itemStyle: { color: catThink } },
      { name: 'Skill孵化', category: 2, symbolSize: 50, moduleId: 'skill',
        label: { show: true, fontSize: 11, fontWeight: 600, color: '#fff' },
        itemStyle: { color: catThink } },
      { name: 'GitHub教程', category: 3, symbolSize: 50, moduleId: 'github',
        label: { show: true, fontSize: 11, fontWeight: 600, color: '#fff' },
        itemStyle: { color: catTool } }
    ];

    var links = [
      { source: 'RAG面试题', target: 'AI Agent面试', value: '同为面试技术\nAgent使用RAG' },
      { source: 'RAG面试题', target: 'AI PM评测', value: 'RAG三元组评测\n面试高频考点' },
      { source: 'AI评测方法论', target: 'RAG面试题', value: 'RAG三元组评测' },
      { source: 'AI评测方法论', target: 'AI PM评测', value: '评测主题深化\n方法论→面试竞争力' },
      { source: 'Prompt设计', target: 'AI评测方法论', value: 'Prompt是评测的\n核心工具' },
      { source: 'Prompt设计', target: 'AI PM评测', value: 'PM需掌握\nPrompt设计能力' },
      { source: 'Prompt设计', target: 'RAG面试题', value: 'RAG依赖\nPrompt工程' },
      { source: 'Prompt设计', target: 'AI Agent面试', value: 'Agent核心是\nPrompt编排' },
      { source: '阿里面经', target: 'AI评测方法论', value: '面试考察评测能力' },
      { source: '阿里面经', target: 'AI PM评测', value: '标注评测岗位关联' },
      { source: '阿里面经', target: 'RAG面试题', value: '面试知识互补' },
      { source: 'AI时代人的价值', target: 'Skill孵化', value: '认知层面的方法论' },
      { source: 'AI时代人的价值', target: 'RAG面试题', value: '认知影响技术选择' },
      { source: 'AI时代人的价值', target: 'AI Agent面试', value: '人机协作视角' },
      { source: 'AI时代人的价值', target: 'AI评测方法论', value: '人做判断\nAI做执行' },
      { source: 'Skill孵化', target: 'AI评测方法论', value: '元方法论驱动' },
      { source: 'Skill孵化', target: 'RAG面试题', value: '流程模板应用' },
      { source: 'AI Agent面试', target: 'GitHub教程', value: 'Agent需工具\nGitHub是协作基础' }
    ];

    mapChart.setOption({
      animation: false,
      tooltip: {
        formatter: function(params) {
          if (params.dataType === 'edge') {
            return '<div style="max-width:200px;line-height:1.6;">' + params.data.value.replace(/\n/g, '<br>') + '</div>';
          }
          return '<strong>' + params.name + '</strong><br/>点击查看详情';
        },
        backgroundColor: 'rgba(45,55,72,0.92)',
        borderColor: 'rgba(255,255,255,0.1)',
        textStyle: { color: '#fff', fontSize: 12 },
        extraCssText: 'border-radius:12px;padding:10px 14px;'
      },
      legend: [{
        data: [
          { name: '专业知识' },
          { name: '面试经验' },
          { name: '认知思辨' },
          { name: '开发工具' }
        ],
        bottom: 0,
        textStyle: { color: muted, fontSize: 11 },
        itemGap: 12,
        itemWidth: 12,
        itemHeight: 12
      }],
      series: [{
        type: 'graph',
        layout: 'force',
        roam: true,
        draggable: true,
        force: {
          repulsion: 650,
          edgeLength: [110, 200],
          gravity: 0.08,
          layoutAnimation: false
        },
        label: { show: true },
        edgeLabel: { show: false },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [0, 6],
        emphasis: {
          focus: 'adjacency',
          lineStyle: { width: 3, opacity: 0.8 }
        },
        lineStyle: {
          color: border,
          width: 1.5,
          curveness: 0.25,
          opacity: 0.5
        },
        categories: [
          { name: '专业知识', itemStyle: { color: catKnowledge } },
          { name: '面试经验', itemStyle: { color: catExperience } },
          { name: '认知思辨', itemStyle: { color: catThink } },
          { name: '开发工具', itemStyle: { color: catTool } }
        ],
        data: nodes,
        links: links
      }]
    });

    mapChart.on('click', function(params) {
      if (params.dataType === 'node' && params.data.moduleId) {
        showModule(params.data.moduleId);
      }
    });

    window.addEventListener('resize', function() { mapChart.resize(); });
  }

  // ===== Topic Distribution (Pie) =====
  var topicsEl = document.getElementById('chart-topics');
  if (topicsEl) {
    var topicsChart = echarts.init(topicsEl, null, { renderer: 'svg' });
    window.topicsChart = topicsChart;

    topicsChart.setOption({
      animation: false,
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}个模块 ({d}%)',
        backgroundColor: 'rgba(45,55,72,0.92)',
        borderColor: 'rgba(255,255,255,0.1)',
        textStyle: { color: '#fff', fontSize: 12 },
        extraCssText: 'border-radius:12px;padding:10px 14px;'
      },
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemGap: 10,
        itemWidth: 12,
        itemHeight: 12
      },
      series: [{
        type: 'pie',
        radius: ['35%', '65%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8,
          borderColor: surface,
          borderWidth: 3
        },
        label: {
          show: true,
          formatter: '{b}\n{c}个',
          color: ink,
          fontSize: 12,
          fontWeight: 600
        },
        labelLine: {
          lineStyle: { color: border }
        },
        data: [
          { value: 5, name: '专业知识', itemStyle: { color: catKnowledge } },
          { value: 1, name: '面试经验', itemStyle: { color: catExperience } },
          { value: 2, name: '认知思辨', itemStyle: { color: catThink } },
          { value: 1, name: '开发工具', itemStyle: { color: catTool } }
        ]
      }]
    });

    window.addEventListener('resize', function() { topicsChart.resize(); });
  }
})();
