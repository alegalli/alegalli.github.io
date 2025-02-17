document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("pj");

    if (projectId) {
        fetch("projects.json")
            .then(response => response.json())
            .then(projects => {
                const project = projects.find(p => p.id == projectId);
                if (project) {
                    document.getElementById("project-title").textContent = project.name;
                    document.getElementById("project-year").textContent = `Year: ${project.year}`;
                    document.getElementById("project-description").textContent = project.description || "No description available.";
                } else {
                    document.getElementById("project-content").innerHTML = "<p>Project not found.</p>";
                }
            })
            .catch(error => console.error("Error loading project:", error));
    }
});
