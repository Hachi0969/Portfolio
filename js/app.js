const data = window.PORTFOLIO_DATA;
let activeFilter = "All";

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];

function createElement(tag, className, textContent) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

function renderProfile() {
  qs("#profile-location").textContent = data.profile.location;
  qs("#profile-name").textContent = data.profile.name;
  qs("#profile-headline").textContent = data.profile.headline;
  qs("#profile-summary").textContent = data.profile.summary;
  qs("#profile-photo").innerHTML = `
    <img class="profile-image" src="${data.profile.photo}" alt="Portrait of ${data.profile.name}" onerror="this.remove()">
    <div class="profile-fallback">
      <span>${data.profile.photoInitials}</span>
    </div>
  `;

  const actions = [
    { label: "View Projects", href: "#projects", style: "btn btn-primary" },
    { label: "GitHub", href: data.profile.github, style: "btn btn-secondary" },
    { label: "LinkedIn", href: data.profile.linkedin, style: "btn btn-secondary" }
  ];

  qs("#hero-actions").replaceChildren(
    ...actions.map((action) => {
      const link = createElement("a", action.style, action.label);
      link.href = action.href;
      if (action.href.startsWith("http")) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
      return link;
    })
  );

  qs("#hero-stats").replaceChildren(
    ...data.heroStats.map((stat) => {
      const tile = createElement("div", "info-tile");
      tile.innerHTML = `
        <div class="text-lg font-extrabold text-ink">${stat.value}</div>
        <div class="mt-1 text-sm leading-5 text-muted">${stat.label}</div>
      `;
      return tile;
    })
  );
}

function renderFilters() {
  qs("#project-filters").replaceChildren(
    ...data.filters.map((filter) => {
      const button = createElement("button", `filter-btn ${filter === activeFilter ? "active" : ""}`, filter);
      button.type = "button";
      button.addEventListener("click", () => {
        activeFilter = filter;
        renderFilters();
        renderProjects();
      });
      return button;
    })
  );
}

function renderProjects() {
  const projects = activeFilter === "All"
    ? data.projects
    : data.projects.filter((project) => project.tag === activeFilter);

  qs("#projects-grid").replaceChildren(
    ...projects.map((project) => {
      const card = createElement("article", "project-card");
      card.innerHTML = `
        <div class="placeholder-image">
          <div class="rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-extrabold text-accentDark">${project.tag}</div>
        </div>
        <div class="p-5">
          <div class="flex items-start justify-between gap-4">
            <h3 class="text-xl font-extrabold leading-7 text-ink">${project.title}</h3>
          </div>
          <p class="mt-3 min-h-24 text-sm leading-7 text-muted">${project.description}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            ${project.tech.map((item) => `<span class="badge">${item}</span>`).join("")}
          </div>
          <div class="mt-5 flex flex-wrap gap-2">
            <a class="btn btn-primary flex-1" href="${project.liveDemo}">Live Demo</a>
            <a class="btn btn-secondary flex-1" href="${project.sourceCode}">Source Code</a>
          </div>
        </div>
      `;
      return card;
    })
  );
}

function renderAbout() {
  qs("#about-copy").replaceChildren(
    createElement("p", "", data.profile.education),
    createElement("p", "", data.profile.careerPath)
  );

  qs("#icebreakers").replaceChildren(
    ...data.icebreakers.map((item) => {
      const tile = createElement("div", "info-tile text-sm leading-7 text-muted", item);
      return tile;
    })
  );

  qs("#tech-stack").replaceChildren(
    ...data.techStack.map((tech) => createElement("div", "info-tile text-sm font-bold text-ink", tech))
  );

  qs("#certifications").replaceChildren(
    ...data.certifications.map((cert) => {
      const card = createElement("article", "info-tile");
      card.innerHTML = `
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 class="font-extrabold text-ink">${cert.title}</h4>
            <p class="mt-1 text-sm text-muted">${cert.issuer}</p>
          </div>
          <span class="badge bg-sky-50 text-accentDark">${cert.status}</span>
        </div>
      `;
      return card;
    })
  );
}

function renderBlog() {
  qs("#blog-list").replaceChildren(
    ...data.blogPosts.map((post) => {
      const item = createElement("article", "p-5 transition hover:bg-sky-50/50");
      item.innerHTML = `
        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 class="font-extrabold text-ink">${post.title}</h3>
            <p class="mt-2 text-sm leading-7 text-muted">${post.description}</p>
          </div>
          <span class="badge shrink-0 bg-white text-accentDark">${post.status}</span>
        </div>
      `;
      return item;
    })
  );
}

function renderContact() {
  const actions = [
    { label: "Email Me", href: `mailto:${data.profile.email}`, style: "btn btn-primary" },
    { label: "GitHub", href: data.profile.github, style: "btn btn-secondary" },
    { label: "LinkedIn", href: data.profile.linkedin, style: "btn btn-secondary" },
    { label: "Facebook", href: data.profile.facebook, style: "btn btn-secondary" },
    { label: "Instagram", href: data.profile.instagram, style: "btn btn-secondary" },
    { label: "LINE", href: data.profile.line, style: "btn btn-secondary" }
  ];

  qs("#contact-actions").replaceChildren(
    ...actions.map((action) => {
      const link = createElement("a", action.style, action.label);
      link.href = action.href;
      if (action.href.startsWith("http")) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
      return link;
    })
  );

  qs("#footer-copy").textContent = `© ${new Date().getFullYear()} ${data.profile.name}. Built with HTML, Tailwind CSS, and vanilla JavaScript.`;
}

function setupNavigation() {
  const menuToggle = qs("#menu-toggle");
  const mobileMenu = qs("#mobile-menu");

  menuToggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden", isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  qsa(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  const sections = qsa("main section[id]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      qsa(".nav-link").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach((section) => observer.observe(section));
}

function init() {
  renderProfile();
  renderFilters();
  renderProjects();
  renderAbout();
  renderBlog();
  renderContact();
  setupNavigation();
}

document.addEventListener("DOMContentLoaded", init);
