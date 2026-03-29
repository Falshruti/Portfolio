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


// ================= FETCH SKILLS =================

async function getSkills() {
    try {
        const res = await fetch("./assets/data/skills.json");
        if (!res.ok) throw new Error("Skills JSON not found");
        return await res.json();
    } catch (err) {
        console.error("Skills load error:", err);
        return [];
    }
}


// ================= SHOW SKILLS =================

function showSkills(skills) {
    const container = document.querySelector("#skillsContainer");
    if (!container) return;

    if (!skills.length) {
        container.innerHTML = "<p style='color:white'>No skills found</p>";
        return;
    }

    let html = "";
    skills.forEach(skill => {
        html += `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" onerror="this.style.opacity='0'" />
                <span>${skill.name}</span>
            </div>
        </div>`;
    });

    container.innerHTML = html;
}


// ================= FETCH PROJECTS =================

async function getProjects() {
    try {
        const res = await fetch("./assets/data/projects.json");
        if (!res.ok) throw new Error("Projects JSON not found");
        return await res.json();
    } catch (err) {
        console.error("Project load error:", err);
        return [];
    }
}


// ================= SHOW PROJECTS =================

function showProjects(projects) {
    const container = document.querySelector(".work .box-container");
    if (!container) return;

    if (!projects.length) {
        container.innerHTML = "<p style='color:white'>No projects found</p>";
        return;
    }

    // maps category string → tag CSS class
    const tagClassMap = {
        "reactjs":      "react",
        "react":        "react",
        "typescript":   "ts",
        "nodejs":       "node",
        "node":         "node",
        "php":          "php",
        "laravel":      "laravel",
        "mysql":        "mysql",
        "aws":          "aws",
        "codeigniter":  "ci",
        "codeigniator": "ci",
        "wordpress":    "wp",
        "shopify":      "shopify"
    };

    let html = "";
    projects.forEach(project => {
        // build tech tag pills from category field (supports comma-separated values)
        const categories = (project.category || "").split(",").map(c => c.trim()).filter(Boolean);
        const tagsHTML = categories.map(tag => {
            const cls = tagClassMap[tag.toLowerCase()] || "default";
            return `<span class="proj-tag ${cls}">${tag}</span>`;
        }).join("");

        // view button or private label
        const btnHTML = (project.links && project.links.view && project.links.view !== "#")
            ? `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>`
            : `<span style="font-size:11px;color:rgba(255,255,255,0.3);padding:6px 10px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;">Private</span>`;

        html += `
        <div class="box">
            <img src="${project.image}" alt="${project.name}" onerror="this.style.display='none'" />
            <div class="content">
                <div class="tag"><h3>${project.name}</h3></div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="proj-tags">${tagsHTML}</div>
                    <div class="btns">${btnHTML}</div>
                </div>
            </div>
        </div>`;
    });

    container.innerHTML = html;
}


// ================= INIT — load both on DOM ready =================

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
srtop.reveal('.work .box', { interval: 200 });


// ================= HEADER SCROLL =================

$(window).scroll(function () {
    var sticky = $('.header'),
        scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('headerfixed');
    else sticky.removeClass('headerfixed');
});
