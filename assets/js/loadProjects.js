var default_image_path = "assets/img/home4.jpg"

document.addEventListener("DOMContentLoaded", function () {
    fetch("projects.json")
        .then(response => response.json())
        .then(projects => {
            const container1 = document.getElementById("projects");
            if (!container1) return; 

            var i=0;
            let publicPjs = projects.filter(project => project.public);
            publicPjs.sort(inverted_by('id'));
            
            // Log
            console.log(projects);
            console.log(publicPjs);

            fetch("skills.json")
                .then(response => response.json())
                .then(skills => {
                    let skillsMap = {};
                    skills.forEach(skill => {
                        skillsMap[skill.name] = skill;
                    })

                    publicPjs.forEach((project, i) => {
                        const projectElement = document.createElement("li");
                        const span = i % 3 == 0 ? "span12" : "span6";
                        projectElement.classList.add("item-project", span);
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
                                    <div class="badges" align="start" dir="auto" style="height: 20px">
                                        ${badgeHTML.join('')}
                                    </div>
                                </div> 
                            </a>
                        `;
                        container1.appendChild(projectElement);
                    })
            })
        

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

// Generic Comparator for Sorting JSON https://stackoverflow.com/questions/69734479/sort-json-string-by-attribute-in-javascript
function inverted_by(property) {
    return function(a, b) {
        aProp = typeof(a[property])==="string" ? a[property].toLowerCase() : a[property];
        bProp = typeof(b[property])==="string" ? b[property].toLowerCase() : b[property];

        if (aProp < bProp) return 1;
        else if (aProp > bProp) return -1;
        else return 0;
    }
}