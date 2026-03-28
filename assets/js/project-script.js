// ================= PROJECTS =================

// Fetch Projects
async function getProjects() {
    try {
        const response = await fetch("./assets/data/projects.json"); // update path if needed
        return await response.json();
    } catch (error) {
        console.error("Error loading projects:", error);
        return [];
    }
}


// Render Projects (TEXT CARD UI 🚀)
function showProjects(projects) {
    const container = document.querySelector(".work .box-container");

    if (!projects.length) {
        container.innerHTML = "<p>No projects found</p>";
        return;
    }

    let html = "";

    projects.forEach(project => {

        // Tech tags
        let techHTML = "";
        if (project.tech) {
            techHTML = project.tech.map(t => `<span class="tag">${t}</span>`).join("");
        }

        html += `
        <div class="grid-item ${project.category || ''}">
            <div class="project-card">

                <div class="card-header">
                    <h3>${project.name}</h3>
                    <span class="status ${project.status || 'active'}"></span>
                </div>

                <p class="description">${project.desc}</p>

                <div class="tech-stack">
                    ${techHTML}
                </div>

                <div class="btns">
                    ${project.links?.view ? `
                        <a href="${project.links.view}" target="_blank" class="btn">
                            View →
                        </a>` : ""}
                </div>

            </div>
        </div>`;
    });

    container.innerHTML = html;


    // ================= ISOTOPE =================
    let $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    $('.button-group').on('click', 'button', function () {
        $('.button-group .is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');

        let filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}


// INIT
getProjects().then(showProjects);
