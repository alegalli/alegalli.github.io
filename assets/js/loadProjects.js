var default_image_path = "assets/img/home4.jpg"

document.addEventListener("DOMContentLoaded", function () {
    fetch("projects.json")
        .then(response => response.json())
        .then(projects => {
            // const container = document.getElementById("projects-list");
            // if (container) {
            //     projects.forEach(project => {
            //         const projectElement = document.createElement("div");
            //         projectElement.classList.add("project-item");
            //         projectElement.innerHTML = `
            //             <h3><a href="project.html?pj=${project.id}">${project.name}</a></h3>
            //             <p>${project.year}</p>
            //         `;
            //         container.appendChild(projectElement);
            //     });
            // }

            const container1 = document.getElementById("projects");
            if (container1) {
                var i=0;
                projects.forEach(project => {
                    
                    const projectElement = document.createElement("li");
                    const span = i%3==0 ? "span12" : "span6";
                    projectElement.classList.add("item-project");
                    projectElement.classList.add(span);
                    
                    const cover_photo = project.cover_photo || "assets/img/home1.jpg";

                    //TODO: sistema dimensione immagini
                    projectElement.innerHTML = `
                        <a href="project.html?pj=${project.id}" class="project-link"> <div class="project-image" style="background-image: url('${cover_photo}')"> <h2 class="project-title"> ${project.name} </h2> </div> <div class="project-summary"> <p>${project.summary}</p> </div> </a>
                    `;
                    // <p>${project.year}</p>
                    container1.appendChild(projectElement);


                    i++;
                })
            }




            const urlParams = new URLSearchParams(window.location.search);
            const projectId = urlParams.get("pj");
        
            if (projectId) {
                const project = projects.find(p => p.id == projectId);
                if (project) {
                    document.getElementById("project-title").textContent = project.name;
                    document.getElementById("project-year").textContent = `Year: ${project.year}` || "";
                    document.getElementById("project-topic").textContent = `Topic: ${project.topic}` || "";
                    document.getElementById("project-tools").textContent = `Tools & Libraries: ${project.tools}` || "";
                    document.getElementById("project-summary").textContent = project.summary || "No summary available.";
                    document.getElementById("project-description").textContent = project.description || "No description available.";
                } else {
                    document.getElementById("project-content").innerHTML = "<p>Project not found.</p>";
                }
            }
        })
        .catch(error => console.error("Error loading projects:", error));
});