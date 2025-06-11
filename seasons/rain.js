// seasons/rain.js
(function() {
  // Prevent duplicate
  if (document.getElementById('season-container')) return;

  // Create container
  const container = document.createElement('div');
  container.id = 'season-container';
  Object.assign(container.style, {
    pointerEvents: 'none',
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    overflow: 'hidden',
    zIndex: 999999
  });
  document.body.appendChild(container);

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  Object.assign(canvas.style, {
    position: 'absolute',
    top: 0, left: 0
  });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // Generate raindrops
  const raindrops = [];
  const maxDrops = 500;
  for (let i = 0; i < maxDrops; i++) {
    raindrops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 4 + 4,
      opacity: Math.random() * 0.5 + 0.2
    });
  }

  // Draw loop
  function draw() {
    if (!document.body.contains(container)) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(174,194,224,0.5)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    raindrops.forEach(drop => {
      ctx.globalAlpha = drop.opacity;
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.length);
      ctx.stroke();

      drop.y += drop.speed;
      if (drop.y > canvas.height) {
        drop.y = -drop.length;
        drop.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(draw);
  }
  draw();

  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();

