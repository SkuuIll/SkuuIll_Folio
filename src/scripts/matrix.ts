// Opt-in Matrix rain. CSS animations pause outside the observatory and for reduced motion.
const frame = document.querySelector<HTMLElement>('.spatial-frame');
const toggle = document.querySelector<HTMLButtonElement>('#matrix-toggle');
const label = document.querySelector<HTMLElement>('.matrix-toggle-label');
const layer = document.querySelector<HTMLElement>('.matrix-rain');
const status = document.querySelector<HTMLElement>('#matrix-status');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const characters = '01アイウエオカキクケコサシスセソ<>/{}';
let visible = false;
function populate() {
  if (!layer || layer.childElementCount) return;
  const count = Math.max(12, Math.min(28, Math.floor((frame?.clientWidth || 750) / 34)));
  for (let i = 0; i < count; i++) {
    const column = document.createElement('span');
    column.className = 'matrix-column';
    column.style.setProperty('--matrix-x', ((i + .5) / count * 100) + '%');
    column.style.setProperty('--matrix-duration', (6 + (i * 7 % 9)) + 's');
    column.style.setProperty('--matrix-delay', (-((i * 13) % 14)) + 's');
    column.textContent = Array.from({length: 19}, (_, j) => characters[(i * 11 + j * 17) % characters.length]).join('');
    layer.append(column);
  }
}
function active() { return frame?.dataset.matrix === 'on'; }
function sync() {
  if (!frame || !toggle || !label) return;
  const reduced = motion.matches;
  if (reduced && active()) frame.dataset.matrix = 'off';
  toggle.disabled = reduced;
  frame.dataset.matrixVisible = String(visible && !document.hidden && !reduced && active());
  toggle.setAttribute('aria-pressed', String(active()));
  label.textContent = active() ? 'Desactivar lluvia Matrix' : 'Activar lluvia Matrix';
  if (status) status.textContent = reduced ? 'Efecto opcional desactivado por tu preferencia de movimiento reducido.' : '';
}
if (frame && toggle && layer) {
  toggle.hidden = false;
  frame.dataset.matrix = 'off';
  toggle.addEventListener('click', () => {
    frame.dataset.matrix = active() ? 'off' : 'on';
    if (active()) populate();
    sync();
  });
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, {threshold: 0.08});
  observer.observe(frame);
  motion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  document.addEventListener('skull:motion', sync);
  window.addEventListener('pagehide', () => { observer.disconnect(); frame.dataset.matrixVisible = 'false'; });
  sync();
}
