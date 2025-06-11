(function() {
  if (document.getElementById('season-container')) return;
  const container = document.createElement('div');
  container.id = 'season-container';
  Object.assign(container.style, {
    pointerEvents: 'none',
    position: 'fixed', top: 0, left: 0,
    width: '100%', height: '100%',
    overflow: 'hidden', zIndex: 999999
  });
  document.body.appendChild(container);

  const leaves = [];
  for (let i = 0; i < 50; i++) {
    const leaf = document.createElement('div');
    leaf.textContent = '🍂';
    Object.assign(leaf.style, {
      position: 'absolute',
      fontSize: `${Math.random()*24+16}px`,
      left: `${Math.random()*100}%`,
      top: `${-10}%`,
      opacity: Math.random()*0.7+0.3,
      transform: `rotate(${Math.random()*360}deg)`
    });
    container.appendChild(leaf);
    leaves.push({ el: leaf, x: parseFloat(leaf.style.left), y: -10, speed: Math.random()*1+0.5, drift: Math.random()*0.5 });
  }

  function animate() {
    leaves.forEach(l => {
      l.y += l.speed;
      l.x += l.drift;
      if (l.y > window.innerHeight) l.y = -20;
      if (l.x > window.innerWidth) l.x = -10;
      l.el.style.top = `${l.y}px`;
      l.el.style.left = `${l.x}px`;
    });
    requestAnimationFrame(animate);
  }
  animate();
})();