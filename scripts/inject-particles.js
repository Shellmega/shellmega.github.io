// Hexo 插件: 仅首页(index.html)注入粒子背景 canvas 和脚本
// Hexo 7 的 injector 不支持按页面动态生成(注册时即求值), 改用 after_render:html 过滤器
hexo.extend.filter.register('after_render:html', function (str, data) {
  if (data && data.path === 'index.html') {
    var inject = [
      '<canvas id="particles-canvas" aria-hidden="true"></canvas>',
      '<script src="/js/particles.js" defer></script>',
    ].join('\n');
    return str.replace(/<body[^>]*>/, function (m) {
      return m + '\n' + inject;
    });
  }
  return str;
});
