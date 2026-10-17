'use strict';
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const themeButton = document.getElementById('theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('adharika-theme'); } catch (_) { /* System theme still works when storage is disabled. */ }
  const setTheme = theme => {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    themeMeta.setAttribute('content', theme === 'dark' ? '#101827' : '#ffffff');
  };
  setTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : (systemTheme.matches ? 'dark' : 'light'));
  themeButton.addEventListener('click', () => {
    savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(savedTheme);
    try { localStorage.setItem('adharika-theme', savedTheme); } catch (_) {}
  });
  const followSystem = event => { if (savedTheme !== 'light' && savedTheme !== 'dark') setTheme(event.matches ? 'dark' : 'light'); };
  if (systemTheme.addEventListener) systemTheme.addEventListener('change', followSystem);

  const navigation = document.getElementById('navigation');
  const menuButton = document.getElementById('menu-toggle');
  const navLinks = [...navigation.querySelectorAll('a')];
  const setMenu = open => {
    navigation.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navLinks.forEach(link => link.addEventListener('click', () => {
    setMenu(false);
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  }));
  document.addEventListener('click', event => { if (!event.target.closest('.nav-wrap')) setMenu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { setMenu(false); menuButton.focus(); }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) setMenu(false); });

  const sections = [...document.querySelectorAll('main > section[id]')];
  let queued = false;
  const updateNavigation = () => {
    let current = sections[0]?.id;
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 155) current = section.id; });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1]?.id;
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    queued = false;
  };
  window.addEventListener('scroll', () => { if (!queued) { queued = true; window.requestAnimationFrame(updateNavigation); } }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const projectCards = [...document.querySelectorAll('.project-card')];
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    projectCards.forEach(card => {
      const visible = selected === 'all' || card.dataset.categories.split(' ').includes(selected);
      card.hidden = !visible;
      if (visible) count++;
    });
    const label = selected === 'ai' ? 'AI / ML' : selected === 'web' ? 'Web' : 'all';
    document.getElementById('filter-status').textContent = `Showing ${count} ${label} featured projects.`;
  }));

  const projects = {
    safedrive: {
      name: 'SafeDrive', category: 'AI + WEB APPLICATION · 2025 — 2026',
      intro: 'Real-time driver drowsiness detection, connecting computer vision to a full-stack web application.',
      facts: [
        ['The idea', 'Use a webcam-based computer vision model to identify driver drowsiness and support driver awareness.'],
        ['The work', 'Built a full-stack application with a backend-connected MobileNetV2 model, using Python and deep learning for driver alertness classification.'],
        ['Reported result', 'The resume reports 98%+ classification accuracy. This is a project evaluation result; performance can vary with real-world conditions.'],
        ['Explore', 'The linked Colab notebook contains the model work.']
      ],
      href: 'https://colab.research.google.com/drive/152mXgxJWlwNR6RUPXgdCyDEsTXwooZWB?usp=sharing', link: 'Open model notebook'
    },
    darshanmitr: {
      name: 'DarshanMitr', category: 'SMART PILGRIMAGE MANAGEMENT · OCT 2025',
      intro: 'A pilgrimage management web app centered on safety, accessibility, and a smoother devotee experience.',
      facts: [
        ['The idea', 'Bring the information and support needed during a pilgrimage into one accessible interface.'],
        ['The work', 'Developed crowd monitoring, virtual queues, devotee guidance, and emergency SOS features in an interactive dashboard.'],
        ['The focus', 'A user-centered dashboard focused on safety, accessibility, and AI-powered crowd management.'],
        ['Explore', 'Visit the live project to explore the application.']
      ],
      href: 'https://darshan-mitr.vercel.app/', link: 'Explore live demo'
    },
    sahas: {
      name: 'Sahas', category: 'MACHINE LEARNING + RESEARCH · JUN — JUL 2024',
      intro: 'A machine learning project exploring human trafficking patterns in India through demographic and socio-economic data.',
      facts: [
        ['The idea', 'Study patterns in demographic and socio-economic data to inform research into human trafficking in India.'],
        ['The work', 'Analyzed the data and evaluated Logistic Regression, SVM, and Random Forest models.'],
        ['Published study', 'The published study evaluates models using time-based validation to study human trafficking patterns.'],
        ['Research', 'Presented at ICDPN 2025 and co-authored as a chapter in Data Processing and Networking (Springer, Lecture Notes in Networks and Systems), published on 14 August 2026.']
      ],
      href: 'https://colab.research.google.com/drive/1bEu9LS1XNTKiKXNnkrup-nHCnmbXyeh6?usp=sharing', link: 'Open model notebook',
      related: [['Read paper on Springer', 'https://link.springer.com/chapter/10.1007/978-3-032-28616-1_32'], ['LinkedIn announcement', 'https://lnkd.in/p/gspPkqS6']]
    }
  };
  const dialog = document.getElementById('project-dialog');
  let trigger = null;
  const closeDialog = () => { if (dialog.open) dialog.close(); };
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    trigger = button;
    document.getElementById('dialog-category').textContent = project.category;
    document.getElementById('dialog-title').textContent = project.name;
    document.getElementById('dialog-intro').textContent = project.intro;
    const facts = document.getElementById('dialog-facts');
    facts.replaceChildren();
    project.facts.forEach(([label, text]) => {
      const section = document.createElement('div');
      section.className = 'dialog-fact';
      const heading = document.createElement('h3');
      heading.textContent = label;
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      section.append(heading, paragraph);
      facts.append(section);
    });
    const link = document.getElementById('dialog-link');
    link.href = project.href;
    link.querySelector('span').textContent = project.link;
    const related = document.getElementById('dialog-related');
    related.replaceChildren();
    related.hidden = !project.related?.length;
    (project.related || []).forEach(([label, href]) => {
      const anchor = document.createElement('a');
      anchor.className = 'text-link';
      anchor.href = href;
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('rel', 'noopener noreferrer');
      anchor.textContent = `${label} ↗`;
      related.append(anchor);
    });
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-open');
    document.getElementById('close-dialog').focus();
  }));
  document.getElementById('close-dialog').addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeDialog();
  });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); trigger?.focus(); });

  const copyButton = document.getElementById('copy-email');
  copyButton.addEventListener('click', async () => {
    const email = document.getElementById('contact-email').textContent.trim();
    const status = document.getElementById('copy-status');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      status.textContent = 'Email address copied. Say hello!';
    } catch (_) {
      status.textContent = `Copy manually: ${email}`;
    }
  });
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
