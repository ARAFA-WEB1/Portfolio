import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { AiOutlineCode, AiOutlineDatabase } from "react-icons/ai";
import { SiDbt, SiPython, SiApachespark, SiMysql, SiJavascript, SiReact, SiHtml5, SiCss3, SiUpwork } from "react-icons/si";
import { FaProjectDiagram, FaLinkedinIn } from "react-icons/fa";
 
// ── Web Development images ────────────────────────────────────────────────────
import fara3Hero        from "../Assets/Projects/fara3-hero.png";
import fara3Collections from "../Assets/Projects/fara3-collections.png";
import fara3Sales       from "../Assets/Projects/fara3-sales.png";
import medicareHome     from "../Assets/Projects/medicare-home.png";
import medicareProducts from "../Assets/Projects/medicare-products.png";
 
// ── Data Engineering & ETL images ────────────────────────────────────────────
import etlTesting from "../Assets/Projects/etl-testing.jpg";
import etlVisual  from "../Assets/Projects/etl-visual.png";
import etlAzure   from "../Assets/Projects/etl-azure.png";
 
// ── Database Design images ────────────────────────────────────────────────────
import dbErd      from "../Assets/Projects/db-erd.png";
import dbSchema   from "../Assets/Projects/db-schema.png";
import dbRelation from "../Assets/Projects/db-relation.png";
import dbCleaning from "../Assets/Projects/db-cleaning.png";
 
// ── Freelance Accounts images ─────────────────────────────────────────────────
import upwork     from "../Assets/Projects/upwork.png";
import freelancer from "../Assets/Projects/freelancer.png";
import naqedli    from "../Assets/Projects/naqedli.png";
import khamsat    from "../Assets/Projects/khamsat.png";
 
// ── Images arrays ─────────────────────────────────────────────────────────────
const webDevImages = [
  { src: fara3Hero,        title: "Fara`3 – Clothing Store" },
  { src: fara3Collections, title: "Fara`3 – Clothing Store" },
  { src: fara3Sales,       title: "Fara`3 – Clothing Store" },
  { src: medicareHome,     title: "MediCare Store – Medical Website" },
  { src: medicareProducts, title: "MediCare Store – Medical Website" },
];
 
const etlImages = [
  { src: etlVisual,  title: "ETL Process – Extract, Transform, Load" },
  { src: etlTesting, title: "ETL Testing Types" },
  { src: etlAzure,   title: "ETL in Azure Data Engineering" },
];
 
const dbImages = [
  { src: dbErd,      title: "Real Estate ERD Diagram" },
  { src: dbSchema,   title: "Relational Schema" },
  { src: dbRelation, title: "Database Relationships" },
  { src: dbCleaning, title: "SQL Data Cleaning" },
];
 
const freelanceImages = [
  { src: upwork,     title: "Upwork – Data Cleaning & Transformation" },
  { src: freelancer, title: "Freelancer – ETL Development" },
  { src: naqedli,    title: "Naqedli – Data Engineering" },
  { src: khamsat,    title: "Khamsat – Web & Data Services" },
];
 
// ── Services data ─────────────────────────────────────────────────────────────
const servicesData = [
  {
    icon: <AiOutlineCode size={50} className="purple" />,
    title: "Web Development",
    description: "Building modern, responsive websites using HTML, CSS, and JavaScript. From landing pages to full multi-page websites with clean, well-organized code.",
    portfolioKey: "web",
    techIcons: [
      { icon: <SiHtml5 size={22} color="#e34f26" />, label: "HTML" },
      { icon: <SiCss3 size={22} color="#1572b6" />, label: "CSS" },
      { icon: <SiJavascript size={22} color="#f7df1e" />, label: "JS" },
      { icon: <SiReact size={22} color="#61dafb" />, label: "React" },
    ],
  },
  {
    icon: <AiOutlineDatabase size={50} className="purple" />,
    title: "Data Engineering & ETL",
    description: "Designing and building ETL pipelines to extract, transform, and load data efficiently using Python and PySpark for scalable data workflows.",
    portfolioKey: "etl",
    techIcons: [
      { icon: <SiPython size={22} color="#3776ab" />, label: "Python" },
      { icon: <SiApachespark size={22} color="#e25a1c" />, label: "PySpark" },
      { icon: <SiMysql size={22} color="#4479a1" />, label: "SQL" },
    ],
  },
  {
    icon: <FaProjectDiagram size={50} className="purple" />,
    title: "Database Design",
    description: "Creating professional ERD diagrams and building optimized SQL database schemas for structured, scalable, and maintainable data systems.",
    portfolioKey: "db",
    techIcons: [
      { icon: <SiMysql size={22} color="#4479a1" />, label: "MySQL" },
      { icon: <SiPython size={22} color="#3776ab" />, label: "Python" },
    ],
  },
  {
    icon: <SiDbt size={50} className="purple" />,
    title: "Freelance Accounts",
    description: "Active on Upwork, Freelancer, Naqedli, and Khamsat. Offering web development, database design, data cleaning, and ETL services tailored to your needs.",
    portfolioKey: "freelance",
    techIcons: [
      { icon: <SiUpwork size={22} color="#6fda44" />, label: "Upwork" },
      { icon: <FaLinkedinIn size={22} color="#0077b5" />, label: "LinkedIn" },
    ],
  },
];
 
// ── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
 
  return (
    <span ref={ref} style={{ color: "rgb(200,137,230)", fontSize: "2.5rem", fontWeight: "900" }}>
      {count}{suffix}
    </span>
  );
}
 
// ── Reusable Modal ────────────────────────────────────────────────────────────
function PortfolioModal({ show, onHide, images, title }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const total   = images.length;
  const current = images[activeIdx];
 
  const prev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const next = () => setActiveIdx((i) => (i + 1) % total);
 
  const btnStyle = {
    background:   "rgba(200,137,230,0.15)",
    border:       "1px solid rgba(200,137,230,0.5)",
    color:        "white",
    padding:      "8px 22px",
    borderRadius: "8px",
    cursor:       "pointer",
    fontSize:     "1.2rem",
  };
 
  return (
    <Modal show={show} onHide={onHide} size="xl" centered contentClassName="bg-dark">
      <Modal.Header closeButton style={{ borderBottom: "1px solid rgba(200,137,230,0.3)" }}>
        <Modal.Title style={{ color: "white" }}>
          {title} — <span className="purple">{current?.title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "20px", textAlign: "center" }}>
        <img
          src={current?.src}
          alt={current?.title}
          style={{ width: "100%", maxHeight: "500px", objectFit: "contain", borderRadius: "10px", marginBottom: "20px" }}
        />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
          <button onClick={prev} style={btnStyle}>←</button>
          <span style={{ color: "rgb(155 126 172)" }}>{activeIdx + 1} / {total}</span>
          <button onClick={next} style={btnStyle}>→</button>
        </div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.src}
              alt={img.title}
              onClick={() => setActiveIdx(idx)}
              style={{
                width: "80px", height: "55px", objectFit: "cover", borderRadius: "6px", cursor: "pointer",
                border: idx === activeIdx ? "2px solid rgb(200,137,230)" : "2px solid transparent",
                opacity: idx === activeIdx ? 1 : 0.5, transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
 
// ── Main Component ────────────────────────────────────────────────────────────
function Services() {
  const [activeModal, setActiveModal] = useState(null);
 
  const cardStyle = {
    background:   "rgba(255, 255, 255, 0.05)",
    border:       "1px solid rgba(200, 137, 230, 0.3)",
    borderRadius: "15px",
    padding:      "30px",
    margin:       "15px",
    textAlign:    "center",
    transition:   "transform 0.3s ease, box-shadow 0.3s ease",
    display:      "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };
 
  return (
    <Container fluid className="home-about-section" id="services">
      <Container>
 
        {/* ── Title + Availability Badge ── */}
        <div style={{ textAlign: "center", paddingBottom: "10px" }}>
          <h1 className="project-heading">
            My <strong className="purple">Services</strong>
          </h1>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "30px",
            background: "rgba(111, 218, 68, 0.1)", border: "1px solid rgba(111,218,68,0.4)",
            borderRadius: "20px", padding: "6px 16px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#6fda44",
              boxShadow: "0 0 8px #6fda44", display: "inline-block",
              animation: "pulse 1.5s infinite" }} />
            <span style={{ color: "#6fda44", fontSize: "0.9rem", fontWeight: "600" }}>
              Available for work
            </span>
          </div>
        </div>
 
        {/* ── Service Cards ── */}
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          {servicesData.map((service, index) => (
            <Col
              key={index}
              md={5}
              style={{ ...cardStyle, cursor: service.portfolioKey ? "pointer" : "default" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(200,137,230,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => service.portfolioKey && setActiveModal(service.portfolioKey)}
            >
              <div>
                <div style={{ marginBottom: "15px" }}>{service.icon}</div>
                <h3 style={{ color: "white", marginBottom: "12px" }}>{service.title}</h3>
                <p style={{ color: "rgb(155 126 172)", lineHeight: "1.7" }}>{service.description}</p>
              </div>
 
              {/* Tech Icons */}
              <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", margin: "15px 0" }}>
                {service.techIcons.map((tech, i) => (
                  <div key={i} title={tech.label} style={{
                    background: "rgba(255,255,255,0.07)", borderRadius: "8px",
                    padding: "6px 10px", display: "flex", alignItems: "center", gap: "5px",
                  }}>
                    {tech.icon}
                    <span style={{ color: "rgb(155 126 172)", fontSize: "0.75rem" }}>{tech.label}</span>
                  </div>
                ))}
              </div>
 
              {/* Bottom row: View Examples + Hire Me */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", gap: "10px" }}>
                {service.portfolioKey && (
                  <span style={{ color: "rgb(200,137,230)", fontSize: "0.85rem" }}>
                    🖼 View Examples →
                  </span>
                )}
                <a
                  href="https://www.linkedin.com/in/mohamed-ahmed-arafa"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: "rgba(200,137,230,0.15)", border: "1px solid rgba(200,137,230,0.4)",
                    color: "rgb(200,137,230)", padding: "5px 14px", borderRadius: "20px",
                    fontSize: "0.8rem", fontWeight: "600", textDecoration: "none",
                    transition: "all 0.3s ease", marginLeft: "auto",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgb(200,137,230)";
                    e.currentTarget.style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(200,137,230,0.15)";
                    e.currentTarget.style.color = "rgb(200,137,230)";
                  }}
                >
                  Hire Me
                </a>
              </div>
            </Col>
          ))}
        </Row>
 
        {/* ── Animated Counters ── */}
        <Row style={{ justifyContent: "center", paddingBottom: "60px", textAlign: "center" }}>
          {[
            { target: 8, suffix: "+", label: "Projects Completed" },
            { target: 4,  suffix: "",  label: "Service Areas" },
            { target: 6,  suffix: "",  label: "Freelance Platforms" },
            { target: 100, suffix: "%", label: "Commitment" },
          ].map((item, i) => (
            <Col key={i} xs={6} md={3} style={{ marginBottom: "20px" }}>
              <div style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,137,230,0.2)",
                borderRadius: "12px", padding: "20px 10px",
              }}>
                <AnimatedCounter target={item.target} suffix={item.suffix} />
                <p style={{ color: "rgb(155 126 172)", marginTop: "8px", fontSize: "0.9rem" }}>
                  {item.label}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
 
      {/* ── Modals ── */}
      <PortfolioModal show={activeModal === "web"}      onHide={() => setActiveModal(null)} images={webDevImages}    title="Web Development Portfolio" />
      <PortfolioModal show={activeModal === "etl"}      onHide={() => setActiveModal(null)} images={etlImages}       title="Data Engineering & ETL" />
      <PortfolioModal show={activeModal === "db"}       onHide={() => setActiveModal(null)} images={dbImages}        title="Database Design Portfolio" />
      <PortfolioModal show={activeModal === "freelance"} onHide={() => setActiveModal(null)} images={freelanceImages} title="Freelance Accounts" />
 
      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(111,218,68,0.7); }
          70%  { box-shadow: 0 0 0 8px rgba(111,218,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(111,218,68,0); }
        }
      `}</style>
    </Container>
  );
}
 
export default Services;