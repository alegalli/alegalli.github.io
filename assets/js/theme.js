document.addEventListener("DOMContentLoaded", function () {
    function initTheme() {
        let themeToggle = document.getElementById("theme-toggle");
        if (!themeToggle) {
            setTimeout(initTheme, 50); // Retry if needed
            return;
        }

        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-theme");
            localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
        });

        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-theme");
        }
    }

    initTheme();
});
