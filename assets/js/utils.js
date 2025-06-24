(async function trackVisit() {
    const SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzBdejwka0vkpHTdf23tT6Dmz2nE2K429R2SjoUNQlrLBzqjZzIqaQbahNQ7ySGdaI4Ig/exec"; 

    // Function to store visited pages in session storage
    function saveNavigationPath(url) {
        let path = sessionStorage.getItem("navigationPath");
        path = path ? JSON.parse(path) : [];
        path.push(url);
        sessionStorage.setItem("navigationPath", JSON.stringify(path));
    }

    // Track internal link clicks
    document.addEventListener("click", function(event) {
        const target = event.target.closest("a");
        if (target && target.href.startsWith(window.location.origin)) {
            saveNavigationPath(target.pathname);
        }
    });

    // Get visitor IP
    const ipResponse = await fetch("https://api64.ipify.org?format=json");
    const { ip } = await ipResponse.json();

    // Get geolocation info
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResponse.json();

    // Get user navigation history from session storage
    const navigationPath = sessionStorage.getItem("navigationPath") || "[]";

    // Create data object
    const visitData = {
        ip: ip,
        country: geoData.country_name,
        city: geoData.city,
        region: geoData.region,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        navigationPath: JSON.parse(navigationPath)
    };

    // Send data to Google Sheets
    await fetch(SHEET_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitData)
    });

    // Save the first page visit
    saveNavigationPath(window.location.pathname);
})();
