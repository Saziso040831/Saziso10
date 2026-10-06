document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {

    /* Mobile menu */
    const menuBtn  = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const navbar   = document.querySelector(".navbar");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const open = navLinks.classList.toggle("open");
            menuBtn.textContent = open ? "✕" : "☰";
            menuBtn.setAttribute("aria-expanded", open);
        });
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuBtn.textContent = "☰";
            });
        });
    }

    /* Footer year */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* Navbar border once scrolled */
    const onScroll = () => navbar && navbar.classList.toggle("scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Smooth scroll (CSS handles it too; this keeps older browsers working) */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const id = this.getAttribute("href");
            if (id === "#") return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    /* Reveal on scroll — uses a class so hover transforms still work */
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll(
        ".section-title, .project, .skill-card, .contact-card, .edu-card, .testimonial, .timeline-item, .about-card"
    ).forEach(el => {
        el.classList.add("reveal");
        revealObserver.observe(el);
    });

    /* Highlight the nav link of the section in view */
    const links = [...document.querySelectorAll("#navLinks a:not(.cta)")];
    const sections = links.map(l => document.querySelector(l.getAttribute("href"))).filter(Boolean);

    const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
            }
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(s => spy.observe(s));
});
