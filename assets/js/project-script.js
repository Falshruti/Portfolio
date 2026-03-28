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


// Render Projects (TEXT CARD UI)
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
        if (project.tech && project.tech.length) {
            techHTML = project.tech
                .map(t => `<span class="tag">${t}</span>`)
                .join("");
        }

        html += `
        <div class="grid-item ${project.category || ''}">
            <div class="project-card">

                <div class="card-header">
                    <h3>${project.name}</h3>
                    <span class="status-dot ${project.status || 'active'}"></span>
                </div>

                <p class="desc">${project.desc}</p>

                <div class="tech-stack">
                    ${techHTML}
                </div>

                ${project.links && project.links.view ? `
                <a href="${project.links.view}" target="_blank" class="project-link">
                    View project →
                </a>` : ""}

            </div>
        </div>`;
    });

    container.innerHTML = html;


    // ================= ISOTOPE FILTER =================
    // destroy previous instance (important if reloaded)
    if ($('.box-container').data('isotope')) {
        $('.box-container').isotope('destroy');
    }

    let $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    // Filter buttons
    $('.button-group').off('click').on('click', 'button', function () {

        $('.button-group .is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');

        let filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}


// INIT
document.addEventListener("DOMContentLoaded", () => {
    getProjects().then(showProjects);
});
