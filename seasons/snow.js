(function() {
  // Avoid duplicate container
  if (document.getElementById('season-container')) return;

  const container = document.createElement('div');
  container.id = 'season-container';
  container.style.pointerEvents = 'none';
  container.style.position = 'fixed';
  container.style.top = 0;
  container.style.left = 0;
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.zIndex = 999999;

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  container.appendChild(canvas);
  document.body.appendChild(container);

  const ctx = canvas.getContext('2d');
  const flakes = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 4 + 1,
    d: Math.random() * 100
  }));

  function draw() {
    if (!document.body.contains(container)) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    flakes.forEach(f => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
      f.y += Math.cos(f.d) + 1 + f.r / 2;
      f.x += Math.sin(f.d);
      if (f.y > canvas.height) f.y = -f.r;
      if (f.x > canvas.width) f.x = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
