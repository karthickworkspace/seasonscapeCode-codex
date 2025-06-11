(() => {
  if (document.getElementById('season-container')) return;
  const container = document.createElement('div');
  container.id = 'season-container';
  Object.assign(container.style, {
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 999999
  });
  document.body.appendChild(container);

  const petals = [];
  for (let i = 0; i < 60; i++) {
    const petal = document.createElement('div');
    petal.textContent = '🌸';
    const size = Math.random() * 20 + 12;
    const rotation = Math.random() * 360;
    const x = Math.random() * window.innerWidth;
    Object.assign(petal.style, {
      position: 'absolute',
      fontSize: `${size}px`,
      opacity: Math.random() * 0.6 + 0.4,
      willChange: 'transform'
    });
    container.appendChild(petal);
    petals.push({ el: petal, x, y: -20, rotation, speed: Math.random() * 1 + 0.3, drift: (Math.random() - 0.5) * 1 });
  }

  function animate() {
    if (!document.body.contains(container)) return;
    petals.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      if (p.y > window.innerHeight) p.y = -20;
      if (p.x < -10) p.x = window.innerWidth;
      if (p.x > window.innerWidth) p.x = -10;
      p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`;
    });
    requestAnimationFrame(animate);
  }
  animate();
})();
