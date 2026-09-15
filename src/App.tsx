import { useEffect, useRef, useState, type CSSProperties } from "react";
import { projects, readings, weeks, type Project } from "./data";

type AccentStyle = CSSProperties & { "--accent": string };

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={diagonal ? "arrow arrow-diagonal" : "arrow"}
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();

      if (event.key === "Tab") {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? [],
        );
        const first = focusable[0];
        const last = focusable.at(-1);

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div className="dialog-shell" role="presentation" onMouseDown={onClose}>
      <section
        ref={dialogRef}
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`dialog-${project.number}`}
        onMouseDown={(event) => event.stopPropagation()}
        style={{ "--accent": project.accent } as AccentStyle}
      >
        <button ref={closeRef} className="dialog-close" type="button" onClick={onClose}>
          <span>Close</span>
          <span aria-hidden="true">×</span>
        </button>
        <div className="dialog-media">
          <img src={project.image} alt={project.alt} />
          <span className="dialog-number" aria-hidden="true">
            {project.number}
          </span>
        </div>
        <div className="dialog-copy">
          <p className="eyebrow">Student intervention</p>
          <h2 id={`dialog-${project.number}`}>{project.title}</h2>
          {project.chinese && <p className="project-chinese">{project.chinese}</p>}
          <p className="dialog-team">{project.team}</p>
          <p className="dialog-summary">{project.detail}</p>
          <dl className="project-facts">
            <div>
              <dt>Site</dt>
              <dd>{project.site}</dd>
            </div>
            <div>
              <dt>Heritage anchor</dt>
              <dd>{project.heritage}</dd>
            </div>
            <div>
              <dt>Prototype</dt>
              <dd>{project.medium}</dd>
            </div>
          </dl>
          <div className="learning-note">
            <span>What changed through testing</span>
            <p>{project.learning}</p>
          </div>
          {project.link && (
            <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
              {project.linkLabel}
              <Arrow diagonal />
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <a className="site-mark" href="#top" aria-label="Activating the City home">
          <span>ATC</span>
          <i aria-hidden="true" />
        </a>
        <nav aria-label="Main navigation">
          <a href="#premise">Premise</a>
          <a href="#field-lab">Field lab</a>
          <a href="#projects">Projects</a>
          <a href="#people">People</a>
        </nav>
        <span className="header-term">Spring 2025</span>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-glyphs" aria-hidden="true">
            <span className="glyph glyph-water">水</span>
            <span className="glyph glyph-bridge">桥</span>
            <span className="glyph glyph-play">戏</span>
          </div>
          <div className="hero-meta">
            <p>Experience Studio</p>
            <p>PCIX-SHU 102 · NYU Shanghai</p>
          </div>
          <h1 className="hero-title" id="hero-title">
            <span>Activating</span>
            <span className="hero-title-row">
              <i aria-hidden="true" /> The City
            </span>
          </h1>
          <div className="hero-bottom">
            <div className="hero-image-wrap">
              <img
                src="/assets/course-intro.webp"
                alt="Helena Rong presenting the Activating the City final review"
                fetchPriority="high"
              />
              <span className="image-caption">Final review · March 20, 2025</span>
            </div>
            <div className="hero-intro">
              <p className="hero-kicker">Media for the public realm</p>
              <p>
                A seven-week studio in which sixteen students treated Panlong Tiandi as a live
                field site, then designed six interactive encounters for its waterways, plazas
                and stages.
              </p>
              <a href="#projects" className="text-link">
                See the interventions <Arrow />
              </a>
            </div>
          </div>
          <div className="signal-line" aria-hidden="true" />
        </section>

        <section className="premise section-pad" id="premise">
          <div className="section-index reveal">
            <span>01</span>
            <span>Course premise</span>
          </div>
          <div className="premise-grid">
            <p className="premise-lead reveal">
              Public space became both the subject of the course and the material students worked
              with.
            </p>
            <div className="premise-copy reveal">
              <p>
                Students began with close observation: who was present, how people moved, where
                they stopped and what made an urban setting feel memorable. At Panlong Tiandi,
                they connected those observations to the history and craft of Jiangnan.
              </p>
              <p>
                Each team selected a specific site and developed an experience that could live
                there. The work combined physical models with sound, projection, web interfaces,
                games and participatory storytelling.
              </p>
            </div>
          </div>
          <blockquote className="challenge reveal">
            <span>Design challenge</span>
            <p>
              How might we leverage local Jiangnan heritage and craft to revitalize public space,
              using public space as a canvas to curate unique experiences for people?
            </p>
          </blockquote>
          <div className="stats reveal" aria-label="Course facts">
            <div>
              <strong>7</strong>
              <span>weeks</span>
            </div>
            <div>
              <strong>16</strong>
              <span>students</span>
            </div>
            <div>
              <strong>6</strong>
              <span>interventions</span>
            </div>
            <div>
              <strong>1</strong>
              <span>shared field site</span>
            </div>
          </div>
        </section>

        <section className="field-lab section-pad" id="field-lab">
          <div className="field-heading reveal">
            <div className="section-index light">
              <span>02</span>
              <span>Field lab</span>
            </div>
            <h2>Panlong Tiandi</h2>
            <p>
              A regenerated water town in Shanghai gave the studio a real set of spatial and
              cultural conditions: canals, bridges, public squares, shops, green space and the
              question of what preservation feels like in everyday use.
            </p>
          </div>
          <div className="map-stage reveal">
            <img
              src="/assets/panlong-map.webp"
              alt="Masterplan of Panlong Tiandi used for site research"
              loading="lazy"
            />
            <span className="map-label map-label-one">Water</span>
            <span className="map-label map-label-two">Plaza</span>
            <span className="map-label map-label-three">Green space</span>
          </div>
          <div className="field-notes reveal">
            <p>Community partner</p>
            <strong>Shui On Land</strong>
            <p>
              The course paired field observation with conversations about urban regeneration,
              placemaking and the practical life of a mixed public-commercial site.
            </p>
          </div>
        </section>

        <section className="timeline section-pad" aria-labelledby="timeline-title">
          <div className="section-index reveal">
            <span>03</span>
            <span>Seven-week arc</span>
          </div>
          <div className="timeline-intro reveal">
            <h2 id="timeline-title">From attention to intervention</h2>
            <p>
              The studio moved from reading a place to making a proposal testable. Repeated
              critique and user feedback changed the projects before the final demonstration.
            </p>
          </div>
          <ol className="week-list">
            {weeks.map((week) => (
              <li key={week.number} className="week-item reveal">
                <span className="week-number">{week.number}</span>
                <div>
                  <h3>{week.title}</h3>
                  <p className="week-question">{week.question}</p>
                  <p className="week-detail">{week.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="projects section-pad" id="projects" aria-labelledby="projects-title">
          <div className="projects-head reveal">
            <div className="section-index light">
              <span>04</span>
              <span>Student work</span>
            </div>
            <h2 id="projects-title">Six ways to activate a place</h2>
            <p>
              Every proposal joined a site condition with a Jiangnan cultural element and a form
              of interaction. Open a project to see how testing changed it.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article
                className="project-card reveal"
                key={project.number}
                style={{ "--accent": project.accent } as AccentStyle}
              >
                <button type="button" onClick={() => setActiveProject(project)}>
                  <div className="project-image">
                    <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
                    <span className="project-number">{project.number}</span>
                  </div>
                  <div className="project-card-copy">
                    <p>{project.heritage}</p>
                    <h3>{project.title}</h3>
                    {project.chinese && <span className="card-chinese">{project.chinese}</span>}
                    <p className="project-team">{project.team}</p>
                    <p className="project-summary">{project.summary}</p>
                    <span className="open-project">
                      Open project <Arrow />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="review-room section-pad" aria-labelledby="review-title">
          <div className="review-photo reveal">
            <img
              src="/assets/final-review.webp"
              alt="Students presenting sizhuScape to classmates and invited reviewers"
              loading="lazy"
            />
            <div className="review-stamp" aria-hidden="true">
              <span>20</span>
              <span>MAR</span>
              <span>25</span>
            </div>
          </div>
          <div className="review-copy reveal">
            <div className="section-index">
              <span>05</span>
              <span>Final review</span>
            </div>
            <h2 id="review-title">A room built for feedback</h2>
            <p>
              The final session asked each group to demonstrate the experience, not only describe
              it. Reviewers could handle models, try interfaces and ask what would happen if the
              proposal entered daily life at Panlong.
            </p>
            <p>
              The review brought together perspectives from urban regeneration, placemaking,
              creative technology, public art and interactive media.
            </p>
          </div>
        </section>

        <section className="people section-pad" id="people" aria-labelledby="people-title">
          <div className="section-index light reveal">
            <span>06</span>
            <span>People</span>
          </div>
          <div className="people-layout">
            <div className="people-title reveal">
              <h2 id="people-title">Teaching and review network</h2>
              <p>
                Course conversations linked the classroom to people working across urban
                development, design and media in Shanghai.
              </p>
            </div>
            <div className="people-groups reveal">
              <div>
                <h3>Instructor</h3>
                <p><strong>Helena Rong</strong><span>NYU Shanghai</span></p>
              </div>
              <div>
                <h3>Guest sessions</h3>
                <p><strong>Blair Wei</strong><span>Shui On Land</span></p>
                <p><strong>Joe Xu</strong><span>JLL</span></p>
                <p><strong>Zoey Zhu</strong><span>IDEO</span></p>
              </div>
              <div>
                <h3>Final review</h3>
                <p><strong>Jia (Helen) Fang</strong><span>Shui On Land</span></p>
                <p><strong>Joe Xu</strong><span>JLL</span></p>
                <p><strong>Zoey Zhu</strong><span>IDEO</span></p>
                <p><strong>Shikun (Philip) Zhu</strong><span>end of S.T.A.Y.</span></p>
                <p><strong>Yuanmo (Momo) Xie</strong><span>NYU Shanghai</span></p>
              </div>
            </div>
          </div>
        </section>

        <section className="reading-room" aria-labelledby="reading-title">
          <div className="reading-title reveal">
            <span>Course shelf</span>
            <h2 id="reading-title">Ideas carried into the field</h2>
          </div>
          <div className="reading-list" aria-label="Selected course readings">
            {[...readings, ...readings].map((reading, index) => (
              <span key={`${reading}-${index}`} aria-hidden={index >= readings.length}>
                {reading}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p className="footer-title">Activating the City</p>
        <p>Experience Studio · PCIX-SHU 102</p>
        <p>Spring 2025 · NYU Shanghai</p>
        <a href="#top">Back to top ↑</a>
      </footer>

      {activeProject && (
        <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}

export default App;
