document.addEventListener("DOMContentLoaded", function () {
    function loadNavbar() {
        let navbar = document.getElementById("menu-nav");
        if (!navbar) {
            setTimeout(loadNavbar, 50); // Retry if the header isn't ready yet
            return;
        }

        fetch("config.json")
            .then(response => response.json())
            .then(data => {
                data.navbar.forEach(page => {
                    if (page.visible) {
                        let elem = document.createElement("li");
                        elem.innerHTML = `<a href="${page.url}" class="menu-nav-elem">${page.name}</a>`;
                        navbar.appendChild(elem);
                    }
                });

                // Add Theme Toggle
                let elem = document.createElement("li");
                elem.innerHTML = `<a href="#" id="theme-toggle" class="menu-nav-elem">🌙</a>`;
                navbar.appendChild(elem);
            })
            .catch(error => console.error("Error loading navbar:", error));
    }

    loadNavbar();
});
