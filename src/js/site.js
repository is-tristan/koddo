// Site.js

import { animate, inView } from "motion";

document.addEventListener("DOMContentLoaded", function () {

    console.log("Site.js loaded");

    /**
     * Nav active when section is in view
     */
    const sectionIds = ["scalability", "advantages", "solutions", "about", "faqs"];
    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const navObserverOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.66
    };

    const navCallback = entries => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
            if (navLink) {
                navLink.classList.toggle("active", entry.isIntersecting);
            }
        });
    };

    const navObserver = new IntersectionObserver(navCallback, navObserverOptions);
    sections.forEach(section => navObserver.observe(section));

    /**
     * Create animations observer
     */
    const animationCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = "unset";
                entry.target.style.opacity = "1";
                observer.unobserve(entry.target);
            }
        });
    };

    const animationObserver = new IntersectionObserver(animationCallback, navObserverOptions);
    document.querySelectorAll(".animated").forEach(el => animationObserver.observe(el));

    /**
     * FadeUp and FadeIn Animations
     */
    const fadeAnimations = [
        {
            selector: ".fadeUp",
            keyframes: { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] }
        },
        {
            selector: ".fadeIn",
            keyframes: { opacity: [0, 1] }
        }
    ];

    fadeAnimations.forEach(({ selector, keyframes }) => {
        document.querySelectorAll(selector).forEach(el => {
            const delay = parseFloat(el.getAttribute("data-delay")) || 0.15;
            inView(
                el,
                () => animate(el, keyframes, { duration: 0.66, delay, easing: "ease-in" }),
                { amount: 0.66, once: true }
            );
        });
    });

    /**
     * Footer Copyright
     */
    const footerCopyright = () => {
        const afterFooter = document.querySelector(".afterFooter");
        if (afterFooter) {
            document.documentElement.style.setProperty(
                "--afterFooterHeight",
                `${afterFooter.offsetHeight}px`
            );
        }
    };

    window.addEventListener("resize", footerCopyright);
    window.addEventListener("load", footerCopyright);

});
