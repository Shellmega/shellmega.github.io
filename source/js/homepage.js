// 首页花活: 副标题循环打字机 + 文章列表滚动渐入 (渐进增强, 无 JS 时一切正常)
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== 1. 打字机: "思考 · 记录 · 分享" 循环打出 ===== */
  var desc = document.querySelector('.site-info .description, .info-row.description');
  if (desc && !reduceMotion) {
    var fullText = desc.textContent.trim();
    var cursor = document.createElement('span');
    cursor.className = 'type-cursor';
    cursor.textContent = '|';
    desc.textContent = '';
    var textNode = document.createTextNode('');
    desc.appendChild(textNode);
    desc.appendChild(cursor);

    var state = 'typing';   // typing | pause | erasing
    var i = 0;
    var tick = 0;

    function step() {
      tick++;
      if (state === 'typing') {
        if (i <= fullText.length) {
          textNode.nodeValue = fullText.slice(0, i);
          i++;
        } else {
          state = 'pause';
          i = fullText.length;
          tick = 0;
        }
      } else if (state === 'pause') {
        if (tick > 20) { // 停顿约 2 秒
          state = 'erasing';
          tick = 0;
        }
      } else if (state === 'erasing') {
        if (i > 0) {
          i--;
          textNode.nodeValue = fullText.slice(0, i);
        } else {
          state = 'typing';
          tick = 0;
        }
      }
      requestAnimationFrame(step);
    }
    // 用 requestAnimationFrame 节流: 每 4 帧执行一次字符动作 (约 66ms/字, 删除约 33ms/字)
    var frame = 0;
    function rafLoop() {
      frame++;
      if (frame % 4 === 0) step();
      requestAnimationFrame(rafLoop);
    }
    rafLoop();
  }

  /* ===== 2. 滚动渐入: 文章列表卡片 ===== */
  if ('IntersectionObserver' in window && !reduceMotion) {
    var items = document.querySelectorAll('.post-item');
    if (items.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('revealed');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
      items.forEach(function (el) {
        el.classList.add('reveal');
        io.observe(el);
      });
    }
  }
})();
