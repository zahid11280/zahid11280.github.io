'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const setMenu = open => { nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  const cards = [...document.querySelectorAll('.project-card')];
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
    let count = 0;
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) { count++; card.classList.add('visible'); } });
    document.querySelector('#project-count').textContent = `${count} projects`;
  }));
  const dialog = document.querySelector('#preview-dialog');
  const previewImage = document.querySelector('#preview-image');
  document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => {
    document.querySelector('#preview-title').textContent = button.dataset.title;
    previewImage.src = button.dataset.preview; previewImage.alt = `${button.dataset.title} full storefront screenshot`;
    dialog.showModal(); document.body.classList.add('modal-open'); document.querySelector('.preview-content').scrollTop = 0;
  }));
  document.querySelector('#close-preview').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', e => { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); });
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-motion');
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); } }), { threshold: .06 });
    document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
  }
  if ('IntersectionObserver' in window) {
    const sections = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id)); }), { rootMargin: '-20% 0px -45% 0px' });
    document.querySelectorAll('section[id]').forEach(section => sections.observe(section));
  }
});
