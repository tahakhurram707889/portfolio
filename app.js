/**
 * Portfolio Application Logic - Taha Khurram
 * Dynamic Content Fetching, UI Rendering & Micro-Interactions
 */

// Fallback data mirroring resume.json (ensures zero broken states if accessed via file:// without local server)
const FALLBACK_RESUME_DATA = {
  basics: {
    name: "Taha Khurram",
    shortName: "TK",
    label: "Software Engineering Student",
    headline: "Building practical web, application, and database solutions with a growing software engineering mindset.",
    summary: "I am a Software Engineering student based in Karachi, Pakistan, currently pursuing my BS in Computer Science at GU Tech while strengthening my skills through practical projects and modern web development training. My foundation includes HTML, CSS, JavaScript, C#, PHP, SQL, and MERN stack technologies. I enjoy turning ideas into responsive applications, learning through real-world problem solving, and building user-focused digital solutions.",
    location: {
      country: "Pakistan",
      countryCode: "PK",
      region: "Karachi"
    },
    email: "taha.1khurram@gmail.com",
    availability: "Open to internships, junior developer roles, and collaborative learning opportunities.",
    leadershipNote: "I am motivated by practical learning, continuous improvement, and building software that solves real problems with clarity and reliability.",
    profiles: [
      {
        network: "LinkedIn",
        username: "Taha Khurram",
        url: "https://www.linkedin.com/in/taha-khurram-developer/",
        icon: "fa-brands fa-linkedin-in"
      },
      {
        network: "GitHub",
        username: "tahakhurram707889",
        url: "https://github.com/tahakhurram707889",
        icon: "fa-brands fa-github"
      }
    ]
  },
  about: {
    intro: [
      "Hi, I am Taha Khurram, a Software Engineering student and aspiring developer from Karachi, Pakistan. I am currently pursuing my BS in Computer Science at GU Tech while building practical experience in web development, application design, and software problem solving.",
      "My learning journey includes HTML, CSS, JavaScript, C#, PHP, SQL, and MERN stack development. I enjoy creating responsive interfaces, working with real data, and transforming concepts into functional software solutions that are easy to use and maintain.",
      "I am continuously improving my technical foundation, design thinking, and debugging abilities through academic work, training, and personal projects that reflect the kind of developer I want to become."
    ],
    strengths: [
      "Responsive front-end development with HTML, CSS, JavaScript, React, and Bootstrap",
      "Database design and back-end logic using SQL, PHP, Laravel, and modern APIs",
      "Project-based problem solving with a focus on debugging, logic, and reliability",
      "Continuous learning in full-stack workflows, UI/UX, and application architecture"
    ]
  },
  experience: [
    {
      position: "Full-Stack Development Trainee",
      company: "Saylani Mass IT Training",
      companyUrl: "https://saylani.org",
      location: "Karachi, Pakistan",
      current: true,
      startDate: "2025-04-08",
      endDate: "present",
      summary: "Intensive MERN Stack development training covering modern web development, advanced JavaScript, React.js, and full-stack project workflows with hands-on application building.",
      highlights: [
        "Developed responsive web applications using React.js and modern JavaScript ES6+ features",
        "Implemented RESTful APIs and database integration with Node.js, Express, and MongoDB",
        "Collaborated on team-based project deliveries using Git and GitHub for version control",
        "Deployed applications with cloud hosting and learned CI/CD pipeline fundamentals"
      ],
      technologies: ["JavaScript", "React", "Node.js", "MongoDB", "Express.js", "Git", "GitHub"]
    },
    {
      position: "Software Engineering Student",
      company: "Aptech Learning Pakistan",
      companyUrl: "https://www.aptech.com.pk",
      location: "Karachi, Pakistan",
      current: false,
      startDate: "2023-08-22",
      endDate: "2026-08-22",
      summary: "Comprehensive software engineering program covering web development, programming fundamentals in C# and PHP, database design with SQL, object-oriented programming, and structured application development.",
      highlights: [
        "Built database-driven applications using SQL and PHP with MVC architecture",
        "Applied object-oriented programming principles in C# to create desktop applications",
        "Designed responsive user interfaces using HTML, CSS, and Bootstrap frameworks",
        "Solved algorithmic problems and strengthened debugging and logic-building skills"
      ],
      technologies: ["C#", "PHP", "SQL", "HTML", "CSS", "JavaScript", "Bootstrap"]
    }
  ],
  skills: [
    {
      category: "Languages & Frameworks",
      items: [
        "JavaScript",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "HTML",
        "CSS",
        "C#",
        "PHP",
        "Laravel",
        "SQL",
        "Bootstrap",
        "Git",
        "GitHub"
      ]
    },
    {
      category: "Development & Design",
      items: [
        "Responsive UI Design",
        "REST APIs",
        "Database Design",
        "Object-Oriented Programming",
        "Debugging",
        "Problem Solving"
      ]
    },
    {
      category: "Tools & Workflow",
      items: [
        "VS Code",
        "GitHub",
        "Postman",
        "Figma",
        "npm",
        "MVC Patterns",
        "CLI Tools"
      ]
    }
  ],
  education: [
    {
      institution: "GU TECH Al Ghazali University",
      area: "Computer Science",
      studyType: "Bachelor in Computer Science (BS)",
      detailsLabel: "Core Courses",
      details: [
        "Object-Oriented Programming",
        "Database Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering"
      ],
      startDate: "2026-present"
    },
    {
      institution: "Aptech Learning Pakistan",
      area: "Computer Science",
      studyType: "DAE (HDSE Higher Diploma in Software Engineering)",
      detailsLabel: "Course Tracks",
      details: [
        "Web Development",
        "Basic C#",
        "Basic PHP",
        "Basic SQL",
        "Basic JavaScript"
      ],
      startDate: "2023-08-22",
      endDate: "2026-08-22"
    },
    {
      institution: "Saylani Mass IT Training",
      area: "Computer Science",
      studyType: "MERN Stack Developer",
      detailsLabel: "Course Tracks",
      details: [
        "Modern Web Development",
        "Advanced JavaScript",
        "React.js"
      ],
      startDate: "2025-01-01",
      endDate: "2025-12-31"
    }
  ],
  languages: [
    {
      language: "English",
      fluency: "Fluent"
    },
    {
      language: "Urdu",
      fluency: "Native"
    }
  ]
};

// Global Store
let resumeState = null;

/**
 * Fetch and Load Resume Data
 */
async function loadResume() {
  try {
    const response = await fetch('./resume.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Successfully fetched resume.json dynamically.');
    updateDataIndicator('resume.json loaded (live)');
    return data;
  } catch (error) {
    console.warn('Fetch failed (likely file:// protocol without local server). Falling back to embedded dataset.', error);
    updateDataIndicator('resume.json loaded (fallback)');
    return FALLBACK_RESUME_DATA;
  }
}

/**
 * Update UI Data Indicator Pill
 */
function updateDataIndicator(text) {
  const footerIndicator = document.getElementById('data-source-text');
  const mobileIndicator = document.getElementById('data-status-badge-mobile');

  if (footerIndicator) footerIndicator.textContent = text;
  if (mobileIndicator) {
    const span = mobileIndicator.querySelector('.status-text');
    if (span) span.textContent = text;
  }
}

/**
 * Sync Section & Navigation Visibility Based on Loaded Resume Data
 */
function syncSectionVisibility(data) {
  const sectionsConfig = [
    { key: 'experience', id: 'experience', nav: 'experience' },
    { key: 'projects', id: 'projects', nav: 'projects' },
    { key: 'certificates', id: 'certifications', nav: 'certifications' },
    { key: 'education', id: 'education', nav: 'education' },
    { key: 'skills', id: 'skills', nav: 'skills' },
    { key: 'about', id: 'about', nav: 'about' }
  ];

  sectionsConfig.forEach((sec) => {
    const hasData = Array.isArray(data[sec.key])
      ? data[sec.key].length > 0
      : Boolean(data[sec.key]);

    const el = document.getElementById(sec.id);
    if (el) {
      el.style.display = hasData ? '' : 'none';
    }

    const navLinks = document.querySelectorAll(`[data-nav="${sec.nav}"]`);
    navLinks.forEach((link) => {
      link.style.display = hasData ? '' : 'none';
    });
  });
}

/**
 * Render All Portfolio Sections
 */
function renderPortfolio(data) {
  resumeState = data;

  syncSectionVisibility(data);
  renderBasics(data.basics, data);
  renderMetrics(data);
  renderAbout(data.about, data.basics);
  renderExperience(data.experience);
  renderSkills(data.skills);
  renderProjects(data.projects);
  renderCertificates(data.certificates);
  renderEducation(data.education);
  renderLanguages(data.languages);
  renderContact(data.basics);

  setupSkillControls();
  setupProjectFilters();
}

/**
 * Render Basics / Hero
 */
function renderBasics(basics, data) {
  if (!basics) return;

  // Header Brand Logo
  const logoShort = document.getElementById('logo-shortname');
  const logoFull = document.getElementById('logo-fullname');
  const footerBadge = document.getElementById('footer-logo-badge');
  const footerFull = document.getElementById('footer-fullname');
  const footerLabel = document.getElementById('footer-label');
  const footerCopy = document.getElementById('footer-copy-name');

  if (logoShort) logoShort.textContent = basics.shortName || 'TK';
  if (logoFull) logoFull.textContent = basics.name;
  if (footerBadge) footerBadge.textContent = basics.shortName || 'TK';
  if (footerFull) footerFull.textContent = basics.name;
  if (footerLabel) footerLabel.textContent = basics.label || 'Software Engineer';
  if (footerCopy) footerCopy.textContent = basics.name;

  // Document Title
  document.title = `${basics.name} | ${basics.label || 'Software Engineer'}`;

  // Hero Container
  const heroContainer = document.getElementById('hero-container');
  if (heroContainer) {
    const profilesHtml = (basics.profiles || [])
      .map(
        (p) =>
          `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="social-btn" title="${p.network}" aria-label="${p.network}">
             <i class="${p.icon}"></i>
           </a>`
      )
      .join('');

    const hasProjects = data && Array.isArray(data.projects) && data.projects.length > 0;
    const ctaPrimary = hasProjects
      ? `<a href="#projects" class="btn btn-primary">
           <span>Explore Projects</span>
           <i class="fa-solid fa-arrow-right"></i>
         </a>`
      : `<a href="#skills" class="btn btn-primary">
           <span>Explore Skills</span>
           <i class="fa-solid fa-arrow-right"></i>
         </a>`;

    heroContainer.innerHTML = `
      <div class="hero-layout">
        <div class="hero-content">
          ${
            basics.availability
              ? `<div class="status-pill">
                   <span class="pulse-dot"></span>
                   <span>${basics.availability}</span>
                 </div>`
              : ''
          }
          <div class="hero-role-badge">
            <i class="fa-solid fa-layer-group"></i> ${basics.label || 'Software Engineer'}
          </div>
          <h1 class="hero-name">Hi, I'm <span class="gradient-text">${basics.name}</span></h1>
          <p class="hero-headline">${basics.headline || ''}</p>
          <p class="hero-summary">${basics.summary || ''}</p>

          <div class="hero-ctas">
            ${ctaPrimary}
            <a href="#contact" class="btn btn-secondary">
              <i class="fa-regular fa-envelope"></i>
              <span>Get in Touch</span>
            </a>
          </div>

          <div class="hero-socials">
            ${profilesHtml}
          </div>
        </div>

        <div class="hero-visual">
          <div class="avatar-wrapper">
            <div class="avatar-inner">
              <div class="avatar-initials-circle">
                <span>${basics.shortName || 'TK'}</span>
                <span class="avatar-status-dot" title="Available for engineering opportunities"></span>
              </div>
              <h3 class="avatar-title">${basics.name}</h3>
              <p class="avatar-subtitle">${basics.label || 'Software Engineer'}</p>
            </div>
            
            <div class="float-badge float-badge-1">
              <i class="fa-solid fa-code text-accent"></i>
              <span>Web Development</span>
            </div>

            <div class="float-badge float-badge-2">
              <i class="fa-solid fa-database text-accent"></i>
              <span>Database Skills</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * Render Quick Metrics Bar
 */
function renderMetrics(data) {
  const container = document.getElementById('metrics-grid');
  if (!container) return;

  const projectCount = Array.isArray(data.projects) ? data.projects.length : 0;
  const certCount = Array.isArray(data.certificates) ? data.certificates.length : 0;
  const eduCount = Array.isArray(data.education) ? data.education.length : 2;
  const langCount = Array.isArray(data.languages) ? data.languages.length : 2;

  let skillCount = 6;
  if (Array.isArray(data.skills)) {
    skillCount = data.skills.reduce((acc, cat) => acc + (cat.items ? cat.items.length : 0), 0);
  }

  let cardsHtml = '';

  if (projectCount > 0 && certCount > 0) {
    cardsHtml = `
      <div class="metric-card">
        <div class="metric-number">${projectCount}+</div>
        <div class="metric-label">Featured Projects</div>
      </div>
      <div class="metric-card">
        <div class="metric-number">${certCount}</div>
        <div class="metric-label">Training Milestones</div>
      </div>
      <div class="metric-card">
        <div class="metric-number">${skillCount}+</div>
        <div class="metric-label">Technologies & Frameworks</div>
      </div>
      <div class="metric-card">
        <div class="metric-number">100%</div>
        <div class="metric-label">Learning Momentum</div>
      </div>
    `;
  } else if (projectCount > 0) {
    cardsHtml = `
      <div class="metric-card">
        <div class="metric-number">${projectCount}+</div>
        <div class="metric-label">Featured Projects</div>
      </div>
      <div class="metric-card">
        <div class="metric-number">${skillCount}+</div>
        <div class="metric-label">Technologies & Frameworks</div>
      </div>
      <div class="metric-card">
        <div class="metric-number">${eduCount}</div>
        <div class="metric-label">Academic Foundations</div>
      </div>
      <div class="metric-card">
        <div class="metric-number">100%</div>
        <div class="metric-label">Learning Drive</div>
      </div>
    `;
  } else {
    cardsHtml = `
      <div class="metric-card">
        <div class="metric-number">${skillCount}+</div>
        <div class="metric-label">Technologies & Frameworks</div>
      </div>
      <div class="metric-card">
        <div class="metric-number">${eduCount}</div>
        <div class="metric-label">Academic Path</div>
      </div>
      <div class="metric-card">
        <div class="metric-number">${langCount}</div>
        <div class="metric-label">Languages (English & Urdu)</div>
      </div>
      <div class="metric-card">
        <div class="metric-number">100%</div>
        <div class="metric-label">Growth Mindset</div>
      </div>
    `;
  }

  container.innerHTML = cardsHtml;
}

/**
 * Render About & Leadership
 */
function renderAbout(about, basics) {
  const introContainer = document.getElementById('about-intro-container');
  const strengthsContainer = document.getElementById('strengths-list');
  const leadershipNote = document.getElementById('leadership-note-text');
  const locationEl = document.getElementById('about-location');

  if (introContainer && about && about.intro) {
    introContainer.innerHTML = about.intro.map((p) => `<p>${p}</p>`).join('');
  }

  if (leadershipNote && basics && basics.leadershipNote) {
    leadershipNote.textContent = basics.leadershipNote;
  }

  if (strengthsContainer && about && about.strengths) {
    strengthsContainer.innerHTML = about.strengths
      .map(
        (str) => `
        <li class="strength-item">
          <i class="fa-solid fa-circle-check strength-icon"></i>
          <span>${str}</span>
        </li>
      `
      )
      .join('');
  }

  if (locationEl && basics && basics.location) {
    const loc = basics.location;
    locationEl.textContent = `${loc.region || ''}, ${loc.country || ''}`;
  }
}

/**
 * Render Experience Timeline
 */
function renderExperience(experience) {
  const container = document.getElementById('experience-timeline');
  if (!container) return;

  if (!Array.isArray(experience) || experience.length === 0) {
    const section = document.getElementById('experience');
    if (section) section.style.display = 'none';
    return;
  }

  container.innerHTML = experience
    .map((role) => {
      const isCurrent = role.current || (role.endDate && role.endDate.toLowerCase() === 'present');

      const formatYearMonth = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr.toLowerCase() === 'present') return 'Present';
        const parts = dateStr.split('-');
        if (parts.length >= 2) {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const m = parseInt(parts[1], 10) - 1;
          return `${months[m] || ''} ${parts[0]}`;
        }
        return dateStr;
      };

      const start = formatYearMonth(role.startDate);
      const end = formatYearMonth(role.endDate);
      const dateText = start && end ? `${start} — ${end}` : start || end || '';

      const highlightsHtml = (role.highlights || [])
        .map(
          (h) => `
          <div class="experience-highlight-item">
            <i class="fa-solid fa-circle-check"></i>
            <span>${h}</span>
          </div>`
        )
        .join('');

      const techTagsHtml = (role.technologies || [])
        .map((tech) => `<span class="experience-tech-tag">${tech}</span>`)
        .join('');

      const companyDisplay = role.companyUrl
        ? `<a href="${role.companyUrl}" target="_blank" rel="noopener noreferrer" title="Visit ${role.company}">
             ${role.company} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.75rem;"></i>
           </a>`
        : `<span>${role.company}</span>`;

      return `
        <div class="experience-card glass-card ${isCurrent ? 'is-current' : ''}">
          <div class="experience-top">
            <div class="experience-role-group">
              <h3 class="experience-position">${role.position}</h3>
              <div class="experience-company-wrap">
                ${companyDisplay}
                ${role.location ? `<span class="experience-location">• ${role.location}</span>` : ''}
              </div>
            </div>

            <div class="experience-badges">
              ${
                dateText
                  ? `<span class="experience-period-badge"><i class="fa-regular fa-calendar"></i> ${dateText}</span>`
                  : ''
              }
              ${
                isCurrent
                  ? `<span class="experience-current-pill"><span class="pulse-dot"></span> Active Role</span>`
                  : ''
              }
            </div>
          </div>

          ${role.summary ? `<p class="experience-summary">${role.summary}</p>` : ''}

          ${highlightsHtml ? `<div class="experience-highlights">${highlightsHtml}</div>` : ''}

          ${techTagsHtml ? `<div class="experience-tech-tags">${techTagsHtml}</div>` : ''}
        </div>
      `;
    })
    .join('');
}

/**
 * Render Skills Categories & Chips with Interactive Proficiency
 */
let activeSkillFilter = null;

function renderSkills(skills) {
  const container = document.getElementById('skills-container');
  const filtersContainer = document.getElementById('skill-category-filters');
  if (!container) return;

  if (!Array.isArray(skills) || skills.length === 0) return;

  // Comprehensive Case-insensitive Icon Map
  const iconMap = {
    "javascript": "fa-brands fa-js",
    "c#": "fa-solid fa-code",
    "c #": "fa-solid fa-code",
    "sql": "fa-solid fa-database",
    "php": "fa-brands fa-php",
    "laravel": "fa-brands fa-laravel",
    "bootstrap": "fa-brands fa-bootstrap",
    "html": "fa-brands fa-html5",
    "css": "fa-brands fa-css3-alt",
    "python": "fa-brands fa-python",
    "java": "fa-brands fa-java",
    "git": "fa-brands fa-git-alt",
    "docker": "fa-brands fa-docker",
    "selenium": "fa-solid fa-vial-virus",
    "appium": "fa-solid fa-mobile-screen",
    "winappdriver": "fa-brands fa-windows",
    "rest assured": "fa-solid fa-network-wired",
    "robot framework": "fa-solid fa-robot",
    "jenkins": "fa-brands fa-jenkins",
    "gitlab ci": "fa-brands fa-gitlab",
    "aws": "fa-brands fa-aws"
  };

  // Comprehensive Case-insensitive Level Map
  const levelMap = {
    "javascript": "Advanced",
    "c#": "Advanced",
    "c #": "Advanced",
    "sql": "Proficient",
    "php": "Advanced",
    "laravel": "Advanced",
    "bootstrap": "Advanced",
    "python": "Advanced",
    "java": "Expert"
  };

  // Render Category Filter Buttons dynamically based on actual categories in resume.json
  if (filtersContainer) {
    if (skills.length > 1) {
      let filterBtnsHtml = `
        <button class="skill-filter-btn active" data-category="all" role="tab" aria-selected="true">
          <i class="fa-solid fa-border-all"></i> All Competencies
        </button>
      `;
      skills.forEach((cat) => {
        const catName = cat.category || 'Competencies';
        filterBtnsHtml += `
          <button class="skill-filter-btn" data-category="${catName}" role="tab" aria-selected="false">
            <i class="fa-solid fa-code"></i> ${catName}
          </button>
        `;
      });
      filtersContainer.innerHTML = filterBtnsHtml;
    } else {
      const singleCat = skills[0]?.category || 'All Competencies';
      filtersContainer.innerHTML = `
        <button class="skill-filter-btn active" data-category="all" role="tab" aria-selected="true">
          <i class="fa-solid fa-layer-group"></i> ${singleCat}
        </button>
      `;
    }
  }

  container.innerHTML = skills
    .map((category) => {
      const rawItems = category.items || [];
      const cleanItems = [];
      const seen = new Set();

      rawItems.forEach((item) => {
        const normalized = item.trim();
        const key = normalized.toLowerCase();
        if (!seen.has(key) && normalized !== '') {
          seen.add(key);
          cleanItems.push(normalized);
        }
      });

      const chipsHtml = cleanItems
        .map((item) => {
          const lower = item.toLowerCase();
          const icon = iconMap[lower] || "fa-solid fa-code";
          const level = levelMap[lower] || "Advanced";
          return `
            <div class="skill-chip" data-skill="${item}" data-category="${category.category || ''}" title="Click to view details for ${item}">
              <i class="${icon}"></i>
              <span>${item}</span>
              <span class="skill-chip-level">${level}</span>
            </div>
          `;
        })
        .join('');

      return `
        <div class="skill-category-card" data-category="${category.category || ''}">
          <div class="skill-cat-header">
            <div class="skill-cat-icon">
              <i class="fa-solid fa-terminal"></i>
            </div>
            <h3 class="skill-cat-title">${category.category || 'Competencies'}</h3>
          </div>
          <div class="skill-chips">
            ${chipsHtml}
          </div>
        </div>
      `;
    })
    .join('');

  attachSkillChipListeners();
}

/**
 * Interactive Skill Chip Click Listener -> Highlights Projects or Academic tracks
 */
function attachSkillChipListeners() {
  const chips = document.querySelectorAll('.skill-chip');
  const activeIndicator = document.getElementById('active-skill-indicator');
  const activeName = document.getElementById('active-skill-name');
  const clearBtn = document.getElementById('clear-skill-filter-btn');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const skillName = chip.getAttribute('data-skill');

      if (activeSkillFilter === skillName) {
        clearSkillProjectFilter();
      } else {
        activeSkillFilter = skillName;
        chips.forEach((c) => c.classList.remove('active-highlight'));
        chip.classList.add('active-highlight');

        if (activeIndicator && activeName) {
          activeName.textContent = skillName;
          activeIndicator.style.display = 'inline-flex';
        }

        const level = chip.querySelector('.skill-chip-level')?.textContent || 'Advanced';
        highlightProjectsBySkill(skillName, level);
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', clearSkillProjectFilter);
  }
}

function clearSkillProjectFilter() {
  activeSkillFilter = null;
  document.querySelectorAll('.skill-chip').forEach((c) => c.classList.remove('active-highlight'));
  const activeIndicator = document.getElementById('active-skill-indicator');
  if (activeIndicator) activeIndicator.style.display = 'none';

  document.querySelectorAll('.project-card').forEach((card) => {
    card.classList.remove('skill-matched', 'skill-dimmed');
  });

  document.querySelectorAll('.edu-chip').forEach((chip) => {
    chip.classList.remove('active-highlight');
  });
}

function highlightProjectsBySkill(skillName, level = 'Advanced') {
  const normSkill = skillName.toLowerCase().replace(/\s+/g, '');
  const projectCards = document.querySelectorAll('.project-card');
  let matchCount = 0;

  if (projectCards.length > 0) {
    projectCards.forEach((card) => {
      const stackText = (card.querySelector('.project-stack')?.textContent || '').toLowerCase().replace(/\s+/g, '');
      const descText = (card.querySelector('.project-description')?.textContent || '').toLowerCase().replace(/\s+/g, '');

      if (stackText.includes(normSkill) || descText.includes(normSkill)) {
        card.classList.add('skill-matched');
        card.classList.remove('skill-dimmed');
        matchCount++;
      } else {
        card.classList.remove('skill-matched');
        card.classList.add('skill-dimmed');
      }
    });
  }

  // Also highlight corresponding education modules if applicable
  const eduChips = document.querySelectorAll('.edu-chip');
  let eduMatchCount = 0;
  eduChips.forEach((chip) => {
    const text = chip.textContent.toLowerCase();
    const isMatched = text.includes(normSkill) ||
      (normSkill.includes('sql') && (text.includes('database') || text.includes('sql'))) ||
      (normSkill.includes('c#') && (text.includes('c#') || text.includes('object-oriented'))) ||
      (normSkill.includes('javascript') && (text.includes('web development') || text.includes('javascript')));

    if (isMatched) {
      chip.classList.add('active-highlight');
      eduMatchCount++;
    } else {
      chip.classList.remove('active-highlight');
    }
  });

  if (matchCount > 0) {
    showToast(`Found ${matchCount} initiative${matchCount > 1 ? 's' : ''} utilizing ${skillName} (${level})`, 'info');
  } else if (eduMatchCount > 0) {
    showToast(`${skillName} (${level}) — Linked with academic course tracks`, 'info');
  } else {
    showToast(`${skillName} — ${level} Competency`, 'info');
  }
}

/**
 * Setup Skill Category Tabs and Live Search
 */
function setupSkillControls() {
  const tabBtns = document.querySelectorAll('.skill-filter-btn');
  const catCards = document.querySelectorAll('.skill-category-card');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetCat = btn.getAttribute('data-category');

      catCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (targetCat === 'all' || cardCat === targetCat) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  const searchInput = document.getElementById('skill-search-input');
  const searchClear = document.getElementById('skill-search-clear');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();

      if (searchClear) {
        searchClear.style.display = query ? 'block' : 'none';
      }

      const allChips = document.querySelectorAll('.skill-chip');
      allChips.forEach((chip) => {
        const skill = (chip.getAttribute('data-skill') || '').toLowerCase();
        if (!query || skill.includes(query)) {
          chip.classList.remove('hidden-by-filter');
        } else {
          chip.classList.add('hidden-by-filter');
        }
      });

      catCards.forEach((card) => {
        const visibleChips = card.querySelectorAll('.skill-chip:not(.hidden-by-filter)');
        if (visibleChips.length === 0 && query) {
          card.classList.add('is-hidden');
        } else {
          const activeBtn = document.querySelector('.skill-filter-btn.active');
          const targetCat = activeBtn ? activeBtn.getAttribute('data-category') : 'all';
          const cardCat = card.getAttribute('data-category');
          if (targetCat === 'all' || cardCat === targetCat) {
            card.classList.remove('is-hidden');
          }
        }
      });
    });

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      });
    }
  }
}

/**
 * Render Projects Showcase
 */
function renderProjects(projects) {
  const container = document.getElementById('projects-grid');
  if (!container || !projects) return;

  const projectTypeMap = ['platform', 'desktop', 'pipeline'];

  container.innerHTML = projects
    .map((project, idx) => {
      const type = projectTypeMap[idx] || 'platform';
      const stackTags = (project.stack || [])
        .map((tech) => `<span class="stack-tag">${tech}</span>`)
        .join('');

      return `
        <div class="glass-card project-card" data-project-idx="${idx}" data-project-type="${type}">
          <div>
            <div class="project-header">
              <div class="project-icon-box">
                <i class="fa-solid fa-laptop-code"></i>
              </div>
              <div class="project-quick-links">
                ${
                  project.liveUrl
                    ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-ext-link" title="Visit Live Platform" aria-label="Visit Live Platform">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                       </a>`
                    : ''
                }
                ${
                  project.codeUrl
                    ? `<a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer" class="project-ext-link" title="Source Code" aria-label="Source Code">
                        <i class="fa-brands fa-github"></i>
                       </a>`
                    : ''
                }
              </div>
            </div>

            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>

            ${
              project.outcome
                ? `
              <div class="project-outcome-box">
                <i class="fa-solid fa-bullseye outcome-icon"></i>
                <span class="outcome-text"><strong>Impact:</strong> ${project.outcome}</span>
              </div>
            `
                : ''
            }
          </div>

          <div class="project-footer">
            <div class="project-stack">
              ${stackTags}
            </div>
            <div class="project-actions">
              <button class="btn btn-outline btn-sm btn-block view-project-btn" data-project-index="${idx}">
                <i class="fa-solid fa-circle-info"></i>
                <span>Project Details</span>
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  container.querySelectorAll('.view-project-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.getAttribute('data-project-index');
      openProjectModal(projects[index]);
    });
  });
}

/**
 * Setup Project Category Filter Pills
 */
function setupProjectFilters() {
  const pills = document.querySelectorAll('.project-filter-pill');
  const cards = document.querySelectorAll('.project-card');

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      cards.forEach((card) => {
        const type = card.getAttribute('data-project-type');
        if (filter === 'all' || type === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/**
 * Open Project Details Modal
 */
function openProjectModal(project) {
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  const stackHtml = (project.stack || [])
    .map((tech) => `<span class="stack-tag">${tech}</span>`)
    .join('');

  content.innerHTML = `
    <div class="modal-header-block">
      <span class="modal-header-tag">Project Overview</span>
      <h2 class="modal-project-title">${project.title}</h2>
    </div>

    <div>
      <h4 class="modal-section-title">Project Goals</h4>
      <p class="modal-overview-text">${project.description}</p>
    </div>

    ${
      project.outcome
        ? `
      <div class="modal-outcome-card">
        <i class="fa-solid fa-circle-check modal-outcome-icon"></i>
        <div>
          <strong class="modal-outcome-heading">Learning Outcome</strong>
          <span class="modal-outcome-desc">${project.outcome}</span>
        </div>
      </div>
    `
        : ''
    }

    <div>
      <h4 class="modal-section-title">Technology Stack</h4>
      <div class="modal-tech-stack">
        ${stackHtml}
      </div>
    </div>

    <div class="modal-footer-ctas">
      ${
        project.liveUrl
          ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
               <i class="fa-solid fa-arrow-up-right-from-square"></i>
               <span>View Project</span>
             </a>`
          : ''
      }
      ${
        project.codeUrl
          ? `<a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
               <i class="fa-brands fa-github"></i>
               <span>Repository / GitHub</span>
             </a>`
          : ''
      }
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.focus();
}

/**
 * Close Project Modal
 */
function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/**
 * Render Certifications
 */
function renderCertificates(certs) {
  const container = document.getElementById('certifications-grid');
  if (!container || !certs) return;

  container.innerHTML = certs
    .map((cert) => {
      return `
        <div class="cert-card">
          <div>
            <div class="cert-top">
              <span class="cert-issuer-badge">
                <i class="fa-solid fa-building-columns"></i> ${cert.issuer || 'Accreditation'}
              </span>
              <div class="cert-badge-icon">
                <i class="fa-solid fa-award"></i>
              </div>
            </div>
            <h3 class="cert-name">${cert.title || cert.name || ''}</h3>
          </div>

          <div>
            ${
              cert.url
                ? `<a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="cert-link-btn">
                     <span>View Credential</span>
                     <i class="fa-solid fa-arrow-right"></i>
                   </a>`
                : ''
            }
          </div>
        </div>
      `;
    })
    .join('');
}

/**
 * Render Education Timeline
 */
function renderEducation(eduList) {
  const container = document.getElementById('education-timeline');
  if (!container || !eduList) return;

  container.innerHTML = eduList
    .map((edu) => {
      const startYear = edu.startDate ? edu.startDate.slice(0, 4) : '';
      const endYear = edu.endDate ? edu.endDate.slice(0, 4) : 'Present';
      const dateRange = startYear && endYear ? `${startYear} — ${endYear}` : '';

      const detailChips = (edu.details || [])
        .filter((d) => d && d.trim() !== '')
        .map((track) => `<span class="edu-chip">${track}</span>`)
        .join('');

      return `
        <div class="glass-card timeline-card">
          <div class="timeline-dot"></div>
          <div class="edu-header">
            <div class="edu-title-group">
              <h3>${edu.studyType} — ${edu.area}</h3>
              <div class="edu-institution">
                <i class="fa-solid fa-school"></i> ${edu.institution}
              </div>
            </div>
            ${dateRange ? `<div class="edu-period-badge"><i class="fa-regular fa-calendar"></i> ${dateRange}</div>` : ''}
          </div>

          ${
            detailChips
              ? `
            <div class="edu-course-list">
              <span class="edu-course-label">${edu.detailsLabel || 'Key Modules & Coursework'}</span>
              <div class="edu-chips">
                ${detailChips}
              </div>
            </div>
          `
              : ''
          }
        </div>
      `;
    })
    .join('');
}

/**
 * Render Languages
 */
function renderLanguages(langs) {
  const container = document.getElementById('languages-list');
  if (!container || !langs) return;

  container.innerHTML = langs
    .map(
      (item) => `
      <div class="language-item">
        <span class="lang-name">${item.language}</span>
        <span class="lang-fluency"><i class="fa-solid fa-check"></i> ${item.fluency}</span>
      </div>
    `
    )
    .join('');
}

/**
 * Render Contact Details & Channels
 */
function renderContact(basics) {
  if (!basics) return;

  const channelsContainer = document.getElementById('contact-channels');
  const socialContainer = document.getElementById('social-links');
  const availText = document.getElementById('contact-availability-text');

  if (availText && basics.availability) {
    availText.innerHTML = `<strong>Current Focus:</strong> ${basics.availability}`;
  }

  if (channelsContainer) {
    channelsContainer.innerHTML = `
      <div class="channel-item">
        <div class="channel-left">
          <div class="channel-icon"><i class="fa-regular fa-envelope"></i></div>
          <div class="channel-info">
            <span class="channel-label">Email Address</span>
            <span class="channel-value" id="display-email">${basics.email || 'taha.1khurram@gmail.com'}</span>
          </div>
        </div>
        <button class="copy-btn" id="copy-email-btn" title="Copy to clipboard">
          <i class="fa-regular fa-copy"></i> Copy
        </button>
      </div>

      <div class="channel-item">
        <div class="channel-left">
          <div class="channel-icon"><i class="fa-solid fa-location-dot"></i></div>
          <div class="channel-info">
            <span class="channel-label">Location Base</span>
            <span class="channel-value">${basics.location?.region || 'Karachi'}, ${basics.location?.country || 'Pakistan'}</span>
          </div>
        </div>
        <span class="badge font-mono" style="font-size: 0.8rem; color: var(--text-muted);">PKT (UTC+5)</span>
      </div>
    `;

    // Email Copy Event
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const email = basics.email || 'taha.1khurram@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          showToast('Email copied to clipboard!', 'success');
          copyBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied`;
          setTimeout(() => {
            copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i> Copy`;
          }, 2500);
        });
      });
    }
  }

  if (socialContainer && basics.profiles) {
    socialContainer.innerHTML = basics.profiles
      .map(
        (p) => `
        <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="social-pill">
          <i class="${p.icon}"></i>
          <span>${p.network}</span>
        </a>
      `
      )
      .join('');
  }
}

/**
 * Live Karachi PKT Clock
 */
function startLiveClock() {
  const clockEl = document.getElementById('live-time-display');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    // Format to Asia/Karachi timezone
    const options = {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    clockEl.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
  }

  update();
  setInterval(update, 1000);
}

/**
 * Toast Notification System
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="${type === 'success' ? 'fa-solid fa-circle-check text-success' : 'fa-solid fa-circle-info text-accent'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeToastOut 0.4s ease forwards';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/**
 * Theme Toggle (Light / Dark)
 */
function setupTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Retrieve stored preference or default to dark
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const target = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', target);
      localStorage.setItem('portfolio_theme', target);
      showToast(`Switched to ${target} mode`, 'info');
    });
  }
}

/**
 * Navbar Scrollspy & Scroll Progress
 */
function setupScrollEffects() {
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('scroll-progress');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar backdrop blur on scroll
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Progress Bar
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progressPercent = (scrollY / totalHeight) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    // Scrollspy for active nav link
    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Mobile Menu Toggle & Behavior
 */
function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuDrawer = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !menuDrawer) return;

  function toggle() {
    const isOpen = menuDrawer.classList.contains('open');
    if (isOpen) {
      menuDrawer.classList.remove('open');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuDrawer.setAttribute('aria-hidden', 'true');
    } else {
      menuDrawer.classList.add('open');
      menuBtn.classList.add('active');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuDrawer.setAttribute('aria-hidden', 'false');
    }
  }

  menuBtn.addEventListener('click', toggle);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuDrawer.classList.remove('open');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuDrawer.setAttribute('aria-hidden', 'true');
    });
  });
}

/**
 * Setup Contact Form Submission & Validation
 */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('form-message').value.trim();

    let hasError = false;

    // Validation
    const nameErr = document.getElementById('name-error');
    const emailErr = document.getElementById('email-error');
    const msgErr = document.getElementById('message-error');

    nameErr.textContent = '';
    emailErr.textContent = '';
    msgErr.textContent = '';

    if (!name) {
      nameErr.textContent = 'Please enter your name.';
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      emailErr.textContent = 'Please enter a valid email address.';
      hasError = true;
    }

    if (!message || message.length < 5) {
      msgErr.textContent = 'Please enter a brief message (min 5 characters).';
      hasError = true;
    }

    if (hasError) return;

    // Simulate submission and construct mailto link
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Preparing Message...</span>`;

    setTimeout(() => {
      showToast('Thank you! Redirecting your email client...', 'success');
      
      const mailtoUrl = `mailto:${resumeState?.basics?.email || 'taha.1khurram@gmail.com'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Taha,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
      window.location.href = mailtoUrl;

      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 900);
  });
}

/**
 * Setup Modal Event Listeners
 */
function setupModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });
}

/**
 * Setup Print Button & Footer Year
 */
function setupExtras() {
  // Current Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Print CV Button
  const printBtn = document.getElementById('print-resume-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/**
 * Initialize Portfolio Application
 */
document.addEventListener('DOMContentLoaded', async () => {
  setupTheme();
  setupScrollEffects();
  setupMobileMenu();
  setupContactForm();
  setupModal();
  setupExtras();
  startLiveClock();

  // Load and render JSON content
  const data = await loadResume();
  renderPortfolio(data);
});
