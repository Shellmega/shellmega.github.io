// Hexo 插件: 仅首页注入 homepage.js (打字机 + 滚动渐入)
hexo.extend.filter.register('after_render:html', function (str, data) {
  if (data && data.path === 'index.html') {
    return str.replace('</body>', '<script src="/js/homepage.js" defer></script>\n</body>');
  }
  return str;
});
