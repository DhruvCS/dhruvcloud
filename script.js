const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.hidden = isOpen;
});

// Close mobile menu when clicking a link
mobileMenu?.addEventListener("click", (e) => {
  if (e.target?.tagName === "A") {
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  }
});

// Skills tags (edit these)
const skills = [
  "CAD (NX/SolidWorks/Creo)",
  "FEA (ANSYS/Abaqus)",
  "Composites (Prepreg, tooling)",
  "Python",
  "MATLAB",
  "GD&T (ASME Y14.5)",
  "Test & Validation",
  "DFMEA / PFMEA",
  "Thermal analysis",
  "Git"
];

const skillsTags = document.getElementById("skillsTags");
skills.forEach(s => {
  const span = document.createElement("span");
  span.className = "tag";
  span.textContent = s;
  skillsTags.appendChild(span);
});

// Projects (edit these to match your PDF list)
const projects = [
  {
    title: "Longhorn Racing — Composites System",
    tag: "structures",
    badge: "Structures",
    description: "Design → analysis → manufacturing → iteration of carbon fiber components and tooling.",
    stack: ["Composites", "FEA", "Manufacturing"],
    links: [{ label: "Details", href: "#lhr" }]
  },
  {
    title: "RC Plane — CFD + Carbon Fiber",
    tag: "composites",
    badge: "Aero/CFD",
    description: "CFD workflow + composite design plan for an RC platform; iteration based on performance targets.",
    stack: ["CFD", "Composites"],
    links: []
  },
  {
    title: "Steering Wheel → Emulated Controller",
    tag: "embedded",
    badge: "Embedded",
    description: "USB input from custom wheel mapped into an emulated game controller workflow.",
    stack: ["Arduino", "Firmware", "Software"],
    links: []
  },
  {
    title: "nRF52840 BLE Project",
    tag: "embedded",
    badge: "Wireless",
    description: "BLE-centric embedded experimentation: firmware structure, device comms, test harnessing.",
    stack: ["nRF52", "BLE", "C/C++"],
    links: []
  },
  {
    title: "Statics Virtual Lab Web App",
    tag: "software",
    badge: "Software",
    description: "Interactive statics tools: beam loads, reactions, internal shear/moment visualization.",
    stack: ["Web", "Math", "Visualization"],
    links: []
  }
];

const projectGrid = document.getElementById("projectGrid");

function renderProjects(filter) {
  projectGrid.innerHTML = "";
  const list = filter === "all" ? projects : projects.filter(p => p.tag === filter);

  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "card project";

    const top = document.createElement("div");
    top.className = "projectTop";

    const h3 = document.createElement("h3");
    h3.textContent = p.title;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = p.badge;

    top.appendChild(h3);
    top.appendChild(badge);

    const desc = document.createElement("p");
    desc.textContent = p.description;

    const meta = document.createElement("p");
    meta.className = "muted";
    meta.textContent = p.stack.join(" • ");

    const links = document.createElement("div");
    links.className = "projectLinks";
    (p.links || []).forEach(l => {
      const a = document.createElement("a");
      a.className = "link";
      a.href = l.href;
      a.textContent = l.label + " →";
      links.appendChild(a);
    });

    card.appendChild(top);
    card.appendChild(desc);
    card.appendChild(meta);
    if (links.childNodes.length) card.appendChild(links);

    projectGrid.appendChild(card);
  });
}

// Filters
const chips = document.querySelectorAll(".chip");
chips.forEach(c => {
  c.addEventListener("click", () => {
    chips.forEach(x => x.classList.remove("active"));
    c.classList.add("active");
    renderProjects(c.dataset.filter);
  });
});

renderProjects("all");

// Contact form (mailto draft)
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const msg = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Portfolio Inquiry — ${name || "Hello"}`);
  const body = encodeURIComponent(
    `Hi Dhruv,\n\n${msg}\n\nBest,\n${name || ""}`.trim()
  );

  // Replace YOUR_EMAIL in index.html too
  window.location.href = `mailto:YOUR_EMAIL?subject=${subject}&body=${body}`;
});
