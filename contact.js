'use strict';
(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const submit = document.getElementById('contact-submit');
  const status = document.getElementById('form-status');
  const fields = {
    name: document.getElementById('contact-name'),
    email: document.getElementById('contact-sender'),
    message: document.getElementById('contact-message')
  };
  let sending = false;
  Object.values(fields).forEach(field => field.addEventListener('input', () => field.setCustomValidity('')));
  const showStatus = (state, text) => { status.dataset.state = state; status.textContent = text; };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    Object.values(fields).forEach(field => field.setCustomValidity(''));
    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const message = fields.message.value.trim();
    if (name.length < 2) fields.name.setCustomValidity('Please enter your name (at least 2 characters).');
    if (message.length < 10) fields.message.setCustomValidity('Please enter a message of at least 10 characters.');
    if (!form.reportValidity()) return;
    if (document.getElementById('contact-website').value) return;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    sending = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    showStatus('sending', 'Sending your message…');
    try {
      const response = await fetch(form.dataset.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name, email, message,
          _replyto: email,
          _subject: 'New portfolio message — Adharika Mahajan',
          _template: 'table',
          _url: form.querySelector('input[name="_url"]').value
        }),
        signal: controller.signal
      });
      const data = await response.json();
      const providerMessage = String(data.message || '');
      if (/activat|confirm (your|the) (email|form)/i.test(providerMessage)) {
        showStatus('warning', 'This form is waiting for email verification. Please use Email me or Open Gmail for now.');
        return;
      }
      if (!response.ok || (data.success !== true && data.success !== 'true')) throw new Error('Submission not accepted');
      form.reset();
      showStatus('success', 'Your message was submitted. Thank you for reaching out!');
    } catch (error) {
      showStatus('error', error.name === 'AbortError'
        ? 'Sending took too long. Your message is still here. Please try again or use Email me.'
        : 'Your message could not be submitted. Please try again or use Email me or Open Gmail.');
    } finally {
      clearTimeout(timeout);
      sending = false;
      submit.disabled = false;
      submit.textContent = 'Send message';
      form.removeAttribute('aria-busy');
    }
  });
})();
