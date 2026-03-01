import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi everyone! I’m <span className="purple">Mohamed Arafa</span>{" "}
            from <span className="purple">Cairo, Egypt</span>.
            <br />
            I’m currently working as a{" "}
            <span className="purple">Data Engineer</span>.{" "}
            <br />I have completed courses in{" "}
            <span className="purple">Data Structures, Advanced Programming, Computer Organization, Networking and Web Programming</span> from{" "}
            <span className="purple">E-JUST</span>.
            <br />
            <br />
            Outside of coding, I love engaging in activities that keep me
            creative and inspired:
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games 🎮
            </li>
            <li className="about-activity">
              <ImPointRight /> Clubs / Student Organizations ✍️
            </li>
            <li className="about-activity">
              <ImPointRight /> Exploring New Places 🌍
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "The best way to predict the future is to create it."{" "}
          </p>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
