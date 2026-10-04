import React, { useEffect, useRef, useState } from "react";
import DonationPage from "./DonationPage.jsx";
import {
  causes,
  contact,
  images,
  impact,
  instagramPosts,
  journey,
} from "./content.js";

const navItems = [
  ["Our causes", "#causes"],
  ["Our story", "#story"],
  ["Impact", "#impact"],
  ["Life at IFT", "#gallery"],
  ["Transparency", "#trust"],
  ["Contact", "#contact"],
];

function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      element.classList.add("is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Reveal({ children, className = "", ...props }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <div className="topline">
        <div className="wrap topline-inner">
          <span>Care, dignity and opportunity in Hyderabad</span>
          <span>Children · Women · Families</span>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap nav">
          <a className="brand" href="/" aria-label="Imdad-ul-Fuqaraa Trust home">
            <img src={images.logo} alt="" />
            <span>Imdad-ul-Fuqaraa Trust</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "×" : "☰"}
          </button>
          <nav
            className={`nav-links ${menuOpen ? "is-open" : ""}`}
            id="main-nav"
            aria-label="Main navigation"
          >
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a className="button button-small" href="/donate">
              Donate
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

function ImpactStat({ stat }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;

    function showValue() {
      setCount(stat.value);
    }

    function animate() {
      if (started) return;
      started = true;
      if (reduceMotion.matches) {
        showValue();
        return;
      }
      const start = performance.now();
      const duration = 1200;
      function step(now) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) ** 3;
        setCount(Math.round(stat.value * eased));
        if (progress < 1) frame = requestAnimationFrame(step);
      }
      frame = requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      animate();
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [stat.value]);

  return (
    <article className="impact-item">
      <span ref={ref} className="impact-number">
        {count.toLocaleString("en-IN")}
        {stat.suffix}
      </span>
      <p>{stat.label}</p>
      <small>{stat.note}</small>
    </article>
  );
}

function App() {
  if (window.location.pathname.replace(/\/+$/, "") === "/donate") {
    return <DonationPage />;
  }
  return <HomePage />;
}

function HomePage() {
  const [selectedCause, setSelectedCause] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (selectedCause) dialogRef.current?.showModal();
  }, [selectedCause]);

  function closeDialog() {
    dialogRef.current?.close();
    setSelectedCause(null);
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className="hero">
          <div className="wrap hero-grid">
            <Reveal className="hero-copy">
              <p className="eyebrow">A community held by care</p>
              <h1>
                A little of your kindness.
                <br />
                <em>A lifetime of possibility.</em>
              </h1>
              <p className="lead">
                A safe home, everyday essentials and room to grow — Imdad-ul-Fuqaraa
                Trust stands alongside children, women and families building a
                more hopeful future.
              </p>
              <div className="hero-actions">
                <a className="button" href="/donate">
                  Donate <span aria-hidden="true">→</span>
                </a>
                <a className="button button-outline" href="#story">
                  Discover our story
                </a>
              </div>
              <p className="trust-note">
                <span aria-hidden="true" />
                <span>
                  <strong>Rooted in Hyderabad.</strong> Growing through community.
                </span>
              </p>
            </Reveal>
            <div className="hero-art" aria-label="Photographs from the trust">
              <div className="hero-photos">
                <figure className="photo-slot hero-photo">
                  <img
                    src={images.schoolGroup}
                    alt="Students and teachers gathered in a school group photograph, reproduced from a supplied press clipping"
                  />
                </figure>
                <figure className="photo-slot hero-photo">
                  <img
                    src={images.womenGroup}
                    alt="Women gathered at a vocational training activity"
                  />
                </figure>
                <figure className="photo-slot hero-photo">
                  <img
                    src={images.top30}
                    alt="Founder Azmath Unnisa featured in Femhonour magazine's Top 30 Visionary Women recognition"
                  />
                </figure>
              </div>
              <div className="hero-tag">
                A place to belong.
                <small>And the encouragement to become.</small>
              </div>
            </div>
          </div>
        </section>

        <div className="intro-strip">
          <div className="wrap intro-inner">
            <p>
              <strong>More than one kind of support.</strong> Care, learning,
              nourishment and opportunity belong together.
            </p>
            <a href="#causes">Explore the work →</a>
          </div>
        </div>

        <section className="section impact" id="impact">
          <div className="wrap">
            <Reveal className="section-heading">
              <p className="eyebrow">A picture of the work</p>
              <h2>Every number has a human story.</h2>
              <p>
                Selected figures from the trust’s 2026 report show different
                parts of the work — from education to community care.
              </p>
            </Reveal>
            <p className="impact-note">
              Reported figures · Not live totals · Reporting date to confirm
            </p>
            <div className="impact-grid">
              {impact.map((stat) => (
                <ImpactStat key={stat.label} stat={stat} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="causes">
          <div className="wrap">
            <Reveal className="section-heading">
              <p className="eyebrow">Ways care takes shape</p>
              <h2>Support that meets people where they are.</h2>
              <p>
                Each programme responds to a different need. Together, they make
                more space for safety, confidence and possibility.
              </p>
            </Reveal>
            <div className="causes-grid">
              {causes.map((cause) => (
                <Reveal className="cause" key={cause.id}>
                  {cause.image ? (
                    <img className="cause-photo" src={cause.image} alt={cause.alt} loading="lazy" />
                  ) : (
                    <div className="cause-photo cause-placeholder" aria-hidden="true">
                      <span>Care in the community</span>
                    </div>
                  )}
                  <div className="cause-body">
                    <p className="eyebrow">{cause.eyebrow}</p>
                    <h3>{cause.title}</h3>
                    <p>{cause.description}</p>
                    <button
                      className="text-link"
                      type="button"
                      onClick={() => setSelectedCause(cause)}
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section story-band" id="story">
          <div className="wrap">
            <div className="story-grid">
              <Reveal className="story-photo">
                <img
                  src={images.community}
                  alt="Community members gathered around a table during an activity"
                  loading="lazy"
                />
              </Reveal>
              <Reveal className="story-copy">
                <p className="eyebrow">A story still unfolding</p>
                <h2>It began with neighbours showing up for one another.</h2>
                <p>
                  In 2019, community service began through a WhatsApp group,
                  including ration distribution and educational assistance. The
                  work grew step by step: a registered trust and early residential
                  care, a school, and new ways to support families.
                </p>
                <p>
                  Today, IFT continues to build care around dignity, belonging
                  and opportunity — with a future permanent campus as its next
                  chapter.
                </p>
                <a className="button button-outline" href="#contact">
                  Contact the trust
                </a>
              </Reveal>
            </div>
            <div className="timeline" aria-label="IFT timeline">
              {journey.map(([year, description]) => (
                <article className="timeline-item" key={year}>
                  <strong>{year}</strong>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <div className="founder-line">
              <img
                src={images.founder}
                alt="Founder and Chairperson Azmath Unnisa"
                loading="lazy"
              />
              <p>
                Founder and Chairperson
                <br />
                <strong>Azmath Unnisa</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="section gallery" id="gallery">
          <div className="wrap">
            <Reveal className="section-heading">
              <p className="eyebrow">Life at IFT</p>
              <h2>Growing, learning, making memories.</h2>
              <p>
                Everyday moments, women’s training, community life and
                achievements deserve to be seen in their full dignity.
              </p>
            </Reveal>
            <article className="press-feature">
              <img
                src={images.schoolGroup}
                alt="Students and teachers in a group photograph, cropped from a press image supplied in the trust archive"
                loading="lazy"
              />
              <div>
                <p className="eyebrow">School &amp; community</p>
                <h3>A community gathered around learning.</h3>
                <p>
                  Group photograph reproduced from a supplied press clipping.
                  Publication source and date should be confirmed before launch.
                </p>
              </div>
            </article>
            <div className="gallery-grid">
              <img src={images.homeLife} alt="Girls spending time together in a room at the trust" loading="lazy" />
              <img src={images.play} alt="Girls sharing a tabletop activity" loading="lazy" />
              <img src={images.womenGroup} alt="Women gathered during a group training activity" loading="lazy" />
              <img src={images.community} alt="Community members gathered around a table" loading="lazy" />
            </div>
            <p className="gallery-note">
              Archive photographs. Confirm permissions and approve captions
              before launch.
            </p>
            <video
              className="archive-video"
              controls
              preload="metadata"
              playsInline
              aria-label="Video from the Imdad-ul-Fuqaraa Trust archive"
            >
              <source src={images.video} type="video/mp4" />
              Your browser does not support this video.
            </video>
            <p className="video-caption">A video from the trust’s archive. Play when you’re ready.</p>
            <h3 className="social-heading">Recent moments shared by IFT</h3>
            <div className="instagram-grid">
              {instagramPosts.map((post) => (
                <a
                  className="instagram-card"
                  href={post.url}
                  key={post.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={post.image} alt={post.alt} loading="lazy" />
                  <span>Watch on Instagram · {post.date} ↗</span>
                </a>
              ))}
            </div>
            <a
              className="social-link"
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
            >
              More photos and videos from the community <span>Visit IFT on Instagram ↗</span>
            </a>
          </div>
        </section>

        <section className="section giving">
          <div className="wrap section-heading">
            <p className="eyebrow">Stand with the community</p>
            <h2>Help make care and opportunity possible.</h2>
            <p>
              Choose a payment option and review the recipient details before
              you confirm a transfer.
            </p>
            <a className="button" href="/donate">
              Donate to IFT <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section className="section trust" id="trust">
          <div className="wrap trust-grid">
            <Reveal className="trust-copy">
              <p className="eyebrow">Clarity builds trust</p>
              <h2>Know who you’re standing with.</h2>
              <p>
                The organisation and registration details below are from
                supplied material and need the trust’s final approval before
                publication.
              </p>
              <ul className="trust-list">
                <li><strong>Organisation</strong> Imdad-ul-Fuqaraa Trust (IFT)</li>
                <li><strong>Location</strong> Hyderabad, Telangana, India</li>
                <li><strong>Registration stated</strong> 48 | IV | 2021</li>
              </ul>
              <a
                className="text-link"
                href={`mailto:${contact.email}?subject=Enquiry%20about%20IFT%20documents`}
              >
                Ask for more information →
              </a>
            </Reveal>
            <Reveal className="recognition-box">
              <p className="eyebrow">Recognition &amp; participation</p>
              <h3>Different records, clearly described.</h3>
              <p>
                Recognition, training, nomination and pledge documents are
                distinct and are not tax-exemption certificates.
              </p>
              <div className="recognition-row">
                <img
                  src={images.top30}
                  alt="Femhonour Top 30 Visionary Women recognition"
                  loading="lazy"
                />
                <p><strong>Femhonour Top 30 Visionary Women</strong><br />Recognition</p>
              </div>
              <div className="recognition-row">
                <img
                  src={images.pledge}
                  alt="Human Rights Pledge document from the supplied archive"
                  loading="lazy"
                />
                <p><strong>Human Rights Pledge</strong><br />Pledge participation</p>
              </div>
              <p className="recognition-note">
                Official documents and any financial information should be
                reviewed before launch.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section campus" id="campus">
          <div className="wrap campus-inner">
            <Reveal className="section-heading">
              <p className="eyebrow">The next chapter</p>
              <h2>A lasting place for care to grow.</h2>
              <p>
                “Way to Jannah” is a proposed campus vision bringing residential
                care, learning, women’s training and community services together.
              </p>
            </Reveal>
            <div className="campus-points">
              <article><strong>01 · A home</strong><p>A nurturing home for girls.</p></article>
              <article><strong>02 · Learning</strong><p>Education and support to continue learning.</p></article>
              <article><strong>03 · Skills</strong><p>Space for women’s vocational learning.</p></article>
              <article><strong>04 · Community</strong><p>Health, essentials and local services.</p></article>
            </div>
          </div>
        </section>

        <section className="section help" id="help">
          <div className="wrap">
            <Reveal className="section-heading">
              <p className="eyebrow">More ways to take part</p>
              <h2>Support can begin with a conversation.</h2>
            </Reveal>
            <div className="help-grid">
              <article className="help-card"><h3>Volunteer</h3><p>Offer time or a skill.</p><a href={`mailto:${contact.email}?subject=Volunteering%20enquiry`}>Get in touch →</a></article>
              <article className="help-card"><h3>Partner</h3><p>Start a conversation.</p><a href={`mailto:${contact.additionalEmail}?subject=Partnership%20enquiry`}>Discuss a partnership →</a></article>
              <article className="help-card"><h3>Arrange a visit</h3><p>Message the trust first.</p><a href={`https://wa.me/${contact.phoneDigits}`} target="_blank" rel="noreferrer">Message on WhatsApp →</a></article>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="wrap contact-grid">
            <Reveal>
              <p className="eyebrow">Come say hello</p>
              <h2>Let’s find a way to help, together.</h2>
              <p className="lead">Questions, ideas or an offer of support? Reach out to IFT.</p>
              <dl className="contact-details">
                <div><dt>Phone</dt><dd><a href={`tel:${contact.phoneDigits}`}>{contact.phone}</a></dd></div>
                <div><dt>Email</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
                <div><dt>Instagram</dt><dd><a href={contact.instagram} target="_blank" rel="noreferrer">@imdadulfuqaraatrust ↗</a></dd></div>
                <div className="address"><dt>Address</dt><dd>{contact.address}</dd></div>
              </dl>
              <p className="approval-note">Contact, address and registration details require final approval before launch.</p>
            </Reveal>
            <aside className="contact-cta">
              <p className="eyebrow">A small beginning</p>
              <h3>Curiosity can become care.</h3>
              <p>Learn about the work, ask a question or explore how to help.</p>
              <a className="button" href="/donate">Donate to IFT →</a>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-main">
          <div className="footer-brand">
            <a className="brand" href="/">
              <img src={images.logo} alt="" />
              <span>Imdad-ul-Fuqaraa Trust</span>
            </a>
            <p>Care, dignity and opportunity for children, women and families in Hyderabad.</p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
            <a href="/donate">Donate</a>
          </nav>
        </div>
        <div className="wrap footer-bottom">
          © {new Date().getFullYear()} Imdad-ul-Fuqaraa Trust · Care · Dignity · Opportunity
        </div>
      </footer>
      <a
        className="whatsapp-float"
        href={`https://wa.me/${contact.phoneDigits}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Message Imdad-ul-Fuqaraa Trust on WhatsApp"
      >
        WhatsApp ↗
      </a>

      <dialog
        className="cause-dialog"
        ref={dialogRef}
        onClose={() => setSelectedCause(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog();
        }}
      >
        {selectedCause && (
          <>
            <button
              className="dialog-close"
              type="button"
              aria-label="Close details"
              onClick={closeDialog}
            >
              ×
            </button>
            <p className="eyebrow">{selectedCause.eyebrow}</p>
            <h2>{selectedCause.title}</h2>
            <p>{selectedCause.detail}</p>
            <a className="button" href={`mailto:${contact.email}?subject=Enquiry%20about%20${selectedCause.id}`}>
              Ask the trust about this →
            </a>
          </>
        )}
      </dialog>
    </>
  );
}

export default App;
