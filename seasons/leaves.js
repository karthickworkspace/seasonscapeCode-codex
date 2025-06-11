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

  const leaves = [];
  for (let i = 0; i < 50; i++) {
    const leaf = document.createElement('div');
    leaf.textContent = '🍂';
    const size = Math.random() * 24 + 16;
    const rotation = Math.random() * 360;
    const x = Math.random() * window.innerWidth;
    Object.assign(leaf.style, {
      position: 'absolute',
      fontSize: `${size}px`,
      opacity: Math.random() * 0.7 + 0.3,
      willChange: 'transform'
    });
    container.appendChild(leaf);
    leaves.push({ el: leaf, x, y: -20, rotation, speed: Math.random() * 1 + 0.5, drift: Math.random() * 0.5 });
  }

  function animate() {
    if (!document.body.contains(container)) return;
    leaves.forEach(l => {
      l.y += l.speed;
      l.x += l.drift;
      if (l.y > window.innerHeight) l.y = -20;
      if (l.x > window.innerWidth) l.x = -10;
      l.el.style.transform = `translate(${l.x}px, ${l.y}px) rotate(${l.rotation}deg)`;
    });
    requestAnimationFrame(animate);
  }
  animate();
})();
