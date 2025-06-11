// seasons/storm.js
(function() {
  // Prevent multiple injections
  if (document.getElementById('season-container')) return;

  // 1. Main overlay container
  const container = document.createElement('div');
  container.id = 'season-container';
  Object.assign(container.style, {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 999999,
    backgroundColor: 'rgba(20, 20, 30, 0.7)'
  });
  document.body.appendChild(container);

  // 2. Lightning flash layer
  const flash = document.createElement('div');
  Object.assign(flash.style, {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%', height: '100%',
    background: '#fff',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.1s ease-out'
  });
  container.appendChild(flash);

  // 3. Rain canvas
  const rainCanvas = document.createElement('canvas');
  rainCanvas.width = window.innerWidth;
  rainCanvas.height = window.innerHeight;
  Object.assign(rainCanvas.style, {
    position: 'absolute',
    top: 0, left: 0
  });
  container.appendChild(rainCanvas);
  const rainCtx = rainCanvas.getContext('2d');

  // 4. Cloud canvas
  const cloudCanvas = document.createElement('canvas');
  cloudCanvas.width = window.innerWidth;
  cloudCanvas.height = window.innerHeight;
  Object.assign(cloudCanvas.style, {
    position: 'absolute',
    top: 0, left: 0
  });
  container.appendChild(cloudCanvas);
  const cloudCtx = cloudCanvas.getContext('2d');

  // 5. Create raindrops
  const drops = Array.from({ length: 600 }, () => ({
    x: Math.random() * rainCanvas.width,
    y: Math.random() * rainCanvas.height,
    length: Math.random() * 25 + 20,
    speed: Math.random() * 5 + 5,
    opacity: Math.random() * 0.4 + 0.1
  }));

  // 6. Create clouds
  const clouds = Array.from({ length: 10 }, () => ({
    x: Math.random() * cloudCanvas.width,
    y: Math.random() * cloudCanvas.height * 0.4,
    r: Math.random() * 100 + 80,
    speed: Math.random() * 0.5 + 0.2
  }));

  // 7. Wind angle that drifts over time
  let windAngle = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
  (function driftWind() {
    windAngle = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
    setTimeout(driftWind, 4000);
  })();

  // 8. Draw clouds with heavy blur
  function drawClouds() {
    cloudCtx.clearRect(0, 0, cloudCanvas.width, cloudCanvas.height);
    cloudCtx.fillStyle = 'rgba(120,120,120,0.4)';
    cloudCtx.filter = 'blur(80px)';
    clouds.forEach(c => {
      cloudCtx.beginPath();
      cloudCtx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      cloudCtx.fill();
      c.x -= c.speed;
      if (c.x < -c.r) c.x = cloudCanvas.width + c.r;
    });
    cloudCtx.filter = 'none';
  }

  // 9. Draw heavy slanted rain
  function drawRain() {
    rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    rainCtx.strokeStyle = 'rgba(200,200,255,0.6)';
    rainCtx.lineWidth = 1.2;
    rainCtx.lineCap = 'round';

    drops.forEach(d => {
      const dx = Math.cos(windAngle) * d.length;
      const dy = Math.sin(windAngle) * d.length;
      rainCtx.globalAlpha = d.opacity;
      rainCtx.beginPath();
      rainCtx.moveTo(d.x, d.y);
      rainCtx.lineTo(d.x + dx, d.y + dy);
      rainCtx.stroke();

      d.x += Math.cos(windAngle) * d.speed;
      d.y += Math.sin(windAngle) * d.speed;
      if (d.y > rainCanvas.height || d.x < 0 || d.x > rainCanvas.width) {
        d.x = Math.random() * rainCanvas.width;
        d.y = -d.length;
      }
    });
  }

  // 10. Lightning flashes at random intervals
  (function lightning() {
    if (!document.body.contains(container)) return;
    flash.style.opacity = 0.9;
    setTimeout(() => { flash.style.opacity = 0; }, 50);
    setTimeout(lightning, Math.random() * 15000 + 5000);
  })();

  // 11. Main animation loop
  function animate() {
    if (!document.body.contains(container)) return;
    drawClouds();
    drawRain();
    requestAnimationFrame(animate);
  }
  animate();

  // 12. Handle window resize
  window.addEventListener('resize', () => {
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;
    cloudCanvas.width = window.innerWidth;
    cloudCanvas.height = window.innerHeight;
  });
})();
