var default_image_path = "assets/img/home4.jpg"

document.addEventListener("DOMContentLoaded", function () {
    fetch("projects.json")
        .then(response => response.json())
        .then(projects => {
            //index.html
            const container = document.getElementById("projects");

            //project.html
            const urlParams = new URLSearchParams(window.location.search);
            const projectId = urlParams.get("pj");

            if (container) { 
                //index.html
                var i=0;
                let publicPjs = projects.filter(project => project.public);
                // Sorting the visualization of the projects in the homepage
                // publicPjs.sort(inverted_by('id'));
                
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
                            let span = i%3 == 0 ? "span12" : "span6";
                            if ((i==(publicPjs.length-1)) && (publicPjs.length%3 == 2)) {
                                span = "span12";
                            }
                            projectElement.classList.add("item-project", span);
                            const cover_photo = project.cover_photo || "assets/img/home1.jpg";
                            
                            // custom badges https://medium.com/@samunyi90/how-to-make-custom-language-badges-for-your-profile-using-shields-io-ec69ea95dfc0
                            // let badgeHTML = project.tools.map(tool => {
                            //     let skill = skillsMap[tool];
                            //     if (skill) {
                            //         return `
                            //             <img src="https://img.shields.io/badge/-${skill.urlName}-${skill.color}?logo=${skill.logo}&logoColor=${skill.logoColor}&logoWidth=30" 
                            //                 alt="${tool}" style="max-height: 20px; width: auto;">
                            //         `;
                            //     }
                            // });
                            let badgeHTML = getBadges(skillsMap, project);

                            projectElement.innerHTML = `
                                <a href="project.html?pj=${project.id}" class="project-link"> 
                                    <div class="project-image" style="background-image: url('${cover_photo}')"> 
                                        <h2 class="project-title"> ${project.name} </h2> 
                                    </div> 
                                    <div class="project-summary"> 
                                        <p>${project.summary}</p> 
                                        ${badgeHTML.length>0 ?'<div class="badges" align="start" dir="auto" style="height: 20px">'
                                            +badgeHTML.join(' ')+
                                        '</div>' : ""}
                                    </div> 
                                </a>
                            `;
                            container.appendChild(projectElement);
                        })
                })
            } else if (projectId) {
                //project.html            
                if (projectId) {
                    const project = projects.find(p => p.id == projectId);
                    if (project) {
                        document.getElementById("project-title").textContent = project.name;

                        let skillsMap = {};
                        fetch("skills.json")
                            .then(response => response.json())
                            .then(skills => {
                                // let skillsMap = {};
                                skills.forEach(skill => {
                                    skillsMap[skill.name] = skill;
                                })
                                let badgeHTML = getBadges(skillsMap, project);
                                let codeLink = `<a href="`+project.code+`" target="_blank" class="footer-link">
                                                    <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="" style="width: 20px; height: 20px; border-radius: 5px; margin-bottom: 2px;">
                                                    GitHub Repo
                                                </a>`;

                                let infoHTML = `<div class="project-year"> ${project.year>0 ? "<b>Year</b>: "+project.year : ""}</div>
                                        <div class="project-topic"> ${project.topic.length>0 ? "<b>Topic</b>:<br> "+project.topic.join("<br>") : ""}</div>
                                        <div class="project-tools"> ${badgeHTML.length>0 ? "<b>Tools & Libraries</b>:<br> "+badgeHTML.join("<br>") : ""}</div>
                                        <div class="project-tools"> ${project.code.length>0 ? "<b>Code</b>:<br>"+codeLink : ""}</div>`;


                                // document.getElementById("project-year").textContent = `Year: ${project.year}` || "";
                                // document.getElementById("project-topic").textContent = `Topic: ${project.topic}` || "";
                                // document.getElementById("project-tools").textContent = `Tools & Libraries: ${project.tools}` || "";
                                document.getElementById("project-info").innerHTML = infoHTML;

                                document.getElementById("project-summary").textContent = project.summary || "No summary available.";//"";
                                document.getElementById("project-description").innerHTML = project.description || "";//"No description available.";
                                const project_photo = project.cover_photo || "assets/img/home1.jpg";
                                document.getElementById("project-photo").src = project_photo;
                        })
                    } else {
                        document.getElementById("project-content").innerHTML = "<p>Project not found.</p>";
                    }
                }
            } else {
                return;
            }   
        })
        .catch(error => console.error("Error loading projects:", error));

    function getBadges(skillsMap, project) {
        // custom badges https://medium.com/@samunyi90/how-to-make-custom-language-badges-for-your-profile-using-shields-io-ec69ea95dfc0
        let badgeHTML = project.tools.map(tool => {
            let skill = skillsMap[tool];
            if (skill) {
                return `
                    <img src="https://img.shields.io/badge/-${skill.urlName}-${skill.color}?logo=${skill.logo}&logoColor=${skill.logoColor}&logoWidth=30" 
                        alt="${tool}" style="max-height: 20px; width: auto;">
                `;
            } else {
                return tool;
            }
        });
        return badgeHTML;
    }
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