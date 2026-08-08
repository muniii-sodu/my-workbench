document.addEventListener('DOMContentLoaded', function () {

  // Chart 1: 内存带宽对比柱状图
  function initBandwidthChart() {
    var el = document.getElementById('chart-bandwidth');
    if (!el || typeof echarts === 'undefined') return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    chart.setOption({
      backgroundColor: 'transparent',
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (params) {
          var s = params[0].name + '<br/>';
          params.forEach(function (p) {
            s += p.marker + ' ' + p.seriesName + ': ' + p.value + ' GB/s<br/>';
          });
          return s;
        }
      },
      legend: {
        data: ['内存带宽'],
        bottom: 0,
        textStyle: { color: '#64748B', fontSize: 12 }
      },
      grid: { left: '8%', right: '5%', top: '8%', bottom: '15%' },
      xAxis: {
        type: 'category',
        data: ['DDR5\n台式机', 'PCIe 4.0\nx16总线', 'M5 Pro\n统一内存', 'M5 Max\n统一内存'],
        axisLine: { lineStyle: { color: '#E2E8F0' } },
        axisLabel: { color: '#64748B', fontSize: 12, lineHeight: 16 }
      },
      yAxis: {
        type: 'value',
        name: 'GB/s',
        nameTextStyle: { color: '#94A3B8', fontSize: 12 },
        axisLabel: { color: '#94A3B8', fontSize: 12 },
        splitLine: { lineStyle: { color: '#F1F5F9' } }
      },
      series: [{
        name: '内存带宽',
        type: 'bar',
        data: [
          { value: 90, itemStyle: { color: '#94A3B8' } },
          { value: 32, itemStyle: { color: '#EC4899' } },
          { value: 307, itemStyle: { color: '#4F46E5' } },
          { value: 614, itemStyle: { color: '#6366F1' } }
        ],
        barWidth: '45%',
        label: {
          show: true,
          position: 'top',
          color: '#1E293B',
          fontSize: 13,
          fontWeight: 600,
          formatter: '{c} GB/s'
        }
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  // Chart 2: Mac本地大模型推理生态全景
  function initMLXEcoChart() {
    var el = document.getElementById('chart-mlx-eco');
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
            name: '推理框架',
            value: 35,
            itemStyle: { color: '#4F46E5' },
            children: [
              { name: 'MLX\nApple原生框架', value: 12, itemStyle: { color: '#6366F1' } },
              { name: 'llama.cpp\n轻量推理', value: 8, itemStyle: { color: '#818CF8' } },
              { name: 'Cider SDK\nINT8加速', value: 8, itemStyle: { color: '#A5B4FC' } },
              { name: 'PyTorch MPS\nGPU加速', value: 7, itemStyle: { color: '#C7D2FE' } }
            ]
          },
          {
            name: '模型管理',
            value: 25,
            itemStyle: { color: '#EC4899' },
            children: [
              { name: 'Ollama\n一行拉模型', value: 13, itemStyle: { color: '#F472B6' } },
              { name: 'LM Studio\n图形界面', value: 12, itemStyle: { color: '#F9A8D4' } }
            ]
          },
          {
            name: '硬件加速',
            value: 25,
            itemStyle: { color: '#10B981' },
            children: [
              { name: '统一内存\nUMA大容量', value: 10, itemStyle: { color: '#34D399' } },
              { name: 'Neural Engine\n16核NPU', value: 8, itemStyle: { color: '#6EE7B7' } },
              { name: 'GPU\n10核+AI加速', value: 7, itemStyle: { color: '#A7F3D0' } }
            ]
          },
          {
            name: '开发工具',
            value: 15,
            itemStyle: { color: '#F59E0B' },
            children: [
              { name: 'Homebrew\n包管理', value: 5, itemStyle: { color: '#FBBF24' } },
              { name: 'Claude Code\nAI Agent', value: 5, itemStyle: { color: '#FCD34D' } },
              { name: 'Metal 4\n张量API', value: 5, itemStyle: { color: '#FDE68A' } }
            ]
          }
        ]
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  // Chart 3: Mac vs Windows AI开发适配性雷达图
  function initRadarChart() {
    var el = document.getElementById('chart-radar');
    if (!el || typeof echarts === 'undefined') return;

    var chart = echarts.init(el, null, { renderer: 'svg' });

    chart.setOption({
      backgroundColor: 'transparent',
      animation: false,
      tooltip: { trigger: 'item' },
      legend: {
        data: ['macOS', 'Windows (原生)', 'Windows + WSL2'],
        bottom: 0,
        textStyle: { color: '#64748B', fontSize: 12 },
        itemWidth: 16,
        itemHeight: 10
      },
      radar: {
        indicator: [
          { name: 'Shell友好度', max: 10 },
          { name: '工具链标准化', max: 10 },
          { name: '依赖编译成功率', max: 10 },
          { name: 'AI工具首发权', max: 10 },
          { name: '本地模型推理', max: 10 },
          { name: '自动化能力', max: 10 },
          { name: '部署一致性', max: 10 },
          { name: '续航与静音', max: 10 }
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
            value: [9.5, 9, 9.5, 9, 9.5, 9, 9, 9.5],
            name: 'macOS',
            areaStyle: { color: 'rgba(79, 70, 229, 0.15)' },
            lineStyle: { color: '#4F46E5', width: 2 },
            itemStyle: { color: '#4F46E5' }
          },
          {
            value: [4, 5, 5, 5, 3, 5, 4, 6],
            name: 'Windows (原生)',
            areaStyle: { color: 'rgba(236, 72, 153, 0.1)' },
            lineStyle: { color: '#EC4899', width: 2 },
            itemStyle: { color: '#EC4899' }
          },
          {
            value: [7, 6.5, 7, 6, 4, 5.5, 7, 6],
            name: 'Windows + WSL2',
            areaStyle: { color: 'rgba(16, 185, 129, 0.1)' },
            lineStyle: { color: '#10B981', width: 2 },
            itemStyle: { color: '#10B981' }
          }
        ]
      }]
    });

    window.addEventListener('resize', function () { chart.resize(); });
  }

  // Initialize all charts
  initBandwidthChart();
  initMLXEcoChart();
  initRadarChart();
});
