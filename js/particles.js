// 首页粒子网络背景 (黑白极简, 鼠标交互)
(function () {
  var canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ctx = canvas.getContext('2d');
  var W = 0, H = 0, particles = [];
  var mouse = { x: null, y: null };
  var isMobile = window.innerWidth < 768;
  var COUNT = isMobile ? 35 : 70;
  var LINK_DIST = isMobile ? 90 : 130;
  var MOUSE_DIST = isMobile ? 120 : 170;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.r = Math.random() * 1.6 + 0.5;
  }
  Particle.prototype.step = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < -10) this.x = W + 10; else if (this.x > W + 10) this.x = -10;
    if (this.y < -10) this.y = H + 10; else if (this.y > H + 10) this.y = -10;
  };

  for (var i = 0; i < COUNT; i++) particles.push(new Particle());

  window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', function () { mouse.x = null; mouse.y = null; });

  function tick() {
    ctx.clearRect(0, 0, W, H);

    // 粒子间连线 (距离越近越明显)
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.step();
      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x, dy = p.y - q.y;
        var d = dx * dx + dy * dy;
        if (d < LINK_DIST * LINK_DIST) {
          var a = 0.16 * (1 - Math.sqrt(d) / LINK_DIST);
          ctx.strokeStyle = 'rgba(17,17,17,' + a.toFixed(3) + ')';
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    // 粒子绘制 + 鼠标连线
    for (var k = 0; k < particles.length; k++) {
      var s = particles[k];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(17,17,17,0.45)';
      ctx.fill();

      if (mouse.x !== null) {
        var mx = s.x - mouse.x, my = s.y - mouse.y;
        var md = mx * mx + my * my;
        if (md < MOUSE_DIST * MOUSE_DIST) {
          var ma = 0.5 * (1 - Math.sqrt(md) / MOUSE_DIST);
          ctx.strokeStyle = 'rgba(17,17,17,' + ma.toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(tick);
  }
  tick();
})();
