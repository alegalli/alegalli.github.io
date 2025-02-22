document.addEventListener("DOMContentLoaded", function () {
    fetch("projects.json")
        .then(response => response.json())
        .then(projects => {
            const urlParams = new URLSearchParams(window.location.search);
            const projectId = urlParams.get("pj");
            if (projectId) {
                if (projects.length > 3) {
                    projects = projects.filter(pj => pj.id != projectId);
                    const shuffled = [...projects].sort(() => 0.5 - Math.random()); // Shuffle copy of projects
                    const selectedProjects = shuffled.slice(0, 3);
                    const container = document.getElementById("suggested-container");
                    if (container) {
                        container.innerHTML = ""; // Clear existing content
                        fetch("skills.json")
                            .then(response => response.json())
                            .then(skills => {
                                let skillsMap = {};
                                skills.forEach(skill => {
                                    skillsMap[skill.name] = skill;
                                })
                                selectedProjects.forEach(project => {
                                    const projectElement = document.createElement("div");
                                    projectElement.classList.add("item-project", "span4");
                                    const cover_photo = project.cover_photo || "assets/img/home1.jpg";
                                    
                                    // custom badges https://medium.com/@samunyi90/how-to-make-custom-language-badges-for-your-profile-using-shields-io-ec69ea95dfc0
                                    let badgeHTML = project.tools.map(tool => {
                                        let skill = skillsMap[tool];
                                        if (skill) {
                                            return `
                                                <img src="https://img.shields.io/badge/-${skill.urlName}-${skill.color}?logo=${skill.logo}&logoColor=${skill.logoColor}&logoWidth=30" 
                                                    alt="${tool}" style="max-height: 20px; width: auto;">
                                            `;
                                        }
                                    });

                                    projectElement.innerHTML = `
                                        <a href="project.html?pj=${project.id}" class="project-link"> 
                                            <div class="project-image" style="background-image: url('${cover_photo}')"> 
                                                <h2 class="project-title"> ${project.name} </h2> 
                                            </div> 
                                            <div class="project-summary"> 
                                                <p>${project.summary}</p> 
                                                ${badgeHTML.length>0 ? '<div class="badges" align="start" dir="auto">'
                                                    + badgeHTML.join('') +
                                                '</div>' : ""}
                                            </div> 
                                        </a>
                                    `;
                                    container.appendChild(projectElement);
                                    // projectElement.innerHTML = `
                                    //     <div class="sugg-img">
                                    //         <img src="${project.cover_photo || 'assets/img/placeholder.jpg'}" alt="${project.name}">
                                    //     </div>
                                    // `;
                                    // container.appendChild(projectElement);
                                });
                        })
                    }
                }
            }
        })
        .catch(error => console.error("Error loading suggested projects:", error));
});
