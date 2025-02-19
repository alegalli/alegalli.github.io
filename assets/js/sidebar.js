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

    console.log("OPEN"+document.getElementById("open-sidebar-button"));
    console.log("CLOSE"+document.getElementById("close-sidebar-button"));
    console.log("SIDE"+document.getElementById("sidebar"));

    openButton.addEventListener("click", () => {
        sidebar.style.display = "block";
        overlay.style.display = "block";
        console.log("APERTO");
    });

    closeButton.addEventListener("click", () => {
        sidebar.style.display = "none";
        overlay.style.display = "none";
        console.log("CHIUSO");
    });
});
