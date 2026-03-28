// ================= PROJECTS =================

// Fetch Projects
async function getProjects() {
    try {
        const response = await fetch("./projects.json");

        if (!response.ok) {
            throw new Error("JSON not found");
        }

        return await response.json();
    } catch (error) {
        console.error("Error loading projects:", error);
        return [];
    }
}


// Render Projects (TEXT CARD UI ONLY)
function showProjects(projects) {
    const container = document.querySelector(".work .box-container");

    // If container not found (safety for other pages)
    if (!container) return;

    if (!projects || projects.length === 0) {
        container.innerHTML = "<p style='color:white'>No projects found</p>";
        return;
    }

    let html = "";

    projects.forEach(project => {

        html += `
        <div class="grid-item ${project.category || ''}">
            <div class="project-card">

                <div class="card-header">
                    <h3>${project.name}</h3>
                    <span class="status active"></span>
                </div>

                <p class="description">${project.desc}</p>

                <div class="tech-stack">
                    ${(project.category || '').split(',').map(tag => 
                        `<span class="tag">${tag}</span>`
                    ).join('')}
                </div>

                <div class="btns">
                    ${project.links?.view && project.links.view !== "#" ? `
                        <a href="${project.links.view}" target="_blank" class="btn">
                            View →
                        </a>` : ""}
                </div>

            </div>
        </div>`;
    });

    container.innerHTML = html;

    // ================= ISOTOPE =================
    if (typeof $ !== "undefined" && $('.box-container').length) {
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
}


// INIT (RUN ONLY AFTER PAGE LOAD)
document.addEventListener("DOMContentLoaded", () => {
    getProjects().then(showProjects);
});
