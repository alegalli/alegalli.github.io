document.addEventListener("DOMContentLoaded", function () {
    fetch("projects.json")
        .then(response => response.json())
        .then(projects => {
            if (projects.length > 3) {
                const shuffled = [...projects].sort(() => 0.5 - Math.random()); // Shuffle copy of projects
                const selectedProjects = shuffled.slice(0, 3);
                const container = document.getElementById("suggested-container");
                if (container) {
                    container.innerHTML = ""; // Clear existing content
                    selectedProjects.forEach(project => {
                        const projectElement = document.createElement("div");
                        projectElement.classList.add("span4");
                        projectElement.innerHTML = `
                            <div class="sugg-img">
                                <img src="${project.cover_photo || 'assets/img/placeholder.jpg'}" alt="${project.name}">
                            </div>
                        `;
                        container.appendChild(projectElement);
                    });
                }
            }
        })
        .catch(error => console.error("Error loading suggested projects:", error));
});
