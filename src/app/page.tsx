"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import PoleRail from "./pole-rail";

const programs = [
  {
    id: "pole",
    label: "Pole sport",
    title: "Fuerza que se ve, confianza que se siente.",
    copy: "Aprende desde cero y avanza de las bases a secuencias más complejas con la supervisión directa de tu instructora.",
    details: ["Técnica en barra", "Fuerza y control corporal", "Progresión a tu ritmo"],
  },
  {
    id: "dance",
    label: "Pole dance y baile",
    title: "Tu cuerpo también cuenta historias.",
    copy: "Explora la expresión a través de coreografías. En pole dance, tu instructora te guía desde los primeros movimientos hasta secuencias avanzadas.",
    details: ["Pole dance y exotic pole", "Heels, twerk y baile urbano", "Coreografía y expresión corporal"],
  },
  {
    id: "wellness",
    label: "Acondicionamiento físico",
    title: "El progreso empieza cuando te eliges.",
    copy: "Trabaja la fuerza, el control corporal y la flexibilidad en salones acondicionados para entrenar.",
    details: ["Fuerza", "Control corporal", "Flexibilidad y movilidad"],
  },
];

const plans = [
  ["01", "Clase suelta", "$20.000", "Una clase para conocer el estudio"],
  ["04", "Plan esencial", "$60.000", "4 clases / 1 vez por semana"],
  ["08", "Plan movimiento", "$80.000", "8 clases / 2 veces por semana"],
  ["12", "Plan ritmo", "$100.000", "12 clases / 3 veces por semana"],
  ["16", "Plan impulso", "$120.000", "16 clases / 4 veces por semana"],
  ["20", "Plan intensivo", "$150.000", "20 clases en el mes / hasta 6 veces por semana"],
];

const products = [
  "Barras de pole",
  "Prendas y accesorios Farfala con la mariposa de la marca",
  "Ropa deportiva",
  "Proteína",
];

const testimonials = [
  ["Evelyn R.", "El tiempo que llevo en Farfala ha sido el mejor, no quiero dejar jamás el pole..."],
  ["Viviana D.", "Nunca pensé que pudiera encontrar una comunidad tan fuerte a la que pudiera pertenecer."],
  ["Johanna R.", "Las instructoras son increíbles y se adaptan a mi progreso, es fantástica la atención!!!"],
  ["Charlie L.", "El pole me ha dado una libertad que ningún otro deporte que haya practicado antes pudo."],
  ["Loren B.", "Al principio me costaba, pero la instructora se luce y lo vuelve todo más fácil."],
];

const navItems: { label: string; id: string; mobileOnly?: boolean }[] = [
  { label: "Academia", id: "academia" },
  { label: "Clases", id: "metodo" },
  { label: "Horarios", id: "horarios", mobileOnly: true },
  { label: "Requisitos", id: "requisitos", mobileOnly: true },
  { label: "Planes", id: "planes" },
  { label: "Comunidad", id: "comunidad" },
  { label: "Productos", id: "productos" },
  { label: "Preguntas frecuentes", id: "preguntas", mobileOnly: true },
];

const morningHours = "5:30, 6:30, 7:30 y 8:30 a. m.";
const schedule = [
  ["Lunes", `Pole: ${morningHours} y 3:00, 4:00, 5:00 y 6:00 p. m.`, "Flexibilidad: 7:00 p. m."],
  ["Martes", `Pole: ${morningHours} y 3:00, 4:00, 5:00, 6:00 y 7:00 p. m.`, "Twerk: 6:00 p. m.", "Baile urbano: 7:00 p. m."],
  ["Miércoles", `Pole: ${morningHours} y 3:00, 4:00, 5:00 y 7:00 p. m.`, "Danza árabe: 6:00 p. m.", "Heels: 7:00 p. m."],
  ["Jueves", `Pole: ${morningHours} y 3:00, 4:00, 5:00 y 6:00 p. m.`, "Bachata: 6:00 p. m.", "Sexy style y entrenamiento de pierna: 7:00 p. m."],
  ["Viernes", `Flexibilidad: ${morningHours} y 6:00 p. m.`, "Pole: 3:00, 4:00, 5:00 y 7:00 p. m."],
  ["Sábado", "Pole: 7:00 y 8:00 a. m.", "Exotic pole: 9:00 a. m."],
];

export default function Home() {
  const [activeProgram, setActiveProgram] = useState("pole");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const program = programs.find((item) => item.id === activeProgram) ?? programs[0];

  useEffect(() => {
    if (!menuOpen) return;

    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [menuOpen]);

  const closeMenuWithEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || !menuOpen) return;

    event.preventDefault();
    setMenuOpen(false);
    menuToggle.current?.focus();
  };

  const goTo = (id: string) => {
    const section = document.getElementById(id);
    section?.focus({ preventScroll: true });
    section?.scrollIntoView({ block: "start" });
    setMenuOpen(false);
  };

  const moveBetweenPrograms = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = programs.length - 1;
    let nextIndex: number;

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp": nextIndex = (index + last) % programs.length; break;
      case "ArrowRight":
      case "ArrowDown": nextIndex = (index + 1) % programs.length; break;
      case "Home": nextIndex = 0; break;
      case "End": nextIndex = last; break;
      default: return;
    }

    event.preventDefault();
    const next = programs[nextIndex];
    setActiveProgram(next.id);
    document.getElementById(`program-tab-${next.id}`)?.focus();
  };

  return (
    <main className="site-main">
      <a className="skip-link" href="#inicio">Saltar al contenido</a>
      <PoleRail />
      <header
        className="site-header"
        ref={header}
        onKeyDown={closeMenuWithEscape}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
        }}
      >
        <button className="brand" onClick={() => goTo("inicio")} aria-label="Ir al inicio">
          <span className="brand-mark brand-butterfly butterfly-light" aria-hidden="true" />
          <span>Farfala</span>
        </button>
        <button
          ref={menuToggle}
          className="menu-button"
          type="button"
          aria-controls="site-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Menú de navegación"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-icon" aria-hidden="true" />
          <span>{menuOpen ? "Cerrar" : "Menú"}</span>
        </button>
        <nav id="site-navigation" className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navegación principal" onClick={() => setMenuOpen(false)}>
          <ul className="nav-list">
            {navItems.map(({ label, id, mobileOnly }) => (
              <li key={id} className={mobileOnly ? "nav-mobile-only" : undefined}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
            <li><a className="nav-cta" href="#contacto">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <section id="inicio" className="hero" tabIndex={-1}>
        <div className="hero-glow" />
        <div className="hero-content">
          <p className="kicker"><i /> POLE SPORT ACADEMY · TULUÁ</p>
          <h1>Tu fuerza<br />también tiene <em>alas.</em></h1>
          <p className="hero-copy">Pole sport, pole dance, baile y acondicionamiento físico en Tuluá. Puedes empezar desde cero y avanzar a tu ritmo.</p>
          <div className="hero-actions">
            <button className="button button-light" onClick={() => goTo("planes")}>Ver planes <span>↓</span></button>
            <button className="text-button" onClick={() => goTo("academia")}>Conoce Farfala <span>→</span></button>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="giant-word">VOLAR</span>
          <span className="brand-butterfly hero-butterfly" />
        </div>
      </section>

      <div className="studio-video-frame">
        <video
          className="studio-video"
          aria-label="¿Te atreverías a practicar pole dance?"
          controls
          playsInline
          preload="metadata"
          poster="/images/farfala-video-portada.jpg"
          width={688}
          height={480}
        >
          <source src="/videos/farfala-en-movimiento.mp4" type="video/mp4" />
          <a href="/videos/farfala-en-movimiento.mp4">Abrir el video de Farfala</a>
        </video>
      </div>

      <section id="academia" className="section intro-section" tabIndex={-1}>
        <div className="section-label">01 / LA ACADEMIA</div>
        <div className="intro-grid">
          <h2>No es solo entrenar.<br /><em>Es volver a ti.</em></h2>
          <div className="intro-copy">
            <p>Farfala es una academia especializada en pole sport, pole dance, acondicionamiento físico y distintas disciplinas de baile.</p>
            <p>Somos un tercer lugar, fuera de casa y del trabajo, donde las mujeres pueden entrenar, expresarse y encontrar apoyo en una comunidad libre de prejuicios.</p>
            <button className="text-button dark" onClick={() => goTo("comunidad")}>Nuestra comunidad <span>→</span></button>
          </div>
        </div>
        <div className="academy-purpose">
          <article>
            <span className="brand-symbol symbol-butterfly-outline" aria-hidden="true" />
            <h3>Misión</h3>
            <p>Formar, acompañar y empoderar a las mujeres a través del pole sport, el pole dance y el acondicionamiento físico. Queremos transformar los prejuicios en fuerza, autoestima y resiliencia, y crear un espacio de expresión y desahogo donde cada alumna pueda desafiar sus límites y fortalecerse con el apoyo de una comunidad respetuosa y solidaria.</p>
          </article>
          <article>
            <span className="brand-symbol symbol-butterfly-outline" aria-hidden="true" />
            <h3>Visión</h3>
            <p>Ser una academia referente en cambiar la forma en que se perciben el pole sport y la danza, reconociéndolos como herramientas de empoderamiento y bienestar físico y emocional. Aspiramos a crear comunidades sanas, inclusivas y con un enfoque terapéutico que apoyen el desarrollo integral de las mujeres.</p>
          </article>
        </div>
      </section>

      <section id="metodo" className="section method-section" aria-labelledby="program-heading" tabIndex={-1}>
        <div className="program-heading">
          <h2 id="program-heading" className="section-label">02 / Elige tu movimiento</h2>
          <p id="program-help">Selecciona una disciplina para ver los detalles de sus clases.</p>
        </div>
        <div className="program-tabs" role="tablist" aria-label="Disciplinas" aria-describedby="program-help">
          {programs.map((item, index) => (
            <button
              key={item.id}
              id={`program-tab-${item.id}`}
              role="tab"
              aria-controls="program-panel"
              aria-selected={activeProgram === item.id}
              tabIndex={activeProgram === item.id ? 0 : -1}
              onClick={() => setActiveProgram(item.id)}
              onKeyDown={(event) => moveBetweenPrograms(event, index)}
            >
              <span className="program-tab-number" aria-hidden="true">0{index + 1}</span>
              <span className="program-tab-label">{item.label}</span>
              <span className="program-tab-indicator" aria-hidden="true" />
            </button>
          ))}
        </div>
        <article id="program-panel" className="program-panel" role="tabpanel" aria-labelledby={`program-tab-${activeProgram}`} tabIndex={0}>
          <div>
            <p className="program-eyebrow">{program.label}</p>
            <h3>{program.title}</h3>
          </div>
          <div className="program-description">
            <p>{program.copy}</p>
            <ul>{program.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          </div>
        </article>
      </section>

      <section id="horarios" className="section schedule-section" tabIndex={-1}>
        <div className="schedule-photo"><img src="/images/horario.jpeg" alt="Afiche de Farfala. El horario también está disponible en texto en esta sección." width={900} height={1600} /></div>
        <div className="schedule-copy">
          <div className="section-label">03 / TU RITMO</div>
          <h2>Una hora<br />que es <em>tuya.</em></h2>
          <p>Elige el horario que mejor acompañe tu vida. Puedes asistir a distintas franjas y comenzar desde cero, sin importar tu experiencia previa.</p>
          <div className="schedule-facts"><div><strong>60 min</strong><span>cada clase</span></div><div><strong>6 días</strong><span>para moverte</span></div></div>
          <dl className="class-formats">
            <div><dt>Presencial</dt><dd>Es nuestra modalidad principal. Entrenamos en un espacio limpio y acondicionado, con barras verticales de alta seguridad.</dd></div>
            <div><dt>Virtual</dt><dd>También ofrecemos clases y entrenamiento a distancia. Escríbenos para consultar disponibilidad.</dd></div>
          </dl>
          <details className="schedule-hours">
            <summary>Ver el horario semanal en texto</summary>
            <dl>
              {schedule.map(([day, ...classes]) => (
                <div key={day}>
                  <dt>{day}</dt>
                  {classes.map((time) => <dd key={time}>{time}</dd>)}
                </div>
              ))}
            </dl>
            <p>Las clases empiezan puntualmente. Si llegas 20 minutos tarde, perderás tu clase.</p>
          </details>
          <button className="button button-red" onClick={() => goTo("contacto")}>Quiero conocer horarios <span>↗</span></button>
        </div>
      </section>

      <section id="requisitos" className="section requirements-section" tabIndex={-1}>
        <div className="requirements-heading">
          <div className="section-label">04 / ANTES DE TU CLASE</div>
          <h2>Prepara tu<br /><em>movimiento.</em></h2>
          <p>Unos pocos esenciales para que llegues cómoda, lista y con toda tu energía.</p>
        </div>
        <div className="requirements-grid">
          <article className="requirement-card pole-requirements">
            <div className="requirement-card-top"><span>01</span><span>POLE</span></div>
            <h3>Trae contigo</h3>
            <ul className="requirements-list">
              <li><span>01</span>Toalla</li>
              <li><span>02</span>Hidratación</li>
              <li><span>03</span>Alcohol</li>
            </ul>
            <div className="outfit-note"><span>ROPA</span><p>Short y blusa sin mangas o top, como prefieras.</p></div>
            <div className="important-note"><span>IMPORTANTE</span><p>Evita aplicarte crema en el cuerpo antes de tu clase.</p></div>
          </article>
          <article className="requirement-card twerk-requirements">
            <div className="requirement-card-top"><span>02</span><span>TWERK</span></div>
            <div className="knee-icon" aria-hidden="true">◒</div>
            <h3>Rodilleras</h3>
            <p className="twerk-copy">El esencial para disfrutar el movimiento con comodidad.</p>
            <div className="twerk-footer">LLEVA LAS TUYAS <span>↗</span></div>
          </article>
        </div>
      </section>

      <section id="planes" className="section plans-section" tabIndex={-1}>
        <div className="plans-heading">
          <div><div className="section-label">05 / PLANES MENSUALES</div><h2>Elige cómo<br /><em>quieres volar.</em></h2></div>
          <p>Los planes tienen una validez de un mes. Si tienes un problema de salud o vas a viajar, avísanos para congelar tu mensualidad.</p>
        </div>
        <div className="plans-grid">
          {plans.map(([number, name, price, detail]) => (
            <button className={selectedPlan === name ? "plan-card selected" : "plan-card"} aria-pressed={selectedPlan === name} key={name} onClick={() => setSelectedPlan(name)}>
              <span className="plan-number">{number}</span>
              <span className="plan-name">{name}</span>
              <strong>{price}</strong>
              <small>{detail}</small>
              <span className="plan-arrow">↗</span>
            </button>
          ))}
        </div>
        <div className={selectedPlan ? "plan-selection show" : "plan-selection"}>
          <span role="status">{selectedPlan && <>Elegiste <strong>{selectedPlan}</strong></>}</span>
          {selectedPlan && <button onClick={() => goTo("contacto")}>Consultar disponibilidad <span aria-hidden="true">→</span></button>}
        </div>
      </section>

      <section id="comunidad" className="community-section" tabIndex={-1}>
        <div className="community-content">
          <div className="section-label light">06 / COMUNIDAD FARFALA</div>
          <h2>Las alas no se<br />abren <em>solas.</em></h2>
          <p>En Farfala, el movimiento tiene un enfoque terapéutico orientado al bienestar emocional. Aquí puedes expresarte, desahogarte y superar retos en un espacio seguro y libre de prejuicios, con el apoyo de otras alumnas.</p>
          <span className="brand-symbol symbol-community" aria-hidden="true" />
        </div>
        <div className="community-testimonials" aria-label="Testimonios de la comunidad">
          <h3 className="testimonials-label">Voces de la comunidad</h3>
          {testimonials.map(([name, quote]) => (
            <figure className="testimonial-card" key={name}>
              <blockquote>“{quote}”</blockquote>
              <figcaption>{name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="productos" className="section products-section" tabIndex={-1}>
        <div>
          <h2>Productos <em>Farfala.</em></h2>
          <button className="text-button dark" onClick={() => goTo("contacto")}>Consultar productos</button>
        </div>
        <ul className="product-list">
          {products.map((product) => <li key={product}>{product}</li>)}
        </ul>
        <span className="brand-symbol symbol-products" aria-hidden="true" />
      </section>

      <section id="preguntas" className="section faq-section" tabIndex={-1}>
        <div><div className="section-label">ANTES DE EMPEZAR</div><h2>Tus preguntas<br /><em>también caben.</em></h2></div>
        <div className="faq-list">
          <details open><summary>¿Puedo empezar si nunca he practicado pole?<span>+</span></summary><p>Sí. Cada persona puede empezar desde cero y la progresión se adapta a su proceso.</p></details>
          <details><summary>¿Tengo que ir siempre al mismo horario?<span>+</span></summary><p>No. Puedes elegir las franjas que mejor se acomoden a tu semana, según la disponibilidad.</p></details>
          <details><summary>¿Qué incluye una clase?<span>+</span></summary><p>Trabajo en barra, acondicionamiento de fuerza y flexibilidad, y un cierre con estiramiento.</p></details>
        </div>
      </section>

      <section id="contacto" className="contact-section" tabIndex={-1}>
        <span className="brand-butterfly butterfly-light contact-butterfly" aria-hidden="true" />
        <div className="contact-content"><p className="kicker"><i /> FARFALA POLE SPORT ACADEMY</p><h2>¿Lista para<br /><em>abrir tus alas?</em></h2><p>Escríbenos y conoce la clase que puede ser el inicio de tu historia.</p><a className="button button-light" href="https://www.instagram.com/farfalapolesport_tulua" target="_blank" rel="noreferrer">Hablemos por Instagram <span>↗</span></a></div>
        <div className="contact-details"><span>Carrera 28 # 30-26, barrio Salesianos<br />Tuluá, Valle del Cauca</span><span>+57 316 577 3554</span><span>@farfalapolesport_tulua</span></div>
      </section>

      <footer><span>© 2026 FARFALA</span><span>POLE SPORT · DANCE · FITNESS</span><button onClick={() => goTo("inicio")}>VOLVER ARRIBA ↑</button></footer>
    </main>
  );
}
