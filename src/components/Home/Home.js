import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
 
const CODE_SNIPPETS = [
  "const dev = 'Mohamed';",
  "import pandas as pd",
  "SELECT * FROM skills;",
  "git commit -m 'fix'",
  "df.groupby('category')",
  "npm run deploy",
  "spark.read.csv(path)",
  "return <Portfolio />",
  "ETL pipeline ready ✓",
  "gpa = 3.7",
];
 
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@300;400&display=swap');
 
  .home-wrapper { position: relative; overflow: hidden; }
 
  /* ── Floating code snippets ── */
  .float-snippet {
    position: absolute;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: rgba(192,132,252,0.18);
    white-space: nowrap;
    pointer-events: none;
    animation: floatUp linear infinite;
    user-select: none;
  }
  @keyframes floatUp {
    0%   { transform: translateY(100vh) rotate(-3deg); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(-120px) rotate(3deg); opacity: 0; }
  }
 
  /* ── Glowing rings ── */
  .ring-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(192,132,252,0.2);
    animation: pulseRing 3s ease-in-out infinite;
  }
  .ring-1 { width: 340px; height: 340px; animation-delay: 0s; }
  .ring-2 { width: 420px; height: 420px; animation-delay: 0.6s; border-color: rgba(129,140,248,0.15); }
  .ring-3 { width: 500px; height: 500px; animation-delay: 1.2s; border-color: rgba(192,132,252,0.08); }
  @keyframes pulseRing {
    0%,100% { transform: scale(1);   opacity: 0.6; }
    50%      { transform: scale(1.04); opacity: 1; }
  }
 
  /* ── Typing name ── */
  .typed-name {
    border-right: 3px solid #c084fc;
    animation: cursorBlink 0.75s step-end infinite;
    padding-right: 4px;
    white-space: nowrap;
    overflow: hidden;
  }
  @keyframes cursorBlink {
    0%,100% { border-color: #c084fc; }
    50%      { border-color: transparent; }
  }
 
  /* ── Slide-in animations ── */
  .slide-in-left {
    opacity: 0;
    animation: slideLeft 0.8s ease 0.2s forwards;
  }
  .slide-in-right {
    opacity: 0;
    animation: slideRight 0.8s ease 0.4s forwards;
  }
  @keyframes slideLeft {
    from { opacity:0; transform: translateX(-40px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes slideRight {
    from { opacity:0; transform: translateX(40px); }
    to   { opacity:1; transform: translateX(0); }
  }
 
  /* ── Social icons ── */
  .social-row { display: flex; gap: 16px; justify-content: center; margin-top: 20px; }
  .social-icon-btn {
    width: 44px; height: 44px; border-radius: 50%;
    border: 1px solid rgba(192,132,252,0.4);
    display: flex; align-items: center; justify-content: center;
    color: white; font-size: 18px; text-decoration: none;
    transition: all 0.3s ease;
    background: transparent;
  }
  .social-icon-btn:hover {
    background: rgba(192,132,252,0.15);
    border-color: #c084fc;
    color: #c084fc;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(192,132,252,0.25);
  }
`;
 
function FloatingSnippets() {
  return (
    <>
      {CODE_SNIPPETS.map((snippet, i) => (
        <div key={i} className="float-snippet" style={{
          left:             `${5 + (i * 9.5) % 90}%`,
          animationDuration: `${12 + (i * 3.7) % 14}s`,
          animationDelay:    `${(i * 2.1) % 10}s`,
          fontSize:          `${10 + (i % 3)}px`,
        }}>
          {snippet}
        </div>
      ))}
    </>
  );
}
 
function TypedName() {
  const fullName   = "Mohamed Arafa";
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const i = useRef(0);
 
  useEffect(() => {
    const timer = setTimeout(function type() {
      if (i.current < fullName.length) {
        setText(fullName.slice(0, i.current + 1));
        i.current++;
        setTimeout(type, 90);
      } else {
        setDone(true);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, []);
 
  return (
    <strong className="main-name">
      <span className={done ? "" : "typed-name"} style={{ color: "#c084fc" }}>
        {text}
      </span>
    </strong>
  );
}
 
function Home() {
  return (
    <section>
      <style>{styles}</style>
      <Container fluid className="home-section home-wrapper" id="home">
        <Particle />
        <FloatingSnippets />
 
        <Container className="home-content">
          <Row style={{ alignItems: "center" }}>
            {/* ── Left: text ── */}
            <Col md={7} className="home-header slide-in-left">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">👋🏻</span>
              </h1>
              <h1 className="heading-name">
                I'M &nbsp;<TypedName />
              </h1>
              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>
 
            {/* ── Right: avatar with rings ── */}
            <Col md={5} style={{ paddingBottom: 20 }} className="slide-in-right">
              <div className="ring-wrap">
                <div className="ring ring-1" />
                <div className="ring ring-2" />
                <div className="ring ring-3" />
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid"
                  style={{ maxHeight: "420px", position: "relative", zIndex: 2 }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
 
      <Home2 />
 
      {/* ── Professional CTA Banner ── */}
      <Container fluid style={{ padding: "0 40px", margin: "20px 0" }}>
        <div style={{
          position: "relative", overflow: "hidden",
          border: "1px solid rgba(192,132,252,0.2)", borderRadius: "16px",
          padding: "50px 60px", background: "rgba(255,255,255,0.02)",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "30px",
        }}>
          {[{top:-1,left:-1,bw:"2px 0 0 2px"},{top:-1,right:-1,bw:"2px 2px 0 0"},{bottom:-1,left:-1,bw:"0 0 2px 2px"},{bottom:-1,right:-1,bw:"0 2px 2px 0"}].map((s,i)=>(
            <div key={i} style={{position:"absolute",width:24,height:24,borderColor:"#c084fc",borderStyle:"solid",borderWidth:s.bw,opacity:0.5,...(s.top!==undefined?{top:s.top}:{}),  ...(s.bottom!==undefined?{bottom:s.bottom}:{}), ...(s.left!==undefined?{left:s.left}:{}), ...(s.right!==undefined?{right:s.right}:{})}} />
          ))}
          <div style={{position:"absolute",width:300,height:200,top:"50%",left:"30%",transform:"translate(-50%,-50%)",background:"radial-gradient(ellipse, rgba(192,132,252,0.07) 0%, transparent 70%)",pointerEvents:"none"}} />
          <div style={{position:"relative",zIndex:2}}>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.7rem",letterSpacing:"0.2em",color:"#c084fc",textTransform:"uppercase",display:"block",marginBottom:10}}>
              // open to opportunities
            </span>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.4rem,3vw,2rem)",color:"white",margin:0,lineHeight:1.3}}>
              Let's Build Something <br/>
              <span style={{WebkitTextStroke:"1.5px #c084fc",color:"transparent"}}>Great Together</span>
            </h2>
          </div>
 
        </div>
      </Container>
 
      {/* ── Social links ── */}
      <Container>
        <Row style={{ paddingTop: "50px", paddingBottom: "80px" }}>
          <Col md={12} className="home-about-social" style={{ textAlign: "center" }}>
            <h1>Find Me On</h1>
            <p>Feel free to <span className="purple">connect </span>with me</p>
            <div className="social-row">
              <a href="https://github.com/ARAFA-WEB1" target="_blank" rel="noreferrer" className="social-icon-btn">
                <AiFillGithub />
              </a>
              <a href="https://www.linkedin.com/in/mohamed-ahmed-arafa" target="_blank" rel="noreferrer" className="social-icon-btn">
                <FaLinkedinIn />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
 
export default Home;
 