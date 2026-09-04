# Yajna for Humanity — Charity Website

A fully responsive, multi-page charity website built with **semantic HTML5, modern CSS (Flexbox + Grid) and vanilla JavaScript** — no frameworks. The site lets visitors explore the charity's causes, read field updates, and complete a two-step donation flow.

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Hero, animated impact stats, causes overview, mission |
| About | `about.html` | Our story and values |
| Blog | `blog.html` | Featured story, recent posts, donation transparency table |
| Causes | `donate.html` | The three appeals and what donations provide |
| Donate — step 1 | `form.html` | Amount picker, personal details, billing address |
| Donate — step 2 | `payment.html` | Direct Debit details with confirmation message |
| Contact | `contact.html` | Contact details and message form |
| Sign up / Log in | `signup.html`, `login.html` | Account forms |

## Project structure

```
├── index.html … payment.html   HTML pages (semantic HTML5)
├── css/
│   └── style.css               single shared stylesheet (design system)
├── js/
│   └── main.js                 nav toggle, scroll reveals, counters, form handling
└── images/                     optimised photos (compressed from ~21 MB to ~2.6 MB)
```

## Key techniques

- **Design tokens** — all colours, fonts, radii and shadows are CSS custom properties defined once in `:root`, so the whole site can be re-themed from one place.
- **Semantic HTML5** — `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<fieldset>`/`<legend>`, and a `<caption>`ed data table.
- **Responsive layout** — CSS Grid with `auto-fit`/`minmax()` for the card grids, Flexbox for the nav and footer, `clamp()` for fluid type, and a hamburger menu below 900 px.
- **Accessibility** — labelled form controls, `aria-current` navigation state, `aria-expanded` on the menu button, visible focus rings, alt text, and `prefers-reduced-motion` support.
- **Vanilla JS interactions** — IntersectionObserver scroll-reveal animations, count-up impact statistics, sticky header shadow, and a simulated donation confirmation.
- **HTML5 form validation** — `required`, `type="email"`, `pattern`, `minlength` and `inputmode` provide client-side validation with no JavaScript needed.

## Running the site

No build step is required — open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```
