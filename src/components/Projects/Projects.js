import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCards from "./ProjectCards";
import Particle from "../Particle";
 
const clothingImg = "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80";
const medicalImg  = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80";
const etlImg      = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80";
 
const SKILLS = [
  { label: "Frontend",         items: [{ name: "HTML / CSS", val: 90 }, { name: "JavaScript", val: 80 }, { name: "React", val: 70 }] },
  { label: "Data Engineering", items: [{ name: "Python", val: 85 }, { name: "SQL", val: 80 }, { name: "PySpark / ETL", val: 65 }] },
];
 
function SkillsSection() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);
 
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
 
  return (
    <div ref={ref} style={{ marginTop: 60, marginBottom: 40 }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", letterSpacing: "0.25em", color: "#c084fc", textTransform: "uppercase" }}>
          // skills & stack
        </span>
        <h3 style={{ color: "white", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.8rem", marginTop: 10 }}>
          What I <span style={{ WebkitTextStroke: "1.5px #c084fc", color: "transparent" }}>Work With</span>
        </h3>
      </div>
 
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {SKILLS.map(group => (
          <div key={group.label}
            style={{ background: "rgba(10,7,30,0.7)", border: "1px solid rgba(192,132,252,0.15)", borderRadius: 10, padding: "24px 28px", transition: "border-color .3s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(192,132,252,0.5)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(192,132,252,0.15)"}
          >
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.15em", color: "rgba(200,137,230,0.5)", textTransform: "uppercase", marginBottom: 18 }}>
              {group.label}
            </div>
            {group.items.map(sk => (
              <div key={sk.name} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "white", fontSize: 13, fontFamily: "'JetBrains Mono',monospace" }}>{sk.name}</span>
                  <span style={{ color: "#c084fc", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>{sk.val}%</span>
                </div>
                <div style={{ background: "rgba(192,132,252,0.08)", borderRadius: 20, height: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 20, background: "linear-gradient(90deg,#534AB7,#c084fc)", width: animate ? `${sk.val}%` : "0%", transition: "width 1.3s ease", boxShadow: animate ? "0 0 8px rgba(192,132,252,0.4)" : "none" }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
 

    </div>
  );
}
 
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@300;400&display=swap');
  .proj-eyebrow { font-family:'JetBrains Mono',monospace; font-size:.72rem; letter-spacing:.25em; color:#c084fc; text-transform:uppercase; margin-bottom:14px; display:block; opacity:0; animation:fadeUp .6s ease .1s forwards; }
  .proj-main-title { font-size:clamp(2.2rem,6vw,4rem); font-weight:800; color:#fff; margin-bottom:14px; opacity:0; animation:fadeUp .6s ease .2s forwards; }
  .proj-main-title span { -webkit-text-stroke:1.5px #c084fc; color:transparent; }
  .proj-subtitle { font-family:'JetBrains Mono',monospace; font-size:.82rem; color:rgba(200,137,230,0.5); margin-bottom:60px; opacity:0; animation:fadeUp .6s ease .3s forwards; }
  .proj-grid { opacity:0; animation:fadeUp .7s ease .4s forwards; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
`;
 
function Projects() {
  return (
    <Container fluid className="project-section" style={{ fontFamily: "'Syne',sans-serif", paddingBottom: 80 }}>
      <style>{styles}</style>
      <Particle />
      <Container>
        <div style={{ textAlign: "center", paddingTop: 80 }}>
          <span className="proj-eyebrow">// what i've built</span>
          <h1 className="proj-main-title">My Recent <span>Works</span></h1>
          <p className="proj-subtitle">A selection of projects — from web apps to data pipelines.</p>
        </div>
 
        <Row className="proj-grid" style={{ justifyContent: "center", paddingBottom: 10 }}>
          <Col md={4} className="project-card" style={{ marginBottom: 24 }}>
            <ProjectCards imgPath={clothingImg} tag="Web App"
              title="Local Clothing Brand Web Application"
              description="Full-stack web app for a local clothing brand. Responsive UI with client–server architecture. Excellence grade in CNC111."
              ghLink="https://github.com/ARAFA-WEB1/Network-Project"
              techs={["HTML", "CSS", "JavaScript", "Client-Server"]} />
          </Col>
          <Col md={4} className="project-card" style={{ marginBottom: 24 }}>
            <ProjectCards imgPath={medicalImg} tag="Web App"
              title="Medical Store System"
              description="Web-based pharmacy management system for a Software Engineering course. Clean, user-friendly interface."
              ghLink="https://github.com/ARAFA-WEB1/project"
              techs={["HTML", "CSS", "JavaScript"]} />
          </Col>
          <Col md={4} className="project-card" style={{ marginBottom: 24 }}>
            <ProjectCards imgPath={etlImg} tag="Data Engineering"
              title="ETL Data Engineering Project"
              description="ETL pipeline using SQL and Visual Studio. Data extracted, cleaned, transformed, and loaded into a structured format."
              ghLink=""
              techs={["SQL", "ETL", "Visual Studio", "Data Pipeline"]} />
          </Col>
        </Row>
 
        <SkillsSection />
      </Container>
    </Container>
  );
}
 
export default Projects;