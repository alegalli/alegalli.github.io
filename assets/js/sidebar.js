document.addEventListener("DOMContentLoaded", function () {
    function loadSidebar() {
        let menuSide = document.getElementById("menu-side");
        if (!menuSide) {
            setTimeout(loadSidebar, 50); // Retry if the header isn't ready yet
            return;
        }

        fetch("config.json")
            .then(response => response.json())
            .then(data => {
                //nel json salvato navbar
                data.navbar.forEach(page => {
                    if (page.visible) {
                        let elem = document.createElement("li");
                        elem.innerHTML = `<a href="${page.url}">${page.name}</a>`;
                        menuSide.appendChild(elem);
                    }
                });

                // Add Theme Toggle
                let elem2 = document.createElement("li");
                elem2.innerHTML = `<a href="#" id="theme-side-toggle">🌙</a>`;
                menuSide.appendChild(elem2);
            })
            .catch(error => console.error("Error loading sidebar:", error));
    }

    loadSidebar();
});

function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
    } else {
        setTimeout(() => waitForElement(selector, callback), 100);
    }
}

waitForElement("#open-sidebar-button", (openButton) => {
    const sidebar = document.getElementById("sidebar");
    const closeButton = document.getElementById("close-sidebar-button");
    const overlay = document.getElementById("overlay");
    const navbar = document.getElementById("navbar");

    // debug if elements are loaded
    // console.log("OPEN"+document.getElementById("open-sidebar-button"));
    // console.log("CLOSE"+document.getElementById("close-sidebar-button"));
    // console.log("SIDE"+document.getElementById("sidebar"));

    const media = window.matchMedia("(width < 768px)");
    media.addEventListener('change', (e) => updateSidebar(e));
    let sideBarLeftOpen = false;

    function updateSidebar(e){
        const isMobile = e.matches;
        console.log(isMobile);
        if (isMobile){
            navbar.setAttribute('inert', ''); //non so se serve ma nel dubbio lo lascio
            if (sideBarLeftOpen) {
                sidebar.style.display = "block";
                overlay.style.display = "block";
            }
        }
        else {
            // desktop device
            navbar.removeAttribute('inert');
            sidebar.style.display = "none";
            overlay.style.display = "none";
        }
    }      

    function openSidebar() {
        sidebar.style.display = "block";
        overlay.style.display = "block";
        navbar.removeAttribute('inert');
        sideBarLeftOpen = true;
        console.log("APERTO");
    }

    function closeSidebar() {
        sidebar.style.display = "none";
        overlay.style.display = "none";
        navbar.setAttribute("inert", '');
        sideBarLeftOpen = false;
        console.log("CHIUSO");
    }
    // Multiple Events to a Listener https://dev.to/ferdunt/multiple-events-to-a-listener-with-javascript-2bj8
    openButton.addEventListener("click", openSidebar);  
    closeButton.addEventListener("click", closeSidebar, err => {});
    overlay.addEventListener("click", closeSidebar, err => {});
    
});
