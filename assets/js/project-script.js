// ================= PROJECTS PAGE SCRIPT =================

// Get projects: use pre-loaded global first (works on file://),
// then try local fetch, then fall back to GitHub Pages remote.
async function getProjects() {
  // ✅ Best path — data already loaded via projects-data.js <script> tag
  if (window.projectsData && window.projectsData.length) {
    return window.projectsData;
  }

  // Try local JSON (works on a local server / VS Code Live Server)
  try {
    const res = await fetch('./projects.json');
    if (res.ok) return await res.json();
  } catch (e) { /* blocked on file:// — expected */ }

  // Final fallback — GitHub Pages hosted copy
  try {
    const res = await fetch('https://falshruti.github.io/Portfolio/projects.json');
    if (res.ok) return await res.json();
  } catch (e) {
    console.error('Could not load projects:', e);
  }

  return [];
}


// ── Render project cards ──────────────────────────────────────────────────────
function showProjects(projects) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  if (!projects || projects.length === 0) {
    container.innerHTML = `<p class="no-projects">No projects found.</p>`;
    return;
  }

  let html = '';

  projects.forEach(project => {

    // Tech stack tags
    const techHTML = (project.tech && project.tech.length)
      ? project.tech.map(t => `<span class="tag">${t}</span>`).join('')
      : '';

    // Status dot colour
    const statusClass = project.status === 'active' ? 'active' : 'live';
    const statusTitle = project.status === 'active' ? 'Active / In Progress' : 'Live';

    // View button — only when a real URL is provided
    const viewBtn = (project.links && project.links.view && project.links.view !== '#')
      ? `<a href="${project.links.view}" target="_blank" rel="noopener" class="card-view-btn">
           View Project <i class="fas fa-external-link-alt"></i>
         </a>`
      : '';

    // Code / GitHub button — only when links.code is present
    const codeBtn = (project.links && project.links.code)
      ? `<a href="${project.links.code}" target="_blank" rel="noopener" class="card-code-btn">
           <i class="fab fa-github"></i> Code
         </a>`
      : '';

    html += `
    <div class="grid-item ${project.category || ''}">
      <div class="project-card">

        <div class="card-header">
          <h3 class="project-title">${project.name}</h3>
          <span class="status ${statusClass}" title="${statusTitle}"></span>
        </div>

        <p class="description">${project.desc}</p>

        <div class="tech-stack">
          ${techHTML}
        </div>

        <div class="card-actions">
          ${viewBtn}
          ${codeBtn}
        </div>

      </div>
    </div>`;
  });

  container.innerHTML = html;

  // ── Filter buttons ────────────────────────────────────────────────────────
  const filterGroup = document.getElementById('filter-group');
  if (filterGroup) {
    filterGroup.addEventListener('click', function (e) {
      const btn = e.target.closest('button');
      if (!btn) return;

      filterGroup.querySelectorAll('.btn').forEach(b => b.classList.remove('is-checked'));
      btn.classList.add('is-checked');

      const filter = btn.getAttribute('data-filter');
      container.querySelectorAll('.grid-item').forEach(item => {
        if (filter === '*' || item.classList.contains(filter.replace('.', ''))) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // ── Scroll reveal ─────────────────────────────────────────────────────────
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.project-card', {
      origin: 'bottom',
      distance: '30px',
      duration: 500,
      delay: 100,
      interval: 80,
      reset: false
    });
  }
}


// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  getProjects().then(showProjects);
});
