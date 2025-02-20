document.addEventListener("DOMContentLoaded", function () {
    function loadNavbar() {
        let menuNav = document.getElementById("menu-nav");
        if (!menuNav) {
            setTimeout(loadNavbar, 50); // Retry if the header isn't ready yet
            return;
        }

        fetch("config.json")
            .then(response => response.json())
            .then(data => {
                data.navbar.forEach(page => {
                    if (page.visible) {
                        let elem = document.createElement("li");
                        elem.innerHTML = `<a href="${page.url}">${page.name}</a>`;
                        menuNav.appendChild(elem);
                    }
                });

                // Add Theme Toggle
                let elem2 = document.createElement("li");
                elem2.innerHTML = `<a href="#" id="theme-nav-toggle">🌙</a>`;
                menuNav.appendChild(elem2);
            })
            .catch(error => console.error("Error loading navbar:", error));
    }

    loadNavbar();
});