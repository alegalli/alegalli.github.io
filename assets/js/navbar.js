document.addEventListener("DOMContentLoaded", function () {
    function loadNavbar() {
        // let menuNav = document.getElementById("menu-nav");
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
                        elem.innerHTML = `<a href="${page.url}" class="menu-nav-elem">${page.name}</a>`;
                        menuNav.appendChild(elem);
                    }
                });

                // Add Theme Toggle
                let elem2 = document.createElement("li");
                elem2.innerHTML = `<a href="#" id="theme-toggle" class="menu-nav-elem">🌙</a>`;
                menuNav.appendChild(elem2);
            })
            .catch(error => console.error("Error loading navbar:", error));
    }

    loadNavbar();


    // NAVBAR NUOVA SUPER RESPONSIVE
    const navbar = document.getElementById("navbar");
    if (!navbar) {
        console.error("Navbar not found");
        return;
    }
    console.log("Navbar loaded successfully!");


    // const openButton = document.getElementById('open-sidebar-button');
    // const navbar = document.getElementById('navbar');

    // const media = window.matchMedia("(width < 700px)");

    // media.addEventListener('change', (e) => updateNavbar(e));

    // function updateNavbar(e){
    //     const isMobile = e.matches;
    //     console.log(isMobile);
    //     if(isMobile){
    //         navbar.setAttribute('inert', '');
    //     }
    //     else{
    //         // desktop device
    //         navbar.removeAttribute('inert');
    //     }
    // }

    // function openSidebar(){
    //     navbar.classList.add('show');
    //     openButton.setAttribute('aria-expanded', 'true');
    //     navbar.removeAttribute('inert');
    // }

    // function closeSidebar(){
    //     navbar.classList.remove('show');
    //     openButton.setAttribute('aria-expanded', 'false');
    //     navbar.setAttribute('inert', '');
    // }

    // // For Bookmark Links
    // // const navLinks = document.querySelectorAll('nav a')
    // // navLinks.forEach(link => {
    // //   link.addEventListener('click', () => {
    // //     closeSidebar()
    // //   })
    // // })

    // updateNavbar(media);
});