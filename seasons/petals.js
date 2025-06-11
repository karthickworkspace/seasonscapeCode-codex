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

  const petals = [];
  for (let i = 0; i < 60; i++) {
    const petal = document.createElement('div');
    petal.textContent = '🌸';
    Object.assign(petal.style, {
      position: 'absolute', fontSize: `${Math.random()*20+12}px`,
      left: `${Math.random()*100}%`, top: `${-10}%`,
      opacity: Math.random()*0.6+0.4,
      transform: `rotate(${Math.random()*360}deg)`
    });
    container.appendChild(petal);
    petals.push({ el: petal, x: parseFloat(petal.style.left), y: -10, speed: Math.random()*1+0.3, drift: (Math.random()-0.5)*1 });
  }

  function animate() {
    petals.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      if (p.y > window.innerHeight) p.y = -20;
      if (p.x < -10) p.x = window.innerWidth;
      if (p.x > window.innerWidth) p.x = -10;
      p.el.style.top = `${p.y}px`;
      p.el.style.left = `${p.x}px`;
    });
    requestAnimationFrame(animate);
  }
  animate();
})();