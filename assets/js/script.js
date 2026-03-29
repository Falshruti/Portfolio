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


// ================= SKILLS =================

async function getSkills() {
    try {
        const res = await fetch("https://falshruti.github.io/Portfolio/skills.json");
        if (!res.ok) throw new Error("Skills JSON not found");
        return await res.json();
    } catch (err) {
        console.error("Skills load error:", err);
        return [];
    }
}

function showSkills(skills) {
    const container = document.querySelector("#skillsContainer");
    if (!container) return;

    if (!skills.length) {
        container.innerHTML = "<p style='color:white'>No skills found</p>";
        return;
    }

    container.innerHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" onerror="this.style.opacity='0'" />
                <span>${skill.name}</span>
            </div>
        </div>`
    ).join("");
}


// ================= PROJECTS =================

async function getProjects() {
    try {
        const response = await fetch("https://falshruti.github.io/Portfolio/projects.json");
        if (!response.ok) {
            throw new Error("JSON not found");
        }
        return await response.json();
    } catch (error) {
        console.error("Error loading projects:", error);
        return [];
    }
}

// Render Projects — same card design as project-script.js, first 6 only
function showProjects(projects) {
    const container = document.querySelector(".work .box-container");
    if (!container) return;

    if (!projects || projects.length === 0) {
        container.innerHTML = "<p style='color:white'>No projects found</p>";
        return;
    }

    // only first 6 on homepage
    const first6 = projects.slice(0, 6);

    let html = "";
    first6.forEach(project => {
        let techHTML = "";
        if (project.tech && project.tech.length) {
            techHTML = project.tech.map(t => `<span class="tag">${t}</span>`).join("");
        }
        html += `
        <div class="grid-item ${project.category || ''}">
            <div class="project-card">
                <div class="card-header">
                    <h3>${project.name}</h3>
                    <span class="status active"></span>
                </div>
                <p class="description">${project.desc}</p>
                <div class="tech-stack">
                    ${techHTML}
                </div>
                ${project.links?.view && project.links.view !== "#" ? `
                    <a href="${project.links.view}" target="_blank" class="btn">
                        View →
                    </a>` : ""}
            </div>
        </div>`;
    });

    container.innerHTML = html;
}


// ================= INIT =================

document.addEventListener("DOMContentLoaded", () => {
    getSkills().then(showSkills);
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
srtop.reveal('.skills .container .bar', { interval: 100 });
srtop.reveal('.work .project-card', { interval: 200 });


// ================= HEADER SCROLL =================

$(window).scroll(function () {
    var sticky = $('.header'),
        scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('headerfixed');
    else sticky.removeClass('headerfixed');
});
