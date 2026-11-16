"use client";

import { useState } from "react";

const programs = [
  {
    id: "pole",
    eyebrow: "01 / POLE SPORT",
    title: "Fuerza que se ve, confianza que se siente.",
    copy: "Aprende desde cero y avanza a tu ritmo con acompañamiento técnico, fuerza, movilidad y secuencias diseñadas para ti.",
    details: ["Iniciación, intermedio y avanzado", "Grupos de máximo 8 personas", "Evaluación técnica para avanzar"],
  },
  {
    id: "dance",
    eyebrow: "02 / POLE DANCE & BAILE",
    title: "Tu cuerpo también cuenta historias.",
    copy: "Explora la expresión, el control y la presencia a través de coreografías y disciplinas complementarias de baile.",
    details: ["Pole dance y exotic pole", "Heels, twerk y baile urbano", "Clases para soltar y celebrar"],
  },
  {
    id: "wellness",
    eyebrow: "03 / MOVIMIENTO Y BIENESTAR",
    title: "El progreso empieza cuando te eliges.",
    copy: "Entrenamiento de fuerza, flexibilidad y movilidad en un espacio pensado para reconectar contigo y con otras mujeres.",
    details: ["Acondicionamiento físico", "Flexibilidad y movilidad", "Comunidad sin prejuicios"],
  },
];

const plans = [
  ["01", "Clase suelta", "$20.000", "Una clase para conocer el estudio"],
  ["04", "Plan esencial", "$60.000", "4 clases / 1 vez por semana"],
  ["08", "Plan movimiento", "$80.000", "8 clases / 2 veces por semana"],
  ["12", "Plan ritmo", "$100.000", "12 clases / 3 veces por semana"],
  ["16", "Plan impulso", "$120.000", "16 clases / 4 veces por semana"],
  ["20", "Plan sin límites", "$150.000", "20 clases / hasta 6 veces por semana"],
];

const navItems = [
  ["Academia", "academia"],
  ["Método", "metodo"],
  ["Planes", "planes"],
  ["Comunidad", "comunidad"],
];

export default function Home() {
  const [activeProgram, setActiveProgram] = useState("pole");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const program = programs.find((item) => item.id === activeProgram) ?? programs[0];

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <main>
      <header className="site-header">
        <button className="brand" onClick={() => goTo("inicio")} aria-label="Ir al inicio">
          <span className="brand-mark">F</span>
          <span>Farfala</span>
        </button>
        <button className="menu-button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "Cerrar" : "Menú"}
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navegación principal">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => goTo(id)}>{label}</button>
          ))}
          <button className="nav-cta" onClick={() => goTo("contacto")}>Conócenos <span>↗</span></button>
        </nav>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <p className="kicker"><i /> POLE SPORT ACADEMY · TULUÁ</p>
          <h1>Tu fuerza<br />también tiene <em>alas.</em></h1>
          <p className="hero-copy">Una academia para entrenar, expresarte y elevar tu historia. Aquí empiezas desde donde estás.</p>
          <div className="hero-actions">
            <button className="button button-light" onClick={() => goTo("planes")}>Ver planes <span>↓</span></button>
            <button className="text-button" onClick={() => goTo("academia")}>Conoce Farfala <span>→</span></button>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="vertical-pole" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="giant-word">VOLAR</span>
          <span className="hero-butterfly">✦</span>
        </div>
        <div className="hero-bottom"><span>DESLIZA PARA EXPLORAR</span><span>01 — 05</span></div>
      </section>

      <section id="academia" className="section intro-section">
        <div className="section-label">01 / LA ACADEMIA</div>
        <div className="intro-grid">
          <h2>No es solo entrenar.<br /><em>Es volver a ti.</em></h2>
          <div className="intro-copy">
            <p>Farfala es una academia especializada en pole sport, pole dance y baile. Un lugar de movimiento que se siente seguro, retador y profundamente tuyo.</p>
            <p>Creemos en la técnica, en el proceso y en una comunidad que acompaña sin medir ni juzgar.</p>
            <button className="text-button dark" onClick={() => goTo("comunidad")}>Nuestra comunidad <span>→</span></button>
          </div>
        </div>
        <div className="statement-strip"><span>FUERZA</span><span>·</span><span>EXPRESIÓN</span><span>·</span><span>COMUNIDAD</span></div>
      </section>

      <section id="metodo" className="section method-section">
        <div className="section-heading">
          <div className="section-label light">02 / ELIGE TU MOVIMIENTO</div>
          <p>Un camino guiado, desde la primera vuelta hasta el lugar al que quieres llegar.</p>
        </div>
        <div className="program-tabs" role="tablist" aria-label="Programas">
          {programs.map((item, index) => (
            <button key={item.id} role="tab" aria-selected={activeProgram === item.id} className={activeProgram === item.id ? "active" : ""} onClick={() => setActiveProgram(item.id)}>
              <span>0{index + 1}</span>{item.id === "pole" ? "Pole sport" : item.id === "dance" ? "Pole dance & baile" : "Bienestar"}
            </button>
          ))}
        </div>
        <article className="program-panel">
          <div className="program-number">{program.eyebrow.slice(0, 2)}</div>
          <div>
            <p className="program-eyebrow">{program.eyebrow}</p>
            <h3>{program.title}</h3>
          </div>
          <div className="program-description">
            <p>{program.copy}</p>
            <ul>{program.details.map((detail) => <li key={detail}>✦ {detail}</li>)}</ul>
          </div>
        </article>
      </section>

      <section className="section schedule-section">
        <div className="schedule-photo"><img src="/images/horario.jpeg" alt="Horario semanal de clases Farfala" /></div>
        <div className="schedule-copy">
          <div className="section-label">03 / TU RITMO</div>
          <h2>Una hora<br />que es <em>tuya.</em></h2>
          <p>Elige el horario que mejor acompañe tu vida. Puedes asistir a distintas franjas y comenzar desde cero, sin importar tu experiencia previa.</p>
          <div className="schedule-facts"><div><strong>60 min</strong><span>cada clase</span></div><div><strong>6 días</strong><span>para moverte</span></div></div>
          <button className="button button-red" onClick={() => goTo("contacto")}>Quiero conocer horarios <span>↗</span></button>
        </div>
      </section>

      <section id="requisitos" className="section requirements-section">
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

      <section id="planes" className="section plans-section">
        <div className="plans-heading">
          <div><div className="section-label">05 / PLANES MENSUALES</div><h2>Elige cómo<br /><em>quieres volar.</em></h2></div>
          <p>Todos los planes tienen una validez de un mes. Si lo necesitas por salud o viaje, puedes congelar tu mensualidad avisándonos.</p>
        </div>
        <div className="plans-grid">
          {plans.map(([number, name, price, detail], index) => (
            <button className={selectedPlan === name ? "plan-card selected" : "plan-card"} key={name} onClick={() => setSelectedPlan(name)}>
              <span className="plan-number">{number}</span>
              <span className="plan-name">{name}</span>
              <strong>{price}</strong>
              <small>{detail}</small>
              <span className="plan-arrow">↗</span>
              {index === 2 && <span className="popular">MÁS ELEGIDO</span>}
            </button>
          ))}
        </div>
        <div className={selectedPlan ? "plan-selection show" : "plan-selection"} aria-live="polite">
          <span>Elegiste: <strong>{selectedPlan}</strong></span>
          <button onClick={() => goTo("contacto")}>Consultar disponibilidad <span>→</span></button>
        </div>
      </section>

      <section id="comunidad" className="community-section">
        <div className="community-content">
          <div className="section-label light">06 / COMUNIDAD FARFALA</div>
          <h2>Las alas no se<br />abren <em>solas.</em></h2>
          <p>Este es tu tercer lugar: fuera de casa y del trabajo, con mujeres que llegan a moverse, a sostenerse y a celebrar todo lo que sí pueden.</p>
          <div className="quote"><span>“</span><p>Más que una clase, es un espacio donde me siento fuerte y acompañada.</p></div>
        </div>
        <div className="community-testimonials" aria-label="Testimonios de la comunidad">
          <div className="testimonials-label">VOCES DE LA COMUNIDAD <span>✦</span></div>
          <article className="testimonial-card featured-testimonial">
            <p>“Nunca pensé que pudiera encontrar una comunidad tan fuerte a la que pudiera pertenecer.”</p>
            <span>VIVIANA D.</span>
          </article>
          <article className="testimonial-card">
            <p>“Las instructoras son increíbles y se adaptan a mi progreso.”</p>
            <span>JOHANNA R.</span>
          </article>
          <article className="testimonial-card compact-testimonial">
            <p>“No quiero dejar jamás el pole.”</p>
            <span>EVELYN R.</span>
          </article>
        </div>
      </section>

      <section className="section faq-section">
        <div><div className="section-label">ANTES DE EMPEZAR</div><h2>Tus preguntas<br /><em>también caben.</em></h2></div>
        <div className="faq-list">
          <details open><summary>¿Puedo empezar si nunca he practicado pole?<span>+</span></summary><p>Sí. Cada persona puede empezar desde cero y la progresión se adapta a su proceso.</p></details>
          <details><summary>¿Tengo que ir siempre al mismo horario?<span>+</span></summary><p>No. Puedes elegir las franjas que mejor se acomoden a tu semana, según la disponibilidad.</p></details>
          <details><summary>¿Qué incluye una clase?<span>+</span></summary><p>Trabajo en barra, acondicionamiento de fuerza y flexibilidad, y un cierre con estiramiento.</p></details>
        </div>
      </section>

      <section id="contacto" className="contact-section">
        <div className="contact-butterfly">✦</div>
        <div className="contact-content"><p className="kicker"><i /> FARFALA POLE SPORT ACADEMY</p><h2>¿Lista para<br /><em>abrir tus alas?</em></h2><p>Escríbenos y conoce la clase que puede ser el inicio de tu historia.</p><a className="button button-light" href="https://www.instagram.com/farfalapolesport_tulua" target="_blank" rel="noreferrer">Hablemos por Instagram <span>↗</span></a></div>
        <div className="contact-details"><span>TULUÁ, VALLE DEL CAUCA</span><span>+57 316 577 3554</span><span>@farfalapolesport_tulua</span></div>
      </section>

      <footer><span>© 2026 FARFALA</span><span>POLE SPORT · DANCE · FITNESS</span><button onClick={() => goTo("inicio")}>VOLVER ARRIBA ↑</button></footer>
    </main>
  );
}
