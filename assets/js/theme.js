// When 
function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
    } else {
        setTimeout(() => waitForElement(selector, callback), 100);
    }
}
// const element = document.getElementByClass()

waitForElement("#theme-side-toggle", (themeSideToggle) => {
    function initTheme() {
        let themeNavToggle = document.getElementById("theme-nav-toggle");
        if (!themeNavToggle) {
            setTimeout(initTheme, 50); // Retry if needed
            return;
        }

        function toggleDarkTheme() {
            document.body.classList.toggle("dark-theme");
            localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
        }

        themeNavToggle.addEventListener("click", toggleDarkTheme);
        themeSideToggle.addEventListener("click", toggleDarkTheme);

        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-theme");
        }
    }

    initTheme();
});


// document.addEventListener("DOMContentLoaded", function () {
//     function initTheme() {
//         let themeToggle = document.getElementsByClassName("theme-toggle");
//         // if (!themeToggle) {
//         //     setTimeout(initTheme, 50); // Retry if needed
//         //     return;
//         // }

//         function toggleDarkTheme() {
//             document.body.classList.toggle("dark-theme");
//             localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
//         }

//         themeToggle[0].addEventListener("click", toggleDarkTheme);
//         themeToggle[1].addEventListener("click", toggleDarkTheme);

//         if (localStorage.getItem("theme") === "dark") {
//             document.body.classList.add("dark-theme");
//         }
//     }

//     initTheme();
// });
