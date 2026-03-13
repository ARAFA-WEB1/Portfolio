import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import pdf from "../../MyAssets/CV.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
 
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@300;400&display=swap');
 
  .resume-wrapper {
    min-height: 100vh;
    padding: 120px 0 80px;
    position: relative;
    font-family: 'Syne', sans-serif;
    overflow-x: hidden;
  }
 
  .resume-header {
    text-align: center;
    margin-bottom: 60px;
    position: relative;
  }
 
  .resume-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.25em;
    color: #c084fc;
    text-transform: uppercase;
    margin-bottom: 14px;
    display: block;
    opacity: 0;
    animation: slideUp 0.6s ease 0.1s forwards;
  }
 
  .resume-title {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 800;
    color: #fff;
    line-height: 0.9;
    margin: 0 0 24px;
    opacity: 0;
    animation: slideUp 0.7s ease 0.25s forwards;
  }
 
  .resume-title span {
    -webkit-text-stroke: 1.5px #c084fc;
    color: transparent;
  }
 
  .resume-subtitle {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: rgba(200, 137, 230, 0.6);
    letter-spacing: 0.1em;
    opacity: 0;
    animation: slideUp 0.7s ease 0.4s forwards;
  }
 
  .resume-divider {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #c084fc, transparent);
    margin: 24px auto;
    opacity: 0;
    animation: slideUp 0.7s ease 0.5s forwards;
  }
 
  .dl-btn-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
    opacity: 0;
    animation: slideUp 0.7s ease 0.55s forwards;
  }
 
  .dl-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 36px;
    background: transparent;
    border: 1.5px solid rgba(200, 137, 230, 0.5);
    border-radius: 2px;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: color 0.35s ease, border-color 0.35s ease;
  }
 
  .dl-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #c084fc;
    transform: translateX(-101%);
    transition: transform 0.35s cubic-bezier(0.77,0,0.175,1);
    z-index: 0;
  }
 
  .dl-btn:hover::before { transform: translateX(0); }
  .dl-btn:hover { color: #0d0d1a; border-color: #c084fc; }
  .dl-btn svg,
  .dl-btn span { position: relative; z-index: 1; }
 
  .pdf-stage {
    display: flex;
    justify-content: center;
    opacity: 0;
    animation: fadeIn 0.9s ease 0.7s forwards;
  }
 
  .pdf-card {
    position: relative;
    padding: 6px;
    background: rgba(200, 137, 230, 0.08);
    border: 1px solid rgba(200, 137, 230, 0.2);
    border-radius: 4px;
    box-shadow:
      0 0 0 1px rgba(200, 137, 230, 0.05),
      0 40px 80px rgba(0, 0, 0, 0.6),
      0 0 60px rgba(192, 132, 252, 0.08);
    transition: box-shadow 0.4s ease;
  }
 
  .pdf-card:hover {
    box-shadow:
      0 0 0 1px rgba(200, 137, 230, 0.12),
      0 50px 100px rgba(0, 0, 0, 0.7),
      0 0 80px rgba(192, 132, 252, 0.14);
  }
 
  .pdf-card::before,
  .pdf-card::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: #c084fc;
    border-style: solid;
    opacity: 0.6;
  }
  .pdf-card::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
  .pdf-card::after  { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
 
  .corner-tr,
  .corner-bl {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: #c084fc;
    border-style: solid;
    opacity: 0.6;
    z-index: 2;
  }
  .corner-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
  .corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
 
  /* ── Hide react-pdf error message ── */
  .react-pdf__Document .react-pdf__message--error,
  .react-pdf__message {
    display: none !important;
  }
 
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }
  .orb-1 {
    width: 500px; height: 500px;
    top: -100px; left: -150px;
    background: radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%);
    animation: drift 12s ease-in-out infinite alternate;
  }
  .orb-2 {
    width: 400px; height: 400px;
    bottom: 0; right: -100px;
    background: radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%);
    animation: drift 16s ease-in-out infinite alternate-reverse;
  }
 
  .scanlines {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.03) 2px,
      rgba(0,0,0,0.03) 4px
    );
  }
 
  .stat-row {
    display: flex;
    justify-content: center;
    gap: 48px;
    margin-bottom: 52px;
    flex-wrap: wrap;
    opacity: 0;
    animation: slideUp 0.7s ease 0.48s forwards;
  }
  .stat-item { text-align: center; position: relative; }
  .stat-item::after {
    content: '';
    position: absolute;
    right: -24px; top: 50%;
    transform: translateY(-50%);
    width: 1px; height: 30px;
    background: rgba(200,137,230,0.2);
  }
  .stat-item:last-child::after { display: none; }
  .stat-num {
    font-size: 1.6rem; font-weight: 800;
    color: #c084fc; display: block; line-height: 1;
  }
  .stat-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    color: rgba(200,137,230,0.5);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-top: 4px; display: block;
  }
 
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes drift {
    from { transform: translate(0, 0); }
    to   { transform: translate(30px, 20px); }
  }
`;
 
function ResumeNew() {
  const [width, setWidth] = useState(1200);
 
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
 
  return (
    <div>
      <style>{styles}</style>
      <div className="scanlines" />
 
      <Container fluid className="resume-section resume-wrapper">
        <Particle />
 
        <div className="orb orb-1" />
        <div className="orb orb-2" />
 
        {/* ── Header ── */}
        <div className="resume-header" style={{ position: "relative", zIndex: 2 }}>
          <span className="resume-tag">// curriculum vitae</span>
          <h1 className="resume-title">
            My <span>Resume</span>
          </h1>
          <div className="resume-divider" />
          <p className="resume-subtitle">
            Mohamed Ahmed &nbsp;·&nbsp; Computer Science &nbsp;·&nbsp; E-JUST 2028
          </p>
        </div>
 
        {/* ── Quick stats ── */}
        <div className="stat-row" style={{ position: "relative", zIndex: 2 }}>
          {[
            { num: "3.7",  label: "GPA" },
            { num: "8+",   label: "Projects" },
            { num: "3",    label: "Languages" },
            { num: "2028", label: "Graduating" },
          ].map((s) => (
            <div className="stat-item" key={s.label}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
 
        {/* ── Download button ── */}
        <div className="dl-btn-wrap" style={{ position: "relative", zIndex: 2 }}>
          <a className="dl-btn" href={pdf} download="Mohamed_Ahmed_CV.pdf">
            <AiOutlineDownload size={18} />
            <span>Download CV</span>
          </a>
        </div>
 
        {/* ── PDF viewer ── */}
        <div className="pdf-stage" style={{ position: "relative", zIndex: 2 }}>
          <div className="pdf-card">
            <span className="corner-tr" />
            <span className="corner-bl" />
            <Document file={pdf}>
              <Page
                pageNumber={1}
                width={width > 786 ? Math.min(width * 0.75, 780) : width * 0.85}
              />
            </Document>
          </div>
        </div>
 
      </Container>
    </div>
  );
}
 
export default ResumeNew;