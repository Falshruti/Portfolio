$(document).ready(function () {

    // MENU TOGGLE
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // SCROLL BEHAVIOR
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }
    });

});


// ================= PROJECTS =================

// Fetch Projects
async function getProjects() {
    try {
        const response = await fetch("./assets/data/projects.json"); // update path if needed
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading projects:", error);
        return [];
    }
}


// Render Projects (NEW DESIGN 🔥)
function showProjects(projects) {
    const container = document.querySelector(".work .box-container");

    if (!projects.length) {
        container.innerHTML = "<p>No projects found</p>";
        return;
    }

    let html = "";

    projects.forEach(project => {

        // Tech tags (if available)
        let techHTML = "";
        if (project.tech) {
            techHTML = project.tech.map(t => `<span class="tag">${t}</span>`).join("");
        }

        html += `
        <div class="grid-item ${project.category || ''}">
            <div class="project-card tilt">

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
                            <i class="fas fa-eye"></i> View
                        </a>` : ""}
                        
                    ${project.links?.code ? `
                        <a href="${project.links.code}" target="_blank" class="btn">
                            <i class="fab fa-github"></i> Code
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


// ================= STICKY HEADER =================
$(window).scroll(function () {
    let sticky = $('.header'),
        scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('headerfixed');
    else sticky.removeClass('headerfixed');
});
