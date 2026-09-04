/* ==========================================================================
   YAJNA FOR HUMANITY — Main JavaScript
   --------------------------------------------------------------------------
   One shared script for every page. Each feature checks whether the
   elements it needs exist, so the same file can be safely included on
   pages that don't use that feature.
     1. Mobile navigation toggle (hamburger menu)
     2. Header shadow on scroll
     3. Scroll-reveal animations (IntersectionObserver)
     4. Animated impact counters (home page)
     5. Current year in the footer
     6. Donation payment form success message
   ========================================================================== */

"use strict";

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION TOGGLE
   Opens/closes the nav panel and keeps aria-expanded in sync so screen
   readers announce the menu state correctly.
   -------------------------------------------------------------------------- */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close the menu after tapping a link (better mobile experience)
  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* --------------------------------------------------------------------------
   2. HEADER SHADOW ON SCROLL
   Adds a subtle drop shadow once the page is scrolled, so the sticky
   header visibly separates from the content beneath it.
   -------------------------------------------------------------------------- */
const header = document.querySelector(".site-header");

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader(); // run once in case the page loads pre-scrolled
}

/* --------------------------------------------------------------------------
   3. SCROLL-REVEAL ANIMATIONS
   IntersectionObserver watches every .reveal element and adds .is-visible
   the first time it enters the viewport. The CSS handles the transition.
   -------------------------------------------------------------------------- */
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0 && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // animate once, then stop watching
        }
      });
    },
    { threshold: 0.15 } // trigger when 15% of the element is visible
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  // Very old browser fallback: just show everything
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

/* --------------------------------------------------------------------------
   4. ANIMATED IMPACT COUNTERS (home page)
   Each .stat__number holds its final value in data-target. When the stats
   band scrolls into view, the numbers count up from 0 over ~1.5 seconds.
   -------------------------------------------------------------------------- */
const counters = document.querySelectorAll(".stat__number[data-target]");

function animateCounter(el) {
  const target = Number(el.dataset.target);
  const suffix = el.dataset.suffix || ""; // e.g. "+" or "K"
  const duration = 1500; // total animation time in ms
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    // ease-out curve: fast at first, slowing near the end
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

if (counters.length > 0 && "IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => counterObserver.observe(el));
}

/* --------------------------------------------------------------------------
   5. CURRENT YEAR IN THE FOOTER
   Keeps the copyright line up to date automatically.
   -------------------------------------------------------------------------- */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   6. DONATION PAYMENT FORM (payment.html)
   This is a university project, so no real payment is processed: on submit
   we prevent the request and show a friendly confirmation message instead.
   -------------------------------------------------------------------------- */
const paymentForm = document.getElementById("payment-form");

if (paymentForm) {
  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault(); // stop the browser navigating away

    // Replace the form with a success confirmation
    paymentForm.innerHTML = `
      <div class="form-success">
        <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
        <h2>Thank you for your generosity!</h2>
        <p>Your donation has been set up successfully.<br>
           A confirmation email is on its way to you.</p>
        <a href="index.html" class="btn btn--primary" style="margin-top:1.5rem;">Back to home</a>
      </div>
    `;
    paymentForm.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
