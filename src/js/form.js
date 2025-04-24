import Choices from "choices.js";

document.addEventListener("DOMContentLoaded", () => {

    console.log("Form script loaded");

    // Initialize Choices.js for all select elements
    document.querySelectorAll("select").forEach((select) => {
        new Choices(select, {
            searchEnabled: false,
            itemSelectText: "",
            shouldSort: false,
        });
    });

    // Handle form submission
    const form = document.getElementById("contactForm");
    const successMessage = document.querySelector(".formSuccess");
    const checkmark = document.querySelector(".successMark");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Hide the form
        form.style.display = "none";

        // Show success message
        successMessage.style.display = "flex";
        checkmark.style.display = "block";

        // Scroll to the confirmation message
        successMessage.scrollIntoView({ behavior: "smooth", block: "start" });

        // Load confetti script only if not already loaded
        function triggerConfettiAndSend() {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
            });

            setTimeout(async () => {
                const formData = new FormData(form);
                // Submit via AJAX
                await fetch(form.action, {
                    method: "POST",
                    body: formData,
                });
                // Reset form
                form.reset();
            }, 700);
        }

        if (!window.confetti) {
            const script = document.createElement("script");
            script.src =
                "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
            script.onload = triggerConfettiAndSend;
            document.body.appendChild(script);
        } else {
            triggerConfettiAndSend();
        }
    });

    // Reset the form fields if page reloads
    window.onload = function () {
        form.reset();
    };
});