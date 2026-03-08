Contact form setup

Overview
- A simple modal contact form partial (`partials/contact-form.hbs`) has been added to the UI and is included in the footer.
- The form is wired to submit via AJAX (fetch) to the URL set in the form `action` attribute (default: `https://formspree.io/f/your-id`).

How to enable
1) Choose an endpoint:
   - Formspree: Sign up and get a form id, then set `action="https://formspree.io/f/your-id"` on the form (replace `your-id`).
   - Your own backend: set `action` to your endpoint that accepts POSTs with form-encoded data.

2) Update the default action
   - Edit `partials/contact-form.hbs` and change the `action` and `data-endpoint` attributes on the form.

Notes
- The JS (`js/08-contact-form.js`) will block a submission if the endpoint is not configured (or contains the placeholder `your-id`). It sends the form data with `Accept: application/json` and expects a 2xx response.
- The form includes a honeypot field named `house` to reduce spam.

Customization
- The modal CSS lives in `css/contact-form.css` and can be tuned to match your brand.
- If you prefer a standalone /contact/ page rather than a modal, I can add a layout that includes the form and example content.
