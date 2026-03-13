import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
 
function useVisible(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
 
const styles = `
  .about-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.25em;
    color: #c084fc;
    text-transform: uppercase;
    display: block;
    margin-bottom: 14px;
  }
  .about-title {
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 800;
    color: white;
    line-height: 1.2;
    margin-bottom: 24px;
    font-family: 'Syne', sans-serif;
  }
  .about-title span { color: #c084fc; }
 
  .about-body {
    color: rgba(200,137,230,0.75);
    font-size: 0.95rem;
    line-height: 1.9;
    font-family: 'JetBrains Mono', monospace;
  }
  .about-body b { color: #c084fc; font-style: normal; }
 
  /* highlight chips */
  .chip {
    display: inline-block;
    background: rgba(192,132,252,0.1);
    border: 1px solid rgba(192,132,252,0.3);
    border-radius: 20px;
    padding: 4px 14px;
    font-size: 0.78rem;
    color: #c084fc;
    font-family: 'JetBrains Mono', monospace;
    margin: 4px 4px 0 0;
  }
 
  /* avatar glow */
  .avatar-glow {
    filter: drop-shadow(0 0 18px rgba(192,132,252,0.35));
    transition: filter 0.4s ease;
  }
  .avatar-glow:hover {
    filter: drop-shadow(0 0 30px rgba(192,132,252,0.6));
  }
 
  /* reveal */
  .reveal-left {
    opacity: 0; transform: translateX(-30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .reveal-right {
    opacity: 0; transform: translateX(30px);
    transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
  }
  .reveal-left.visible,
  .reveal-right.visible {
    opacity: 1; transform: translateX(0);
  }
 
  /* divider line */
  .about-divider {
    width: 50px; height: 2px;
    background: linear-gradient(90deg, #c084fc, transparent);
    margin-bottom: 24px;
  }
`;
 
function Home2() {
  const [leftRef, leftVisible]   = useVisible();
  const [rightRef, rightVisible] = useVisible();
 
  return (
    <Container fluid className="home-about-section" id="about">
      <style>{styles}</style>
      <Container>
        <Row style={{ alignItems: "center", padding: "40px 0" }}>
 
          {/* ── Text ── */}
          <Col md={8} ref={leftRef} className={`reveal-left${leftVisible ? " visible" : ""}`}>
            <span className="about-tag">// about me</span>
            <div className="about-divider" />
            <h1 className="about-title">
              Let Me <span>Introduce</span> Myself
            </h1>
            <p className="about-body">
              I'm <b>Mohamed</b>, a tech-driven problem solver with a strong interest in software development, data, and building practical solutions. I enjoy turning ideas into working projects and continuously improving my skills through hands-on experience.
              <br /><br />
              I work with <b>SQL databases and data warehousing</b>, building ETL pipelines to extract, transform, and load data efficiently. I also develop web applications using modern frameworks.
            </p>
 
            {/* chips */}
            <div style={{ marginTop: 20 }}>
              {["Python", "SQL", "ETL / PySpark", "React", "Flask", "Data Engineering"].map(c => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
          </Col>
 
          {/* ── Avatar ── */}
          <Col md={4} ref={rightRef} className={`myAvtar reveal-right${rightVisible ? " visible" : ""}`}>
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
              <img src={myImg} className="img-fluid avatar-glow" alt="avatar" />
            </Tilt>
          </Col>
 
        </Row>
      </Container>
    </Container>
  );
}
 
export default Home2;