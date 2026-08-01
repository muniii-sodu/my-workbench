(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg = style.getPropertyValue('--bg').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var warn = style.getPropertyValue('--warn').trim();

  // --- Chart 1: Four search methods comparison (radar) ---
  var searchEl = document.getElementById('chart-search');
  if (searchEl) {
    var chart1 = echarts.init(searchEl, null, { renderer: 'svg' });
    chart1.setOption({
      animation: false,
      tooltip: { trigger: 'item', appendToBody: true },
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemGap: 16
      },
      radar: {
        indicator: [
          { name: '易用性', max: 10 },
          { name: '精准度', max: 10 },
          { name: '覆盖广度', max: 10 },
          { name: '实时性', max: 10 },
          { name: '发现性', max: 10 }
        ],
        center: ['50%', '48%'],
        radius: '62%',
        splitArea: {
          areaStyle: { color: [bg2, bg] }
        },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule } },
        axisName: {
          color: ink,
          fontSize: 13,
          fontWeight: 600
        }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [9, 4, 6, 8, 9],
            name: 'Trending/Explore',
            areaStyle: { color: 'rgba(45,164,78,0.15)' },
            lineStyle: { color: accent, width: 2 },
            itemStyle: { color: accent }
          },
          {
            value: [8, 7, 7, 5, 6],
            name: 'Awesome Lists',
            areaStyle: { color: 'rgba(130,80,223,0.12)' },
            lineStyle: { color: accent2, width: 2 },
            itemStyle: { color: accent2 }
          },
          {
            value: [4, 9, 8, 7, 3],
            name: '高级搜索语法',
            areaStyle: { color: 'rgba(191,57,137,0.12)' },
            lineStyle: { color: accent3, width: 2 },
            itemStyle: { color: accent3 }
          },
          {
            value: [10, 6, 5, 6, 7],
            name: 'Copilot AI搜索',
            areaStyle: { color: 'rgba(207,34,46,0.10)' },
            lineStyle: { color: warn, width: 2 },
            itemStyle: { color: warn }
          }
        ]
      }]
    });
    window.addEventListener('resize', function() { chart1.resize(); });
  }

  // --- Chart 2: Git four zones data flow (sankey) ---
  var zonesEl = document.getElementById('chart-zones');
  if (zonesEl) {
    var chart2 = echarts.init(zonesEl, null, { renderer: 'svg' });
    chart2.setOption({
      animation: false,
      tooltip: {
        trigger: 'item',
        appendToBody: true,
        formatter: function(params) {
          if (params.dataType === 'edge') {
            return params.data.command || params.name;
          }
          return params.name + ': ' + (params.data.desc || '');
        }
      },
      series: [{
        type: 'sankey',
        left: '8%',
        right: '8%',
        top: '8%',
        bottom: '8%',
        nodeWidth: 20,
        nodeGap: 12,
        emphasis: {
          focus: 'adjacency'
        },
        label: {
          color: ink,
          fontSize: 13,
          fontWeight: 600
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.5,
          opacity: 0.5
        },
        data: [
          { name: '工作区', desc: '日常编写修改代码', itemStyle: { color: accent } },
          { name: '暂存区', desc: '提交前临时缓存', itemStyle: { color: accent2 } },
          { name: '本地仓库', desc: '永久保存commit记录', itemStyle: { color: accent3 } },
          { name: '远程仓库', desc: 'GitHub云端备份', itemStyle: { color: '#1565C0' } }
        ],
        links: [
          { source: '工作区', target: '暂存区', value: 5, command: 'git add' },
          { source: '暂存区', target: '本地仓库', value: 5, command: 'git commit' },
          { source: '本地仓库', target: '远程仓库', value: 5, command: 'git push' },
          { source: '远程仓库', target: '本地仓库', value: 3, command: 'git pull' },
          { source: '远程仓库', target: '工作区', value: 2, command: 'git clone' }
        ]
      }]
    });
    window.addEventListener('resize', function() { chart2.resize(); });
  }

  // --- Chart 3: Open source license freedom comparison (bar) ---
  var licenseEl = document.getElementById('chart-license');
  if (licenseEl) {
    var chart3 = echarts.init(licenseEl, null, { renderer: 'svg' });
    chart3.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        appendToBody: true,
        formatter: function(params) {
          var html = '<strong>' + params[0].name + '</strong><br/>';
          params.forEach(function(p) {
            html += p.marker + ' ' + p.seriesName + ': ' + p.value + '/10<br/>';
          });
          return html;
        }
      },
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemGap: 14
      },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['MIT', 'Apache 2.0', 'BSD 3', 'Unlicense', 'LGPL', 'MPL 2.0', 'GPL v3'],
        axisLabel: {
          color: ink,
          fontSize: 12,
          fontWeight: 600,
          interval: 0
        },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        max: 10,
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          name: '使用自由度',
          type: 'bar',
          data: [10, 9, 9, 10, 6, 5, 4],
          itemStyle: {
            color: accent,
            borderRadius: [4, 4, 0, 0]
          },
          barGap: '20%',
          barCategoryGap: '40%'
        },
        {
          name: '商用友好度',
          type: 'bar',
          data: [10, 9, 9, 10, 7, 6, 3],
          itemStyle: {
            color: accent2,
            borderRadius: [4, 4, 0, 0]
          }
        },
        {
          name: '传染性',
          type: 'bar',
          data: [0, 0, 0, 0, 4, 5, 10],
          itemStyle: {
            color: warn,
            borderRadius: [4, 4, 0, 0]
          }
        }
      ]
    });
    window.addEventListener('resize', function() { chart3.resize(); });
  }
})();
