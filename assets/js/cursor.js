const cursor = document.querySelector('.cursor');
const cursorInner = document.querySelector('.cursor-inner');

// Initial cursor position
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Click animation
document.addEventListener('click', (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%) scale(0.8)`;
  createWaveEffect(e.clientX, e.clientY);
  
  setTimeout(() => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%) scale(1)`;
  }, 150);
});

function createWaveEffect(x, y) {
  const wave = document.createElement('div');
  wave.className = 'wave';
  wave.style.left = x + 'px';
  wave.style.top = y + 'px';
  document.body.appendChild(wave);
  
  wave.addEventListener('animationend', () => {
    wave.remove();
  });
}

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function updateCursor() {
  // Smooth cursor movement
  cursorX = lerp(cursorX, mouseX, 0.15);
  cursorY = lerp(cursorY, mouseY, 0.15);
  
  // Update cursor positions
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  cursorInner.style.left = mouseX + 'px';
  cursorInner.style.top = mouseY + 'px';
  
  requestAnimationFrame(updateCursor);
}

updateCursor();

// Hover effects
document.querySelectorAll('a, button, .navbar-link, .portfolio-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-hover');
    cursorInner.classList.add('cursor-inner-hover');
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-hover');
    cursorInner.classList.remove('cursor-inner-hover');
  });
});
