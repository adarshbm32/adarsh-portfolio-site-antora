(function () {
  'use strict';

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return (ctx || document).querySelectorAll(sel); }

  // Open and close modal
  function openModal(modal) {
    modal.setAttribute('aria-hidden', 'false');
    // focus first input
    var first = qs('input, textarea, button', modal);
    first?.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeModal(modal, trigger) {
    modal.setAttribute('aria-hidden', 'true');
    trigger?.focus();
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (ev) {
    var trigger = ev.target.closest('.contact-trigger');
    if (!trigger) return;
    ev.preventDefault();
    var target = document.querySelector(trigger.dataset.contactTarget || '#contact-modal');
    if (target) {
      openModal(target);
      // store trigger to return focus later
      target._trigger = trigger;
    }
  });

  // close handlers
  document.addEventListener('click', function (ev) {
    var close = ev.target.closest('[data-modal-close]');
    if (!close) return;
    var modal = ev.target.closest('.contact-modal');
    if (modal) closeModal(modal, modal._trigger);
  });

  // click outside dialog
  document.addEventListener('click', function (ev) {
    var modal = ev.target.closest('.contact-modal');
    if (!modal) return;
    if (ev.target.matches('.contact-modal__overlay')) closeModal(modal, modal._trigger);
  });

  // ESC key
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') {
      var open = document.querySelector('.contact-modal[aria-hidden="false"]');
      if (open) closeModal(open, open._trigger);
    }
  });

  // Form submit via AJAX (if action present)
  document.addEventListener('submit', function (ev) {
    var form = ev.target.closest('.contact-form');
    if (!form) return;
    ev.preventDefault();

    // basic validation
    var name = form.querySelector('[name=name]');
    var email = form.querySelector('[name=email]');
    var message = form.querySelector('[name=message]');
    if (!name?.value || !email?.value || !message?.value) {
      showMessage(form, 'error', 'Please fill the required fields.');
      return;
    }

    // honeypot
    var honeypot = form.querySelector('[name=house]');
    if (honeypot && honeypot.value) { // likely spam
      showMessage(form, 'success', 'Thanks for your message.');
      return;
    }

    var url = form.action || form.dataset.endpoint;
    if (!url || url === '#' || url.includes('your-id')) {
      showMessage(form, 'error', 'Form endpoint not configured — please update the form action to your endpoint.');
      return;
    }

    var data = new FormData(form);

    fetch(url, {
      method: form.method || 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function (resp) {
      if (resp.ok) return resp.json().catch(function () { return {}; });
      return resp.json().then(function (body) { throw body; });
    }).then(function () {
      showMessage(form, 'success', 'Thanks — your message was sent.');
      form.reset();
      setTimeout(function () {
        var modal = form.closest('.contact-modal');
        if (modal) closeModal(modal, modal._trigger);
      }, 2500);
    }).catch(function (err) {
      console.error('Contact form error', err);
      showMessage(form, 'error', 'Sorry — there was a problem sending your message.');
    });
  });

  function showMessage(form, type, text) {
    var success = form.querySelector('.contact-form__message--success');
    var error = form.querySelector('.contact-form__message--error');
    if (type === 'success') {
      success.hidden = false; error.hidden = true; success.textContent = text;
    } else {
      success.hidden = true; error.hidden = false; error.textContent = text;
    }
  }
})();