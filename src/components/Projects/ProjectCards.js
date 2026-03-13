import React, { useState } from "react";
import { BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
 
function ProjectCards(props) {
  const [hovered, setHovered] = useState(false);
 
  return (
    <div
      className="proj-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:     "relative",
        borderRadius: "12px",
        overflow:     "hidden",
        border:       `1px solid ${hovered ? "rgba(200,137,230,0.5)" : "rgba(200,137,230,0.15)"}`,
        background:   "rgba(255,255,255,0.03)",
        transition:   "all 0.4s ease",
        transform:    hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow:    hovered
          ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(192,132,252,0.15)"
          : "0 4px 20px rgba(0,0,0,0.3)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Image with overlay ── */}
      <div style={{ position: "relative", overflow: "hidden", height: "200px" }}>
        <img
          src={props.imgPath}
          alt={props.title}
          style={{
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            transition: "transform 0.5s ease",
            transform:  hovered ? "scale(1.08)" : "scale(1)",
          }}
        />
        {/* gradient overlay */}
        <div style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to bottom, transparent 40%, rgba(13,10,30,0.95) 100%)",
        }} />
        {/* tag */}
        <span style={{
          position:     "absolute",
          top:          "12px",
          left:         "12px",
          background:   "rgba(192,132,252,0.15)",
          border:       "1px solid rgba(192,132,252,0.4)",
          borderRadius: "4px",
          padding:      "3px 10px",
          fontSize:     "0.68rem",
          fontFamily:   "'JetBrains Mono', monospace",
          letterSpacing: "0.1em",
          color:        "#c084fc",
          textTransform: "uppercase",
        }}>
          {props.tag || "Project"}
        </span>
      </div>
 
      {/* ── Body ── */}
      <div style={{ padding: "22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h5 style={{
          color:       "white",
          fontFamily:  "'Syne', sans-serif",
          fontWeight:  "700",
          fontSize:    "1rem",
          marginBottom: "10px",
          lineHeight:  "1.4",
        }}>
          {props.title}
        </h5>
        <p style={{
          color:      "rgba(200,137,230,0.65)",
          fontSize:   "0.83rem",
          lineHeight: "1.7",
          flex:       1,
          marginBottom: "20px",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {props.description}
        </p>
 
        {/* ── Tech stack pills ── */}
        {props.techs && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
            {props.techs.map((t, i) => (
              <span key={i} style={{
                background:    "rgba(192,132,252,0.08)",
                border:        "1px solid rgba(192,132,252,0.2)",
                borderRadius:  "20px",
                padding:       "3px 10px",
                fontSize:      "0.72rem",
                color:         "rgba(200,137,230,0.8)",
                fontFamily:    "'JetBrains Mono', monospace",
              }}>{t}</span>
            ))}
          </div>
        )}
 
        {/* ── Buttons ── */}
        <div style={{ display: "flex", gap: "10px" }}>
          {props.ghLink && (
            <a href={props.ghLink} target="_blank" rel="noreferrer" style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "6px",
              padding:        "8px 18px",
              background:     "transparent",
              border:         "1px solid rgba(200,137,230,0.4)",
              borderRadius:   "4px",
              color:          "white",
              fontSize:       "0.8rem",
              fontFamily:     "'Syne', sans-serif",
              fontWeight:     "600",
              textDecoration: "none",
              transition:     "all 0.3s ease",
              letterSpacing:  "0.05em",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(192,132,252,0.15)"; e.currentTarget.style.borderColor = "#c084fc"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(200,137,230,0.4)"; }}
            >
              <BsGithub size={14} /> GitHub
            </a>
          )}
          {props.demoLink && (
            <a href={props.demoLink} target="_blank" rel="noreferrer" style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "6px",
              padding:        "8px 18px",
              background:     "rgba(192,132,252,0.12)",
              border:         "1px solid rgba(200,137,230,0.4)",
              borderRadius:   "4px",
              color:          "#c084fc",
              fontSize:       "0.8rem",
              fontFamily:     "'Syne', sans-serif",
              fontWeight:     "600",
              textDecoration: "none",
              transition:     "all 0.3s ease",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(192,132,252,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(192,132,252,0.12)"; }}
            >
              <CgWebsite size={14} /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
 
export default ProjectCards;
 