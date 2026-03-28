$(document).ready(function () {

    // MENU TOGGLE
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // SCROLL
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top')?.classList.add('active');
        } else {
            document.querySelector('#scroll-top')?.classList.remove('active');
        }

        // SCROLL SPY
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // SMOOTH SCROLL
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500);
    });

});


// ================= TYPED JS =================
new Typed(".typing-text", {
    strings: [
        "web development",
        "full stack development",
        "frontend development",
        "backend development",
        "web designing"
    ],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});


// ================= FETCH DATA =================

async function getProjects() {
    try {
        const res = await fetch("./assets/data/projects.json"); // ✅ correct path

        if (!res.ok) throw new Error("JSON not found");

        return await res.json();
    } catch (err) {
        console.error("Project load error:", err);
        return [];
    }
}


// ================= SHOW PROJECTS (NEW CARD UI) =================

function showProjects(projects) {
    const container = document.querySelector(".work .box-container");

    if (!container) return;

    if (!projects.length) {
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

                ${project.links?.view && project.links.view !== "#" ? `
                    <a href="${project.links.view}" target="_blank" class="btn">
                        View →
                    </a>` : ""}

            </div>
        </div>`;
    });

    container.innerHTML = html;

    // ISOTOPE
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


// ================= INIT =================

document.addEventListener("DOMContentLoaded", () => {
    getProjects().then(showProjects);
});


// ================= SCROLL REVEAL =================

const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.work .project-card', { interval: 200 });


// ================= HEADER SCROLL =================

$(window).scroll(function () {
    var sticky = $('.header'),
        scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('headerfixed');
    else sticky.removeClass('headerfixed');
});
